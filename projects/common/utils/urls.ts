export function getUrlParams(): Record<string, string> {
    const url = new URL(window.location.href);
    return Object.fromEntries(url.searchParams);
}