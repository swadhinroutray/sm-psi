## Social Media - Private Set Intersection

### Introduction

- We use a Privacy Enhancing Technology(PET), Private Set Intersection(PSI) to run a intersection check on two datasets and return the common values.
- Uses the Top 1000 youtuber list from Kaggle, which have been randomly split into two databases.
- In this project, we develop a POC that allows this phenomenon to run using Openmined's PSI library.
<hr>

### Project Structure

- This project contains four subdirectories:
  - <b>Server</b>: The server API that performs majority of the PSI computation
  - <b>Client</b>: The client API that retrieves client preferences and queries from the UI, creates a serializable/computable object for the server and returns intersection.
  - <b>Web</b>: The web directory contains source code for the client UI.
  - <b>Data</b>: The data subdirectory contains the intial dataset, that has been split into two subsets uding a 50% row selection probability. It also contains a MongoDB Population script.

<hr>

### Running the APIs

- Project contains a client and server setup [Both currently Node.js APIs]
- Prerequisites: Node.js, Python(For running scripts), React(Client Web) and MongoDB
- Once the prerequisites are installed, we run Taskfile to start our servers

#### Available Commands

```
$ ./Taskfile.sh                     # Starts Client, Server and UI concurrently
$ ./Taskfile.sh installAPI          # Installs the dependencies
$ ./Taskfile.sh startUI             # Starts Client UI
```

<hr>

### Step by Step Run

- Step 1: To run the client and server, we need to setup the environment variables. Make a copy of `.env.example` and name the copied file `.env` and fill in the respective details.
- Step 2: Install dependencies for both the client, server and the web UI.

```
$ ./Taskfile.sh installAPI
$ cd web && yarn add
```

- Step 3: Once the dependencies are installed, we can run the project.

```
$ ./Taskfile.sh
```

- Step 4: Navigate to localhost:3000 to access the web UI.
<hr>

### Contributors

- Swadhin Routray
- Kathryn Earles
- Wenhan Zhou
