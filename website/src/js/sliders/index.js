import InlineDotsSlick from './InlineDotsSlick';
import MasterSlaveSlick from './MasterSlaveSlick';
import PagingInfoSlick from './PagingInfoSlick';
import StandardSlick from './StandardSlick';
import SlaveSlick from './SlaveSlick';
import TimerSlick from './TimerSlick';

/**
 * Default configuration for slick sliders
 **/
export const defaultSlickSettings = {
    dots: false,
    speed: 600,
    autoplaySpeed: 4000,
    autoplay: true,
    variableWidth: true,
    infinite: true,
    prevArrow: "<button type='button' class='slick-prev pull-left'><i class='icon-left-arrow' aria-hidden='true'></i></button>",
    nextArrow: "<button type='button' class='slick-next pull-right'><i class='icon-right-arrow' aria-hidden='true'></i></button>",
    mobileFirst: true,
    centerMode: true,
    arrows: true,
};

/**
 * Function to initiate an array of sliders and handle responsive enabling/disabling
 *
 * @param {Array} slickSliders
 */
export const initSliders = (slickSliders) => {
    slickSliders.forEach((slider) => {
        const $carousel = $(slider.sliderElement);

        /* Initializes a slick carousel only on mobile screens */
        // slick on mobile
        if ($(window).width() > 1020 && $carousel.hasClass('mobile-slider')) {
            if ($carousel.hasClass('slick-initialized')) {
                $carousel.slick('unslick');
            }
        } else if ($(window).width() > 759 && $carousel.hasClass('mobile-slider--no-tablet')) {
            if ($carousel.hasClass('slick-initialized')) {
                $carousel.slick('unslick');
            }
        } else if (!$carousel.hasClass('slick-initialized')) {
            slider.init();
        }
    });
};

export {
    InlineDotsSlick,
    MasterSlaveSlick,
    PagingInfoSlick,
    SlaveSlick,
    StandardSlick,
    TimerSlick
};