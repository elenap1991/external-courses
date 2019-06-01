function ModalWindowController() {
  Controller.call(this);
  this.view = new ModalWindowView();
  this.onAddBookEventHandler = function () { };
  return this;
};
ModalWindowController.prototype = Object.create(Controller.prototype);
ModalWindowController.prototype.constructor = ModalWindowController;
ModalWindowController.prototype.setonAddBookEventHandler = function (cb) {
  this.onAddBookEventHandler = cb;
};
ModalWindowController.prototype.setActive = function () {
  this.view.onShow();
};
ModalWindowController.prototype.hide = function () {
  this.view.onHide();
};

ModalWindowController.prototype.addBook = function (e) {
  if (this.validation()) {
    const bookSource = this.createBookSource();
    this.onAddBookEventHandler(bookSource);
    this.hide();
    this.view.updateContainer();
    }
};

ModalWindowController.prototype.createBookSource = function () {
  console.log("click");
  const book = new Book();
  const { items } = this;
  book.author = {};
  book.author.firstName = items.AuthorName.value;
  book.author.lastName = items.AuthorNameLast.value;
  book.categories = [];
  if (items.rdbMustRead.checked) {
    book.categories.push("must_read");
  }
  if (items.rdbBest.checked) {
    book.categories.push("best");
  }
  if (items.rdbClassic.checked) {
    book.categories.push("classic");
  }
  if (items.rdbNonFiction.checked) {
    book.categories.push("non_fiction");
  }
  book.cost = items.Cost.value;
  book.image_url = items.ImageUrl.value;
  book.rating = 0;
  book.title = items.Title.value;
  book.createdAt = new Date();
  book.updatedAt = new Date();
  return book;
}
ModalWindowController.prototype.validation = function () {
  const itemsModal = this.view.items;
  let result;
  if (itemsModal.Title.value.length !== 0 && itemsModal.AuthorName.value.length !== 0 && itemsModal.AuthorNameLast.value.length !== 0 && itemsModal.Cost.value.length !== 0 && itemsModal.ImageUrl.value.length !== 0) {
    result = true;
  } else {
    this.view.onShowHint();
    result = false;
  }
  return result;
};

ModalWindowController.prototype.prepareListeners = function () {
  Controller.prototype.prepareListeners.call(this);
  var items = this.items;
  items.btnResetForm.addEventListener("click", this.hide.bind(this));
  items.btnSbmtForm.addEventListener("click", this.addBook.bind(this));
};