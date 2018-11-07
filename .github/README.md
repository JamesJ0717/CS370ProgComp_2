- [OPCS](#opcs)
    - [How it works](#how-it-works)
    - [Installation](#installation)
    - [Usage](#usage)
        - [Config Files](#config-files)
            - [nodemon.json](#nodemonjson)

# OPCS

## How it works

-   OPCS was built on NodeJS, HTML, and a lot of packages from NPM
-   Some of the pacakges we use are `mongoose`, for connecting to our Mongo Atlas database, `dockerode`, for controlling Docker from Javascript functions, `express`, for running the server, and `serve-favicon`, to change the favicon of the site.
-   When a host creates a competition, he/she gets a link to the competition, a unique ID linking competitors to the competition.
-   The host gives the link to those competing, who use that when uploading their code.
-   When a competitor uploads code, their code gets sandboxed, compiled and run within Docker containers purpose built for the file type they upload.
-   After the code has run, statistics from the run are passed into the grading algorith that we have, which processes the information, and gives the code a 'score'.
-   That score is then how the competition host determines who wins.

## Installation

-   Download the files in the repo

    -   Either clone the repo  
        `git clone https://github.com/jamesj0717/CS370ProgComp_2`
    -   Or download a zip

-   Install the dependencies

    -   You are going to need `docker`, `node`, and `npm` in order to run this server
        -   Install them from your package manager
    -   You can install all the required Javascript dependencies by running `npm install` in the root directory

-   Run `node server.js` to start the server

## Usage

### Config Files

-   There is a folder called `config` which has all of the configuration files in order for you to run competitions.

#### nodemon.json

-   `nodemon.json` stores environment variables
-   Here is where you would put the link to your database
