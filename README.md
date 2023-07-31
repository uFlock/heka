# Heka News App

[![Heka Icon](https://uploads-ssl.webflow.com/6139851329c5f03e65e8a5d8/61499cf222197751f1014cfc_Mobile.png)](https://www.hekahappy.com/)
[![BACKEND-CI](https://github.com/uFlock/heka/actions/workflows/test-backend.yml/badge.svg)](https://github.com/uFlock/heka/actions/workflows/test-backend.yml)
[![FRONTEND-CI](https://github.com/uFlock/heka/actions/workflows/test-frontend.yml/badge.svg)](https://github.com/uFlock/heka/actions/workflows/test-frontend.yml)

**Home take test for hekahappy.com**

A simple react app with a NodeJS backend written in TypeScript and run in a dockerised environment. It allows searching for news articles based on a query and some additional date range and sort by parameters.

### ☀️ Project Features

>  📐 TypeScript/Express  
>  🐳 Dockerized Development Environment + Hot Reload  
>  🔮 Test Driven Development (at least for backend)   
>  🔄 Continuous Integration Pipeline (CI via Github Actions)  
>  📱 React App [SPA] (TypeScript + Tailwind + DaisyUI + Vite + Docker + CI + nginx)  
>  💻 NodeJS Server [Express] (TypeScript + Express + Docker + CI + TDD + AJV)  
>  📚 Some Documentation

### 🚧 Project prerequisites

1. Node + NPM - get the **18.17.0 LTS**  version from [here](https://nodejs.org/en/). I would strongly recommend using NVM (Node Version Manager).
2. [Docker](https://docs.docker.com/get-docker/) - Please follow the instructions for your respective platform.
3. The demo is designed to run on localhost so please make sure ports `80`, `8080` and `3000`
   are not taken by any other process on your dev machine. You can adjust port settings in corresponding `.env`
   and `docker-compose` files.

### 🚀 Getting Started

1. Simply clone the project from `https://github.com/uFlock/heka.git`.
2. Project Root Level Commands Cheat Sheet (Run these at the project root level):
    * `npm run start` - builds and starts the "production" release that by default will run on `http://localhost:80` and `http://localhost:3000`.
    * `npm run dev` - starts development version with live reload in the docker compose environment (using
      nodemon and ts-node for hot-reload) on `http://localhost:8080` and `http://localhost:3000` respectively.
    * `npm run npm-install` - If you want proper type checking and module resolution whilst developing, this swill
      install all the dependencies in the respective directories automatically for you.
    * `npm run down-all` - will run compose down for both environments.
3. Sub Projects Level Commands (Run these at `/backend` and `/frontend` levels respectively):
    * `npm install` - installs all the dependencies for server. (same as `npm run npm-install` at root level)
    * `npm run test` - this will run all the jest test suites and will rerun every time the corresponding code changes. 
**Only applicable for the `backend` at the moment.**

### 👷 Example Dev Workflow

1. Clone the project from `https://github.com/uFlock/heka.git`.
2. In the root directory run `npm run npm-install` command - this will install all the dependencies for both `/backend` and `/frontend`
   projects. Alternatively you can `cd %PROJECT_NAME% && npm install` manually.
3. Optional: Go into `/backend` directory and run `npm run test` command - this will run all the jest test suites and will
   rerun every time the corresponding code changes so you get an instant feedback.
4. Now run `npm run dev` command at the root of the repo to spin up the development environment with hot reload on
   code changes.
5. Appropriate tests will auto run in the GitHub Actions CI on every push to the `main` branch or on any pull requests targeting the `main` branch.

### 🌳 Environment Files Explained

***Disclamer:*** *I know that commiting environmet files is a horrible practice, however, the only reason this was done in this project is
that there is no sensitive information of any kind involved and it is mostly for the convenience of the person assessing the task.*

`/backend` has two `.env` files:

1. `env.dev` - has all the settings for the dev environment that is invoked via the `npm run dev` command at the root
   level.
2. `.env.prod` - (not really prod, as there will never be prod for this) - has all the setting for the "production" environment that is
   invoked via the `npm run start` command at the root level.

```dotenv
# PORT to run internally on -
# IMPORTANT: Don't forget to change the value in docker-compose configuration to match as
# well as front-end .env file
PORT=3000

# in case you querying via some third-party web interface
ALLOW_CORS_ORIGIN=http://localhost:8080

#news-api token - I didn't get access to the API so although the system will recognise the token it will not use it for anything
NEWS_API_ORG_TOKEN=insert_your_secret_token_here
```

`/frontend` has only one `.env` file:

1. `env.local` - this has all the settings for both environments. *(at the moment, also known as forever more...)*

```dotenv
#The base host url for the node server api
VITE_API_BASE_URL=http://localhost:3000
```

### ✨ Some Guidance/Explanation for Assessing Persons

### ⚠️ Important

> For simplicity of assessing the task it was decided to commit all the environment files to the repository. No sensitive 
> information exists for this project. So if you have `docker` and `nodejs` installed on your system you can just run the 
> `npm start` at the root level and everything should work.

> I didn't manage to get access to the newsapi.org api. Every time I tried to register an account I got the error 500 response back. 
> I have emailed them days ago, but there is still no response.

> Due to the above there was no way for me to integrate or even test their API as there's no token which led to the app being **only partially functional.**

> I did use the example data that was provided within their documentation but still there are issues and limitations:
> * The dataset available is only for Tesla an only for the date range of 1 day between 2023-07-29 and 2023-07-30 - the date range sorting is very limited.
> * The dataset only contains 98 entries.
> * The dataset is only pre-sorted based on relevancy - the proper sorting by Relevancy and popularity is impossible.
> * The dataset does not contain `description` nor the `imageUrl` fields - those had to be hardcoded into the app and are the same for every article.

> Due to the above limitations the app behaves in the following way:
>  * No matter what query string is sent to the server as long as it's between 1 and 500 characters the backend will query the whole
> tesla dataset available and will only limit the results based on the date range specified, as any other limiting makes no sense in the context of the available dataset.
>  * The backend uses a basic pagination algorithm that will send out 5 results per page request. 
>  * The app implements an infinite scrolling algorithm, so it will proactively fetch the next 5 results as soon as you get closer to the last rendered News Article. 
> There is `Back To Top` button at the end when all results are viewed.
>  * In order to conduct a search you must enter the query string into the search bar and hit `Enter` (there's no search button 🙈).
>  * As soon as you hit `Enter` and the first set of results have appeared the `Date Range` and `Sort By` selectors turn into "search filters", 
> so every time you click on them after that they will refine the search parameters and resubmit the request until you search for something else via the
> search bar. The idea is that you first pick a topic and then you refine/filter out the results. Unfortunately there's nothing much to filter...

> You will need to restart your dev/prod environment after changing the .env files for changes to take effect.

> Because the environment was designed with cross-platform development in mind - `Windows`, `Linux` and `Mac` - you will have to restart the dev environment
> after you have installed new `npm dependency` locally for it to take effect in the docker container. This limitation is due to some packages shipping native
> binaries which won't work cross platform. This can all be fixed if everyone develops on Linux for Linux, but that's unlikely to happen, but a man can dream...

#### 🙈 If you find any issues or if any of the above assumptions/explanations are too ambiguous and/or wrong please do not hesitate to contact me or, alternatively, please raise an issue on GitHub.

⭐ Happy Assessing!
