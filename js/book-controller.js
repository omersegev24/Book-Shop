'use strict';

function onInit() {
    renderBooks();
}

function renderBooks() {
    var books = getBooksForDisplay();
    var strHTMLs = books.map(function (book) {
        return `
        <tr> 
            <td>${book.id}</td>
            <td>${book.name}</td>
            <td>${book.price}$ </td>
            <td>
            <button class="btn btn-read" title="Book Details" onclick="onShowBookDetails(event, ${book.id})">Read</button>
            <button class="btn btn-update" title="Edit Book" onclick="onOpenUpdateModal(event, ${book.id})">Update</button>
            <button class="btn btn-delete" onclick="onRemoveBook(event, ${book.id})">Delete</button>
            </td>
        </tr>`;
    });
    var elBookList = document.querySelector('.book-table-body');
    elBookList.innerHTML = strHTMLs.join('');
    renderBtnPages();
}

function renderBtnPages(){
    var buttonsNum = getBooksNum();
    var strHTMLs = '';
    for(var i = 1; i <= buttonsNum; i++){
        strHTMLs += `<button class="page-btn" onclick="onPickPage(${i})">${i}</button>`
    }
    var elbtnList = document.querySelector('.num-page-btns');
    elbtnList.innerHTML = strHTMLs;
}

function onRemoveBook(event, bookId) {
    event.stopPropagation();
    var isSure = confirm('Are you sure?');
    if (isSure) {
        removeBook(bookId);
        renderBooks();
    }
}

function onOpenAddModal(){
    document.querySelector('.new-book-modal').hidden = false;
}
function onCloseAddModal(){
    document.querySelector('.new-book-modal').hidden = true;
}

function onAddBook() {
    var name = document.querySelector('.name-input').value;
    var price = document.querySelector('.new-price-input').value;

    if (!price || !name) return;

    addBook(name, price);
    renderBooks();
    onCloseAddModal();
    document.querySelector('.name-input').value = '';
    document.querySelector('.new-price-input').value = '';
}

function onOpenUpdateModal(event, bookId) {
    event.stopPropagation();
    document.querySelector('.update-modal').hidden = false;
    var book = getBookById(bookId);
    document.querySelector('.update-modal h4').innerText = book.name;
}

function onUpdateBook() {
    var name = document.querySelector('.update-modal h4').innerText;
    var book = getBookByName(name);
    var newPrice = document.querySelector('.price-input').value;
    if (newPrice) {
        updateBook(book.id, newPrice);
        renderBooks();
    }
    document.querySelector('.update-modal').hidden = true;
    document.querySelector('.price-input').value = '';
}

function onShowBookDetails(event, bookId) {
    event.stopPropagation();
    var book = getBookById(bookId);
    var elModal = document.querySelector('.book-modal');
    elModal.querySelector('h3').innerText = book.name;
    elModal.querySelector('img').src = book.imgUrl;
    elModal.querySelector('h4').innerText = `Price: ${book.price}$`;
    elModal.querySelector('h5').innerText = `Rate: ${book.rate}`;
    elModal.hidden = false;
}

function onCloseModalDeatils() {
    document.querySelector('.book-modal').hidden = true;
}

function onSetRate(diff) {
    var elInput = document.querySelector('.rate-input');
    if (elInput.value === '0' && !diff) return;
    if (elInput.value === '10' && diff) return;
    (diff) ? elInput.value++ : elInput.value--;
    setRate(elInput.value);
    document.querySelector('.book-modal h5').innerText = `Rate: ${elInput.value}`;
}

function onSortByName(){
    sortByName();
    renderBooks();
}

function onSortByPrice(){
    sortByPrice();
    renderBooks();
}

function onChangePage(diff) {
    changePage(diff)
    renderBooks();
}

function onPickPage(value){
    pickPage(value);
    renderBooks();
}
