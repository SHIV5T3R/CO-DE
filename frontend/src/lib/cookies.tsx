export function setCookie(name: string, value: string) {
    document.cookie = `${name}=${value}; path=/`;
}

export function getCookie(name: string): string | null {
    const cookies = document.cookie.split("; ");
    const cookieName = cookies.find(cookie => cookie.startsWith("name=")).split("=")[1];
    if(cookieName == undefined) {
        return null;
    } else {
        return cookieName;
    }
}

export function removeCookie(name: string) {
    document.cookie = `name=${name}; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
}