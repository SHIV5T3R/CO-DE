from motor.motor_asyncio import AsyncIOMotorClient


class MotorInstance():
    def __init__(self, app):
        mongo_uri = app.config['MONGO_URI']
        self.client = AsyncIOMotorClient(mongo_uri)
        self.db = self.client.users
        app.logger.info("Created instance")
