import {gsap} from '../vendor/gsap.min';
import {ScrollLock} from '../utils/scroll-lock';

const preload = document.querySelector('[data-preload]');
const squares = document.querySelectorAll('[data-preload__square]');
const COLOR = 'rgba(255, 69, 11, 1)';
const DEFAULT_COLOR = 'rgba(255, 255, 255, 1)';
const ANIMATION_TIME = 4500; // время анимации
let timePreload = 7000; // время показа прелоада
let rotationDelay = 3.5; // задержка вращения
let resetColorDelay = 4.5; // задержка сброса цвета заливки ромбов до стандартного
let count = 0; // счётчик повторов анимации
const maxCount = Math.ceil(timePreload / ANIMATION_TIME); // число повторов анимации


// Функция расчёта последовательной задержки для заливки ромбов
const fillInTurn = function (delayTime) {
  delayTime *= 0.8;
  return delayTime;
};


// Функция создающая анимацию ромбов
function addAnimation() {
  for (let i = 0; i < squares.length; i++) {
    const square = squares[i];
    gsap.to(square, {
      backgroundColor: COLOR,
      duration: 0.8,
      delay: fillInTurn(i),
    });
  }
  gsap.to(squares, {
    repeat: count,
  });
  gsap.to(squares, {
    rotation: 180,
    duration: 1,
    delay: count === 0 ? rotationDelay : rotationDelay *= 2,
    ease: 'power2.in',
    repeat: count,
  });
  gsap.to(squares, {
    backgroundColor: DEFAULT_COLOR,
    duration: 0,
    delay: count === 0 ? resetColorDelay : resetColorDelay *= 2,
    repeat: count,
    onUpdate: startAnimation(),
  });
}


// Функция закрывающая окно прелоада и рзрешающая  скролл страницы
function hiddenPreload() {
  preload.classList.remove('preload--show');
  preload.classList.add('preload--hidden');
  window.scrollLock.enableScrolling();
}


// Функция добавления анимации на страницу
function startAnimation() {
  setTimeout(function () {
    if (count >= maxCount) {
      return;
    } else {
      addAnimation();
      timePreload -= ANIMATION_TIME;
      ++count;
      return;
    }
  }, (ANIMATION_TIME * count));
}


// Функция показа окна преллоада на странице
function showPreload() {
  if (preload) {
    preload.classList.add('preload--show');
    window.scrollLock = new ScrollLock();
    window.scrollLock.disableScrolling();
    startAnimation();
    setTimeout(hiddenPreload, timePreload);
  } else {
    return;
  }
}


export {showPreload};
