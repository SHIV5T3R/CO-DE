#! /bin/bash

function start_websocket_server() {
    daphne -b 0.0.0.0 -p 5001 app:app
}

start_websocket_server
