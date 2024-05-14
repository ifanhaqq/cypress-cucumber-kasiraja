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