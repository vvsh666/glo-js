const title = 'JS Project';
const screens = "Простые, Сложные, Интерактивные";
const screenPrice = 2000;
const rollback = 25;
const fullPrice = 50000;
const adaptive = true

console.log('title: ', typeof title);
console.log('fullPrice: ', typeof fullPrice);
console.log('adaptive: ', typeof adaptive);
console.log(screens.length)
console.log(`Стоимость верстки экранов ${screenPrice} рублей`)
console.log(`Стоимость разработки сайта ${fullPrice} рублей`)
console.log(screens.toLowerCase().split(', '));
console.log(fullPrice * (rollback/100));