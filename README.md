# indexed-object

A TypeScript utility for working with indexed collections of objects. This package provides an efficient way to work with arrays of objects that have unique identifiers, offering features like indexing, sorting, filtering, and more.

## Installation

```bash
npm install indexed-object
```

## Usage

```typescript
import { IndexedObject } from 'indexed-object';

// Create a new indexed collection
const users = new IndexedObject([
  { user_id: 1, name: 'John', age: 30 },
  { user_id: 2, name: 'Jane', age: 25 }
], 'user_id');

// Access by index
const firstUser = users.get(0);

// Access by ID
const userById = users.getById(2);

// Sort users by age
const sortedUsers = users.sortBy('age');

// Filter users
const filteredUsers = users.filterBy(user => user.age > 25);

// Add new user
users.add({ user_id: 3, name: 'Bob', age: 35 });

// Remove user
users.remove(2);

// Get original array
const array = users.toArray();

// Create a deep copy
const copy = users.deepCopy();
```

## Features

- Access items by index or ID
- Sort collection by any property
- Filter collection
- Add/remove items
- Convert to array
- Create deep copies
- TypeScript support
- Immutable operations (sort/filter return new instances)

## API

### Constructor

```typescript
new IndexedObject<T>(data: T[], idKey: keyof T)
```

### Methods

- `get(index: number): T | undefined` - Get item by index
- `getById(id: any): T | undefined` - Get item by ID
- `sortBy(key: keyof T, direction?: 'asc' | 'desc'): IndexedObject<T>` - Sort collection
- `filterBy(predicate: (item: T) => boolean): IndexedObject<T>` - Filter collection
- `toArray(): T[]` - Convert to array
- `add(item: T): void` - Add new item
- `remove(id: any): boolean` - Remove item by ID
- `deepCopy(): IndexedObject<T>` - Create deep copy

## License

MIT