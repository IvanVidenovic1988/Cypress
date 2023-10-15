describe("Accordian tests", () => {
  beforeEach(() => {
    cy.viewport(1280, 720);
    cy.visit("http://localhost:3000/fundamentals");
  });

  it("Page header should have proper name", () => {
    cy.getDataTestSelector("fundamentals-header").should(
      "contain.text",
      "Testing Fundamentals"
    );
  });

  it("Inner element should not be visible before opening accordian", () => {
    cy.getDataTestSelector("accordian-item-1").should(
      "contain.text",
      "Fundamental 1) Describe blocks"
    );

    cy.getDataTestSelector("accordian-item-1").within(() => {
      cy.get("p");
      cy.contains("Your tests will exist in a describe block.").should(
        "not.be.visible"
      );
    });
  });

  it("When opening accordian inner element should be visible", () => {
    cy.get('[data-test="accordian-item-1"] div[role="button"]').click();
    cy.getDataTestSelector("accordian-item-1").within(() => {
      cy.get("p")
        .should("contain.text", "Your tests will exist in a describe block.")
        .and("be.visible");
    });
  });

  it("When closing accordian inner element should not be visible", () => {
    cy.get('[data-test="accordian-item-1"] div[role="button"]').click();
    cy.get('[data-test="accordian-item-1"] div[role="button"]').click();
    cy.getDataTestSelector("accordian-item-1").within(() => {
      cy.get("p");
      cy.contains("Your tests will exist in a describe block.").should(
        "not.be.visible"
      );
    });
  });
});
