function HistoryView() {
    var _this = View.call(this);
    _this.containerName = "history";
    return _this;
}
HistoryView.prototype = Object.create(View.prototype);
HistoryView.prototype.constructor = HistoryView;
HistoryView.prototype.updateContainer = function() {
    View.prototype.updateContainer.call(this);
    const { container } = this;
    for (const record of this.store) {
        container.appendChild(this.createRecord(record));
    }
};
HistoryView.prototype.createRecord = function(record) {
    var recordElement = document.createElement("div");
    recordElement.className = "navigation__item-history";
    var message = document.createElement("p");
    message.innerHTML = record.event;
    var time = document.createElement("p");
    time.className = "navigation__clock";
    var currentTime = new Date();
    time.innerHTML = Math.round((currentTime.getTime() - record.time.getTime()) / 1000 / 60) + " minutes ago";
    recordElement.appendChild(message);
    recordElement.appendChild(time);
    return recordElement;
};