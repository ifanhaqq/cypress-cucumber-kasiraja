const { Given, When, And, Then } = require("@badeball/cypress-cucumber-preprocessor")
const dataTestLogin = require("../../fixtures/dataTestLogin.json")

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