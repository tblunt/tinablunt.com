#exempel fr�n intern����tet
import cyclone.web
import tornado.web
import functools
import json
import base64

import db_functions

from twisted.internet import defer
from twisted.application import service, internet

class StatisticsHandler(tornado.web.RequestHandler, db_functions.Statistics):
    def get(self):
	    data = db_functions.get_blog_stats(blog_url)
	    #h�r ska jag g�ra om data till json sen
		
##    def get(self):
##	    data = db_functions.get_blog_listing(start_pos, end_pos, category_id, area_id)
##	    #h�r ska jag g�ra om data till json sen

if __name__ == "__main__":
    application.listen(8888)
