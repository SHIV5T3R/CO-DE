# Getting Set Up

To set up the development environment, first fork the repo, then clone it to your local machine.

## Frontend

CD into the frontend directory and run the following commands:

```bash
npm install
npm run dev
```

## Backend

CD into the backend directory, then install pipenv and the project dependencies:

```bash
pip install pipenv
pipenv install
```

You will need a MongoDB instance - if you've got Docker installed, the Makefile can spin up a Docker container for you with `make dbup`. You can also run the app in another terminal tab or window and use `make dbseed` to seed the database. If you don't have CMake installed, you can also of course run the commands manually.

Once your MongoDB instance is setup, make sure you go to config.py and change your database connection settings according to either your local database settings or the MongoDB container settings:
```sh
port: 8081
database host: localhost
username: mongo
password: test
database: mongo
```
To launch the backend, enable the virtual environment and run the flask application (defaults to port 5000):

```bash
pipenv run py app.py```

# What is CO-DE?

CO-DE is an open-source real-time collaborative code editor.

CO-DE is the current ongoing project for the Ship-In-30 project from [David's Developer Safeplace](https://discord.gg/devsafeplace) Discord server.

## Features

Yet to be discussed.

## Tech Stack

CO-DE uses React with TypeScript (Vite) for the frontend website and uses Flask (Python) for the backend API and WebSocket infrastructure.

## Contribution

### Workflow

This project uses a 3 legged branching strategy with `main` being the production version of the code; the main branch reflects the current version that is currently live to the public. The `development` branch contains the active changes that are made by the engineers to implement new features or fixes; pull requests are needed to contribute to `development` with approvals from other engineers.

When you are contributing to the project, you will need to create a new branch based on the `development` branch. Please format the branch with a prefix and a name that best describes the type of change being implemented these contain:

- `feature/`(New feature branches)
- `fix/` (Fixes for branches)
- `task/`(Generic branches for mundane tasks, such as updating a lang file or dependencies)

Once you have selected the branch type please create a branch name as a suffix. For example, if you had a branch that implemented a login button on the home page you would call it `feature/home-page-login-button`

Upon completing your changes **that are tested**, please raise a pull request that merges **into development**, fill out the template and drop a link to the pull request in the "Ship-In-30" [discussion](https://discord.com/channels/368853404723707914/1073307477405335592) channel. Upon review and approval, your changes will be submitted to the development branch. Then once the version is ready, it is released into production.

### Tasks

Within this project, contributors can help to work on tasks. Tasks will be split into different issues. To claim a task, find the issue that includes your chosen task and comment that you would like to work on a specific part of the issue. It's key that we communicate with each other to create a more productive and efficient development environment. You can also mention that you've claimed a task in the [discussion](https://discord.com/channels/368853404723707914/1073307477405335592) channel.

Make sure to read all the discussion within the issue to know what needs to be completed, there will be a checklist of tasks and who's working on them in the issue description to help things flow smoothly.

If you would like to unclaim a task, make sure to comment on the relevant issue to let everybody else know that the issue is open for contribution.

You can also collaborate on a task with another contributor, just let the rest of the team know in the issue discussion.

### Style Guides

**React:**

- <https://github.com/airbnb/javascript/tree/master/react>

---

![alt text](https://images-ext-1.discordapp.net/external/ZodgpNW25bKMHly3yapNdxjUcH8s__4xR5pqVxXy1dA/https/cdn-longterm.mee6.xyz/plugins/embeds/images/368853404723707914/668c5398d4a84cfbd3475ae6d201c456e398f819dcbf513c719b6d00aac67756.png?width=848&height=676)
