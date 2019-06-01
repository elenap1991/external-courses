
function View() {
    return ItemContainer.call(this) || this;
}
View.prototype = Object.create(ItemContainer.prototype);
View.prototype.constructor = View;
View.prototype.prepareContainer = function (containerName) {
    this.container = document.getElementById(containerName);
};
View.prototype.clearContainer = function () {
    this.container.innerHTML = "";
};
View.prototype.updateContainer = function () {
    this.clearContainer();
};

View.prototype.initView = function (store) {
    this.store = store;
    this.prepareContainer(this.containerName);
    this.updateContainer();
};
View.prototype.getItems = function () {
    return this.items;
};
View.prototype.onUpdate = function () {
    this.updateContainer();
};