/// <reference types="cypress"/>

describe('', () => {
    it('#01 | Metody: get, type & click', () => {
        cy.visit('/'); // https://automationteststore.com/

        // cy.get('input.dropdown-toggle').type('Absolute');
        cy.get('input.dropdown-toggle').should('be.visible').type('Jersey');
        cy.get('.button-in-search').should('be.visible').click();

        //assertion
        cy.get('.bgnone').should('be.visible').and('contain.text', 'Jersey Cotton');

        /*
            W Cypressie użycie cy.get() zwraca element DOM jako obiekt jQuery.
        */
    });

    it('#02 | Metody: get, type i enter', () => {
        cy.visit('/');

        cy.get('input.dropdown-toggle').type('Jersey{enter}');

        //assertion
        cy.get('.bgnone').should('be.visible').and('contain.text', 'Jersey Cotton Striped Polo Shirt');
    });

    it('#03 | Metody: contains i użycie eq', () => {
        cy.visit('/');

        cy.get('.dropdown').eq(1).click(); // przycisk 'account'
        // cy.contains('.dropdown', 'Account').click(); // nie ACCOUNT

        //assertion
        cy.get('.maintext').should('be.visible').and('have.text', ' Account Login');
    });

    it('#04 | Metody: find i asercja "have.length"', () => {
        cy.visit('/index.php?rt=account/create');

        // cy.get('h4'); // sprawdzić ile jest nagłówków "Your Personal Details" etc.
        // cy.get('div').find('h4'); // znalezione zostaną wszystkie elementy h4, które są potomkami div (7 elementów)
        // cy.get('div h4'); // zadziała dokładnie tak samo jak linia powyżej
        // cy.get('div > form > h4') // Wyszuka wszystkie elementóch których sciężka jest rozpoczyna się od div

        // //assertion
        cy.get('#AccountFrm').find('h4').should('have.length', 4);

        /*
            Zamiast cy.get('div').find('h4').click() można wykonać wyszukanie selektora w sposób: cy.get('div h4').click().
            Z kolei można też wykonać wskazanie ścieżki krok po kroku, np. div > form > h4.
        */
    });

    it.only('#05 | Metody: select i asercja wybranej wartości', () => {
        cy.visit('/index.php?rt=account/create');

        cy.get('#AccountFrm_zone_id').select('3531');
        cy.get('#AccountFrm_zone_id').select('Devon');

        // // //assertion
        // cy.get('#AccountFrm_zone_id').should('have.value', 'Devon') // Tak nie zadziała
        // cy.get('#AccountFrm_zone_id').should('have.value', '3535') // Tak zadziała
        cy.get('#AccountFrm_zone_id option:selected').should('have.text', 'Devon')
    });

    it('#06 | Metody: type i clear, i asercja wartości (tekstu) w inpucie', () => {
        cy.visit('/index.php?rt=account/create');

        cy.get('#AccountFrm_firstname').type('Jakiś ultra długi tekst', { delay: 150, });
        cy.get('#AccountFrm_firstname').clear().type('Jednak będzie inny tekst');

        //assertion
        cy.get('#AccountFrm_firstname').should('have.value', 'Jednak będzie inny tekst')
    });

    it.only('#07 | Metody: check i uncheck oraz asercja czy zaznaczone', () => {
        cy.visit('/index.php?rt=account/create');

        cy.get('#AccountFrm_agree').check();

        //assertion
        cy.get('#AccountFrm_agree').should('be.checked');

        cy.get('#AccountFrm_agree').uncheck();

        //assertion
        cy.get('#AccountFrm_agree').should('not.be.checked');
    });

    it('', () => {
        cy.visit('/index.php?rt=account/create');

        cy.get('#AccountFrm_newsletter1').scrollIntoView().check();
        cy.get('#AccountFrm_newsletter1').scrollIntoView().uncheck();
    })

    it('#08 | Metody: clock i tick', () => {
        cy.visit('/index.php?rt=account/create');
    
        cy.clock(); // zamrożenie czasu
        cy.tick(5000); // przeskoczenie czasu o 5 sekund
        cy.wait(2500); // oczekiwanie 2.5 sekundy (2500 milisekund)

        /*  
            Cypress przejmuje kontrolę nad czasem w przeglądarce. Jeżeli wykorzystywany jest wbudowany w przeglądarkę mechanizm czasu
            np. setTimeout() / setInterval() / Date.now() / new Date() to możemy ten czas zamrozić i np. przeskoczyć do przodu. 
            Nie można przesuwać czasu do tyłu - możemy poruszać się tylko w przód.
            Metody clock() i tick() nie zadziałają, jeżeli back-end określa obecny czas w aplikacji.
        */  
    });

    it('#09 | Przykład asynchroniczności i pare słów o then()', () => {
        const students = '20';

        cy.visit('/');
        // cy.wait(2500);
        // console.log(students); // Wypisanie w konsoli wartości student = "20" odbędzie się zaraz po uruchomieniu testu

        // cy.wait(2500).then(() => {
        //     console.log(students); // Dopiero po upływie 2.5 sekund pojawi się w konsoli wartość "20"
        // });

        cy.get('#customer_menu_top').then(($btn) => {
            //assertion
            expect($btn).to.have.class('main_menu') // Sprawdzenie obiektu jQuery czy posiada on klasę main_menu
            
            console.log($btn.text()); // Wypisanie w konsoli tekstu, który posiada wskazany element
            
            cy.get('#filter_keyword').type($btn.text().trim()); // Wykorzystanie tekstu, który posiada przechwycony element i wykorzystanie go (tekstu)
        })

        /*
            Za pomocą .then() możemy:
            1. kontrolować to co ma być wykonane po jakiejś operacji, np. po 5 sekundach ma się coś wykonać.
            2. zdobyć dostęp do jakiegoś elementu DOM (jQuery), aby sprawdzić jesgo właściwości np. czy element posiada jakąś klasę.
                Gdy chcemy przechwycić dostęp do takiego elementu, przed nazwą zmiennej w then() używamy znak "$". Jest to konwencja stosowana 
                w przypadku obiektów jQuery (żeby łatwiej było odróżnić ten obiekt), np. .then($element => { ... })
            3. kontrolować zwracane odpowiedzi przez API
        */
    });

    it('#10 | Metody: each i wrap', () => {
        cy.visit('/');

        cy.get('.categorymenu').contains('li', 'Skincare').should('be.visible').click();
        cy.get('.thumbnails.row').first().find('li').each(($item, index) => {
            // console.log($item.text().trim());

            //assertion
            cy.wrap($item).find('img').should('have.attr', 'src');
            // $item.find('img').should() // nie można wykorzystać should()
            // if(index === 3) {
            //     console.log(`Element z indexem 3 ma nazwę: ${$item.text().trim()}`);
            // }
        });
    });

    it('#11 | Metody: intercept i wait', () => {
        cy.intercept('GET', '/index.php?rt=r/product/product/addToCart**').as('getAddToCart') // Request wykonywany przez API

        cy.visit('/');
        cy.get('#customer_menu_top').click();

        cy.wait('@getAddToCart'); // Oczekiwanie na wykonanie się requesta
        cy.wait('@getAddToCart').then(($interception) => {
            expect($interception.response?.statusCode).to.eq(203);
            // console.log($interception.response)
        });
    });

    it('#12 | Metody: mockowanie zwracanych danych', () => {
        cy.intercept('GET', '/index.php?rt=r/product/product/addToCart',
            {
                body: [{ item_count: 3, total: "$11.24", }],
                // statusCode: 500,
            }
        ).as('getAddToCart') // Request wykonywany przez API

        cy.visit('/');
        cy.get('#customer_menu_top').click();

        cy.wait('@getAddToCart').then(($interception) => {
            expect($interception.response?.statusCode).to.eq(200);
            console.log($interception.response) // Teraz w body zwrócone zostały inne dane
        });
    });

    it('#13 | Metody: mockowanie danych na stronie', () => {
        cy.intercept('GET', '/index.php?rt=r/product/product/addToCart', { fixture: 'example', }).as('getAddToCart')

        cy.visit('/');
        cy.get('#customer_menu_top').click();
        cy.wait('@getAddToCart').then(($interception) => {
            expect($interception.response?.statusCode).to.eq(200);
            console.log($interception.response) // Teraz w body zwrócone zostały inne dane
        });
    });

    it('#14 | Metody: writeFile i readFile', () => {
        const myObject = { name: 'Jhon', age: '30', };

        cy.writeFile('cypress/fixtures/userData.json', myObject);

        cy.readFile('cypress/fixtures/userData.json').then(($content) => {
            expect($content).to.deep.eq(myObject); // dokładne porównanie wartości pliku z obiektem "myObject"
            expect($content).to.have.property('name'); // sprawdzenie czy zawartość pliku posiada właściwość "name"
            expect($content).to.have.property('name', myObject.name); // sprawdzenie czy zawartość pliku posiada właściwość "name" o wartości "Jhon"
        });
    });

    it('#15 | Metody: clearCookies, setCookie i getCookie', () => {
        cy.clearCookies();
        cy.setCookie('currency', 'EUR');

        cy.visit('/');

        cy.getCookie('currency').should('have.property', 'value', 'EUR');
        cy.getCookie('currency').should('not.have.property', 'value', 'USD');
    });

    it('#16 | Metoda: within', () => {
        cy.visit('/');

        cy.get('h2'); // Zwracane jest 10 elementów
        cy.get('.block_frame'); // Zwracane jest 

        cy.get('.footersocial').within(() => {
            cy.get('h2'); // tylko 4 elementy
            cy.get('.block_frame'); // tylko 
        });

        /*
            Metoda .within() jest przydatna, gdy chcemy wyszukać jakiś element w danym obszarze, np. na stronie znadjuje się 10 elementów z tagiem h2.
            Z kolei nas interesują tylko tagi h2, które są użyte w elemencie o klasie "footersocial". Dzięki within możemy łatwo znaleźć te elementy,
            które są tylko w obrębie elementu "footersocial". 
            Plusem within jest to, że w takiej sytuacji nie musimy szukać indexu interesującego nas elemento spośród 10 różnych, tylko ograniczamy się
            do 4 elementów. A może być tak, że na stronie 
        */
    });

    it('#17 | Metoda: filter i sposoby wyszukiwania elementów', () => {
        cy.visit('/');

        cy.get('h2').filter(':visible');
        cy.get('h2:visible');

        //Dla przykładu, element który ma [class="dropdown-menu currency"]
        cy.get('.currency'); // za pomocą . można podać tylko jedną klasę z wielu
        cy.get('[class="dropdown-menu currency"]') // za pomocą podawania klasy w " " należy podać wszystkie klasy a nie tylko jedną
        // cy.get('[class="dropdown-menu"]') // to nie zadziała
        // cy.get('[class="currency"]') // to nie zadziała
        cy.get('[class^="dropdown"]') // wyszukuje element, którego klasa rozpoczyna się od słowa "dropdown"
        cy.get('[class$="ency"]') // wyszukuje element, którego klasa kończy się frazą "ency"
    });
});


