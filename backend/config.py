"""[General Configuration Params]
"""
import os
from os import environ, path
from dotenv import load_dotenv

basedir = path.abspath(path.dirname(__file__))
load_dotenv(path.join(basedir, '.env'))


class Config:
    # caching config 
    CACHE_TYPE = "SimpleCache" # cache won't clear until app stops or restarts
    CACHE_DEFAULT_TIMEOUT = 300 # 5 min
    
    # rate limiting requests config (requests per hour)
    RATELIMIT_GLOBAL = '100/hour'
    

class DevelopmentConfig:
    DEBUG = True
    # development db config
    MONGO_URI = os.getenv('MONGO_URI')

    # rate limiting requests development config
    RATELIMIT_GLOBAL = '10000/hour'
    

# for later when ready for prod
class ProductionConfig:
    DEBUG = False
    # production db config can go here when ready
    
    # rate limiting requests prod config
    RATELIMIT_GLOBAL = '500/hour'

def get_config():
    flask_env = os.getenv('FLASK_ENV')
    cfg = None

    if flask_env == 'DEVELOPMENT':
        cfg = DevelopmentConfig
    elif flask_env == 'PRODUCTION':
        cfg = ProductionConfig

    return cfg