default: build format test sniff

include makefile.d/*

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
