
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
	npx rimraf ./node_modules
	npx rimraf ./.parcel-cache

reset:
	${MAKE} clean && ${MAKE} init
