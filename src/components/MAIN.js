export default class MAIN {
    select(selector) {
        return document.querySelector(selector);
    }

    selectAll(selector) {
        return document.querySelectorAll(selector);
    }
}