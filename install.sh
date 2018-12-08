#!/bin/bash
sudo su;
apt-get update && apt-get full-upgrade -y;
###NODE
echo "NodeJS" pause;
#get the latest version of node from nodeSource
curl -sL https://deb.nodesource.com/setup_11.x | bash -
#install node.js
apt-get install -y nodejs;
###
### DOCKER
echo "Docker stuff" pause;
# get required dependancies for docker
apt-get install apt-transport-https ca-certificates curl software-properties-common -y;
# get gpg key for docker from docker
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | apt-key add -;
apt-key fingerprint 0EBFCD88;
#add the repository to the list of repositories
add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable";
#update and install
apt update && apt install docker-ce -y;
#start the docker daemon
dockerd;
###
apt-get install npm;
# npm i;
# docker pull openjdk:alpine &&  docker pull python:alpine;
