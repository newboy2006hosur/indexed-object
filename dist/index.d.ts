export interface IndexedObjectOptions<T> {
    idKey: keyof T;
}
export declare class IndexedObject<T extends Record<string, any>> {
    private data;
    private idKey;
    private idMap;
    constructor(data: T[], idKey: keyof T);
    private buildIdMap;
    [Symbol.iterator](): Iterator<T>;
    get length(): number;
    getById(id: any): T | undefined;
    sortBy(key: keyof T, direction?: 'asc' | 'desc'): IndexedObject<T>;
    filterBy(predicate: (item: T) => boolean): IndexedObject<T>;
    toArray(): T[];
    add(item: T): void;
    remove(id: any): boolean;
    deepCopy(): IndexedObject<T>;
    get(index: number): T | undefined;
}
