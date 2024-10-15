# Assessment Project

This project has been developed using Playwright, incorporating its Page Object Model feature.

## Table of Contents
- Installation
- ENV file
- Run the Test
- Framework Structure
- Design Choices
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

## Framework Structure
The project is structured as follows:

tests/: Contains the test files.
pages/: Contains the Page Object Model (POM) classes.
fixtures/: Contains setup and teardown logic.
.env: Environment variables for configuration.
### Design Choices
Page Object Model (POM)
The Page Object Model is a design pattern that creates an object repository for web UI elements. It helps in reducing code duplication and improves test maintenance. Each web page is represented by a class, and the elements on the page are defined as variables within the class. Actions that can be performed on the page are defined as methods within the class.

### dotenv
The dotenv package is used to manage environment variables. It allows you to define environment-specific variables in a .env file, which can be loaded into your application. This approach keeps sensitive information like URLs, usernames, and passwords out of your source code, enhancing security and flexibility.

## Reasoning Behind Design Choices
Modularity: By using POM, the code is modular and easier to maintain. Each page’s elements and actions are encapsulated in their respective classes.
Reusability: POM promotes reusability of code. Common actions can be reused across different tests.
Security: Using dotenv ensures that sensitive information is not hard-coded into the source files, making the application more secure.
Scalability: The structure allows for easy addition of new tests and pages, making the framework scalable.