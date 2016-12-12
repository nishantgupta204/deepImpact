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

`make image`

To push this image to a production server:
`make push`


### Docker run (on production server)

Note: the MDSO_server is the ip of Blue Planet

```bash
docker run --name deepimpact -d -p 3080:80 -e METEOR_SETTINGS={\"MDSO_server\":\"http://10.0.2.15:9980\"\,\"MDSO_keyID\":\"27a0a900eb3262010d83bc08b39106c90a597cfe\"\,\"MDSO_keySecret\":\"3ded42036374bd69853d957cc84cbf09fa37bb46\"} -e ROOT_URL=http://example.com -e MONGO_URL=localhost  artifactory.ciena.com/blueplanet/deepimpact 
```

To run the container on the BPO server it must point to the haproxy container:

```bash
docker run --name deepimpact -d -p 3080:80 -e METEOR_SETTINGS={\"MDSO_server\":\"https://172.16.0.8\"\,\"MDSO_keyID\":\"832a3e59164e674ab0794c988c7a776a34376f22\"\,\"MDSO_keySecret\":\"cce9c7daa8fd82ad3faca8e5373c35d8a1af126c\"} -e ROOT_URL=http://example.com -e MONGO_URL=localhost dockerreg.cyanoptics.com/cyan/deepimpact
```
