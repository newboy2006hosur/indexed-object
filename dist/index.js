"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_sortby_1 = __importDefault(require("lodash.sortby"));
class IndexedObject {
}
 & lt;
T;
Record & lt;
K, string | number > , K;
keyof;
T = keyof;
T > {
    items: T[],
    indexKey: K,
    index: { [key]: string | number, T },
    constructor(items, indexKey) {
        this.items = items;
        this.indexKey = indexKey;
        this.index = {};
        this.items.forEach((item, i) => {
            const key = item[this.indexKey];
            if (key === undefined) {
                throw new Error(`Index key "${String(this.indexKey)}" not found in item at index ${i}.`);
            }
            if (typeof key !== 'string' && typeof key !== 'number') {
                throw new Error(`Index key "${String(this.indexKey)}" must be a string or number, but got ${typeof key} in item at index ${i}.`);
            }
            if (this.index[key]) {
                throw new Error(`Duplicate index key "${key}" found in item at index ${i}.`);
            }
            this.index[key] = item;
        });
    },
    T
} > {
    return: this.items[Symbol.iterator]()
};
getById(id, string | number);
T | null;
{
    return this.index[id] || null;
}
get;
length();
number;
{
    return this.items.length;
}
at(index, number);
T | undefined;
{
    if (index & lt)
        ;
    0 || index >= this.items.length;
    {
        return undefined;
    }
    return this.items[index];
}
(0, lodash_sortby_1.default)(key, keyof, T);
IndexedObject & lt;
T, K > {
    const: sortedItems = (0, lodash_sortby_1.default)(this.items, key),
    return: new IndexedObject(sortedItems, this.indexKey)
};
filterBy(predicate, (item) => boolean);
IndexedObject & lt;
T, K > {
    const: filteredItems = this.items.filter(predicate),
    return: new IndexedObject(filteredItems, this.indexKey)
};
toArray();
T[];
{
    return [...this.items];
}
addData(item, T);
void {
    const: key = item[this.indexKey],
    if(key) { }
} === undefined;
{
    throw new Error(`Index key "${String(this.indexKey)}" not found in item.`);
}
if (typeof key !== 'string' && typeof key !== 'number') {
    throw new Error(`Index key "${String(this.indexKey)}" must be a string or number, but got ${typeof key}.`);
}
if (this.index[key]) {
    throw new Error(`Duplicate index key "${key}" found.`);
}
this.items.push(item);
this.index[key] = item;
removeData(id, string | number);
void {
    const: itemToRemove = this.getById(id),
    if(itemToRemove) {
        this.items = this.items.filter(item => item !== itemToRemove);
        delete this.index[id];
    }
};
exports.default = IndexedObject;
//# sourceMappingURL=index.js.map