# My Awesome Project

This project has been developed using Playwright, incorporating its Page Object Model feature.

## Table of Contents
- Installation
- ENV file

## Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/newrifat/AssesmentTest.git 
cd my-playwright-project

```
Use nvm to install the latest version of Node.j:

```bash
nvm install node
```

Install Playwright using npm:

```bash
npm install @playwright/test@latest
```

Install the dotenv package to manage environment variables:

```bash
npm install dotenv
```

You are all set! Now, run the following command in your terminal:

```bash 
npx playwright test
```

## ENV file

In the project’s root directory, you may find a .env.sample file. Rename this file to .env and fill in the following details:

```bash 
DASHBOARD_URL= "enter the dashboard or admin URL, useful for verifying assertions"
BASE_URL= "enter the project URL"
USERNAME= "enter the username"
PASSWORD= "enter the password"
APP_NAME= "enter the application name, such as 'WP Dark Mode'"
```