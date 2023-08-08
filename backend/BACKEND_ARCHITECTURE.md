# Backend Architecture Layout
    Explains the purpose for the current layout of our API structure. This is a starting point for the project.

## `app.py`
### Purpose
Main entry point for the Flask application and responsible for creating flask app instance, configuration, and runtime.

### Connection
Imports from `views` folder (api entry point) to register all endpoints. `config.py` is used to get set configurations.

## `config.py`:
### Purpose
Central area for managing configurations for development and production environments. It also manages config vairables and environment variables (`.env`).

### Connection 
This is where `app.py` initializes our flask app configs and sets our environment settings.


## `views/`
### Purpose
This folder houses our endpoints and connection to our repo's (data acess layer). All incoming requests will be processed through views package. Making it the entry point to our api structure.


## `views/__init__.py`
### Purpose
Intializes view package and dynamicallyy imports all modules within'.

### Connection
Since views is our entry point this initiates a cascade of package and subpackage imports that shape our backend during app run.

## `views/blueprints.py`
### Purpose
Defines blueprints for our different routes and allows us to organize our flask app into separate functionalities.

### Connection
Our routes can be registered allowing us to customize our own endpoints using `flask-restful` (e.g views/websockets.py).

## `views/websockets.py`
### Purpose
Contains the logic and routes specific to websockts.

### Connection
Entry point for any logic required for websockets like connecting a user.


## `repos`
### Purpose
A data acess layer, this is where all the logic will be performed. Each route has an associated repo that will execute the functionalities of its endpoints.


## `repos/websockets.py`
### Purpose
Executes all functionalities relating to websockets route.

### Connection
Each endpoint inside `views/websockets.py` will redirect here when requests are made to execute the logic.