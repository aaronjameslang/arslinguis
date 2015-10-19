default: install offline
offline: format test lint sniff

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
format: jscsx

jshint:
	jshint --exclude-path=.gitignore --reporter=node_modules/jshint-stylish .

jscs:
	jscs libs test *.js

jscsx:
	jscs libs test *.js --fix

checkstyle:
	mkdir -p target
	jshint --exclude-path=.gitignore --reporter=checkstyle . > target/lint.checkstyle || test $$? = 2

test: import-test-data
	mocha --recursive --colors --require test/_support/bootstrap.js

export-test-data:
	mongoexport --host=127.0.0.1 --db arslinguis --collection main \
		--out  test/func/test-data.mongoexport

import-test-data:
	mongoimport --host=127.0.0.1 --db arslinguis --collection main \
		--drop test/func/test-data.mongoexport

tap: import-test-data
	mkdir -p target
	mocha --recursive --reporter=tap --require server.js > target/tap

clover:
	mkdir -p target/coverage
	ln -s target/coverage coverage

	istanbul cover _mocha test/unit -- --recursive --reporter=tap > target/test.tap
	istanbul report clover

	rm coverage

clean:
	< .gitignore xargs rm -rf

.PHONY: test spec
