import MySQLdb
import pymssql
import os

	import yaml
	from twisted.enterprise import adbapi
	stream = file('database.yaml', 'r')
	Config = yaml.load(stream)
	env = "production"
	
	class Statistics(object):
		dbconn = None
		@classmethod
		def setup(self):
			conf = Config['blogstream'][env]
			Statistics.dbconn = adbapi.ConnectionPool("MySQLdb", **conf)
			
		def get_blog_stats(self, blog_url)
			  return Statistics.dbconn.runInteraction(self._get_blog_stats, blog_url)
			  
		#ska returnera en bloggpost med visitors,name,url och position
		def _get_blog_stats(self, tnx, blog_url):
			#fixa så att den returnar positionen också!!!!!!!!!!!
			tnx.execute("""SELECT Blog.Name, Blog.Url, SUM(AccessCounter.AccessCount) 
							FROM Blog
							JOIN Author ON Author.AuthorId = Blog.AuthorId
							JOIN AccessCounter ON AccessCounter.BlogId = Blog.BlogId
							WHERE Blog.Url = %s""", (blog_url))
			print txn.fetchone()
			return txn.fetchone()
		
		def get_blog_listing(self,start_pos, end_pos, category_id, area_id)
			  return Statistics.dbconn.runInteraction(self._get_blog_listing, start_pos, end_pos, category_id, area_id)
			  
		#ska returnera det angivna intervallet i alla kategorier
		def _get_blog_listing(self, tnx, start_pos, end_pos, category_id, area_id):
				#hittar alla bloggar och sorterar dem m.a.p. antal besökare
				#FIXA SÅ ATT DEN GÖR LIMITS
				tnx.execute("SELECT Blog.Name, Blog.Url, SUM(AccessCount) FROM Blog JOIN Author ON Author.AuthorId = Blog.AuthorId JOIN AccessCounter ON AccessCounter.BlogId = Blog.BlogId WHERE Blog.BlogId  GROUP BY Blog.BlogId ORDER BY SUM(AccessCount) DESC LIMIT (%s, %s)", (start_pos,end_pos))
				
				#antalet rader
				numrows = int(tnx.rowcount)
				blog_post_list = []
				#hämtar raderna, en i taget 
				for i in range(numrows):
					#hämtar en rad
					row = tnx.fetchone()
					
					#printar kolumn 1 och två från raden
					blog_post_list.append({"name":row[0],"url":row[1],"visitiors":row[2]})
				
		return blog_post_list
	
	


