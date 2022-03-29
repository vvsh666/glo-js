'use strict';

let title = prompt('Как называется ваш проект?', '   КальКуЛятор ВеРстки  ');
const screens = prompt('Какие типы экранов нужно разработать?', 'Простые, Сложные, Интерактивные');
const screenPrice = +prompt('Сколько будет стоить данная работа?', 12000);
const adaptive = confirm('Нужен ли адаптив на сайте?');
const service1 = prompt('Какой дополнительный тип услуги нужен?', 'Связка с WordPress');
const servicePrice1 = +prompt('Сколько это будет стоить?', 10000);
const service2 = prompt('Какой дополнительный тип услуги нужен?', 'Хостинг');
const servicePrice2 = +prompt('Сколько это будет стоить?', 5000);
const rollback = 25;

let allServicePrice, fullPrice, servicePercentPrice;


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

const getAllServicePrices = function (servicePrice1, servicePrice2) {
  return servicePrice1 + servicePrice2
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


title = getTitle(title);

showTypeOf(title);
showTypeOf(screenPrice);
showTypeOf(adaptive);

allServicePrice = getAllServicePrices(servicePrice1, servicePrice2);
fullPrice = getFullPrice(screenPrice, allServicePrice);
servicePercentPrice = getServicePercentPrices(fullPrice, rollback);


console.log(screens);
console.log(getRollbackMessage(fullPrice));
console.log(servicePercentPrice)