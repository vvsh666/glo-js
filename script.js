'use strict';

const appData = {
  title: '',
  screens: '',
  screenPrice: 0,
  adaptive: true,
  rollback: 25,
  allServicePrice: 0,
  fullPrice: 0,
  servicePercentPrice: 0,
  service1: '',
  service2: '',

  asking: function () {
    appData.title = prompt('Как называется ваш проект?', '   КальКуЛятор ВеРстки  ');
    appData.screens = prompt('Какие типы экранов нужно разработать?', 'Простые, Сложные, Интерактивные');

    do {
      appData.screenPrice = prompt('Сколько будет стоить данная работа?');
    } while (!appData.isNumber(appData.screenPrice));
    appData.screenPrice = +appData.screenPrice;

    appData.adaptive = confirm('Нужен ли адаптив на сайте?')
  },

  isNumber: function (num) {
    return (!isNaN(parseFloat(num)) && isFinite(num))
  },

  getAllServicePrices: function () {
    let sum = 0;
    let servisePrice;

    for (let i = 0; i < 2; i++) {
      if (i === 0) {
        appData.service1 = prompt('Какой дополнительный тип услуги нужен?', 'Связка с WordPress');
      } else if (i === 1) {
        appData.service2 = prompt('Какой дополнительный тип услуги нужен?', 'Хостинг');
      }
      do {
        servisePrice = prompt('Сколько это будет стоить?')
      } while (!appData.isNumber(servisePrice));
      sum += +servisePrice
    }
    return sum
  },

  getRollbackMessage: function (price) {
    if (price >= 0 && price < 15000) {
      return 'Скидка не предусмотрена'
    } else if (price >= 15000 && price < 30000) {
      return 'Даем скидку в 5%'
    } else if (price >= 30000) {
      return 'Даем скидку в 10 %'
    } else {
      return 'Что то пошло не так'
    }
  },

  getFullPrice: function (screenPrice, allServicePrice) {
    return screenPrice + allServicePrice
  },

  getTitle: function (title) {
    let titleLower = title.trim().toLowerCase();
    if (!titleLower) return titleLower;
    let resultTitle = titleLower[0].toUpperCase() + titleLower.slice(1);
    return resultTitle
  },

  getServicePercentPrices: function (fullPrice, rollback) {
    return Math.floor(fullPrice * (100 - rollback) / 100);
  },

  logger: function (obj) {
    for (let key in obj) {
      console.log('Ключ:' + key + ' Значение:' + obj[key])
    }
  },

  start: function () {
    appData.asking();
    appData.allServicePrice = appData.getAllServicePrices();
    appData.fullPrice = appData.getFullPrice(appData.screenPrice, appData.allServicePrice);
    appData.servicePercentPrice = appData.getServicePercentPrices(appData.fullPrice, appData.rollback);
    appData.title = appData.getTitle(appData.title);
    appData.logger(appData)
  }
}

appData.start()