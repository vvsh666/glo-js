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

const customCheckbox = document.querySelectorAll('.custom-checkbox');

let screens = document.querySelectorAll('.screen');

const appData = {
  title: '',
  screens: [],
  screenPrice: 0,
  screenCount: 0,
  adaptive: true,
  rollback: 0,
  servicePricesPercent: 0,
  servicePricesNumber: 0,
  fullPrice: 0,
  servicePercentPrice: 0,
  servicesPercent: {},
  servicesNumber: {},

  init: function () {
    this.addTitle();
    startBtn.addEventListener('click', () => {
      this.start()
    });
    screenBtn.addEventListener('click', this.addScreenBlock);
    rangeInput.addEventListener('input', () => {
      this.addRollback()
    });
    resetBtn.addEventListener('click', () => {
      this.reset()
    })
  },

  start: function () {
    if (this.checkInputs()) {
      this.screens = [];
      this.servicesPercent = {};
      this.servicesNumber = {};
      this.servicePricesPercent = 0;
      this.servicePricesNumber = 0;
      this.addScreens();
      this.addServices();
      this.addPrices();
      // this.logger();
      this.showResult();
      this.disableInputs();
      this.showResetBtn()
    }
  },

  addTitle: function () {
    document.title = title.textContent;
    this.title = title.textContent
  },

  checkInputs: () => {
    let check = true
    screens = document.querySelectorAll('.screen');
    screens.forEach((screen) => {
      const select = screen.querySelector('select');
      const input = screen.querySelector('input');
      if (select.value === '' || input.value === '') {
        check = false
      }
    })
    return check
  },

  disableInputs: () => {
    screens = document.querySelectorAll('.screen');
    screens.forEach((screen) => {
      screen.querySelector('select').disabled = true;
      screen.querySelector('input').disabled = true
    })
  },

  showResetBtn: () => {
    startBtn.style.display = 'none';
    resetBtn.style.display = 'flex'
  },

  reset: function () {
    this.title = '';
    this.screens = [];
    this.screenPrice = 0;
    this.screenCount = 0;
    this.adaptive = true;
    this.rollback = 0;
    this.servicePricesPercent = 0;
    this.servicePricesNumber = 0;
    this.fullPrice = 0;
    this.servicePercentPrice = 0;
    this.servicesPercent = {};
    this.servicesNumber = {};

    for (let i = 1; i < screens.length; i++) {
      screens[i].remove()
    }

    screens[0].querySelector('input').value = '';
    screens[0].querySelector('select').value = '';
    screens[0].querySelector('input').disabled = false;
    screens[0].querySelector('select').disabled = false;

    customCheckbox.forEach((item) => {
      item.checked = false
    });

    rangeInput.value = 0;
    rangeValue.textContent = rangeInput.value + '%';

    for (let i = 0; i < totalInputs.length; i++) {
      totalInputs[i].value = 0
    }
    startBtn.style.display = 'flex';
    resetBtn.style.display = 'none'
  },

  showResult: function () {
    totalInput.value = this.screenPrice;
    totalCountOtherInput.value = this.servicePricesNumber + this.servicePricesPercent;
    totalFullCountInput.value = this.fullPrice;
    totalCountRollbackInput.value = this.servicePercentPrice;
    totalCountInput.value = this.screenCount
  },

  addScreens: function () {
    screens = document.querySelectorAll('.screen');
    screens.forEach((screen, index) => {
      const select = screen.querySelector('select');
      const input = screen.querySelector('input');
      const selectName = select.options[select.selectedIndex].textContent;

      this.screens.push({
        id: index,
        name: selectName,
        price: +select.value * +input.value,
        count: +input.value
      })
    })
  },

  addServices: function () {
    percentItems.forEach((item) => {
      const check = item.querySelector('input[type=checkbox]');
      const label = item.querySelector('label');
      const input = item.querySelector('input[type=text]');
      if (check.checked) {
        this.servicesPercent[label.textContent] = +input.value
      }
    })
    numberItems.forEach((item) => {
      const check = item.querySelector('input[type=checkbox]');
      const label = item.querySelector('label');
      const input = item.querySelector('input[type=text]');
      if (check.checked) {
        this.servicesNumber[label.textContent] = +input.value
      }
    })
  },

  addScreenBlock: () => {
    const cloneScreen = screens[0].cloneNode(true);
    cloneScreen.querySelector('input[type=text]').value = ''
    screenBtn.before(cloneScreen);
  },

  addRollback: function () {
    rangeValue.textContent = rangeInput.value + '%';
    this.rollback = +rangeInput.value
    totalCountRollbackInput.value = Math.floor(this.fullPrice * (100 - rangeInput.value) / 100)
  },

  addPrices: function () {
    this.screenPrice = this.screens.reduce(function (sum, current) {
      return sum + (+current.price)
    }, 0);

    this.screenCount = this.screens.reduce(function (sum, current) {
      return sum + (+current.count)
    }, 0);

    for (let key in this.servicesNumber) {
      this.servicePricesNumber += +this.servicesNumber[key]
    }

    for (let key in this.servicesPercent) {
      this.servicePricesPercent += this.screenPrice * (this.servicesPercent[key] / 100)
    }

    this.fullPrice = this.screenPrice + this.servicePricesNumber + this.servicePricesPercent;

    this.servicePercentPrice = Math.floor(this.fullPrice * (100 - this.rollback) / 100)
  },

  logger: function () {
    for (let key in this) {
      console.log('Ключ:' + key + ' Значение:' + this[key])
    }
  }

}

appData.init()

