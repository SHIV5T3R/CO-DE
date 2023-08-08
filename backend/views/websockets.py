from flask import current_app as app
from flask_restful import Resource, Api, fields, marshal_with, reqparse

from views.blueprints import websockets_bp
from repos.websockets import WebsocketsRepo

websockets_api = Api(websockets_bp)

class Websockets(Resource):
    def get(self): 
        return WebsocketsRepo.connect_user()
    

websockets_api.add_resource(Websockets, '/')