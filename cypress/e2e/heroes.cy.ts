describe('Heroes list', () => {
  it('should show heading My Heroes when open heroes page', () => {
    cy.visit('localhost:4200/heroes');
    cy.get('h2').should('contain', 'My Heroes');
  });
});
