default: install test-unit test-func lint

install:
	npm install
	make compile-templates

compile-templates:
	mkdir -p target
	handlebars libs/templates/* \
		-f target/templates.js \
		--map target/templates.js.map \
		-c handlebars

lint: jshint
sniff: jscs
fix: jscsx

jshint:
	jshint --exclude-path=.gitignore --reporter=node_modules/jshint-stylish . || test $$? = 2

jscs:
	jscs libs tests *.js

jscsx:
	jscs libs tests *.js --fix

checkstyle:
	mkdir -p target
	jshint --exclude-path=.gitignore --reporter=checkstyle . > target/lint.checkstyle || test $$? = 2

test-unit:
	mocha tests/unit --recursive --colors

test-func: import-test-data
	mocha tests/func --recursive --colors --require server.js

export-test-data:
	mongoexport --host=127.0.0.1 --db arslinguis --collection main \
		--out  tests/func/test-data.mongoexport

import-test-data:
	mongoimport --host=127.0.0.1 --db arslinguis --collection main \
		--drop tests/func/test-data.mongoexport

tap:
	mkdir -p target
	mocha tests/unit --recursive --reporter=tap > target/unit.tap
	npm start &
	sleep 1
	make import-test-data
	mocha tests/func --recursive --reporter=tap > target/func.tap
	npm stop

clover:
	mkdir -p target/coverage
	ln -s target/coverage coverage

	istanbul cover _mocha tests/unit -- --recursive --reporter=tap > target/test.tap
	istanbul report clover

	rm coverage

clean:
	< .gitignore xargs rm -rf

.PHONY: test spec
