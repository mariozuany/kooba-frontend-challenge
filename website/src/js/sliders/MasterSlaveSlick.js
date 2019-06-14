import PagingInfoSlick from './PagingInfoSlick';

const MasterSlavesSlick = function (masterContainerElement, slavesContainerElements) {
    const masterSlick = new PagingInfoSlick(masterContainerElement, {variableWidth: false, fade: true});

    const slaveSliders = [...slavesContainerElements];

    $(masterSlick.sliderElement).on('beforeChange', (event, slick, currentSlide, nextSlide) => {
        slaveSliders.forEach(slave => {
            if ($(slave.sliderElement)) {
                $(slave.sliderElement).slick('slickGoTo', nextSlide);

                $(slave.sliderElement).on('beforeChange', (slaveEvent, slaveSlick, currentSlaveSlide, nextSlaveSlide) => {
                    $(masterSlick.sliderElement).slick('slickGoTo', nextSlaveSlide);
                })
            }
        })
    });

    return [
        masterSlick,
        ...slaveSliders
    ]
};

export default MasterSlavesSlick;