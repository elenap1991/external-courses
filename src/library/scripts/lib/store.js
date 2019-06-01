function Store() {
    this.items = [];
    this.sortedIndexes = [];
    this.filteredIndexes = [];
    this.filterRules = [];
    this.delegateList = [];
    this.suppressedChanges = 0;
}
Store.prototype.changed = function() {
    if (this.suppressedChanges === 0) {
        for (const delegate of this.delegateList) {
            delegate();
        }
    }
};
Store.prototype.beginUpdate = function() {
    this.suppressedChanges++;
};
Store.prototype.endUpdate = function() {
    if (this.suppressedChanges === 0) {
        throw new Error("Cant resume unsupressed events");
    }
    this.suppressedChanges--;
    this.changed();
};
Store.prototype.add = function(item) {
    this.items.push(item);
    this.sortedIndexes.push(this.sortedIndexes.length);
    this.filter();
};
Store.prototype.resetFilteredIndexes = function() {
    this.filteredIndexes = [...this.sortedIndexes];
};
Store.prototype.filter = function() {
    this.resetFilteredIndexes();
    for (const rule of this.filterRules) {
        this.applyFilterRule(rule.prop);
    }
    this.changed();
};
Store.prototype.applyFilterRule = function(rule) {
    var result = [];
    var filteredIndexes = this.filteredIndexes;
    for (const index of filteredIndexes) {
        if (rule(this.getRealAt(index))) {
            result.push(index);
        }
    }
    this.filteredIndexes = result;
};
Store.prototype.sort = function(propGetter, desc) {
    var items = this.items;
    var res = desc ? -1 : 1;
    this.sortedIndexes.sort(function(a, b) {
        if (propGetter(items[a]) > propGetter(items[b])) {
            return res;
        }
        if (propGetter(items[a]) < propGetter(items[b])) {
            return -res;
        }
        return 0;
    });
    this.filter();
};
Store.prototype.dropSort = function() {
    var sortedIndexes = this.sortedIndexes;
    for (var i = 0; i < sortedIndexes.length; i++) {
        sortedIndexes[i] = i;
    }
    this.filter();
};
Store.prototype.addPropFilter = function(propFunc, keyValue) {
    this.filterRules.push({ key: keyValue, prop: propFunc });
};
Store.prototype.removePropFilter = function(key) {
    var index = this.filterRules.findIndex(function(obj) { return obj.key === key; });
    if (index >= 0) {
        this.filterRules.splice(index, 1);
    }
};
Store.prototype.findIndex = function(cb) {
    var items = this.items;
    for (var i = 0; i < items.length; i++) {
        var value = items[i];
        if (cb(value)) {
            return i;
        }
    }
    return -1;
};
Store.prototype.getRealAt = function(index) {
    return this.items[index];
};
Store.prototype.getFilteredAt = function(index) {
    return this.getRealAt(this.filteredIndexes[index]);
};
Store.prototype.getAt = function(index) {
    return this.getFilteredAt(index);
};
Store.prototype.subscribe = function(delegate) {
    this.delegateList.push(delegate);
};
Store.prototype.unsubscribe = function(delegate) {
    var index = this.delegateList.indexOf(delegate);
    if (index >= 0) {
        this.delegateList.splice(index, 1);
    }
};
Store.prototype[Symbol.iterator] = function*() {
    for (const item of this.filteredIndexes) {
        yield this.getRealAt(item);
    }
};