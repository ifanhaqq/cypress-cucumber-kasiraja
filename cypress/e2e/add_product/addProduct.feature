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
