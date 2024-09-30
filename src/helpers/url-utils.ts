export function combineUrl(baseUrl: URL | undefined, path: string | undefined) {
    const left = baseUrl ? baseUrl.toString() : '';
    const right = path || '';
    return left && endsWithSlash(left) && right && beginsWithSlash(right)
        ? left + right.substring(1)
        : left + right;
}

function beginsWithSlash(str: string) {
    return str && str.length && str.indexOf('/') === 0;
}

function endsWithSlash(str: string) {
    return str && str.length && str.lastIndexOf('/') === str.length - 1;
}
