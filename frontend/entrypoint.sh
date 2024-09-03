#!/bin/sh

# install dependencies if they have not been installed
[ ! -d node_modules ] && echo "Installing dependencies..." && yarn install

exec "$@"
