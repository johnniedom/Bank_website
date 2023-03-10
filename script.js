'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const body = document.querySelector(`body`);

const header = document.querySelector(`.header`);

const scrollBtn = document.querySelector(`.btn--scroll-to`);
const section1 = document.querySelector(`#section--1`);
const section2 = document.querySelector(`#section--2`);
// Delegation Animation
const navBar = document.querySelector(`.nav`);
//Page Navigation
const link = document.querySelector(`.nav__link`);
const links = document.querySelector(`.nav__links`);

// Tabbed Components
const tabs = document.querySelectorAll(`.operations__tab`);
const tabsContainer = document.querySelector(`.operations__tab-container`);
const tabsContent = document.querySelectorAll(`.operations__content`);

/////////////////////////////////////////////////
/////////////////////////////////////////////////

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
  console.log(window);

  // old way to apply scrolling
  window.scrollTo({
    left: s1coords.left + window.pageXOffset,
    top: s1coords.top + window.pageYOffset,
    behavior: `smooth`,
  });
  //New way of applying scrolling
  section1.scrollIntoView({ behavior: 'smooth' });
});

// // Using the old method way.
// link.forEach(el =>
// el.addEventListener(`click`, function (e) {

//   );
// The advantage of event Bubbling
//1. add eventListener to common parent element
// 2.Determine what element originated the event

links.addEventListener(`click`, function (e) {
  console.log(e.target);
  e.preventDefault();

  // Matching strategy
  if (e.target.classList.contains(`nav__link`)) {
    const id = e.target.getAttribute(`href`);
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

// use the event delegation for faster page
tabsContainer.addEventListener(`click`, function (e) {
  const clicked = e.target.closest(`.operations__tab`);
  console.log(clicked);

  // Guard clause
  if (!clicked) return;

  // Removing the active class (Default)
  tabs.forEach(tab => tab.classList.remove(`operations__tab--active`));
  // Adding the active class to the tabbed button
  clicked.classList.add(`operations__tab--active`);

  //Active content Area
  //removing the active content
  tabsContent.forEach(tab => {
    tab.classList.remove(`operations__content--active`);
  });
  // showing the active content
  document
    .querySelector(`.operations__content--${clickeaset.tab}`)
    .classList.add(`operations__content--active`);
});
// Menu fad animation
const handleHover = function (e) {
  if (e.target.classList.contains(`nav__link`)) {
    const link = e.target;
    const sibling = link.closest(`nav`).querySelectorAll('.nav__link');
    const logo = link.closest(`nav`).querySelector('img');
    //  console.log(sibling, logo, link);
    logo.style.opacity = this;
    // console.log(this);
    sibling.forEach(el => {
      if (el !== link) {
        el.style.opacity = this;
      }
    });
  }
};
navBar.addEventListener(`mouseover`, handleHover.bind(0.5));
navBar.addEventListener(`mouseout`, handleHover.bind(1));

// sticky navigation(old way)
window.addEventListener(`scroll`, function (e) {
  // console.log(window.scrollY);
  const initial = section1.getBoundingClientRect();
  if (window.scrollY > initial.top) {
    // navBar.classList.add(`sticky`);
  } else {
    // navBar.classList.remove(`sticky`);
  }
});

// Intersection observer API
const navHeight = navBar.getBoundingClientRect().height;
// console.log(navHeight);

const hdCallback = function (entries) {
  const [entry] = entries;
  // console.log(entry);
  if (!entry.isIntersecting) navBar.classList.add(`sticky`);
  else navBar.classList.remove(`sticky`);
};

const hdObj = {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`, // margins around the root.
  // It could be used to expand or shrink the area of intersection
};

const hdObserver = new IntersectionObserver(hdCallback, hdObj);
hdObserver.observe(header);

// Section Reveal
const allSections = document.querySelectorAll(`.section`);

const revealSection = function (entries, observe) {
  const [entry] = entries;
  console.log(entry);
  if (!entry.isIntersecting) return;
  entry.target.classList.remove(`section--hidden`);
  observe.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(section => {
  sectionObserver.observe(section);
  section.classList.add(`section--hidden`);
});

// Lazy loading images
const imgTarget = document.querySelectorAll(`img[data-src]`);

const lazyLoad = function (entries, observer) {
  const [entry] = entries;
  // console.log(entry);
  if (!entry.isIntersecting) return;

  // Replace src with dat-src
  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener(`load`, function () {
    entry.target.classList.remove(`lazy-img`);
  });

  observer.unobserve(entry.target);
};

const imagObserver = new IntersectionObserver(lazyLoad, {
  root: null,
  threshold: 0,
  rootMargin: `200px`,
});

imgTarget.forEach(img => {
  // console.log(img);
  imagObserver.observe(img);
});

// TOPIC slider

const slider = function () {
  const btnLeft = document.querySelector(`.slider__btn--left`);
  const btnRight = document.querySelector(`.slider__btn--right`);

  const slides = document.querySelectorAll(`.slide`);
  const slider = document.querySelector(`.slider`);
  // dot container
  const dotContainer = document.querySelector(`.dots`);

  // slider.style.transform = `scale(0.3) translateX(-800px)`;
  // slider.style.overflow = `visible`;
  let curSlide = 0;
  // active slide

  // Refactoring
  const goToSlide = function (slide) {
    slides.forEach((sl, i) => {
      sl.style.transform = `translate(${100 * (i - slide)}%)`;
    });
  };

  //  logic for the BtnRight

  const maxSlide = slides.length;

  const rightSlide = function () {
    if (curSlide === maxSlide - 1) curSlide = 0;
    else curSlide++;
    goToSlide(curSlide);
    activateDot(curSlide);
  };
  //  logic for the BtnLeft
  const leftSlide = function () {
    if (curSlide === 0) curSlide = maxSlide - 1;
    else curSlide--;
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  btnRight.addEventListener(`click`, rightSlide);
  btnLeft.addEventListener(`click`, leftSlide);

  // console.log(document);
  document.addEventListener(`keydown`, function (e) {
    console.log(e);
    if (e.key === `ArrowLeft`) leftSlide();
    if (e.key === `ArrowRight`) rightSlide();
  });

  // dot container
  const createDot = function () {
    slides.forEach((_, i) => {
      dotContainer.insertAdjacentHTML(
        `beforeend`,
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  dotContainer.addEventListener(`click`, function (e) {
    // console.log(e.target.dataset.slide)
    if (e.target.classList.contains(`dots__dot`)) {
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activateDot(slide);
    }
  });

  const activateDot = function (slide) {
    document
      .querySelectorAll(`.dots__dot`)
      .forEach(dot => dot.classList.remove(`dots__dot--active`));

    // selecting the active class based on the data attribute
    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add(`dots__dot--active`);
  };

  const init = function () {
    goToSlide(0);
    createDot();
    activateDot(0);
  };

  init();
};

slider();
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
// const allSections = document.querySelectorAll('section');

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

// for non default/standard you use this ????????
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
// const navLinks = document.querySelector(`.nav__links`);
// const navBar = document.querySelector(`.nav`);

// link.addEventListener(`click`, function (e) {
//   console.log(e, e.target, e.currentTarget === this);
//   this.style.backgroundColor = randomColor();

//   // stop event propagation
//   // e.stopPropagation();
// });
// links.addEventListener(`click`, function (e) {
//   console.log(this, e.target);
//   this.style.backgroundColor = randomColor();
// });
// navBar.addEventListener(`click`, function (e) {
//   console.log(this);
//   console.log(e.target);
//   console.log(e);
//   this.style.backgroundColor = randomColor();
// }),
//   false;

//TOPIC Dom traversing
const h1 = document.querySelector(`h1`);

// ????????GOING DOWNWARDS : CHILD
// h1.querySelectorAll(`.highlight`).forEach(el => console.log(el.textContent));
// get the direct child
// console.log(h1.childNodes);
// h1.childNodes.forEach(el=> console.log(el.textContent))

// get the elements inside a parent
// console.log(h1.children);

// get Number the elements inside a parent
// console.log(h1.childElementCount);

// get first child content
// console.log(h1.firstChild);

// get first/last Element  child
// console.log(h1.firstElementChild);
// console.log(h1.lastElementChild);

// ????????GOING UPWARDS : PARENT
// console.log(h1.parentNode);
// console.log(h1.parentElement);
// namespaceURI:"http://www.w3.org/1999/xhtml"

// PARENT element that is not direct element
// h1.closest(`header`).style.background = ` `;
// console.log(h1.closest(`header`));

// ????????GOING SIDEWAYS : SIBLINGS
// console.log(h1.nextElementSibling);
// console.log(h1.previousElementSibling);

// console.log(h1.previousSibling);
// console.log(h1.nextSibling);

// console.log(h1.parentElement.children);
// manipulating the use of dom traversing
[...h1.parentElement.children].forEach(function (el) {
  if (el !== h1) {
    // console.log(el);
    // el.style.background = randomColor()
  }
});

// TOPIC Intersection observer API
const obsCallback = function (entries, observer) {
  // code that should be executed when the observed element is intersecting the root element.
  //at the threshold that you defined
  //  console.log(entries);
  entries.forEach(entry => {
    // console.log(entry);
  });
};

const obsOptions = {
  root: null, // the is the element that the target is intersecting or
  //the element to use as the viewport
  // for checking visibility of the target,
  threshold: 0.2, //indicating at what percentage of visibility an observer's
};
``;
const observer = new IntersectionObserver(obsCallback, obsOptions);
observer.observe(section1, section2);

// TOPIC Life cycle Dom Event
document.addEventListener(`DOMContentLoaded`,function(){
  console.log(`HTML parsed and Dom tree built`, e);
})

window.addEventListener(`load`, function(e){
  console.log(`Page fully loaded`, e);
})

// window.addEventListener(`beforeunload`, function (e) {
//   e.preventDefault();
//   console.log(e);

//   e.returnValue = '';
// });

  // TOPIC 
