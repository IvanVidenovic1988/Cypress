describe("Testing adding and deleting items from list", () => {
  beforeEach(() => {
    cy.viewport(1280, 720);
    cy.visit("/examples");
  });

  it("Page header should have proper name", () => {
    cy.getDataTestSelector("examples-header").should(
      "contain.text",
      "Examples"
    );
  });

  it("Before adding items list should be empty and clear button should not be visible", () => {
    cy.getDataTestSelector("list-header").should(
      "contain.text",
      "Add Some Grudges"
    );
    cy.get('[data-test="clear-list-button"]').should("not.exist");
    cy.getDataTestSelector("list-of-added-items")
      .children()
      .should("have.length", 0);
    //     .its("length")
    //     .should("be.eq", 1);
    //   .its("li")
    //   .should("not.exist");
  });

  it("Adding items to list should make them visible and clear button should show", () => {
    cy.getDataTestSelector("list-input").within(() => {
      cy.get("input").type("test-test-1");
    });
    cy.getDataTestSelector("add-to-list-button").click();

    cy.getDataTestSelector("list-input").within(() => {
      cy.get("input").type("test-test-2");
    });
    cy.getDataTestSelector("add-to-list-button").click();

    cy.getDataTestSelector("list-header").should(
      "contain.text",
      "Grudges List"
    );

    cy.getDataTestSelector("list-of-added-items")
      .children()
      .should("have.length", 2);

    cy.get('[data-test="clear-list-button"]')
      .should("exist")
      .and("contain.text", "Clear");
  });

  it("deleting items from list should make them disappear", () => {
    cy.getDataTestSelector("list-input").within(() => {
      cy.get("input").type("test-test-1");
    });
    cy.getDataTestSelector("add-to-list-button").click();

    cy.getDataTestSelector("list-input").within(() => {
      cy.get("input").type("test-test-2");
    });
    cy.getDataTestSelector("add-to-list-button").click();

    cy.getDataTestSelector("list-input").within(() => {
      cy.get("input").type("test-test-3");
    });
    cy.getDataTestSelector("add-to-list-button").click();

    cy.getDataTestSelector("list-of-added-items")
      .children()
      .should("have.length", 3);

    cy.get('[data-test="clear-list-button"]').should("exist");

    cy.getDataTestSelector("delete-list-item-1").click();
    cy.getDataTestSelector("delete-list-item-1").click();
    cy.getDataTestSelector("delete-list-item-1").click();

    cy.getDataTestSelector("list-of-added-items")
      .children()
      .should("have.length", 0);

    cy.get('[data-test="clear-list-button"]').should("not.exist");
  });

  it("clearing items from list should leave list empty and clear button should disapear", () => {
    cy.getDataTestSelector("list-input").within(() => {
      cy.get("input").type("test-test-1");
    });
    cy.getDataTestSelector("add-to-list-button").click();

    cy.getDataTestSelector("list-input").within(() => {
      cy.get("input").type("test-test-2");
    });
    cy.getDataTestSelector("add-to-list-button").click();

    cy.getDataTestSelector("list-of-added-items")
      .children()
      .should("have.length", 2);

    cy.getDataTestSelector("clear-list-button").click();

    cy.getDataTestSelector("list-of-added-items")
      .children()
      .should("have.length", 0);

    cy.get('[data-test="clear-list-button"]').should("not.exist");
  });
});
