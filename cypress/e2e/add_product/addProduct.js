import 'cypress-xpath'
const { Given, When, And, Then } = require("@badeball/cypress-cucumber-preprocessor")

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