default: install test lint

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

jshint:
	jshint --exclude-path=.gitignore --reporter=node_modules/jshint-stylish **/*.js | fix-dark-on-dark || test $$? = 2

checkstyle:
	mkdir -p target
	jshint --exclude-path=.gitignore --reporter=checkstyle **/*.js > target/lint.checkstyle || test $$? = 2

test:
	mocha test --recursive --colors | fix-dark-on-dark

spec:
	mocha spec --recursive --colors | fix-dark-on-dark

export-test-data:
	mongoexport --db arslinguis --collection main \
		--out  spec/test-data.mongoexport

import-test-data:
	mongoimport --db arslinguis --collection main \
		--drop spec/test-data.mongoexport

tap:
	mkdir -p target
	mocha test --recursive --reporter=tap > target/test.tap

clover:
	mkdir -p target/coverage
	ln -s target/coverage coverage

	istanbul cover _mocha test -- --recursive --reporter=tap > target/test.tap
	istanbul report clover

	rm coverage

.PHONY: test spec
