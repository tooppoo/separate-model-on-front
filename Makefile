
.PHONY: init
.PHONY: ci
.PHONY: clean

init:
	yarn
	yarn lerna bootstrap
	yarn lerna link

ci:
	yarn build
	yarn test

clean:
	yarn lerna clean
	rm -r node_modules
