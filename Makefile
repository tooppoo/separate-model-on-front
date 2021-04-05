
.PHONY: init
.PHONY: ci
.PHONY: clean
.PHONY: reset

init:
	yarn
	yarn domain:cart:build
	yarn lerna bootstrap
	yarn lerna link

ci:
	yarn build
	yarn test

clean:
	yarn clean
	yarn lerna clean --yes

reset:
	${MAKE} clean && ${MAKE} init
