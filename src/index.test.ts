import IndexedObject from './index';

interface User {
  user_id: string;
  name: string;
  email: string;
}

const usersData: User[] = [
  { user_id: '1', name: 'John Doe', email: 'john@example.com' },
  { user_id: '2', name: 'Jane Doe', email: 'jane@example.com' },
];

describe('IndexedObject', () => {
  let users: IndexedObject&lt;User, 'user_id'>;

  beforeEach(() => {
    users = new IndexedObject(usersData, 'user_id');
  });

  it('should create an IndexedObject instance', () => {
    expect(users).toBeInstanceOf(IndexedObject);
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
    const sortedUsers = users.sortBy('name');
    expect(sortedUsers.at(0)?.name).toBe('Jane Doe');
    expect(sortedUsers.at(1)?.name).toBe('John Doe');
  });

  it('should filter items by a predicate', () => {
    const filteredUsers = users.filterBy(user => user.email.includes('john@example.com'));
    expect(filteredUsers.length).toBe(1);
    expect(filteredUsers.at(0)?.name).toBe('John Doe');
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
    expect(() => new IndexedObject([{ name: 'John' }], 'user_id' as any)).toThrowError('Index key "user_id" not found in item at index 0.');
  });

  it('should throw an error if duplicate index key is found', () => {
    expect(() => new IndexedObject([{ user_id: '1' }, { user_id: '1' }], 'user_id')).toThrowError('Duplicate index key "1" found in item at index 1.');
  });
});
