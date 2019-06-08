# docmgmt

This is an example Node project with scanner integration using a browser plugin for scanning. It uses the Mustache template library for creating views in Node.

## Setup

Install Node/NPM on Linux using:

    curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -
    sudo apt-get install -y nodejs
    
Install git:

    sudo apt install git

Next, create a folder for the repo and clone it: 
    
    mkdir Workspace
    cd Workspace
    git clone https://github.com/boshman/docmgmt.git
    
Get dependency libraries:

    cd docmgmt/server
    npm install

Start the server:

    npm run start

OR

Start the server in DEV mode:

    npm run devstart

*DEV mode uses nodemon which restarts the server dynamically after a file is changed.*

## Other Info

When setting up the ExpressJS site, I used the command

    express server --view=mustache-express
