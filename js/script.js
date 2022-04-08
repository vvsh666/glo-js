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
  servicePricesPercent: 0,
  servicePricesNumber: 0,
  fullPrice: 0,
  servicePercentPrice: 0,
  servicesPercent: {},
  servicesNumber: {},

  init: function () {
    appData.addTitle();
    startBtn.addEventListener('click', appData.start);
    screenBtn.addEventListener('click', appData.addScreenBlock)
  },

  addTitle: function () {
    document.title = title.textContent
  },

  showResult: function () {
    totalInput.value = appData.screenPrice;
    totalCountOtherInput.value = appData.servicePricesNumber + appData.servicePricesPercent;
    totalFullCountInput.value = appData.fullPrice
  },

  addScreens: function () {
    screens = document.querySelectorAll('.screen');
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
  },

  addServices: function () {
    percentItems.forEach(function (item) {
      const check = item.querySelector('input[type=checkbox]');
      const label = item.querySelector('label');
      const input = item.querySelector('input[type=text]');
      if (check.checked) {
        appData.servicesPercent[label.textContent] = +input.value
      }
    })
    numberItems.forEach(function (item) {
      const check = item.querySelector('input[type=checkbox]');
      const label = item.querySelector('label');
      const input = item.querySelector('input[type=text]');
      if (check.checked) {
        appData.servicesNumber[label.textContent] = +input.value
      }
    })
  },

  addScreenBlock: function () {
    const cloneScreen = screens[0].cloneNode(true);
    screenBtn.before(cloneScreen);
  },

  addPrices: function () {
    appData.screenPrice = appData.screens.reduce(function (sum, current) {
      return sum + (+current.price)
    }, 0)

    for (let key in appData.servicesNumber) {
      appData.servicePricesNumber += +appData.servicesNumber[key]
    }

    for (let key in appData.servicesPercent) {
      appData.servicePricesPercent += appData.screenPrice * (appData.servicesPercent[key] / 100)
    }

    appData.fullPrice = appData.screenPrice + appData.servicePricesNumber + appData.servicePricesPercent
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
    appData.addServices();
    appData.addPrices();
    // appData.getServicePercentPrices();
    // appData.logger()
    console.log(appData);
    appData.showResult()
  }
}

appData.init()
