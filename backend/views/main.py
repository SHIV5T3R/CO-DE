from flask_restful import Api, Resource, request
from marshmallow import ValidationError
from repos import AuthRepo
from schemas import GithubAuthSchema
from views.blueprints import main_bp

main_api = Api(main_bp)


class GenerateAccessToken(Resource):
    def post(self):
        try:
            auth_serializer = GithubAuthSchema()
            auth_data = auth_serializer.load(request.get_json())
            res = AuthRepo.get_access_token(auth_data["code"])
            if res["error"]:
                return res, 400

            return auth_serializer.dump(res), 200
        except ValidationError as e:
            return {"error": "Validation failed", "messages": e.messages}, 400


main_api.add_resource(GenerateAccessToken, "/generate-access-token")
