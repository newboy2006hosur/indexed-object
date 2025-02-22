class IndexedObject {
  constructor(items, indexKey) {
    this.items = items;
    this.indexKey = indexKey;
    this.index = {};

    this.items.forEach((item, i) => {
      const key = item[this.indexKey];
      if (key === undefined) {
        throw new Error(`Index key "${this.indexKey}" not found in item at index ${i}.`);
      }
      if (this.index[key]) {
        throw new Error(`Duplicate index key "${key}" found in item at index ${i}.`);
      }
      this.index[key] = item;
    });
  }

  [Symbol.iterator]() {
    return this.items[Symbol.iterator]();
  }

  getById(id) {
    return this.index[id] || null;
  }

  get length() {
    return this.items.length;
  }

  at(index) {
    if (index &lt; 0 || index >= this.items.length) {
      return undefined;
    }
    return this.items[index];
  }
}

module.exports = IndexedObject;
