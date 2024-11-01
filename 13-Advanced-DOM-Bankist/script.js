'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};


btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

for (let i = 0; i < btnsOpenModal.length; i++)
  // btnsOpenModal[i].addEventListener('click', openModal);

  btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////


// ----------------- 187. Selecting, Creating, and Deleting Elements -----------------

// ----------------- Selecionando elements -----------------

console.log(document.documentElement); // retornou todo documento HTML
console.log(document.head); // retornou todo o head
console.log(document.body);// retornou todo o body

const header = document.querySelector('.header');

const allSections = document.querySelectorAll('.section');
/* 
retorna um NodeList
Ex: se eu inspecionar a página, remover uma das section e chamar o 'allSections' ele irá exibir da mesma forma que estava antes não atualiza.
*/
console.log(allSections); // NodeList(4) [section#section--1.section, section#section--2.section, section#section--3.section, section.section.section--sign-up]


const section = document.getElementById('section--1');
console.log(section);// section#section--1.section

const allButtons = document.getElementsByTagName('button');
/* 
retorna um HTMLCollection, se o DOM for alterado essa coleção também será atualizada automáticamente.
Ex: se eu inspecionar a página, remover um dos button e chamar o 'allButtons' ele irá exibir atualizado(diferentemente do NodeList que não atualiza).
*/
console.log(allButtons); // HTMLCollection(9) [button.btn--text.btn--scroll-to, button.btn.operations__tab.operations__tab--1.operations__tab--active, button.btn.operations__tab.operations__tab--2, button.btn.operations__tab.operations__tab--3, button.slider__btn.slider__btn--left, button.slider__btn.slider__btn--right, button.btn.btn--show-modal, button.btn--close-modal, button.btn]

const allClassButtons = document.getElementsByClassName('btn');
console.log(allClassButtons); // HTMLCollection(5) [button.btn.operations__tab.operations__tab--1.operations__tab--active, button.btn.operations__tab.operations__tab--2, button.btn.operations__tab.operations__tab--3, button.btn.btn--show-modal, button.btn]



// ----------------- Criando e inserindo elementos -----------------
/*
.insertAdjacentHTML 
método principal
*/

/*
O elemento DOM é unico so pode existir em um lugar por vez
Se quisermos varias vezes o mesmo elemento precisamos copia-lo
*/
const message = document.createElement('div');
/* 
cria um elemento DOM e o armazena (porém ainda não está em DOM(não aparece na aplicação ainda), 
agora ele é um objeto que podemos utilizar)
*/
message.classList.add('cookie-message');
message.innerHTML =
  'We use cookied for improved funcionality and analytics. <button class="btn btn--close--cookie">Got it!</button>';
console.log(message);


/* 
o MESSAGE é um 'elemento de vida do DOM' portanto não pode estar em varios lugares ao mesmo tempo 
quando usamos o 'append' no exemplo ele apenas moveu do 'prepend' para 'append' pois a criação foi feita com o prepend.
*/
header.prepend(message);
/* 
prepend adiciona como o primeiro filho do elemento(no exemplo aparece no inicio do head)
*/
header.append(message);
/* 
prepend adiciona como o último filho do elemento(no exemplo aparece no final do head) 
*/

// header.prepend(message.cloneNode(true));
/* 
Agora que realizamos o clone ele é exibido duas vezes na tela 
*/

header.before(message);
/* 
adiciona antes como irmão do header 
*/

header.after(message);
/*
adiciona depois como irmão do header
*/

// ----------------- Deletar elementos -----------------
document
  .querySelector('.btn--close--cookie')
  .addEventListener('click', function () {
    // message.remove();

    /* modo antigo de remover
    sobe o message em uma árvore DOM e depois remove o filho usando o mesmo elemento
    esse metódo de mover para cima e para baixo na árvore é chamado de travessia DOM
    */
    message.parentElement.removeChild(message);
  })