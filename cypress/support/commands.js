Cypress.Commands.add('login', (email, password) => { 
    cy.visit('https://kasirdemo.belajarqa.com')

    cy.get("#email").type("toshoda@gmail.com")

    cy.get("#password").type("12345678")
    
    cy.get(".chakra-button").click() //click login
})