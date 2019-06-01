var urlBooks = "https://rsu-library-api.herokuapp.com/books";

function BookController() {
    Controller.call(this);
    this.addBookController = new ModalWindowController();
    this.addBookController.init();
    this.addBookController.setonAddBookEventHandler((book) => {
        this.addBook(book);
        message = `You added a new book <strong>${book.title}</strong> by <strong>${book.author.firstName} ${book.author.lastName}</strong>`;
        this.onHistoryEventHandler(message, new Date());
    });
    this.onHistoryEventHandler = function() {};
    this.lastFilteredCategory = null;
    this.view = new BookView();
    return this;
}
BookController.prototype = Object.create(Controller.prototype);
BookController.prototype.constructor = BookController;
BookController.prototype.setOnHistoryEventHandler = function(cb) {
    this.onHistoryEventHandler = cb;
};
BookController.prototype.onBtnAllBooksHandler = function() {
    this.view.changeCategorySelection(event.target)
    this.store.dropSort();
};
BookController.prototype.onBtnMostRecentHandler = function() {
    this.view.changeCategorySelection(event.target)
    this.store.sort(book => book.updatedAt, true);
};
BookController.prototype.onBtnMostPopular = function() {
    this.view.changeCategorySelection(event.target)
    this.store.sort(book => book.rating, true);
};
BookController.prototype.onBtnFreeBooksHandler = function() {
    this.view.changeCategorySelection(event.target)
    this.store.sort(book => book.cost, false);
};
BookController.prototype.onBtnCategoryFilterHandler = function(category, event) {
    this.view.changeCategorySelection(event.target)
    var store = this.store;
    store.beginUpdate();
    var message;
    try {
        store.removePropFilter("CategoryFilter");
        if (this.lastFilteredCategory === category) {
            message = `You have canceled filter by category <strong>${category}</strong>`;
            this.lastFilteredCategory = null;
        } else {
            this.lastFilteredCategory = category;
            message = `You have applied filter by category <strong>${category}</strong>`;
            store.addPropFilter(function(item) { return item.categories.includes(category); }, "CategoryFilter");
        }
        store.filter();
    } finally {
        store.endUpdate();
        this.onHistoryEventHandler(message, new Date());
    }
};
BookController.prototype.onStarClickHandlerWrapper = function(bookId, rating) {
    var store = this.store;
    var index = store.findIndex(book => book.id === bookId);
    if (index >= 0) {
        var book = store.getRealAt(index);
        book.rating = rating;
    }
    store.changed();
};
BookController.prototype.onSearchFieldChangeHandler = function() {
    var text = this.items.inpSearch.value.toLowerCase();
    const { store } = this;
    store.beginUpdate();
    try {
        store.removePropFilter("SearchAuthorAndBook");
        if (text && text !== "") {
            store.addPropFilter(function(item) {
                return item.author.firstName.toLowerCase().includes(text) ||
                    item.author.lastName.toLowerCase().includes(text) ||
                    item.title.toLowerCase().includes(text);
            }, "SearchAuthorAndBook");
        }
        store.filter();
    } finally {
        this.onHistoryEventHandler(`You have applied search by word <strong>${text}</strong>`, new Date());
        store.endUpdate();
    }
};
BookController.prototype.LoadBooks = async function() {
    await this.getDataFromServer();
};
BookController.prototype.getDataFromServer = async function() {
    const response = await request(urlBooks);
    const { store } = this;
    store.beginUpdate();
    try {
        if (response instanceof Array) {
            for (const item of response) {
                this.addBook(item);
            }
        }
    } finally {
        store.endUpdate();
    }
};
BookController.prototype.addBook = function(bookSource) {
    const book = new Book();
    book.id = generateId();
    const { author } = bookSource;
    if (author) {
        if (author.firstName) book.author.firstName = author.firstName;
        if (author.lastName) book.author.lastName = author.lastName;
    }
    const { categories } = bookSource;
    if (categories && (categories instanceof Array)) {
        for (const item of categories) {
            book.categories.push(item);
        }
    }
    if (bookSource.cost) book.cost = bookSource.cost;
    if (bookSource.createdAt) book.createdAt = bookSource.createdAt;
    if (bookSource.image_url) book.image_url = bookSource.image_url;
    if (bookSource.rating) book.rating = bookSource.rating;
    if (bookSource.title) book.title = bookSource.title;
    if (bookSource.updatedAt) book.updatedAt = bookSource.updatedAt;
    this.store.add(book);
};
BookController.prototype.onBtnAddBookHandler = function() {
    this.addBookController.setActive();
};

BookController.prototype.prepareListeners = function() {
    Controller.prototype.prepareListeners.call(this);
    var items = this.items;
    items.btnAllBooks.addEventListener("click", this.onBtnAllBooksHandler.bind(this));
    items.btnMostRecent.addEventListener("click", this.onBtnMostRecentHandler.bind(this));
    items.btnMostPopular.addEventListener("click", this.onBtnMostPopular.bind(this));
    items.btnFreeBooks.addEventListener("click", this.onBtnFreeBooksHandler.bind(this));
    items.inpSearch.addEventListener("input", debounce(this.onSearchFieldChangeHandler.bind(this), 1000));
    items.btnMustReadTitles.addEventListener("click", (event) => this.onBtnCategoryFilterHandler("must_read", event));
    items.btnBestOfList.addEventListener("click", (event) => this.onBtnCategoryFilterHandler("best", event));
    items.btnClassicNovels.addEventListener("click", (event) => this.onBtnCategoryFilterHandler("classic", event));
    items.btnNonFiction.addEventListener("click", (event) => this.onBtnCategoryFilterHandler("non_fiction", event));

    items.btnAddBook.addEventListener("click", this.onBtnAddBookHandler.bind(this));
    this.view.setOnStarClickHandler(this.onStarClickHandlerWrapper.bind(this));
};
BookController.prototype.prepareStore = async function() {
    Controller.prototype.prepareStore.call(this);
    await this.LoadBooks();
};
BookController.prototype.validation = function() {
    var items = this.items;
    if (items.title) {
        console.log(this.items);
    }
    return false;
};