"""[General Configuration Params]
"""
import os
from os import environ, path
from dotenv import load_dotenv

basedir = path.abspath(path.dirname(__file__))
load_dotenv(path.join(basedir, '.env'))

class Config:
    FLASK_ENV = os.getenv('FLASK_ENV')
    DEBUG = os.getenv('DEBUG', 'False') == 'True'

    # db config
    DB_USERNAME = os.getenv('DB_USERNAME')
    DB_PASSWORD = os.getenv('DB_PASSWORD')
    DB_HOST = os.getenv('DB_HOST')
    DB_NAME = os.getenv('DB_NAME')

    # Caching Config
    CACHE_TYPE = os.getenv('CACHE_TYPE')
    CACHE_DEFAULT_TIMEOUT = os.getenv('CACHE_DEFAULT_TIMEOUT')
    
    # rate limiting requests config
    RATELIMIT_GLOBAL = os.getenv('RATELIMIT_GLOBAL')
    

def get_config():
    return Config