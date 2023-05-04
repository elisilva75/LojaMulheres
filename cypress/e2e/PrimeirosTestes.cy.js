/// <reference types="Cypress"/>

// Suite de casos que contém cada caso
describe('Primeiro conjunto de casos de testes', function() {

  beforeEach(() => {
  // Acessar página
  cy.visit('http://automationpractice.pl/index.php')
  })
  
  // Caso de teste 1
  it('Contabilizar a quantidade de elementos na página Women', function() {
  // Acessar Categoria
  cy.get('.sf-menu > :nth-child(1) > [href="http://automationpractice.pl/index.php?id_category=3&controller=category"]').click()
  
  // Verificar a quantidade de elementos visíveis
  cy.get('.product-container').should('have.length', 7)
  
  // Obter um elemento .product-container como um parâmetro
  cy.get('.product-container').as('ProdutosGuiaMulheres')
  
  // Verificar novamente a quantidade de elementos com o parâmetro
  cy.get('@ProdutosGuiaMulheres').should('have.length', 7)
  })
  
  // Caso de teste 2
  it('Adicionar o elemento tipo "Printed Dress" ao carrinho de compras', function() {
  // Obter um elemento .product-container como um parâmetro
  cy.get('.product-container').as('ProdutosGuiaMulheres')
  
  // Interação para encontrar produto com nome X e preço Y
  cy.get('@ProdutosGuiaMulheres').each(($el, index, $list) => {
    cy.get('@ProdutosGuiaMulheres')
      .eq(index)
      .find('.product-name')
      .then(($el1) => {
        const nomeProduto = $el1.attr('title')
        cy.get('@ProdutosGuiaMulheres')
          .eq(index)
          .find('.price')
          .then(($el2) => {
            const preco = $el2.text().trim()
  
            if (nomeProduto === 'Printed Dress' && preco === '$26.00') {
              cy.log('O elemento buscado foi encontrado')
              cy.log('O preço buscado foi encontrado')
  
              cy.get('@ProdutosGuiaMulheres')
                .eq(index)
                .scrollIntoView()
                .should('be.visible')
                .invoke('css', 'position', 'relative')
                .invoke('css', 'top', '50')
                .invoke('css', 'visibility', 'visible')
                .contains('Add to cart')
                .click({ force: true })
  
              cy.wait(5000) // espera por 5 segundos para garantir que o elemento esteja visível
              cy.get('div#layer_cart')
                .should('be.visible')
                .then(() => {
                  cy.get('h2 > .ajax_cart_product_txt')
                    .should('contain.text', 'There is 1 item in your cart.').should('be.visible')
                })
            }
          })
      })
  })
  })
  //Caso de teste 3  
  it('Verificamos que o drop down de women, tenha os elementos necessarios', function () {
 
    //Fluando sobre um elemento
    cy.get('#block_top_menu > ul > li:nth-child(1) > ul').invoke('attr', 'style', 'display: block')
    cy.get('a[title="Tops"]').should('be.visible')
    cy.get('a[title="T-shirts"]').should('be.visible')
    cy.get('a[title="Blouses"]').should('be.visible')
    cy.get('a[title="Dresses"]').should('be.visible')
    cy.get('a[title^="Casual"]').should('be.visible')
    cy.get('a[title^="Evening"]').should('be.visible')
    cy.get('a[title^="Summer"]').should('be.visible')
})
 //Caso de teste 4
 it('Verificar se os checkboxes estão funcionando', function () {
  cy.get('.sf-menu > :nth-child(2) > .sf-with-ul').click();
  cy.get('li[class="nomargin hiddable col-lg-12"]:has(a[href*="categories-casual_dresses"]) input', { timeout: 10000 }).should('exist').check().should('be.checked');
  cy.get('li[class="nomargin hiddable col-lg-12"]:has(a[href*="categories-evening_dresses"]) input').should('not.be.checked');
  cy.get('li[class="nomargin hiddable col-lg-12"]:has(a[href*="categories-summer_dresses"]) input').should('not.be.checked');
});

	// Caso de teste 5
  
	it('Verificar se os dropdowns de opções estão funcionando', function () {
    cy.get('.sf-menu > :nth-child(2) > .sf-with-ul').click();
    cy.get('#selectProductSort').select('Price: Lowest first').then(() => {
      cy.get('#selectProductSort').invoke('val').should('eq','price:asc');
    });
  });
  

    
 // Caso de teste 6
 it('Criar uma compra desde o zero', function () {
  cy.get('#search_query_top').type('Printed Dress');
  cy.get('#searchbox > .btn').click();
  cy.get('.product-container:has(.product-name[title="Printed Dress"]) .ajax_add_to_cart_button')
    .eq(0)
    .click();
  cy.get('.button-medium[title="Proceed to checkout"]').click();

  cy.get('tr[id^=product]').find('.product-name > a').should('contain.text', 'Printed Dress');
  cy.get('tr[id^=product]').find('.price').should('contain.text', '$50.99');

  cy.get('.cart_navigation > .button').click();

  cy.get('#email').type('teste@teste.com');
  cy.get('#passwd').type('Teste');
  cy.get('#SubmitLogin').click();
  cy.get('.cart_navigation > .button').click();

  cy.get('#cgv').check().should('be.checked');
  cy.get('.cart_navigation > .button').click();

  cy.get('.bankwire').click();
  cy.get('.cart_navigation > .button').click();

  cy.get('.alert').should('contain.text', 'Your order on My Store is complete.');
});



})


  
