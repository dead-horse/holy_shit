TESTS = $(shell ls -S `find test -type f -name "*.test.js" -print`)
TIMEOUT = 30000
MOCHA_OPTS =
REPORTER = tap
NPM_REGISTRY = --registry=http://registry.cnpmjs.org
NPM_INSTALL_PRODUCTION = PYTHON=`which python2.6` NODE_ENV=production npm install
NPM_INSTALL_TEST = PYTHON=`which python2.6` NODE_ENV=test npm install

install:
	@$(NPM_INSTALL_PRODUCTION) $(NPM_REGISTRY)

install-test:
	@$(NPM_INSTALL_TEST) $(NPM_REGISTRY)

test: install-test
	@NODE_ENV=test ./node_modules/.bin/mocha \
		--reporter $(REPORTER) --timeout $(TIMEOUT) $(MOCHA_OPTS) $(TESTS)

test-cov:
	@rm -f coverage.html
	@$(MAKE) test MOCHA_OPTS='--require blanket' REPORTER=html-cov > coverage.html
	@$(MAKE) test MOCHA_OPTS='--require blanket' REPORTER=travis-cov
	@ls -lh coverage.html

test-all: test test-cov

test-coveralls: test
	@echo TRAVIS_JOB_ID $(TRAVIS_JOB_ID)
	@-$(MAKE) test MOCHA_OPTS='--require blanket' REPORTER=mocha-lcov-reporter | ./node_modules/coveralls/bin/coveralls.js

clean: 
	@rm -rf node_modules
	@rm -rf coverage.html

.PHONY: install install-test test test-cov test-all clean test-coveralls
