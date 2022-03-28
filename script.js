'use strict';

const title = prompt('Как называется ваш проект?', 'JS Project');
const screens = prompt('Какие типы экранов нужно разработать?', 'Простые, Сложные, Интерактивные');
const screenPrice = +prompt('Сколько будет стоить данная работа?', 12000);
const adaptive = confirm('Нужен ли адаптив на сайте?');
const service1 = prompt('Какой дополнительный тип услуги нужен?', 'Первый');
const servicePrice1 = +prompt('Сколько это будет стоить?', 10000);
const service2 = prompt('Какой дополнительный тип услуги нужен?', 'Второй');
const servicePrice2 = +prompt('Сколько это будет стоить?', 5000);
const rollback = 25;
const fullPrice = screenPrice + servicePrice1 + servicePrice2;
const servicePercentPrice = Math.floor(fullPrice * (100 - rollback) / 100);

console.log(servicePercentPrice);

if (fullPrice >= 0 && fullPrice < 15000) {
  console.log('Скидка не предусмотрена')
} else if (fullPrice >= 15000 && fullPrice < 30000) {
  console.log('Даем скидку в 5%')
} else if (fullPrice >= 30000) {
  console.log('Даем скидку в 10 %')
} else {
  console.log('Что то пошло не так')
}