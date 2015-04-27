default: install test-unit

build:
	rm -rf target
	mkdir target
	cp -r src/main/* target/
	handlebars src/main/templates/* -f target/templates.js --map target/templates.js.map -c handlebars

package: build
	npm pack target

install: package
	npm install *.tgz

test-unit:
	mocha src/test/unit --recursive --colors | fix-dark-on-dark

test-func:
	mocha src/test/func --recursive --colors | fix-dark-on-dark

clean:
	rm -rf target *.tgz node_modules

db-export:
	mongoexport --db arslinguis --collection \
		main --out src/test/db/main.mongoexport &
	mongoexport --db arslinguis --collection \
		fixtures --out src/test/db/fixtures.mongoexport &
	wait
