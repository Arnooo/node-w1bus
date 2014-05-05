test:
	./node_modules/.bin/mocha --reporter spec ./test/test

live:
	./node_modules/.bin/mocha --reporter spec ./test/live

.PHONY: test
.PHONY: live