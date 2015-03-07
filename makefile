test-unit:
	mocha test/unit --recursive --colors | fix-dark-on-dark

test-func:
	mocha test/func --recursive --colors | fix-dark-on-dark

db-dump:
	mongodump --db arslinguis --out db/mongodump

db-restore:
	mongorestore db/mongodump --drop

db-export:
	mongoexport --db arslinguis --collection \
		main --out db/main.mongoexport &
	mongoexport --db arslinguis --collection \
		fixtures --out db/fixtures.mongoexport &
	wait

pre-commit: db-dump db-export

package:
	mkdir -p target && cd target && npm pack ../

install: package
	npm install target/*.tgz
