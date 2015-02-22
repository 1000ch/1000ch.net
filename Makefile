all: prep build postp

prep:
	@echo "started"

build:
	@hugo --uglyUrls

postp:
	@echo "finished"