import '../../node_modules/cypress-xpath';

// Un problema que tiene la pagina de casas.co.cr, se hace para poder ejecutar las pruebas
Cypress.on('uncaught:exception', (err, runnable) => {
    if (err.message.includes('jQuery is not defined')) {
        return false;
    }
    return true;
});

describe('Casas.co.cr - Pruebas de formulario de login y búsqueda', function() {
    beforeEach(function() {
        cy.visit('https://www.casas.co.cr/');
        // Desactivando esto las pruebas se pueden ejecutar 
        cy.get('form').invoke('attr', 'novalidate', 'novalidate'); 
        // Sin esto por alguna razon el cypress se queda trabado en el primer input
        cy.wait(5000); 
    });

    // Caso de prueba 1: Validación del campo de E-mail vacío en login
    // Objetivo: Verificar que el campo de E-mail no esté vacío
    // Datos de prueba: {E-mail: '', Contraseña: 'password2468'}
    // Resultado esperado: Se muestra el mensaje de error "Campos vacios no son permitidos."
    
    it('E-mail requerido', () => {
        // Ingresar contraseña
        cy.xpath('/html/body/div[1]/div/div[2]/form/div/div[3]/input').type('password2468');

        // Boton de Ingresar al sistema
        cy.xpath('/html/body/div[1]/div/div[2]/form/div/div[4]/input').click({ force: true })

        // Resultado esperado
        cy.contains('Campos vacios no son permitidos.').should('be.visible');
    });

    // Caso de prueba 2: Validación del campo de Contraseña vacío en login
    // Objetivo: Verificar que el campo de Contraseña no esté vacío
    // Datos de prueba: {E-mail: 'BruceWayne@gmail.com', Contraseña: ''}
    // Resultado esperado: Se muestra el mensaje de error "Campos vacios no son permitidos."

    it('Contraseña requerida', () => {
        // Ingresar email
        cy.xpath('/html/body/div[1]/div/div[2]/form/div/div[2]/input').type('BruceWayne@gmail.com');

        // Boton de Ingresar al sistema
        cy.xpath('/html/body/div[1]/div/div[2]/form/div/div[4]/input').click({ force: true });

        // Resultado esperado
        cy.contains('Campos vacios no son permitidos.').should('be.visible');
    });

    // Caso de prueba 3: Búsqueda sin criterios seleccionados
    // Objetivo: Verificar que se muestre la lista de propiedades sin criterios de búsqueda
    // Datos de prueba: {Provincia: '', Tipo de Propiedad: ''}
    // Resultado esperado: Se muestra la lista de propiedades sin criterios de búsqueda

    it('Búsqueda sin criterios', () => {
        // Boton de buscar
        cy.xpath('/html/body/div[4]/div/form/div/div[4]/input').click({ force: true })

        // Resultado esperado
        cy.contains('Lista de Propiedades').should('be.visible');
    });

    // Caso de prueba 4: Búsqueda con criterios específicos
    // Objetivo: Verificar que se muestre la lista de propiedades con criterios de búsqueda específicos
    // Datos de prueba: {Provincia: 'San José - Acosta', Tipo de Propiedad: 'Casa'}
    // Resultado esperado: Se muestra la lista de propiedades con los criterios de búsqueda específicos

    it('Búsqueda con criterios específicos', () => {
        // Seleccionar provincia y tipo de propiedad
        cy.xpath('/html/body/div[4]/div/form/div/div[3]/select').select('San José - Acosta'); 
        cy.xpath('/html/body/div[4]/div/form/div/div[2]/select').select('Casa'); 

        // Boton de buscar
        cy.xpath('/html/body/div[4]/div/form/div/div[4]/input').click({ force: true }); 

        // Resultados esperados
        cy.contains('San José - Acosta').should('be.visible');
        cy.contains('Lista de Propiedades').should('be.visible');
        cy.contains('Acosta').should('be.visible');
    });
});