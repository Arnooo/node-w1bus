simu:
	./node_modules/.bin/mocha --reporter spec \
	./test/test \
	./test/simu

live:
	./node_modules/.bin/mocha --reporter spec \
	./test/test \
	./test/live

.PHONY: simu
.PHONY: live