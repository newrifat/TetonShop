# Assessment Project

This project has been developed using Playwright, incorporating its Page Object Model feature.

## Table of Contents
- Installation
- ENV file
- Run the Test
## Installation

Clone the repository and install dependencies:

```bash
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

## ENV file

In the project’s root directory, you may find a .env.sample file. Rename the file to .env and add the following details:

```bash 
BASE_URL= "enter the project URL"
USERNAME= "enter the username"
PASSWORD= "enter the password"
PROD_NAME= "enter the Product name, such as '45W GaN Charger'"
```

## Run the Test
Open your terminal and navigate to your project directory. Run the test using the following command: 

```bash 
npx playwright test
```
By default, Playwright runs tests in headless mode (without a browser UI). To run tests in headed mode (with a browser UI), use the --headed flag:
```bash 
npx playwright test --headed
```