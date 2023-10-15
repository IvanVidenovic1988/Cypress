describe("Testing navigation routes", () => {
  beforeEach(() => {
    cy.viewport(1280, 720);
    cy.visit("/");
    cy.get(".nav-bar");
  });

  it("Home page route testing", () => {
    cy.location().should((loc) => {
      expect(loc.href).to.eq("http://localhost:3000/");
    });
  });

  it("Overview page route testing", () => {
    cy.get('[data-test="nav-item-Overview"]').click();
    cy.location("pathname").should("eq", "/overview");
  });

  it("fundamentals page route testing", () => {
    cy.get('[data-test="nav-item-Fundamentals"]').click();
    cy.url().should("eq", "http://localhost:3000/fundamentals");
  });

  it("Forms page route testing", () => {
    cy.getDataTestSelector("nav-item-Forms").click();
    cy.location().should((loc) => {
      expect(loc.pathname).to.include("/forms");
      expect(loc.href).to.eq("http://localhost:3000/forms");
    });
  });

  it("Examples page route testing", () => {
    cy.getDataTestSelector("nav-item-Examples").click();
    cy.location().should((loc) => {
      expect(loc.pathname).to.include("/examples");
      expect(loc.href).to.eq("http://localhost:3000/examples");
    });
  });

  it("Component page route testing", () => {
    cy.getDataTestSelector("nav-item-Component").click();
    cy.location().should((loc) => {
      expect(loc.pathname).to.include("/component");
      expect(loc.href).to.eq("http://localhost:3000/component");
    });
  });

  it("Best-Practices page route testing", () => {
    cy.getDataTestSelector("nav-item-Best Practices").click();
    cy.location().should((loc) => {
      expect(loc.pathname).to.include("/best-practices");
      expect(loc.href).to.eq("http://localhost:3000/best-practices");
    });
  });
});
