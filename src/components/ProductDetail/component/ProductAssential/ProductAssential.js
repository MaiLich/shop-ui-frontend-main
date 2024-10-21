import classNames from 'classnames/bind';
import styles from './ProductAssential.module.scss';

import Image from '~/components/Image';

import $ from 'jquery';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import React, { useRef, useState, useEffect } from 'react';

const cx = classNames.bind(styles);

function ProductAssential({ className, dataImg }) {
    const [nav1, setNav1] = useState(null);
    const [nav2, setNav2] = useState(null);
    const slider1Ref = useRef(null);
    const slider2Ref = useRef(null);

    useEffect(() => {
        setNav1(slider1Ref.current);
        setNav2(slider2Ref.current);
        const nextButton = $('.slick-next');
        const prevButton = $('.slick-prev');
        nextButton.css({
            zIndex: 5,
            backgroundColor: 'transparent',
            right: '0',
            display: 'flex',
            alignItems: ' center',
            justifyContent: 'center',
        });

        prevButton.css({
            zIndex: 5,
            backgroundColor: 'transparent',
            left: '0',
            display: 'flex',
            alignItems: ' center',
            justifyContent: 'center',
        });

        nextButton.each(function () {
            const style = document.createElement('style');
            style.innerHTML = `
              .slick-next::before {
                content: '→';
                font-size: 30px;
                color: #515154;
              }
            `;
            this.appendChild(style);
        });

        prevButton.each(function () {
            const style = document.createElement('style');
            style.innerHTML = `
              .slick-prev::before {
                content: '←';
                font-size: 30px;
                color: #515154;
              }
            `;
            this.appendChild(style);
        });
    }, [dataImg]);

    const settingsSlider1 = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
    };

    let imgLength = 5;

    if (dataImg.length < 5) {
        imgLength = dataImg.length;
    } else if (dataImg.length === 5) {
        imgLength = 4;
    }

    const settingsSlider2 = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: imgLength,
        slidesToScroll: 1,
        swipeToSlide: false,
        focusOnSelect: true,
    };

    return (
        <div className={cx('wrapper', { [className]: className })}>
            <div className={cx('img-review')}>
                <Slider className={cx('slider')} asNavFor={nav2} ref={slider1Ref} {...settingsSlider1}>
                    {dataImg.map((link, index) => (
                        <div key={index} className={cx('picture')}>
                            <div className={cx('picture-box')}>
                                <Image className={cx('img')} src={link} alt="" />
                            </div>
                        </div>
                    ))}
                </Slider>
                <Slider
                    className={cx('slide-img')}
                    asNavFor={nav1}
                    ref={slider2Ref}
                    centerMode={true}
                    variableWidth={true}
                    {...settingsSlider2}
                >
                    {dataImg.map((link, index) => (
                        <div key={index} className={cx('slide-list')}>
                            <div className={cx('slide-box')}>
                                <Image className={cx('img-slide')} src={link} alt="" />
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    );
}

export default ProductAssential;
