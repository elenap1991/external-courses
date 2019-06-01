function HistoryController() {
    Controller.call(this);
    this.view = new HistoryView();
    return this;
}
HistoryController.prototype = Object.create(Controller.prototype);
HistoryController.prototype.constructor = HistoryController;
HistoryController.prototype.onNewEvent = function (event, time) {
    var record = new HistoryRecord();
    record.event = event;
    record.time = time;
    var store = this.store;
    store.beginUpdate();
    try {
        store.add(record);
        store.sort((item) => item.time, true);
    }
    finally {
        store.endUpdate();
    }
};