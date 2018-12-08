#!/bin/bash
## RUN AS SU ##
apt update && apt full-upgrade -y;
###NODE
echo "NodeJS" pause;
#get the latest version of node from nodeSource
curl -sL https://deb.nodesource.com/setup_11.x | bash -
#install node.js
apt install -y nodejs;
###
### DOCKER
echo "Docker stuff" pause;
# get required dependancies for docker
apt install apt-transport-https ca-certificates curl software-properties-common -y;
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
### Nginx
apt install nginx;
###NPM
apt install npm;
###
###REPO
git clone https://github.com/jamesj0717/opcs;
docker pull openjdk:alpine &&  docker pull python:alpine;
cd opcs && npm i;
npm run build && mv dist/* /var/www/html/;
npm run server;
###

