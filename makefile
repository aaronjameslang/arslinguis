default: install test-unit

compile-templates:
	handlebars libs/templates/* -f libs/templates/templates.js --map libs/templates/templates.js.map -c handlebars

#package: build
	#npm pack target

#install: package
	#npm --python=python2 install *.tgz

test:
	mocha test --recursive --colors | fix-dark-on-dark

spec:
	mocha spec --recursive --colors | fix-dark-on-dark

#clean:
	#rm -rf target *.tgz node_modules

db-export:
	mongoexport --db arslinguis --collection \
		main --out src/test/db/main.mongoexport &
	mongoexport --db arslinguis --collection \
		fixtures --out src/test/db/fixtures.mongoexport &
	wait

.PHONY: test spec
