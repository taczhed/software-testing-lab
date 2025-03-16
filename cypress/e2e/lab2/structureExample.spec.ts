/// <reference types="cypress"/>

describe('', () => {
    before('', () => {
        console.log('To się wykona najpierw');
    });

    beforeEach('', () => {
        console.log('To się wykona po hooku before() ale przed każdym testem')
    });

    it('', () => {
        cy.visit('/');
        console.log('Wykonuje się pierwszy test');
    });

    it('', () => {
        cy.visit('/');
        console.log('Wykonuje się drugi test');
    });
});