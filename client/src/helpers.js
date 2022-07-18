import Cookie from 'universal-cookie';

const cookie = new Cookie();

function getCookie(cookieName) {
    return cookie.get(cookieName)
}

function cookieExists(cookieName) {
    return Boolean(cookie.get(cookieName))
}

export {
    getCookie,
    cookieExists
}