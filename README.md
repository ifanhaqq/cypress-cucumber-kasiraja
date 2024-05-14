## Automation Testing for Kasiraja with cypress-cucumber-preprocessor
 Credit to [@badeball](https://github.com/badeball/cypress-cucumber-preprocessor/)



In this tutorial, I want to give you an example about the automation testing process with Cypress as automation tool and cucumber as BDD framework.
Before starting in this tutorial, you should have these knowledge prerequisites:

1. NodeJS
2. Basic Javascript DOM
3. Gherkin Syntax

Also the feature that i was testing in this tutorial are the login feature and the add product feature. <br> So let's just dive in to the tutorial.
<br>
1. Installation

   
   ```
   npm install cypress
   ```
   ```
   npm install cypress-xpath
   ```
   ```
   npm install @badeball/cypress-cucumber-preprocessor
   ```
<br>
2. Make the directories<br><br>


	```
	cypress-cucumber-kasiraja/
	|--- cypress/
	|    |--- e2e/
	|    |    |--- add_product/
	|    |    └--- login/
	|    |--- fixtures/
	|    └--- support/
	```
