function MainController() {
    return Controller.call(this);
}
MainController.prototype = Object.create(MainController.prototype);
MainController.prototype.constructor = Controller;
MainController.prototype.init = function () {
    this.bookController = new BookController();
    this.bookController.init();
    this.historyController = new HistoryController();
    this.bookController.setOnHistoryEventHandler(this.historyController.onNewEvent.bind(this.historyController));
    this.historyController.init();
};

