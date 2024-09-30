/**
 * Returns a new array with values in reverse order.
 */
export function reverse<T>(array: T[]): T[] {
	const result: T[] = [];
	array.forEach(item => { result.splice(0, 0, item); });
	return result;
}

/**
 * Creates a map of the given items grouped by a key.
 */
export function groupBy<T>(items: T[], getKey: (item: T) => string): ({ [key: string]: T[] }) {
    return items.reduce((map, item) => {
        const key = getKey(item);
        if (!(key in map))
            map[key] = [];
        map[key].push(item);
        return map;
    }, {} as { [key: string]: T[] });
}
