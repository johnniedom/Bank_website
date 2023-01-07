'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const body = document.querySelector(`body`);

const scrollBtn = document.querySelector(`.btn--scroll-to`);
const section1 = document.querySelector(`#section--1`);

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener('click', openModal);
btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

scrollBtn.addEventListener(`click`, e => {
  const s1coords = section1.getBoundingClientRect();
  console.log(s1coords);

  // console.log(e.target.getBoundingClientRect());
  // console.log(e);
  //scroll (x/y)
  // console.log(`current scroll(x/y)`, window.pageXOffset, window.pageYOffset);
  // coordinates
  // console.log(
  //   `height/ width viewport`,
  //   document.documentElement.clientHeight,
  //   document.documentElement.clientWidth
  // );
  // scrolling
  // the first argument is on the x axis and the second is on th Y axis
  // window.scrollTo(
  //   s1coords.left + window.pageXOffset,
  //   s1coords.top + window.pageYOffset
  // );

  //make it scroll smoothly
  console.log(window.scrollTo);

  // old way to apply scrolling
  window.scrollTo({
    left: s1coords.left + window.pageXOffset,
    top: s1coords.top + window.pageYOffset,
    behavior: `smooth`,
  });
  //New way of applying scrolling
  section1.scrollIntoView({ behavior: 'smooth' });
});

//Page Navigation

const link = document.querySelectorAll(`.nav__link`);

link.forEach(el =>
  el.addEventListener(`click`, function (e) {
    e.preventDefault();
    const id = el.getAttribute(`href`);
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  })
);

///////////////////////////////////////
//////////////////////////////////////
// LECTURE

// selecting elements.
// console.log(document.documentElement);
// console.log(document.head);
// console.log(document.body);

// //

const footer = document.querySelector('.footer');

// Node List
const allSections = document.querySelectorAll('section');

//HTML COLLECTIONS
const allButtons = document.getElementsByTagName(`button`);
// console.log(allButtons); //[button.btn.operations__tab.operations__tab--1.operations__tab--active, ...]

// Creating and inserting element
// htmlElement.insertAdjacentHTML

// TOPIC Crating HTML element using javascript
const message = document.createElement(`div`);
message.classList.add(`cookie-message`);
// message.textContent = `we use cookie to improve your experience in website`;
message.innerHTML = ` we use cookie to improve your experience in website <button 
class = "btn btn--close-cookie"> Got it!</button>`;

// footer.prepend(message) // as the first child
// footer.append(message) // as the last child

// inserting multiple copies
// footer.append(message.cloneNode(true))

//Inserting element before and after a section
footer.before(message);
// footer.after(message)

// delete Element
document
  .querySelector(`.btn--close-cookie`)
  .addEventListener(`click`, function () {
    message.remove();

    // old way of removing stuffs
    // using DOM traversing
    message.parentElement.removeChild(message);
  });

//TOPIC Style, Attributes and Class

//style
message.style.backgroundColor = `#37373d`;
message.style.width = `100%`;
message.style.padding = `0.7rem`;
// we get a style that we don't manually inserted here or hidden that e.g
// console.log(message.style.display); // Not available
// console.log(message.style.width); // 120%

//But we can grt the getComputedStyle
// console.log(getComputedStyle(message).color); //rgb(187, 187, 187)
// console.log(getComputedStyle(message).display);// flex
// implementing it
message.style.height =
  Number.parseInt(getComputedStyle(message).height) + 30 + `px`;

// Css custom properties

// document.documentElement.style.setProperty(`--color-primary`, `white`)

//TOPIC Attributes
// n/b this only works for default/standard attributes
const logo = document.querySelector('.nav__logo');
console.log(logo.alt);
console.log(logo.src);
console.log(logo.ceo); // undefined

// set attribute
logo.alt = `company-logo`;

// for non default/standard you use this 👇🏽
console.log(logo.getAttribute(`ceo`));

// Opposite getAttribute
logo.setAttribute(`company`, `Bankist`);

// N/B you getAttribute when working with src/href or any thing link
console.log(logo.src); // http://127.0.0.1:8080/img/logo.png
console.log(logo.getAttribute(`src`)); // img/logo.png

//Data attributes
// their Names basically begins with Data
console.log(logo.dataset.versionNumber); // 3.8

//classes
logo.classList.add(`h`);
logo.classList.remove(`h`);
logo.classList.toggle(`h`);
logo.classList.contains(`h`);

// TOPIC Events
// https://developer.mozilla.org/en-US/docs/Web/Events /// About events
const img = document.querySelector('img');
const rndCol = `rgb(${random(255)}, ${random(255)}, ${random(255)} )`;

function random(number) {
  return Math.floor(Math.random() * (number + 1));
}

const colorChanger = () => {
  console.log(rndCol);
  img.style.backgroundColor = rndCol;
};
img.addEventListener('click', colorChanger);
// console.log(img);
setTimeout(() => {
  img.removeEventListener(`click`, colorChanger);
  img.style.backgroundColor = '';
}, 5000);

// removing the Event

// TOPIC Event propagation
const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);
const randomColor = () =>
  `rgb(${randomInt(0, 255)}, ${randomInt(0, 255)}, ${randomInt(0, 255)})`;

console.log(randomColor());
// const linkR = document.querySelector(`.nav__link`);
const links = document.querySelector(`.nav__links`);
const navBar = document.querySelector(`.nav`);

// linkR.addEventListener(`click`, function(e) {
//   console.log(e, e.currentTarget === this);
//   // this.style.backgroundColor = randomColor();

//   // stop event propagation
//   // e.stopPropagation();
// });
// links.addEventListener(`click`, function(e) {
//   console.log(this);
//   // this.style.backgroundColor = randomColor();
// });
// navBar.addEventListener(`click`, function(e) {
//   console.log(this);
//   // this.style.backgroundColor = randomColor();
// }), false ;
