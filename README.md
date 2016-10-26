What do you get when you cross a meteor with Blue Planet?

Deep Impact

## Introduction

This repository contains a [meteor](http://www.meteor.com) app that communicates to Ciena Blue Planet.

The scaffolding was built using [meteor kitchen](http://www.meteorkitchen.com)

A couple example domains are included as example.

## Installation

[meteor](https://www.meteor.com/install)

## Execution

```bash
meteor --settings settings.json
```

## View

http://localhost:3000

## Dockerize

```bash
meteor build --architecture=os.linux.x86_64 ../deepImpact-build --directory
cp Dockerfile ../deepImpact-build/bundle && cd ../deepImpact-build/bundle
docker build -t artifactory.ciena.com/blueplanet/deepimpact .
```



### Docker run

Note: the MDSO_server is the ip of Blue Planet

```bash
docker run --name deepimpact -d -p 3080:80 -e METEOR_SETTINGS={\"MDSO_server\":\"http://10.0.2.15:9980\"\,\"MDSO_keyID\":\"27a0a900eb3262010d83bc08b39106c90a597cfe\"\,\"MDSO_keySecret\":\"3ded42036374bd69853d957cc84cbf09fa37bb46\"} -e ROOT_URL=http://example.com -e MONGO_URL=localhost  artifactory.ciena.com/blueplanet/deepimpact 
```

