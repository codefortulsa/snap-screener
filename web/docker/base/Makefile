SHELL = bash

build:
	cp ../../api/composer.{json,lock} ./
	docker build -t travismillerdev/snap-screener-web-base:latest .
	rm composer.{json,lock}
.PHONY: build

push:
	docker push travismillerdev/snap-screener-web-base:latest
.PHONY: push
