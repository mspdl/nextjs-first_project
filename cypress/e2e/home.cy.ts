describe("Home Page", () => {
  it("should load the page", () => {
    cy.visit("/");
  });

  it("should load page in English", () => {
    cy.visit("/");
    cy.get("header").should("contain", "Choosen Language: en");
  });

  it("should load page in wrong page", () => {
    cy.visit("/pt");
    cy.get("header").should("not.contain", "Choosen Language: en");
  });

  it("should load page in Portuguese", () => {
    cy.visit("/pt");
    cy.get("header").should("contain", "Lingaguem selecionada: pt");
  });

  it("should go to login page", () => {
    cy.visit("/");
    cy.contains("Log In").click();
    cy.url().should('include', '/api/auth/signin')
  });
});
