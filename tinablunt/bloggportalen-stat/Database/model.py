import MySQLdb
import pymssql
import os

from twisted.enterprise import adbapi 
import yaml
stream = file('database.yaml', 'r')
Config = yaml.load(stream)
env = "production"

class TwinglyMixin(object):
    dbconn = None
    @classmethod
    def setup(self):
        conf = Config['blogstream'][env]
        TwinglyMixin.dbconn = adbapi.ConnectionPool("pymssql", **conf)
    def get_user(self, twingly_id, twingly_api_key):
        return TwinglyMixin.dbconn.runInteraction(self._get_user, twingly_id, twingly_api_key)

    def _get_user(self, txn, twingly_id, twingly_api_key):
        txn.execute('select * from Customer where id = %s and apikey = %s', (twingly_id, twingly_api_key))
        return txn.fetchone()

class ModelMixin(object):
    dbconn = None
    @classmethod
    def setup(self):
        conf = Config['blogportal'][env]
        ModelMixin.dbconn = adbapi.ConnectionPool("MySQLdb", **conf)

    def get_top_list(self, prof, limit, twingly_id):
        return ModelMixin.dbconn.runInteraction(self._get_top_list, prof, limit, twingly_id)

    def _get_top_list(self, txn, prof, limit, twingly_id):
        txn.execute("""
            SELECT b.BlogId as blog_id, b.Name as blog_name,
            b.Url as blog_url,
            CAST(sum(AccessCount) AS UNSIGNED) as number_of_visits
            FROM AccessCounter ac, Blog b, Author a
            WHERE b.BlogId = ac.BlogId
            AND b.AuthorId = a.AuthorId
            AND a.TwinglyCustomerId = %s
            AND DATE_SUB(CURDATE(), INTERVAL 7 DAY) < AccessDay
            AND b.professional = %s
            GROUP BY b.BlogId, b.Name, b.Url
            ORDER BY number_of_visits DESC
            LIMIT %s
            """, (twingly_id, prof, limit) )
        return txn.fetchall()

    def create_blog(self, blog_url, blog_rss, blog_name, presentation, categories, start_date, author_id, professional):
        return ModelMixin.dbconn.runInteraction(self._create_blog, blog_url, blog_rss, blog_name,
                presentation, categories, start_date, author_id, professional)

    def _create_blog(self, txn, blog_url, blog_rss, blog_name, presentation, categories, start_date, author_id,
            professional):
        txn.execute("select BlogId from Blog where url = %s and AuthorId = %s", (blog_url, author_id))
        blog = txn.fetchone()
        #Don't register a new blog if an old one alredy exists
        if blog is not None:
            return blog
        txn.execute("""
        insert into Blog(Name, Url, AuthorId, Presentation, Professional, CreatedDate)
        Values(%s, %s, %s, %s, %s, %s )
        """, (blog_name, blog_url, author_id, presentation, False, start_date))
        txn.execute("SELECT LAST_INSERT_ID()")
        return txn.fetchone()

    def find_or_create_author(self, email, username, first_name, last_name, presentation, birthdate, twingly_id):
        return ModelMixin.dbconn.runInteraction(self._find_or_create_author, email, username,
                first_name, last_name, presentation, birthdate, twingly_id)

    def _find_or_create_author(self, txn, email, username, first_name, last_name, presentation, birthdate, twingly_id):
        txn.execute("select * from Author where email = %s", email)
        user = txn.fetchone()
        if user is not None:
            txn.execute("UPDATE Author SET TwinglyCustomerId=%s where AuthorId=%s", (twingly_id, user[0]))
            txn.fetchone()
            return user
        txn.execute("""
        INSERT INTO Author(Email, Username, AuthorName, Presentation, BirthDate, AuthorPassword, TwinglyCustomerId,
        ShowEmail, IsAdmin
        )
        values(%s, %s, %s, %s, %s, %s, %s,
        false, false
        )
        """, (email, username, first_name + ' ' + last_name, presentation, birthdate, 'super secret', twingly_id))
        txn.execute("SELECT LAST_INSERT_ID()")
        return txn.fetchone()
