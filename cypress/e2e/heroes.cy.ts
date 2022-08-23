describe('Heroes list', () => {
  it('should show heading My Heroes when open heroes page', () => {
    cy.visit('localhost:4200/heroes');

    cy.get('h2').should('contain', 'My Heroes');
  });

  it('should fetch list heroes from api/heroes url', () => {
    const heroList = [
      { id: 1, name: 'Dr Nice' },
      { id: 2, name: 'Narco' },
    ];
    cy.intercept(
      {
        method: 'GET',
        url: 'api/heroes',
      },
      heroList,
    ).as('getHeroes');

    cy.visit('localhost:4200/heroes');

    cy.get('[data-cy="heroes"]')
      .should('contain', 'Dr Nice')
      .and('contain', 'Narco');
  });
});
