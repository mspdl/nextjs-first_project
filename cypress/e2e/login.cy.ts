describe("Login", () => {
  beforeEach(() => {
    cy.visit("/api/auth/signin");
  });

  it("should enter login page", () => {
    cy.title().should("contain", "Sign In");
  });

  it("should get an error on login with wrong credentials", () => {
    const email = "wrong@email.com";
    const password = "1234";

    cy.get("#input-email-for-credentials-provider").type(email);
    cy.get("#input-password-for-credentials-provider").type(password);
    cy.contains("Sign in with Credentials").click();

    cy.contains("Sign in failed. Check the details you provided are correct.");
    cy.url().should("contain", "error=CredentialsSignin");
  });

  it("should do cretentials login properly", () => {
    const email = "m@m.com";
    const password = "1234";

    cy.get("#input-email-for-credentials-provider").type(email);
    cy.get("#input-password-for-credentials-provider").type(password);
    cy.contains("Sign in with Credentials").click();

    cy.get('button:contains("Log Out")').should("exist");
    cy.get("button").should("have.text", "Log Out");
  });

  it("should do logout properly", () => {
    const email = "m@m.com";
    const password = "1234";

    cy.get("#input-email-for-credentials-provider").type(email);
    cy.get("#input-password-for-credentials-provider").type(password);
    cy.contains("Sign in with Credentials").click();

    cy.get('button:contains("Log Out")').click();
    cy.get("button").should("have.text", "Log In");
  });
});
