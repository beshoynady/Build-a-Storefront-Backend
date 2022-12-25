#Project: Building a storefront backend

This is a backend API in Nodejs for an online store.
Shows the RESTful API that will be used by the front-end developer on the front-end.
to lead to a complete front and rear store.

Database schema and API path information in [REQUIREMENT.md] (REQUIREMENTS.md)

## Download instructions

This section contains all the packages used in this project and how to install them.
Or you can use this repo and run the following command in the root directory to install all packages.

"yarn" or "npm install"

### Packages

Below are some of the packages that have been installed.

#### express

"npm express"
`npm i -save-dev @types/express`

#### typescript

"npm i --save --dev typescript"

#### migrate

"npm install -g db-migrate"

#### Remrav

npm install --save rimraf`

#### bcrypt

"npm is bcrypt"
`npm i -save-dev @types/bcrypt`

#### Morgan

`npm install -morgan`
`npm i -save-dev @types/morgan`

#### jsonwebtoken

`` npm install jsonwebtoken ``
`npm i -save-dev @types/jsonwebtoken`

#### dot-inf

"npm install dotenv"

#### Jasmine

`npm install jasmine @types / jasmine ts-node --save-dev`

#### supertest

"npm i supertest"
`npm i -save-dev @types/supertest`

## Database setup

### Create databases

We must create a development and test database.

-- Connect to the default postgres database as the server root user `psql -U postgres`
In psql, run the following to create a user
    Create USER postgres with password "5"
-- In psql, do the following to create the development and test database
    - `` Create store_dev database; ''
    -- `` Create store_test database; ``
- Connect to databases and grant all privileges
    - "\c store_dev"
    - `\c store_test`

### Migrate the database

Go to the root directory and run below command to migrate the database

"yarn migration: up"

! ["Database Migration"] (./image/Migration-Up.bmp)

## Setting environmental variables

Below are the environmental variables that must be set in the ".env" file. This is the default I used for development, but you can change it to whatever works best for you.

port = 3000 // This is the port of the server it is running on
nodeEnv = dev // This is the periphery of the database
pgHost = localhost
pgPort = 5432 // the default port I'm working on (DB connection)
pgDb = store_dev // This is the default development database
pgDb_test = store_test // This is the test database that is only being tested
pgUser = postgres // This is the operating system default user submit
pgPassword = 5 // This is my main event password, you can change it
SaltRound = 10 // This is the default salt round for JSON web code
pepperHash = pepperHash // This is just any plain text to be the default pepper
tokenSecret = tokenSecret // This is a token added while using JWT to guarantee the token

## Start the application

"yarn dev" or "npm run dev"

### Streaming ports

After startup, the server will start on port "3000" and the database on port "5432".

## Reach the endpoint

All endpoints are described in the [REQUIREMENT.md] file (REQUIREMENTS.md).

## Token and authentication

Tokens are passed with the http header as

“Authorization” “Bearer <token>” `

## Tests

Run the test with

"yarn migrate: test" or "npm run migrate: test"

It sets the environment to test, migrates the tables to the test database, then runs jasmine on all test cases,
Next, we reset all tables of the test database.

### Change the test environment

I have set up two databases, one for development and one for testing. During testing, I had to make sure to use the test database instead of the development database.

To achieve this, I setup a variable in the '.env' file which defaults to 'dev'. During testing, the command "yarnigration: test" will set this variable to "test" in package.json. Here is the complete command.
`nodeEnv set = test && db-migrate --env test && npx tsc && jasmine &&db-migrate --env test reset'

The first command changes the environment variable "ENV" to "test" and then the second command migrates all the tables, then jasmine runs and then after the test the database is reset.