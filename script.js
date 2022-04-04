'use strict';

const appData = {
  title: '',
  screens: [],
  screenPrice: 0,
  adaptive: true,
  rollback: 10,
  allServicePrice: 0,
  fullPrice: 0,
  servicePercentPrice: 0,
  services: [],

  asking: function () {

    do {
      appData.title = prompt('Как называется ваш проект?', '   КальКуЛятор ВеРстки  ');
    } while (!appData.isStr(appData.title))

    for (let i = 0; i < 2; i++) {
      let name;
      let price = 0;

      do {
        name = prompt('Какие типы экранов нужно разработать?');
      } while (!appData.isStr(name))

      do {
        price = prompt('Сколько будет стоить данная работа?');
      }
      while (!appData.isNumber(price));

      appData.screens.push({
        id: i,
        name: name,
        price: price
      })
    }

    appData.adaptive = confirm('Нужен ли адаптив на сайте?');

    for (let i = 0; i < 2; i++) {
      let name;
      let price = 0;

      do {
        name = prompt('Какой дополнительный тип услуги нужен?');
      } while (!appData.isStr(name));

      do {
        price = prompt('Сколько это будет стоить?')
      }
      while (!appData.isNumber(price));

      appData.services.push({
        id: i,
        name: name,
        price: price
      })
    }
  },

  isNumber: function (num) {
    return (!isNaN(parseFloat(num)) && isFinite(num))
  },

  isStr: function (str) {
    str = str.trim()
    return (isNaN(Number(str)) && str != '')
  },

  addPrices: function () {

    appData.screenPrice = appData.screens.reduce(function (sum, current) {
      return sum + (+current.price)
    }, 0)

    for (let service of appData.services) {
      appData.allServicePrice += +service.price
    }
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

  getFullPrice: function () {
    appData.fullPrice = appData.screenPrice + appData.allServicePrice
  },

  getTitle: function () {
    appData.title = appData.title.trim()[0].toUpperCase() + appData.title.trim().substr(1).toLowerCase()
  },

  getServicePercentPrices: function () {
    appData.servicePercentPrice = Math.floor(appData.fullPrice * (100 - appData.rollback) / 100);
  },

  logger: function () {
    for (let key in appData) {
      console.log('Ключ:' + key + ' Значение:' + appData[key])
    }
    console.log(appData.fullPrice);
    console.log(appData.servicePercentPrice);
    console.log(appData.screens);
    console.log(appData.services);
  },

  start: function () {
    appData.asking();
    appData.addPrices();
    appData.getFullPrice();
    appData.getServicePercentPrices();
    appData.getTitle();
    appData.logger()
  }
}

appData.start()
