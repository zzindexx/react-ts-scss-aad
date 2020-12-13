export interface HashTable<T> {
    [key: string]: T;
}

export const parseQueryString = (url: string): HashTable<string> => {
    const params: HashTable<string> = {};
    let queryString = '';
    if (url.search('#') !== -1) {
        queryString = url.substring(url.search('#') + 1);

    } else {
        queryString = url.substring(url.indexOf('?') + 1);
    }
    if (queryString.length > 0) {
        const firstPart = queryString.split('&');
        for (let i = 0; i < firstPart.length; i++) {
            const secondPart = firstPart[i].split('=');
            params[decodeURIComponent(secondPart[0])] = decodeURIComponent(secondPart[1] || '');
        }
    }
    return params;
}