#! /bin/bash

yarn build


cp -R docker-manager-linux-x64 ~/docker-manager

ln -s  ~/docker-manager/docker-manager /bin/docker-manager


