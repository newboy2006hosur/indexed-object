import { describe, it, expect } from 'vitest';
import { IndexedObject } from './index';

describe('IndexedObject', () => {
  const testData = [
    { user_id: 1, name: 'John', age: 30 },
    { user_id: 2, name: 'Jane', age: 25 },
    { user_id: 3, name: 'Bob', age: 35 }
  ];

  it('should create an instance with initial data', () => {
    const users = new IndexedObject(testData, 'user_id');
    expect(users.length).toBe(3);
  });

  it('should get item by index', () => {
    const users = new IndexedObject(testData, 'user_id');
    expect(users.get(0)).toEqual(testData[0]);
  });

  it('should get item by id', () => {
    const users = new IndexedObject(testData, 'user_id');
    expect(users.getById(2)).toEqual(testData[1]);
  });

  it('should sort items', () => {
    const users = new IndexedObject(testData, 'user_id');
    const sorted = users.sortBy('age');
    expect(sorted.get(0)?.age).toBe(25);
    expect(sorted.get(2)?.age).toBe(35);
  });

  it('should filter items', () => {
    const users = new IndexedObject(testData, 'user_id');
    const filtered = users.filterBy(user => user.age > 30);
    expect(filtered.length).toBe(1);
    expect(filtered.get(0)?.name).toBe('Bob');
  });

  it('should add new item', () => {
    const users = new IndexedObject(testData, 'user_id');
    const newUser = { user_id: 4, name: 'Alice', age: 28 };
    users.add(newUser);
    expect(users.length).toBe(4);
    expect(users.getById(4)).toEqual(newUser);
  });

  it('should remove item', () => {
    const users = new IndexedObject(testData, 'user_id');
    expect(users.remove(2)).toBe(true);
    expect(users.length).toBe(2);
    expect(users.getById(2)).toBeUndefined();
  });

  it('should create deep copy', () => {
    const users = new IndexedObject(testData, 'user_id');
    const copied = users.deepCopy();
    expect(copied.toArray()).toEqual(testData);
    expect(copied.toArray()).not.toBe(testData);
  });
});