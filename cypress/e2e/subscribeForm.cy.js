describe("Form tests", () => {
  beforeEach(() => {
    cy.viewport(1280, 720);
    cy.visit("/forms");
  });

  it("Page header should have proper name", () => {
    cy.getDataTestSelector("form-header").should(
      "contain.text",
      "Testing Forms"
    );
  });

  it("Testing form with valid input", () => {
    cy.getDataTestSelector("subscribe-form")
      .find("input")
      .as("subscribe-input");

    cy.get("@subscribe-input").type("mailivan019@gmail.com");
    cy.contains(/Successfully subbed: mailivan019@gmail.com!/i).should(
      "not.exist"
    );
    cy.getDataTestSelector("subscribe-button").click();
    cy.contains(/Successfully subbed: mailivan019@gmail.com!/i).should("exist");
    cy.wait(3000);
    cy.contains(/Successfully subbed: mailivan019@gmail.com!/i).should(
      "not.exist"
    );
  });

  it("Testing form with invalid input", () => {
    cy.getDataTestSelector("subscribe-form")
      .find("input")
      .as("subscribe-input");

    cy.get("@subscribe-input").type("mailivan019@gmail.aabc");

    cy.contains("Invalid email:").should("not.exist");
    cy.getDataTestSelector("subscribe-button").click();
    cy.contains("Invalid email:").should("exist");
    cy.wait(3000);
    cy.contains("Invalid email:").should("not.exist");
  });

  it("Testing form with empty input", () => {
    cy.contains("Input field cant be empty!").should("not.exist");
    cy.getDataTestSelector("subscribe-button").click();
    cy.contains("Input field cant be empty!").should("exist");
    cy.wait(3000);
    cy.contains("Input field cant be empty!").should("not.exist");
  });
});
