install: install-deps install-flow-typed

develop:
	npx webpack-dev-server

install-deps:
	npm install

build:
	rm -rf dist
	NODE_ENV=production npx webpack

test:
	npm test

lint:
	npx eslint . --ext js,jsx
	
lintfix:
	npx eslint . --fix --ext js,jsx

publish:
	npm publish

.PHONY: test
