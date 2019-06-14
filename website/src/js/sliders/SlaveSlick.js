import StandardSlick from './StandardSlick';

class SlaveSlick extends StandardSlick {
    constructor(containerElement, additionalSettings) {
        super(containerElement);

        this.slickSettings = {
            dots: false,
            autoplay: false,
            infinite: true,
            arrows: false,
            mobileFirst: true,
            centerMode: true,
            fade: true,
            ...additionalSettings
        }
    }
}

export default SlaveSlick;