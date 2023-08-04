from flask import Blueprint

test = Blueprint('test', __name__,)

@test.route('/test', methods=['GET'])
def login():
    return "Hello World!"