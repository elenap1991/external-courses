var bookIdSymb = Symbol("bookID");
var starParentSymb = Symbol("parentStar");
var starRatingSymb = Symbol("ratingStar");
var isSelectedSymb = Symbol("selected");
var groupSymb = Symbol("group");

function BookView() {
    View.call(this);
    this.onStarClickHandler = null;
    this.containerName = "books";
    this.prepareItems();
    return this;
}
BookView.prototype = Object.create(View.prototype);
BookView.prototype.constructor = BookView;
BookView.prototype.setOnStarClickHandler = function(cb) {
    this.onStarClickHandler = cb;
};
BookView.prototype.onStarClickHandlerWrapper = function(event) {
    var id = event.target[bookIdSymb];
    var rating = event.target[starRatingSymb];
    if (this.onStarClickHandler) this.onStarClickHandler(id, rating);
};
BookView.prototype.updateContainer = function() {
    View.prototype.updateContainer.call(this);
    const { container } = this;
    for (const book of this.store) {
        container.appendChild(this.createBook(book));
    }
    var starCont = container.getElementsByTagName("path");
    for (let i = 0; i < starCont.length; i++) {
        starCont[i].addEventListener("mouseover", this.onMouseOverStar.bind(this));
        starCont[i].addEventListener("mouseout", this.onMouseOutOfStar.bind(this));
        starCont[i].addEventListener("click", this.onStarClickHandlerWrapper.bind(this));
    }
};
BookView.prototype.fillstarsTmp = function(rating, id) {
    var tmpsStar = document.getElementById(id).getElementsByTagName("svg");
    for (var i = 0; i < 5; i++) {
        var svgClass = (rating > i) ?
            " star_tmpselected" :
            " star_tmpunselected";
        var tmpClass = tmpsStar[i].getAttribute("class") + svgClass;
        tmpsStar[i].setAttribute("class", tmpClass);
    }
};
BookView.prototype.dellfillstarsTmp = function(id) {
    var star = document.getElementById(id).getElementsByTagName("svg");
    for (var i = 0; i < 5; i++) {
        var clazz = star[i].getAttribute("class").split(" ")[0];
        star[i].setAttribute("class", clazz);
    }
};
BookView.prototype.onMouseOverStar = function(event) {
    if (event.target.id !== "") {
        var rating = event.target[starRatingSymb];
        var parent = event.target[starParentSymb];
        this.fillstarsTmp(rating, parent);
    }
};
BookView.prototype.onMouseOutOfStar = function(event) {
    var parent = event.target[starParentSymb];
    if (parent) this.dellfillstarsTmp(parent);
};
BookView.prototype.addStars = function(book, bookElement) {
    var id = book.id;
    var rating = document.createElement("div");
    rating.className = "booksCont_stars";
    rating.id = id.toString();
    rating.innerHTML += star + star + star + star + star;
    bookElement.appendChild(rating);
    this.setStarsId(bookElement, id);
    this.fillstars(book.rating, bookElement);
};
BookView.prototype.setStarsId = function(book, id) {
    var stars = book.getElementsByTagName("path");
    for (var i = 0; i < 5; i++) {
        stars[i].setAttribute("id", "book_" + id + "star" + (i + 1));
        stars[i][bookIdSymb] = id;
        stars[i][starParentSymb] = "book_" + id;
        stars[i][starRatingSymb] = i + 1;
    }
};
BookView.prototype.fillstars = function(rating, bookElement) {
    var stars = bookElement.getElementsByTagName("svg");
    for (var i = 0; i < 5; i++) {
        var svgClass = (rating > i) ?
            "star_selected" :
            "star_unselected";
        stars[i].setAttribute("class", svgClass);
    }
};
BookView.prototype.createBook = function(book) {
    var bookElement = document.createElement("div");
    var img = document.createElement("img");
    var title = document.createElement("h3");
    var author = document.createElement("p");
    bookElement.className = "article_books_book";
    bookElement.id = "book_" + book.id;
    img.src = book.image_url;
    title.innerHTML = book.title;
    author.innerHTML = "by " + book.author.firstName + " " + book.author.lastName;
    bookElement.appendChild(img);
    bookElement.appendChild(title);
    bookElement.appendChild(author);
    this.addStars(book, bookElement);
    return bookElement;
};
BookView.prototype.prepareItems = function() {
    var items = this.items;
    items.btnAllBooks = document.getElementById("allBooks");
    items.btnMostRecent = document.getElementById("mostRecent");
    items.btnMostPopular = document.getElementById("mostPopular");
    items.btnFreeBooks = document.getElementById("freeBooks");
    items.topFilter = [
        items.btnAllBooks,
        items.btnMostRecent,
        items.btnMostPopular,
        items.btnFreeBooks
    ];
    items.topFilter.forEach(btn => {
        const item = btn;
        item[isSelectedSymb] = false;
        item[groupSymb] = "topFilter";
    });
    this.setSelectionItem(items.btnAllBooks);

    items.inpSearch = document.getElementById("searchBox");
    items.btnMustReadTitles = document.getElementById("MustReadTitles");
    items.btnBestOfList = document.getElementById("BestOfList");
    items.btnClassicNovels = document.getElementById("ClassicNovels");
    items.btnNonFiction = document.getElementById("NonFiction");
    items.leftFilter = [
        items.btnMustReadTitles,
        items.btnBestOfList,
        items.btnClassicNovels,
        items.btnNonFiction
    ];
    items.leftFilter.forEach(btn => {
        const item = btn;
        item[isSelectedSymb] = false;
        item[groupSymb] = "leftFilter";
    });
    items.btnAddBook = document.getElementById("buttonAdd");
};
BookView.prototype.changeCategorySelection = function(target) {
    const item = target;
    if (item[groupSymb] === "topFilter") {
        this.items.topFilter.forEach(btn => {
            if (item !== btn) this.removeSelectionItem(btn);
        })
        this.setSelectionItem(item);
    }
    if (item[groupSymb] === "leftFilter") {
        this.items.leftFilter.forEach(btn => {
            if (item !== btn) this.removeSelectionItem(btn);
        })
        if (item[isSelectedSymb]) {
            this.removeSelectionItem(item);
        } else {
            this.setSelectionItem(item);
        }
    }
};
BookView.prototype.setSelectionItem = function(elem) {
    const item = elem;
    if (!item[isSelectedSymb]) {
        item[isSelectedSymb] = true
        item.className = "selected-filter";
    }
};
BookView.prototype.removeSelectionItem = function(elem) {
    const item = elem;
    if (item[isSelectedSymb]) {
        item[isSelectedSymb] = false;
        item.className = "";
    }
};