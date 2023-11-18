#! /bin/bash

function start_http_server() {
    gunicorn --workers 3 --bind 0.0.0.0:5000 --timeout 600 app:app
}

start_http_server
