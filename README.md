<!-- PROJECT LOGO -->
<br />
<p align="center">
  <h2 align="center">NodeJS+Typescript Starter Template</h2>

  <p align="center">
    A NodeJS starter app built using Typescript, ExpressJS and Sequelize.
    <br />
    <br />
    <br />
</p>


<!-- TABLE OF CONTENTS -->
## Table of Contents

- [Table of Contents](#table-of-contents)
- [About The Project](#about-the-project)
  - [Built With](#built-with)
- [Folder Structure](#folder-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Intial Setup and Starting](#intial-setup-and-starting)
  - [Development Mode](#development-mode)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [Contact](#contact)



<!-- ABOUT THE PROJECT -->
## About The Project

The goal of the project is to create a boilerplate that requires minimal configuration and can be used to kick start a node js project.
It comes out of the box with Sequelize configured with a bare minimum user model, multiple authentication strategies using passport js (
    username/passowrd and Google OAuth
).
Of course, no one template will serve all projects since your needs may be different. So I'll be adding more in the near future. You may also suggest changes by forking this repo and creating a pull request or opening an issue.

### Built With
The major frameworks, libraries and tools will be listed here.
* [NodeJS](https://nodejs.org/en/)
* [ExpressJS](https://expressjs.com/)
* [Typescript](https://www.typescriptlang.org/)
* [Sequelize](https://sequelize.org/)

## Folder Structure
```bash
.
├── README.md
├── package-lock.json
├── package.json
├── dist
├── public
│   ├── images
│   ├── javascripts
│   └── stylesheets
│       └── style.css
├── sample.env
├── src
│   ├── @types
│   │   └── oauth.d.ts
│   ├── app.ts
│   ├── bin
│   │   └── www.ts
│   ├── config
│   │   ├── config.json
│   │   ├── google-credentials.ts
│   │   └── index.ts
│   ├── controllers
│   │   └── test.ts
│   ├── middlewares
│   │   ├── error-handler
│   │   │   └── index.ts
│   │   ├── passport.ts
│   │   └── validators
│   │       ├── index.ts
│   │       └── user.ts
│   ├── migrations
│   │   ├── migration-1.ts
│   │   └── migration-2.ts
│   ├── models
│   │   ├── index.ts
│   │   ├── user-social-media-profiles.ts
│   │   └── user.ts
│   ├── routes
│   │   ├── auth.ts
│   │   ├── index.ts
│   │   └── user.ts
│   ├── seeders
│   └── utils
│       └── password.ts
├── tsconfig.json
└── views
    ├── error.jade
    ├── index.jade
    └── layout.jade
```

<!-- GETTING STARTED -->
## Getting Started

Follow the steps below to get started.

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.
* Node.JS v12+
* npm
* PostgreSQL v12+

### Intial Setup and Starting

<!-- 1. Get a free API Key at [https://example.com](https://example.com) -->
1. Clone the repo
```sh
git clone https://github.com/n0wfal/node-starter-kit.git
```
2. Install NPM packages
```sh
cd node-starter-kit && npm install
```
3. Build the application 
```sh
npm run build
```
4. Start the application
```sh
npm run start
```
### Development Mode
1. Start using dev script to enable hot reloading with ts-node
```sh
npm run dev
```

<!-- ROADMAP -->
## Roadmap

See the [open issues](https://github.com/n0wfal/node-starter-kit/issues) for a list of proposed features (and known issues).

<!-- CONTRIBUTING -->
## Contributing
Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<!-- CONTACT -->
## Contact

Nowfal Nazar - nowfaln@celestialsys.com

Project Link: [https://github.com/n0wfal/node-starter-kit](https://github.com/n0wfal/node-starter-kit)