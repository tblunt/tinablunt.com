#coding: utf-8
#twisted application: bpapi.tac

import model

import cyclone.web
import functools
import json
import base64

from twisted.internet import defer
from twisted.application import service, internet
def HTTPBasic(method):
    @defer.inlineCallbacks
    @functools.wraps(method)
    def wrapper(self, *args, **kwargs):
        try:
            auth_type, auth_data = \
                self.request.headers["Authorization"].split()
            usr, pwd = base64.b64decode(auth_data).split(":", 1)
        except:
            raise cyclone.web.HTTPAuthenticationRequired()
        try:
            user = yield self.get_user(int(usr), pwd)
        except Exception, e:
            raise cyclone.web.HTTPError(503)  # Service Unavailable
        if user is None:
            raise cyclone.web.HTTPAuthenticationRequired()
        else:
            self._current_user = user
            defer.returnValue(method(self, *args, **kwargs))
    return wrapper
class MainHandler(cyclone.web.RequestHandler):
    def get(self):
        pass
    def head(self):
        pass

class TopListHandler(cyclone.web.RequestHandler, model.ModelMixin, model.TwinglyMixin):
    @HTTPBasic
    @defer.inlineCallbacks
    def get(self, professional):
        limit = int(self.get_argument("limit", 10))
        if limit < 0 or 100 < limit:
            self.set_status(406)
            self.write("Limit must be between than 0 and 100")
            self.finish()
        prof = professional == "professional"
        twingly_id = self._current_user[0]
        values = yield self.get_top_list(prof, limit, twingly_id)
        self.set_header("Content-Type", "application/json; charset=utf-8")
        result = []
        for row in values:
            result.append({
                'blog_id': row[0],
                'blog_name': row[1],
                'blog_url': row[2],
                'number_of_visits': row[3]
                })
        self.finish(json.dumps(result))

class BlogHandler(cyclone.web.RequestHandler, model.ModelMixin, model.TwinglyMixin):
    @HTTPBasic
    @defer.inlineCallbacks
    def post(self):
        blog = json.loads(self.request.body)
        #requried arguments
        blog_url = blog['blog_url']
        blog_rss = blog['blog_rss']
        blog_name = blog['blog_name']
        author = blog["author"]
        email = author['email']
        username = author['username']
        first_name = author['first_name']
        last_name = author['last_name']
        #not so awesome!!
        if (blog_url is None or blog_rss is None or blog_name is None or
                email is None or username is None or first_name is None
                or last_name is None):
            self.set_status(406)
            self.finish("One or more of the following was not supplied: blog_url, blog_rss, blog_name, author[email], author[username], author[first_name], author[last_name]")

        #optional
        blog_presentation = self.get_argument('presentation', None)
        blog_categories = self.get_argument('categories[]', [])
        author_presentation = self.get_argument('author[presentation]', None)
        author_birthdate = self.get_argument('birthdate', None)
        start_date = self.get_argument('start_date', None)
        professional = self.get_argument('professional', None)

        self.set_header("Content-Type", "application/json; charset=utf-8")
        twingly_id = self._current_user[0]
        author = yield self.find_or_create_author(email, username, first_name,
                last_name, author_presentation, author_birthdate, twingly_id)
        blog_id = yield self.create_blog(blog_url, blog_rss, blog_name, blog_presentation, blog_categories, start_date, author[0], professional)
        self.finish(json.dumps({'blog_id': blog_id}))

class Application(cyclone.web.Application):
    def __init__(self):
        handlers = [(r"/top-list/(private|professional)", TopListHandler),
                (r"/blog/new", BlogHandler),
                (r"/", MainHandler),
                ]
        settings = dict(debug=True)
        model.ModelMixin.setup()
        model.TwinglyMixin.setup()
        cyclone.web.Application.__init__(self, handlers, **settings)
