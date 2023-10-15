describe("Discogs testing", () => {
  beforeEach(() => {
    cy.viewport(1280, 720);
  });

  it("Navigate to discogs page and click on Login button", () => {
    cy.visit("https://www.discogs.com/");

    cy.assertUrl("/", "https://www.discogs.com/");

    cy.isElementVisible("a._button_1ove8_1", "Log In");

    cy.get("#main_wrapper nav._user_17f6m_56").within(() => {
      cy.selectSpecificItemAndClick(
        "a._button_1ove8_1",
        "https://www.discogs.com/login?return_to=https%3A%2F%2Fwww.discogs.com%2F"
      );
    });

    cy.location().should(($loc) => {
      expect($loc.pathname).to.include("/u/login");
    });
    cy.isTextVisible("Log in to Discogs to continue");
  });

  it("Filling usrname and password input, asserting login is succesfull", () => {
    const username = "KeyserSoze019";
    const password = "SSlazio_1900";

    cy.visit(
      "https://login.discogs.com/u/login?state=hKFo2SB2eXUwUU5SZ05hNWcwcUxSUm9PT0NGc3ZNaktHeTRCM6Fur3VuaXZlcnNhbC1sb2dpbqN0aWTZIDFUZ1I0dFVfcWRVVGJvTHo2VjZxdm4xVUY2aG9FazFko2NpZNkgMDg2SDEyQklDVzFiZnRlMVUwQ056NmV4UVFtSk56SGg"
    );

    cy.isTextVisible("Welcome");

    cy.fillLoginFormAndClick(
      "div.c5fad3cb3 div.c050c780d form.c030e2f2e",
      username,
      password
    );

    cy.assertUrl("/my", "https://www.discogs.com/my");

    cy.isTextVisible("Welcome to Discogs!");

    cy.wait(3000);
    cy.isElementVisible("div.ot-sdk-row", "Accept All Cookies");
    cy.get(
      "div.ot-sdk-row div#onetrust-button-group-parent div#onetrust-button-group"
    )
      .should("contain.text", "Accept All Cookies")
      .click();

    // searching and adding desirable Jamiroquai album to collection"

    const jamiroquaiSelector = "Jamiroquai-Travelling-Without-Moving";

    cy.locateAndFillSearchInput(
      "form._search_1asud_1",
      "input._query_1asud_86",
      "button._button_1asud_112",
      "Jamiroquai"
    );

    cy.assertUrl(
      "/search",
      "https://www.discogs.com/search?q=Jamiroquai&type=all"
    );

    cy.isElementVisible("h1.explore", "Exploring Jamiroquai");

    cy.locateArtistAndClick("ul#search_results", "li[data-object-id='8029']");

    cy.isTextVisible("UK based pop-funk/acid jazz band formed in 1992");

    cy.selectSpecificItemAndClick(
      "div.releasesGrid_3PG34 div.textWithCovers_2o9C3 table.releases_8o12o tr.textWithCoversRow_3IhZ3 td.title_oY1q1 a",
      `/master/69956-${jamiroquaiSelector}`
    );

    cy.assertUrl(
      `/master/69956-${jamiroquaiSelector}`,
      `https://www.discogs.com/master/69956-${jamiroquaiSelector}`
    );

    cy.isElementVisible("#release-tracklist", "Cosmic Girl");

    cy.selectSpecificItemAndClick(
      "div table.table_2cVXI tbody tr.row_3KhrR td.title_3z5nf a",
      `/release/129506-${jamiroquaiSelector}`
    );

    cy.assertUrl(
      `/release/129506-${jamiroquaiSelector}`,
      `https://www.discogs.com/release/129506-${jamiroquaiSelector}`
    );

    cy.isElementVisible("div.wrapper_cGBtH", "Add to Collection");

    cy.get("div.wrapper_cGBtH div.buttons_2jlYL").within(() => {
      cy.contains("Add to Collection").click();
    });

    cy.isElementVisible("div.collection_3SHpt", "Sleeve Condition");

    // cy.get("div.collection_3SHpt").as("addConfirmationDiv");
    // cy.get("@addConfirmationDiv").should("be.visible");

    // black sabbath

    cy.locateAndFillSearchInput(
      "form._search_1asud_1",
      "input._query_1asud_86",
      "button._button_1asud_112",
      "Black Sabbath"
    );

    cy.locateArtistAndClick("ul#search_results", "li[data-object-id='144998']");

    cy.assertUrl(
      "/artist/144998-Black-Sabbath",
      `https://www.discogs.com/artist/144998-Black-Sabbath`
    );

    cy.isTextVisible("Considered by many to be the first heavy metal band");

    cy.selectSpecificItemAndClick(
      "div.releasesGrid_3PG34 div.textWithCovers_2o9C3 table.releases_8o12o tr.textWithCoversRow_3IhZ3 td.title_oY1q1 a",
      "/master/302-Black-Sabbath-Paranoid"
    );

    cy.assertUrl(
      "/master/302-Black-Sabbath-Paranoid",
      "https://www.discogs.com/master/302-Black-Sabbath-Paranoid"
    );

    cy.isElementVisible("#release-tracklist", "");

    cy.selectSpecificItemAndClick(
      "div table.table_2cVXI tbody tr.row_3KhrR td.title_3z5nf a",
      "/release/2496903-Black-Sabbath-Paranoid"
    );

    cy.assertUrl(
      "/release/2496903-Black-Sabbath-Paranoid",
      "https://www.discogs.com/release/2496903-Black-Sabbath-Paranoid"
    );

    cy.isElementVisible("div.wrapper_cGBtH", "Add to Collection");

    cy.get("div.wrapper_cGBtH div.buttons_2jlYL").within(() => {
      cy.contains("Add to Collection").click();
    });

    cy.isElementVisible("div.collection_3SHpt", "Sleeve Condition");

    cy.get("nav._user_17f6m_56").within(() => {
      cy.get("div._wrapper_14kvj_52").click();
    });

    cy.selectSpecificItemAndClick(
      "div._content_14kvj_70 ul._group_14kvj_180 li a",
      "/user/KeyserSoze019/collection"
    );

    cy.assertUrl(
      "/user/KeyserSoze019/collection",
      "https://www.discogs.com/user/KeyserSoze019/collection"
    );

    cy.isTextVisible("Estimated Collection Value:");

    cy.getMediumValueFromSpecificItem(
      "div.collection-value-and-pagination div.releaselist-collection-values span.collection-value-range"
    );
  });
});
