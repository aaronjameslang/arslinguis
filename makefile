default: install test lint

compile-templates:
	handlebars libs/templates/* -f libs/templates/templates.js --map libs/templates/templates.js.map -c handlebars

lint: jshint

jshint:
	jshint --exclude-path=.gitignore --reporter=node_modules/jshint-stylish **/*.js | fix-dark-on-dark || test $$? = 2

checkstyle: target
	jshint --exclude-path=.gitignore --reporter=checkstyle **/*.js > target/lint.checkstyle || test $$? = 2

tap: target
	mocha test --recursive --reporter=tap > target/test.tap

cover: target
	istanbul cover "_mocha test --recursive --reporter=tap > test.tap"
	istanbul report clover

target:
	mkdir target

install:
	npm install

test:
	mocha test --recursive --colors | fix-dark-on-dark

spec:
	mocha spec --recursive --colors | fix-dark-on-dark

db-export:
	mongoexport --db arslinguis --collection \
		main --out src/test/db/main.mongoexport &
	mongoexport --db arslinguis --collection \
		fixtures --out src/test/db/fixtures.mongoexport &
	wait

.PHONY: test spec
