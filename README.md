# IndexedObject

A class that indexes an array of objects by a specified key for easy access.

## Usage

```typescript
import IndexedObject from './src/index';

interface User {
  user_id: string;
  name: string;
  email: string;
}

const users = new IndexedObject&lt;User, 'user_id'>([
  { user_id: '1', name: 'John Doe', email: 'john@example.com' },
  { user_id: '2', name: 'Jane Doe', email: 'jane@example.com' },
], 'user_id');

// Access by index
console.log(users.at(0)); // { user_id: '1', name: 'John Doe', email: 'john@example.com' }

// Access by ID
console.log(users.getById('2')); // { user_id: '2', name: 'Jane Doe', email: 'jane@example.com' }

// Sort by name
const sortedUsers = users.sortBy('name');
console.log(sortedUsers.at(0)); // { user_id: '2', name: 'Jane Doe', email: 'jane@example.com' }

// Filter by email
const filteredUsers = users.filterBy(user => user.email.includes('example.com'));
console.log(filteredUsers.length); // 2

// Convert to array
const usersArray = users.toArray();
console.log(usersArray); // [{ user_id: '1', name: 'John Doe', email: 'john@example.com' }, { user_id: '2', name: 'Jane Doe', email: 'jane@example.com' }]

// Add data
users.addData({ user_id: '3', name: 'Mike Smith', email: 'mike@example.com' });
console.log(users.getById('3')); // { user_id: '3', name: 'Mike Smith', email: 'mike@example.com' }

// Remove data
users.removeData('1');
console.log(users.getById('1')); // null
```

## API

### `constructor(items: T[], indexKey: K)`

Creates a new `IndexedObject` instance.

*   `items`: An array of objects to index.
*   `indexKey`: The key to use as the index.

### `getById(id: string | number): T | null`

Returns the object with the specified ID, or `null` if not found.

### `sortBy(key: keyof T): IndexedObject&lt;T, K>`

Returns a new `IndexedObject` instance with the items sorted by the specified key.

### `filterBy(predicate: (item: T) => boolean): IndexedObject&lt;T, K>`

Returns a new `IndexedObject` instance with the items filtered by the specified predicate.

### `toArray(): T[]`

Returns a new array containing all the items in the `IndexedObject`.

### `addData(item: T): void`

Adds a new item to the `IndexedObject`.

### `removeData(id: string | number): void`

Removes the item with the specified ID from the `IndexedObject`.
