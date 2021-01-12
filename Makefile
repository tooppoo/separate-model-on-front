
.PHONY: init
.PHONY: clean

init:
	yarn
	yarn lerna bootstrap
	yarn lerna link

clean:
	yarn lerna clean
	rm -r node_modules
