#!/bin/bash
default() {
    concurrentStart
}
installAPI() {
    npm install --prefix aerver
    npm install --prefix client
    echo "API Packages Installed"
}

concurrentStart(){
    concurrently "nodemon client/index.js" "nodemon server/index.js"
}
startClient() {
    cd client && npm run-script test
}

startServer() {
    cd server && npm run-script prod

}

"${@:-default}"