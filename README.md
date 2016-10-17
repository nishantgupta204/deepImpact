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
meteor
```

## View

http://localhost:3000


## Dockerize

```bash
meteor build --architecture=os.linux.x86_64 ../deepImact-build
cd ../deepImact-build && tar -zxvf deepImact.tar.gz && cd bundle

```