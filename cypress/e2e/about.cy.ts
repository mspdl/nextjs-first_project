describe("About", () => {
  beforeEach(() => {
    cy.visit("/about");
  });

  it("should access about page", () => {
    cy.title().should("contain", "About");
  });

  it("should increase one to count after click on increase count button", () => {
    cy.get("main h1").then(($previousH1) => {
      const previousCount = parseInt(
        "" + $previousH1.text().match(/\d+/g)?.at(0)
      );

      cy.contains("Increase count").click();

      cy.get("main h1").then(($currentH1) => {
        const currentCount = parseInt(
          "" + $currentH1.text().match(/\d+/g)?.at(0)
        );

        expect(currentCount).to.be.equal(previousCount + 1);
      });
    });
  });
});
