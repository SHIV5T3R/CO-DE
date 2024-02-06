from services.serialization import BaseModelSchema
from marshmallow import fields


class GithubAuthSchema(BaseModelSchema):
    code = fields.String(required=True)


class GithubAuthResponseSchema(BaseModelSchema):
    access_token = fields.String(required=True)
