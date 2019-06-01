function Controller() {
    return ItemContainer.call(this);
}
Controller.prototype = Object.create(ItemContainer.prototype);
Controller.prototype.constructor = Controller;
Controller.prototype.init = function () {
    this.store = new Store();
    this.view.initView(this.store);
    this.items = this.view.getItems();
    this.prepareListeners();
    this.prepareStore();
};
Controller.prototype.prepareListeners = function () {
    var _this = this;
    this.store.subscribe(() => _this.view.onUpdate());
};
Controller.prototype.prepareStore = function () {
};
