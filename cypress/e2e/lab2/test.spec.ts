/// <reference types="cypress"/>

// --- Scenario ---

const product = {
    name: 'Fruit of the Loom T-Shirts 5 Pack - Super Premium',
    basePrice: 9.99,
    size: 'X-Large',
    quantity: 7,
}


describe('', () => {
    before('', () => {
        console.log('To się wykona najpierw');
    });

    beforeEach('', () => {
        console.log('To się wykona po hooku before() ale przed każdym testem')
    });

    it('', () => {
        cy.visit('/');

        cy.get('#filter_keyword').type(`${product.name}{enter}`, { delay: 50 })

        // assertion
        cy.get('.bgnone').should('be.visible').and('have.text', product.name)
        cy.get('.productfilneprice').should('be.visible').and('contain.text', `$${product.basePrice.toFixed(2)}`);
        cy.get('.productfilneprice').should('be.visible').then(($basePrice) => {
            expect($basePrice.text().trim()).be.eql(`$${product.basePrice.toFixed(2)}`)
        })

        cy.get('[id^="option"]').should('be.visible').select(product.size)

        // assertion
        cy.get('[id^="option"]').should('be.visible').find('option').should('have.value', 768)

        cy.get('#product_quantity').should('be.visible').clear().type(`${product.quantity}`)

        // assertion
        cy.get('.total-price').should('be.visible').and('have.text', `$${(product.quantity * product.basePrice).toFixed(2)}`)

        cy.contains('.cart', 'Add to Cart').should('be.visible').click()
        // cy.get('.table > tbody > tr').should('be.visible').eq(1).
    });
});