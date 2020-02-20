SHELL = /bin/bash

node_modules:
	yarn install
	touch node_modules

dev: node_modules
	yarn start

build: node_modules
	yarn build
.PHONY: build

serve: build
	node_modules/.bin/serve build
