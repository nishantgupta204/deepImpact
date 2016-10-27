#
# Makefile
#
# 

DOCKER_IMAGE ?= deepimpact
REPOSITORY ?= artifactory.ciena.com/blueplanet
REMOTE_SERVER ?= devops@192.168.162.50

image:
	meteor build --architecture=os.linux.x86_64 ../$(DOCKER_IMAGE)-build --directory
	cp Dockerfile ../$(DOCKER_IMAGE)-build/bundle && cd ../$(DOCKER_IMAGE)-build/bundle  && \
	docker build -t $(REPOSITORY)/$(DOCKER_IMAGE) .

image-remote: image
	docker save $(REPOSITORY)/$(DOCKER_IMAGE) | bzip2 | pv | ssh $(REMOTE_SERVER) 'bunzip2 | docker load'

push:
	docker save $(REPOSITORY)/$(DOCKER_IMAGE) | bzip2 | pv | ssh $(REMOTE_SERVER) 'bunzip2 | docker load'
