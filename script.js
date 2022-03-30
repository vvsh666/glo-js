'use strict';

let title;
let screens;
let screenPrice;
let adaptive;
const rollback = 25;
let allServicePrice;
let fullPrice;
let servicePercentPrice;
let service1;
let service2;

const isNumber = function (num) {
  return (!isNaN(parseFloat(num)) && isFinite(num))
}

const asking = function () {
  title = prompt('Как называется ваш проект?', '   КальКуЛятор ВеРстки  ');
  screens = prompt('Какие типы экранов нужно разработать?', 'Простые, Сложные, Интерактивные');

  do {
    screenPrice = prompt('Сколько будет стоить данная работа?');
  } while (!isNumber(screenPrice));
  screenPrice = +screenPrice;

  adaptive = confirm('Нужен ли адаптив на сайте?')
}

const getAllServicePrices = function () {
  let sum = 0;
  let servisePrice;

  for (let i = 0; i < 2; i++) {
    if (i === 0) {
      service1 = prompt('Какой дополнительный тип услуги нужен?', 'Связка с WordPress');
    } else if (i === 1) {
      service2 = prompt('Какой дополнительный тип услуги нужен?', 'Хостинг');
    }
    do {
      servisePrice = prompt('Сколько это будет стоить?')
    } while (!isNumber(servisePrice));
    sum += +servisePrice
  }
  return sum
}

const showTypeOf = function (variable) {
  console.log(variable, typeof variable)
}

const getRollbackMessage = function (price) {
  if (price >= 0 && price < 15000) {
    return 'Скидка не предусмотрена'
  } else if (price >= 15000 && price < 30000) {
    return 'Даем скидку в 5%'
  } else if (price >= 30000) {
    return 'Даем скидку в 10 %'
  } else {
    return 'Что то пошло не так'
  }
}

function getFullPrice(screenPrice, allServicePrice) {
  return screenPrice + allServicePrice
}

const getTitle = function (title) {
  let titleLower = title.trim().toLowerCase();
  if (!titleLower) return titleLower;
  let resultTitle = titleLower[0].toUpperCase() + titleLower.slice(1);
  return resultTitle
}

const getServicePercentPrices = function (fullPrice, rollback) {
  return Math.floor(fullPrice * (100 - rollback) / 100);
}

asking();
allServicePrice = getAllServicePrices();
fullPrice = getFullPrice(screenPrice, allServicePrice);
servicePercentPrice = getServicePercentPrices(fullPrice, rollback);
title = getTitle(title);

showTypeOf(title);
showTypeOf(screenPrice);
showTypeOf(adaptive);

console.log('allServicePrice ', allServicePrice);
console.log(screens);
console.log(getRollbackMessage(fullPrice));
console.log(servicePercentPrice)