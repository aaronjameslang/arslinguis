default: set-up format test sniff

include makefile.d/*

# Set Up

set-up: node_modules npm-shrinkwrap.json templates

node_modules: package.json
	npm install

npm-shrinkwrap.json: node_modules
	npm shrinkwrap --dev

templates: target/templates.js
target/templates.js:
	mkdir -p target
	handlebars libs/templates/* \
		-f target/templates.js \
		--map target/templates.js.map \
		-c handlebars

# Run

sniff:
	jshint . \
		--exclude-path=.gitignore \
		--reporter=node_modules/jshint-stylish
	jscs libs test *.js

format:
	jscs libs test *.js --fix

test:
	mocha --recursive --colors --require test/_support/bootstrap.js

# CI

report:
	mkdir -p target/coverage
	ln -s target/coverage coverage

	jshint \
		--exclude-path=.gitignore \
		--reporter=checkstyle . \
		> target/checkstyle
	istanbul cover \
		_mocha -- \
		--recursive \
		--reporter=tap \
		--require test/_support/bootstrap.js \
		> target/tap
	istanbul report clover

	rm coverage

# Tear Down

clean:
	< .gitignore xargs -I% sh -c "rm -rf %"

.PHONY: test
