export interface IndexedObjectOptions<T> {
  idKey: keyof T;
}

export class IndexedObject<T extends Record<string, any>> {
  private data: T[];
  private idKey: keyof T;
  private idMap: Map<any, T>;

  constructor(data: T[], idKey: keyof T) {
    this.idKey = idKey;
    this.data = [...data];
    this.idMap = new Map();
    this.buildIdMap();
  }

  private buildIdMap(): void {
    this.idMap.clear();
    for (const item of this.data) {
      this.idMap.set(item[this.idKey], item);
    }
  }

  public [Symbol.iterator](): Iterator<T> {
    return this.data[Symbol.iterator]();
  }

  public get length(): number {
    return this.data.length;
  }

  public getById(id: any): T | undefined {
    return this.idMap.get(id);
  }

  public sortBy(key: keyof T, direction: 'asc' | 'desc' = 'asc'): IndexedObject<T> {
    const sortedData = [...this.data].sort((a, b) => {
      const valueA = a[key];
      const valueB = b[key];
      
      if (valueA < valueB) return direction === 'asc' ? -1 : 1;
      if (valueA > valueB) return direction === 'asc' ? 1 : -1;
      return 0;
    });

    return new IndexedObject(sortedData, this.idKey);
  }

  public filterBy(predicate: (item: T) => boolean): IndexedObject<T> {
    const filteredData = this.data.filter(predicate);
    return new IndexedObject(filteredData, this.idKey);
  }

  public toArray(): T[] {
    return [...this.data];
  }

  public add(item: T): void {
    const id = item[this.idKey];
    if (this.idMap.has(id)) {
      throw new Error(`Item with id ${String(id)} already exists`);
    }
    this.data.push(item);
    this.idMap.set(id, item);
  }

  public remove(id: any): boolean {
    const index = this.data.findIndex(item => item[this.idKey] === id);
    if (index === -1) return false;

    this.data.splice(index, 1);
    this.idMap.delete(id);
    return true;
  }

  public deepCopy(): IndexedObject<T> {
    const copiedData = this.data.map(item => JSON.parse(JSON.stringify(item)));
    return new IndexedObject(copiedData, this.idKey);
  }

  public get(index: number): T | undefined {
    return this.data[index];
  }
}