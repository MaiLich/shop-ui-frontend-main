import classNames from 'classnames/bind';
import styles from './CrossSells.module.scss';
import { Link } from 'react-router-dom';

import Image from '~/components/Image';

const cx = classNames.bind(styles);

function CrossSells() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('title-list')}>
                <strong>Gợi ý phụ kiện đi kèm</strong>
            </div>
            <div className={cx('item-grid-list')}>
                <div className={cx('item-grid-box')}>
                    <div className={cx('item-grid')}>
                        <div className={cx('item')}>
                            <div className={cx('icon')}>
                                <Image
                                    className={cx('icon-img')}
                                    src="https://shopdunk.com/images/uploaded-source/icon/mua-gop-sticker.png"
                                    alt="ctsv"
                                />
                            </div>
                            <Link className={cx('item-img')} to="">
                                <Image
                                    className={cx('product')}
                                    src="https://shopdunk.com/images/thumbs/0001395_sac-20w-usb-c-power-adapter_240.png"
                                    alt="product"
                                />
                            </Link>
                            <div className={cx('item-title')}>
                                <Link className={cx('title')} to="">
                                    Sạc 20W USB-C Power Adapter
                                </Link>
                            </div>
                            <div className={cx('price')}>
                                <span className={cx('actual-price')}>25.990.000₫</span>
                                {true && <span className={cx('old-price')}>34.990.000₫</span>}
                            </div>
                            <div className={cx('title_price_percent')}>
                                Giảm giá mua kèm:<span className={cx('price_percent')}>200.000₫</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CrossSells;
