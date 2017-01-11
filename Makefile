#
# Makefile
#
# 

PROJECT_DIR ?= $(shell pwd)
DOCKER_IMAGE ?= deepimpact
REPOSITORY ?= bpdr.io/blueplanet
REMOTE_SERVER ?= bpadmin@192.168.162.5
RELEASE := 0.0.1

image:
	meteor build --architecture=os.linux.x86_64 ../$(DOCKER_IMAGE)-build --directory
	cp -r ./.devops-toolkit/ ../$(DOCKER_IMAGE)-build/bundle && cp Dockerfile ../$(DOCKER_IMAGE)-build/bundle && cd ../$(DOCKER_IMAGE)-build/bundle  && \
	docker build -t $(REPOSITORY)/$(DOCKER_IMAGE):$(RELEASE) .

image-remote: image
	docker save $(REPOSITORY)/$(DOCKER_IMAGE) | bzip2 | pv | ssh $(REMOTE_SERVER) 'bunzip2 | docker load'

remote:
	docker save $(REPOSITORY)/$(DOCKER_IMAGE) | bzip2 | pv | ssh $(REMOTE_SERVER) 'bunzip2 | docker load'

start:
	meteor --settings settings.json

tag: image
	$(foreach tag, ${RELEASE}, docker tag -f $(REPOSITORY)/$(DOCKER_IMAGE):latest $(REGISTRY)/$(DOCKER_IMAGE):${tag} &&) true
