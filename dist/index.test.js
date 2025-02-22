"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("./index"));
const usersData = [
    { user_id: '1', name: 'John Doe', email: 'john@example.com' },
    { user_id: '2', name: 'Jane Doe', email: 'jane@example.com' },
];
describe('IndexedObject', () => {
    let users;
    User, 'user_id' > ;
    beforeEach(() => {
        users = new index_1.default(usersData, 'user_id');
    });
    it('should create an IndexedObject instance', () => {
        expect(users).toBeInstanceOf(index_1.default);
    });
    it('should access items by index', () => {
        expect(users.at(0)).toEqual(usersData[0]);
        expect(users.at(1)).toEqual(usersData[1]);
        expect(users.at(2)).toBeUndefined();
    });
    it('should access items by ID', () => {
        expect(users.getById('1')).toEqual(usersData[0]);
        expect(users.getById('2')).toEqual(usersData[1]);
        expect(users.getById('3')).toBeNull();
    });
    it('should sort items by a key', () => {
        var _a, _b;
        const sortedUsers = users.sortBy('name');
        expect((_a = sortedUsers.at(0)) === null || _a === void 0 ? void 0 : _a.name).toBe('Jane Doe');
        expect((_b = sortedUsers.at(1)) === null || _b === void 0 ? void 0 : _b.name).toBe('John Doe');
    });
    it('should filter items by a predicate', () => {
        var _a;
        const filteredUsers = users.filterBy(user => user.email.includes('john@example.com'));
        expect(filteredUsers.length).toBe(1);
        expect((_a = filteredUsers.at(0)) === null || _a === void 0 ? void 0 : _a.name).toBe('John Doe');
    });
    it('should convert to an array', () => {
        const usersArray = users.toArray();
        expect(usersArray).toEqual(usersData);
    });
    it('should add data', () => {
        users.addData({ user_id: '3', name: 'Mike Smith', email: 'mike@example.com' });
        expect(users.getById('3')).toEqual({ user_id: '3', name: 'Mike Smith', email: 'mike@example.com' });
        expect(users.length).toBe(3);
    });
    it('should remove data', () => {
        users.removeData('1');
        expect(users.getById('1')).toBeNull();
        expect(users.length).toBe(1);
    });
    it('should throw an error if index key is not found', () => {
        expect(() => new index_1.default([{ name: 'John' }], 'user_id')).toThrowError('Index key "user_id" not found in item at index 0.');
    });
    it('should throw an error if duplicate index key is found', () => {
        expect(() => new index_1.default([{ user_id: '1' }, { user_id: '1' }], 'user_id')).toThrowError('Duplicate index key "1" found in item at index 1.');
    });
});
//# sourceMappingURL=index.test.js.map