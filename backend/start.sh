#! /bin/bash

function start_http_server() {
    touch ../access.log && touch ../error.log
    gunicorn --workers 3 --bind 0.0.0.0:5000 --timeout 600 --access-logfile ../access.log --error-logfile ../error.log app:app
}

start_http_server
