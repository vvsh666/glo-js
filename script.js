const books = document.querySelector('.books');
const bookList = document.querySelectorAll('.book');
const titleChange = bookList[4].querySelector('h2 a');
const adv = document.querySelector('.adv');
const listItem2 = bookList[0].querySelectorAll('li');
const listItem5 = bookList[5].querySelectorAll('li');
const listItem6 = bookList[2].querySelectorAll('li');

const li = document.createElement('li');
li.textContent = 'Глава 8: За пределами ES6';

books.prepend(bookList[1]);
books.append(bookList[2]);
bookList[3].before(bookList[4]);

document.body.style.backgroundImage = "url('./image/you-dont-know-js.jpg')";

titleChange.textContent = 'Книга 3. this и Прототипы Объектов';

adv.remove();

listItem2[10].before(listItem2[2]);
listItem2[9].before(listItem2[7]);
listItem2[3].after(listItem2[6]);
listItem2[4].before(listItem2[8]);

listItem5[1].after(listItem5[9]);
listItem5[4].after(listItem5[2]);
listItem5[7].after(listItem5[5]);

listItem6[8].insertAdjacentElement('afterend', li)