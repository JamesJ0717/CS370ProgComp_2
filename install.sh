#!/bin/bash
## RUN AS SU ##
apt update && apt full-upgrade -y && apt install apt-transport-https ca-certificates curl software-properties-common -y;
###NODE
printf "\n\nNodeJS\n\n";
#get the latest version of node from nodeSource
curl -sL https://deb.nodesource.com/setup_12.x | bash -
#install node.js
apt install -y nodejs;
###
### DOCKER
printf "\n\nDocker stuff\n\n";
if ! [ -f /.dockerenv ]; then
    # get required dependancies for docker
    # get gpg key for docker from docker
    curl -fsSL https://download.docker.com/linux/ubuntu/gpg | apt-key add -;
    apt-key fingerprint 0EBFCD88;
    #add the repository to the list of repositories
    add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable";
    #update and install
    apt update;
    apt install docker-ce -y;
    #start the docker daemon
    dockerd -H unix:///var/run/docker.sock;
    ###
fi
### Nginx
printf "\n\nNGINX\n\n";
apt install nginx -y;
###
###REPO
printf "\n\nCLONE\n\n"
git clone https://github.com/jamesj0717/opcs;
chmod -R 766 opcs;
chown -R chown -R $USER:$(id -gn $USER) /home/$USER/.config
printf "\n\nDOCKER PULL IMAGES \n\n\n"
docker pull openjdk:alpine &&  docker pull python:alpine;
printf "\n\nNPM INSTALL \n\n\n"
cd opcs && npm -s i;
printf "\n\nNPM RUN BUILD AND COPY TO HTML DIR \n\n\n"
npm run build;
printf "\n\nRUN SERVER\n"
npm run server;
###

