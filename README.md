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
   npm init -y
   ```
   
   ```
   npm install cypress
   ```
   ```
   npm install cypress-xpath
   ```
   ```
   npm install @badeball/cypress-cucumber-preprocessor
   ```

1. Make the directories
   


	```
	cypress-cucumber-kasiraja/
	|--- cypress/
	|    |--- e2e/
	|    |    |--- add_product/
	|    |    └--- login/
	|    |--- fixtures/
	|    └--- support/
	```

 2. Create a config file cypress.config.js and paste the configuration below

    ```
    const { defineConfig } = require("cypress");
	const {
	  addCucumberPreprocessorPlugin,
	} = require("@badeball/cypress-cucumber-preprocessor");
	const {
	  preprocessor,
	} = require("@badeball/cypress-cucumber-preprocessor/browserify");
	
	async function setupNodeEvents(on, config) {
	  // This is required for the preprocessor to be able to generate JSON reports after each run, and more,
	  await addCucumberPreprocessorPlugin(on, config);
	
	  on("file:preprocessor", preprocessor(config));
	
	  // Make sure to return the config object as it might have been modified by the plugin.
	  return config;
	}
	
	module.exports = defineConfig({
	  e2e: {
	    chromeWebSecurity:false,
	    experimentalModifyObstructiveThirdPartyCode:true,
	    baseUrl: "https://kasirdemo.belajarqa.com",
	    specPattern: "**/*.feature",
	    setupNodeEvents,
	  },
	});
    ```

 
 3. Create login.feature file inside login folder using Gherkin Syntax

    ```
    Feature: Kasiraja Login

    Scenario: Login with correct credentials
        Given I visit the website
        When I enter email & password
        And I click the login button
        Then I should redirected to the dashboard page

    Scenario: Login with incorrect credentials
        Given I visit the website
        When I enter the wrong email & password
        And I click the login button
        Then I should see the wrong alert
    ```

4. Also create the addProduct.feature file inside add_product folder

   ```
   Feature: Kasiraja Add Product

    Scenario: Fill all the form data with correct data
        Given I login to the website
        When I click the product menu
        And I click add product
        And I fill all the form data with correct data
        And I click the save button
        Then I should see the success alert

    Scenario: Fill all the form data but name's column
        Given I login to the website
        When I click the product menu
        And I click add product
        And I fill all the form but name's column
        And I click the save button
        Then I should see the error alert

    Scenario: Fill the form with same code of product
        Given I login to the website
        When I click the product menu
        And I click add product
        And I fill all the form with the same code of product that are existed
        And I click the save button
        Then I should see the error alert 'Cannot using the same code of product'


   ```

6. Add 2 files inside the support folder

   e2e.js
   ```
   import './commands.js'
   ```
   commands.js
   ```
   Cypress.Commands.add('login', (email, password) => { 
       cy.visit('https://kasirdemo.belajarqa.com')

       cy.get("#email").type("toshoda@gmail.com")

       cy.get("#password").type("12345678")
    
       cy.get(".chakra-button").click() //click login
    })
    ```

8. Inside fixtures folder, create dataTestLogin.json file

      dataTestLogin.json
      ```
      Cypress.Commands.add('login', (email, password) => { 
	    cy.visit('https://kasirdemo.belajarqa.com')
	
	    cy.get("#email").type("toshoda@gmail.com")
	
	    cy.get("#password").type("12345678")
	    
	    cy.get(".chakra-button").click() //click login
      })
      ```

9. Now let's write our step definitions code, first we are working with the login feature first, create login.js file inside the login folder and then import all the necessary library
  
      login.js
      ```
      const { Given, When, And, Then } = require("@badeball/cypress-cucumber-preprocessor")
      const dataTestLogin = require("../../fixtures/dataTestLogin.json")
      ```

10. Then we are going to write our definitions on the previous Gherkin Syntax that we wrote earlier.

       login.js
      ```
      Given("I visit the website", () => {
	    cy.visit(dataTestLogin.url)
      })
	
      When("I enter email & password", () => {
	    cy.get("#email").type(dataTestLogin.email)
	    cy.get("#password").type(dataTestLogin.password)
      })
	
      When("I click the login button", () => {
	    cy.get(".chakra-button").click()
      })
	
      Then("I should redirected to the dashboard page", () => {
	    cy.url().should('include', '/dashboard') //check url dashboard
      })
	
      Given("I visit the website again", () => {
	    cy.visit(dataTestLogin.url)
      })
	
      When("I enter the wrong email & password", () => {
	    cy.get("#email").type(dataTestLogin.invalidEmail)
	    cy.get("#password").type(dataTestLogin.invalidPassword)
      })
	
      When("I click the login button again", () => {
	    cy.get(".chakra-button").click()
      })
	
      Then("I should see the wrong alert", () => {
	    cy.get(".chakra-alert").should('have.text','Kredensial yang Anda berikan salah')
      })
      ```
11. Next let's head on working with step definitions of the add product feature, create addProduct.js file inside add_product folder

Import all the necessary library
```
import 'cypress-xpath'
const { Given, When, And, Then } = require("@badeball/cypress-cucumber-preprocessor")
```
addProduct.js
```
Given("I login to the website", () => {
    cy.login()
})

When("I click the product menu", () => {
    cy.get('[href="/products"]').click()
})

When("I click add product", () => {
    cy.get('.chakra-button').click()
})

When("I fill all the form data with correct data", () => {
    cy.get('#nama').type('Logitech M330')
        
    cy.get('#deskripsi').type('Wireless silent click mouse')
    cy.xpath("//input[@id='harga beli']").type('30000')
    cy.xpath("//input[@id='harga jual']").type('100000')
    cy.get('#stok').clear()
    cy.get('#stok').type('40')

    cy.get('#kategori').click() // kategori
    cy.get(':nth-child(1) > .css-u3dlpe').click({ force: true }) //kategori
})

When("I click the save button", () => {
    cy.get('.chakra-button').click()
})

When("I fill all the form with the same code of product that are existed", () => {
    cy.get('#kode').type('BR572929')
    cy.get('#nama').type('Logitech M330')
        
    cy.get('#deskripsi').type('Wireless silent click mouse')
    cy.xpath("//input[@id='harga beli']").type('30000')
    cy.xpath("//input[@id='harga jual']").type('100000')
    cy.get('#stok').clear()
    cy.get('#stok').type('40')

    cy.get('#kategori').click() // kategori
    cy.get(':nth-child(1) > .css-u3dlpe').click({ force: true }) //kategori
})

When("I fill all the form but name's column", () => {
    cy.get('#deskripsi').type('Wireless silent click mouse')
    cy.xpath("//input[@id='harga beli']").type('30000')
    cy.xpath("//input[@id='harga jual']").type('100000')
    cy.get('#stok').clear()
    cy.get('#stok').type('40')

    cy.get('#kategori').click() // kategori
    cy.get(':nth-child(1) > .css-u3dlpe').click({ force: true }) //kategori
})

Then("I should see the success alert", () => {
    cy.get('#chakra-toast-manager-top-right').should('be.visible')
})

Then("I should see the error alert", () => {
    cy.get('.chakra-alert').should('have.text', '"name" is not allowed to be empty')
})

Then("I should see the error alert 'Cannot using the same code of product'", () => {
    cy.get('.chakra-alert').should('have.text', 'You can not have same code for each product!')
})
```

11. Last, let's just try to run our program, type in the termninal.

```
npx cypress open
```
      

   
      
      
      
   
