'use strict';

const title = document.getElementsByTagName('h1')[0];
const buttons = document.getElementsByClassName('handler_btn');
const startBtn = buttons[0];
const resetBtn = buttons[1];
const screenBtn = document.querySelector('.screen-btn');
const percentItems = document.querySelectorAll('.other-items.percent');
const numberItems = document.querySelectorAll('.other-items.number');
const rangeInput = document.querySelector('.rollback input');
const rangeValue = document.querySelector('.rollback .range-value');

const totalInputs = document.getElementsByClassName('total-input');
const totalInput = totalInputs[0];
const totalCountInput = totalInputs[1];
const totalCountOtherInput = totalInputs[2];
const totalFullCountInput = totalInputs[3];
const totalCountRollbackInput = totalInputs[4];

let screens = document.querySelectorAll('.screen');

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

  init: function () {
    appData.addTitle();
    startBtn.addEventListener('click', appData.start);
    screenBtn.addEventListener('click', appData.addScreenBlock)
  },

  addTitle: function () {
    document.title = title.textContent
  },

  addScreens: function () {
    let screens = document.querySelectorAll('.screen');
    screens.forEach(function (screen, index) {
      const select = screen.querySelector('select');
      const input = screen.querySelector('input');
      const selectName = select.options[select.selectedIndex].textContent;

      appData.screens.push({
        id: index,
        name: selectName,
        price: +select.value * +input.value
      })
    })
    console.log(appData.screens);
  },

  addServices: function () {

  },

  addScreenBlock: function () {
    const cloneScreen = screens[0].cloneNode(true);
    screens[screens.length - 1].after(cloneScreen);
  },

  asking: function () {

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
    appData.addScreens();
    // appData.asking();
    // appData.addPrices();
    // appData.getFullPrice();
    // appData.getServicePercentPrices();
    // appData.getTitle();
    // appData.logger()
  }
}

appData.init()
