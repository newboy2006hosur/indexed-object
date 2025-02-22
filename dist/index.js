"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IndexedObject = void 0;
class IndexedObject {
    constructor(data, idKey) {
        this.idKey = idKey;
        this.data = [...data];
        this.idMap = new Map();
        this.buildIdMap();
    }
    buildIdMap() {
        this.idMap.clear();
        for (const item of this.data) {
            this.idMap.set(item[this.idKey], item);
        }
    }
    [Symbol.iterator]() {
        return this.data[Symbol.iterator]();
    }
    get length() {
        return this.data.length;
    }
    getById(id) {
        return this.idMap.get(id);
    }
    sortBy(key, direction = 'asc') {
        const sortedData = [...this.data].sort((a, b) => {
            const valueA = a[key];
            const valueB = b[key];
            if (valueA < valueB)
                return direction === 'asc' ? -1 : 1;
            if (valueA > valueB)
                return direction === 'asc' ? 1 : -1;
            return 0;
        });
        return new IndexedObject(sortedData, this.idKey);
    }
    filterBy(predicate) {
        const filteredData = this.data.filter(predicate);
        return new IndexedObject(filteredData, this.idKey);
    }
    toArray() {
        return [...this.data];
    }
    add(item) {
        const id = item[this.idKey];
        if (this.idMap.has(id)) {
            throw new Error(`Item with id ${String(id)} already exists`);
        }
        this.data.push(item);
        this.idMap.set(id, item);
    }
    remove(id) {
        const index = this.data.findIndex(item => item[this.idKey] === id);
        if (index === -1)
            return false;
        this.data.splice(index, 1);
        this.idMap.delete(id);
        return true;
    }
    deepCopy() {
        const copiedData = this.data.map(item => JSON.parse(JSON.stringify(item)));
        return new IndexedObject(copiedData, this.idKey);
    }
    get(index) {
        return this.data[index];
    }
}
exports.IndexedObject = IndexedObject;
