export default class Widget {
    constructor() {
        this.init();
    }

    init() {
        this.wrapper = document.createElement('div');
        this.wrapper.classList.add('widget-wrapper');
        document.body.appendChild(this.wrapper);
    }
}

