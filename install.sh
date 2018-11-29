#!/bin/bash
sudo apt-get update && sudo apt-get full-upgrade;
sudo apt-get install nodejs docker npm;
sudo npm i;
sudo docker pull openjdk:alpine && sudo docker pull python:alpine;
