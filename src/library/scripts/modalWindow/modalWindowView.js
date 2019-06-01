function ModalWindowView() {
  View.call(this);
  this.containerName = "addBooKModal";
  this.prepareItems();
  return this;
}
ModalWindowView.prototype = Object.create(View.prototype);
ModalWindowView.prototype.constructor = ModalWindowView;
ModalWindowView.prototype.updateContainer = function () {
  this.items.AuthorName.value = "";
  this.items.AuthorNameLast.value = "";
  this.items.rdbMustRead.checked= false;
  this.items.rdbBest.checked= false;
  this.items.rdbClassic.checked= false;
  this.items.rdbNonFiction.checked= false;
  this.items.Cost.value = "";
  this.items.ImageUrl.value = "";
  this.items.Title.value = "";
  this.onHideHint();
};
ModalWindowView.prototype.onShow = function () {
  this.container.style.display = "flex";
}
ModalWindowView.prototype.onHide = function () {
  this.container.style.display = "none";
}
ModalWindowView.prototype.onHideHint = function () {
  this.items.Hint.style.display = "none";
}
ModalWindowView.prototype.onShowHint = function () {
  this.items.Hint.style.display = "block";
}

ModalWindowView.prototype.prepareItems = function () {
  var items = this.items;
  items.AuthorName = document.getElementById("nameAuthor");
  items.AuthorNameLast = document.getElementById("lastnameAuthor");
  items.rdbMustRead = document.getElementById("radioMustRead");
  items.rdbBest = document.getElementById("radioBest");
  items.rdbClassic = document.getElementById("radioClassic");
  items.rdbNonFiction = document.getElementById("radioNon");
  items.Cost = document.getElementById("cost");
  items.ImageUrl = document.getElementById("image");
  items.Rating = 1;
  items.Title = document.getElementById("title");

  items.Hint = document.getElementById("formHint");

  items.btnSbmtForm = document.getElementById("formSubmit");
  items.btnResetForm = document.getElementById("formReset");
};