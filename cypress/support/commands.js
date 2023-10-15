// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add("getDataTestSelector", (dataTestSelector) => {
  return cy.get(`[data-test="${dataTestSelector}"]`);
});

Cypress.Commands.add("isTextVisible", (text) => {
  cy.contains(text).should("be.visible");
});

Cypress.Commands.add("isElementVisible", (element, elementText) => {
  cy.get(element).should("be.visible").and("contain.text", elementText);
});

Cypress.Commands.add(
  "fillLoginFormAndClick",
  (itemSelector, username, password) => {
    return cy.get(itemSelector).within(() => {
      cy.get("#username").type(username);
      cy.get("#password").type(password);
      cy.get("div button.c14249a2a").contains("Continue").click();
    });
  }
);

Cypress.Commands.add("assertUrl", (path, href) => {
  return cy.location().should(($loc) => {
    expect($loc.pathname).to.include(path);
    expect($loc.href).to.eq(href);
  });
});

Cypress.Commands.add(
  "locateAndFillSearchInput",
  (containerSelector, inputSelector, buttonSelector, text) => {
    cy.get(containerSelector).within(() => {
      cy.get(inputSelector).type(text);
      cy.get(buttonSelector).click();
    });
  }
);

Cypress.Commands.add("locateArtistAndClick", (elementLocator, elementHref) => {
  cy.get(elementLocator).within(() => {
    cy.get(elementHref).click();
  });
});

Cypress.Commands.add(
  "selectSpecificItemAndClick",
  (elementLocator, elementHref) => {
    cy.get(elementLocator).each(($link) => {
      const href = $link.attr("href");
      if (href === elementHref) {
        cy.wrap($link).click();
      }
    });
  }
);

Cypress.Commands.add("getMediumValueFromSpecificItem", (element) => {
  cy.get(element)
    .invoke("text") // or 'val' if it's an input element or 'attr' for getting attributes
    .then((text) => {
      const regex = /Med\s€([\d.]+)/;
      const matches = text.match(regex);
      console.log("matches: ", matches);

      if (matches && matches.length > 1) {
        const medValue = matches[1];
        console.log(`Med Value: €${medValue}`);
        cy.log(`Med Value: €${medValue}`);
      } else {
        console.log("Med value not found.");
        cy.log("Med value not found.");
      }
    });
});
