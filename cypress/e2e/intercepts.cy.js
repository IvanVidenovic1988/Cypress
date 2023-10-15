describe("intercepts", () => {
  beforeEach(() => {
    cy.viewport(1280, 720);
    cy.visit("/examples");
  });

  it("intercept tests", () => {
    // first argument is method, 2nd is url that must match with api, 3rd is what we want ot use as our response
    cy.intercept("POST", "http://localhost:3000/examples", {
      fixture: "example.json",
    });
    cy.getDataTestSelector("post-data-button").click();
  });
});

// cy.intercept("POST", "http://localhost:3000/examples", (req) => {
//   req.continue((res) => {
//     console.log("res: ", res);
//     res.body = "<h1></h1>";
//   });
// });
