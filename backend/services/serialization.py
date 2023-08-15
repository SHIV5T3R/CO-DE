from marshmallow_mongoengine import ModelSchema
from marshmallow import ValidationError, post_dump


class BaseModelSchema(ModelSchema):
    """ Base Serialization Model Schema"""
    def handle_error(self, error: ValidationError, data, **kwargs):
        """
        Overwrites the default error handling on loading of data.
        The new handler sets the error messages attribute to an enveloped
        error message

        :param error: Validation Error raised during load
        :param data: Validated Data
        :param kwargs: kwargs
        """
        error.messages = {
                "status": False,
                "message": "Invalid Input",
                "errors": error.messages
            }

    @post_dump(pass_many=True)
    def envelope_dump(self, data, many):
        """
        Envelope the dump data in an object and also adding status attribute.

        :param data: Data resulted by dump function
        :param many: Boolean that indicates multiple data instances
        :return: Enveloped data and status
        """
        return {
            "status": True,
            "data": data
        }
