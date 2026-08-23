export function getUrlParams(): Record<string, string> {
    const url = new URL(window.location.href);

    const searchParams = Object.fromEntries(url.searchParams);
    const hashParams = getHashParams(url.hash);

    return {
        ...searchParams,
        ...hashParams,
    };
}

function getHashParams(hash: string): Record<string, string> {
    const queryStart = hash.indexOf('?');
    if (queryStart === -1) {
        return {};
    }

    const queryString = hash.slice(queryStart + 1);
    return Object.fromEntries(new URLSearchParams(queryString));
}