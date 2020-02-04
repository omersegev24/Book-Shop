var gTrans = {
    title: {
        en: 'Book Shop',
        he: 'חנות ספרים'
    },
    'new-book': {
        en: 'Create new book',
        he: 'ייצר ספר חדש'
    },
    'table-title': {
        en: 'Title',
        he: 'שם הספר'
    },
    'table-price': {
        en: 'Price',
        he: 'מחיר'
    },
    action: {
        en: 'Actions',
        he: 'פעולות'
    },
    prev: {
        en: 'Prev',
        he: 'הקודם'
    },
    next: {
        en: 'Next',
        he: 'הבא'
    },
    details: {
        en: 'Book Details',
        he: 'פרטי הספר'
    },
    'new-price': {
        en: 'Enter new price',
        he: 'הכנס מחיר חדש'
    },
    update: {
        en: 'Update',
        he: 'עדכן'
    },
    'new-book': {
        en: 'Enter new book name.',
        he: 'הכנס שם של הספר'
    },
    'new-price': {
        en: 'Enter new book price.',
        he: 'הכנס מחיר של הספר'
    },
    'add': {
        en: 'Add',
        he: 'הוסף'
    },
    'read': {
        en: 'Read',
        he: 'קרא'
    },
    'delete': {
        en: 'Delete',
        he: 'מחק'
    },
    'table-id': {
        en: 'Id',
        he: 'מספר סידורי'
    },
    rate: {
        en: 'Rate:',
        he: 'דירוג'
    }
}

var gCurrLang = 'en';

function doTrans() {
    var els = document.querySelectorAll('[data-trans]');
    els.forEach(el => {
        var txt = getTrans(el.dataset.trans);
        if (el.placeholder) el.placeholder = txt;
        else el.innerText = txt;
    })
}

function getTrans(transKey) {
    var langMap = gTrans[transKey]
    if (!langMap) return 'UNKNOWN';
    var txt = langMap[gCurrLang]
    if (!txt) txt = langMap['en'];
    return txt;
}

function setLang(lang) {
    gCurrLang = lang;
}

function formatCurrency(num, lang) {
    var format = (lang === 'en') ? 'en-US' : 'he-IL';
    var currency = (lang === 'en') ? 'USD' : 'ILS';
    num = (lang === 'en') ? num : num * 3.6;
    return new Intl.NumberFormat(format, { style: 'currency', currency: currency }).format(num);
}

function getCurrLang() {
    return gCurrLang;
}