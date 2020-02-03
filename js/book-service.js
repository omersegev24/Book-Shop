'use strict';

const KEY = 'books';
const BOOK_IN_PAGE = 3;

var gCurrPage = 1;
var gBooks = _createBooks();

var gCurrBook = null;

function getBooksForDisplay() {
    var from = (gCurrPage - 1) * BOOK_IN_PAGE;
    var to = from + BOOK_IN_PAGE;
    return gBooks.slice(from, to);
}

function changePage(diff) {
    gCurrPage += diff;
    var lastPage = Math.ceil(gBooks.length / BOOK_IN_PAGE);

    if (gCurrPage > lastPage) gCurrPage = 1;
    else if (gCurrPage < 1) gCurrPage = lastPage;
}

function pickPage(value) {
    gCurrPage = value;
}

function removeBook(bookId) {
    var idx = gBooks.findIndex(function (book) {
        return book.id === bookId;
    })
    gBooks.splice(idx, 1);
    saveToStorage(KEY, gBooks);
}

function addBook(name, price) {
    var book = _createBook(name, price);
    book.imgUrl = 'img/no-img.png';
    gBooks.push(book);
    saveToStorage(KEY, gBooks);
}

function updateBook(bookId, bookPrice) {
    var idx = gBooks.findIndex(book => book.id === bookId)
    gBooks[idx].price = bookPrice;
    saveToStorage(KEY, gBooks);
}

function getBookById(bookId) {
    var book = gBooks.find(book => book.id === bookId);
    gCurrBook = book;
    return book
}

function getBookByName(bookName) {
    var book = gBooks.find(book => book.name === bookName);
    gCurrBook = book;
    return book
}

function setRate(value) {
    gCurrBook.rate = value;
    saveToStorage(KEY, gBooks);
}

function sortByName() {
    gBooks.sort((a, b) => {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0;
    });
}

function sortByPrice() {
    gBooks.sort((a, b) => a.price - b.price);
}

function _createBooks() {
    var books = loadFromStorage(KEY);
    if (books) return books;

    var books = [
        _createBook('The Lost Man', 17, 'img/the-lost-man.jpg'),
        _createBook('Grumpy Monkey', 8, 'img/grumpy-monkey.jpg'),
        _createBook('Wings Of Fire', 15.22, 'img/wings-of-fire.jpg')
    ]
    saveToStorage(KEY, books);
    return books;
}

function _createBook(name, price, imgUrl = '') {
    return {
        id: parseInt(Math.random() * 1000),
        name: name,
        price: price,
        imgUrl: imgUrl,
        rate: 0
    };
}

function getBooksNum() {
    return Math.ceil(gBooks.length / BOOK_IN_PAGE);
}