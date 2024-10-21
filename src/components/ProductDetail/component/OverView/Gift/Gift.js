import classNames from 'classnames/bind';
import styles from './Gift.module.scss';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Image from '~/components/Image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function Gift({ maxLength }) {
    const [showFullText, setShowFullText] = useState(false);

    const toggleText = () => {
        setShowFullText(!showFullText);
    };

    return (
        <div className={cx('wrapper')}>
            <div
                className={cx('inner')}
                style={{
                    maxHeight: showFullText ? 'none' : `${maxLength}px`,
                    overflow: 'hidden',
                }}
            >
                <div className={cx('content')}>
                    <div className={cx('child-content')}>
                        <p className={cx('info')}>
                            <strong>Chào Tân Sinh Viên (5/7 - 31/7) </strong>
                            <Link className={cx('detail-content')}>
                                <span>(Xem chi tiết)</span>
                            </Link>
                        </p>
                        <p className={cx('info-content')}>
                            <span className={cx('img')}>
                                <Image
                                    className={cx('img-icon')}
                                    src="https://shopdunk.com/images/uploaded/t%C3%ADch%20tr%C3%B2n%20(1).jpg"
                                    alt=""
                                />
                            </span>
                            <span>
                                Giảm <strong>200.000đ</strong> cho khách hàng là học sinh - sinh viên
                            </span>
                        </p>
                        <p className={cx('info-content')}>
                            <span className={cx('img')}>
                                <Image
                                    className={cx('img-icon')}
                                    src="https://shopdunk.com/images/uploaded/t%C3%ADch%20tr%C3%B2n%20(1).jpg"
                                    alt=""
                                />
                            </span>
                            <span>
                                Giảm <strong>200.000đ</strong> cho khách hàng là học sinh - sinh viên
                            </span>
                        </p>
                        <hr />
                    </div>
                    <div className={cx('child-content')}>
                        <p className={cx('info')}>
                            <strong>Chào Tân Sinh Viên (5/7 - 31/7) </strong>
                            <Link className={cx('detail-content')}>
                                <span>(Xem chi tiết)</span>
                            </Link>
                        </p>
                        <p className={cx('info-content')}>
                            <span className={cx('img')}>
                                <Image
                                    className={cx('img-icon')}
                                    src="https://shopdunk.com/images/uploaded/t%C3%ADch%20tr%C3%B2n%20(1).jpg"
                                    alt=""
                                />
                            </span>
                            <span>
                                Giảm <strong>200.000đ</strong> cho khách hàng là học sinh - sinh viên
                            </span>
                        </p>
                        <p className={cx('info-content')}>
                            <span className={cx('img')}>
                                <Image
                                    className={cx('img-icon')}
                                    src="https://shopdunk.com/images/uploaded/t%C3%ADch%20tr%C3%B2n%20(1).jpg"
                                    alt=""
                                />
                            </span>
                            <span>
                                Giảm <strong>200.000đ</strong> cho khách hàng là học sinh - sinh viên
                            </span>
                        </p>
                        <hr />
                    </div>
                </div>
            </div>

            <div className={cx('button-gift')}>
                <Link className={cx('button')} onClick={toggleText}>
                    {showFullText ? (
                        <span className={cx('btn-name')}>
                            Thu gọn <FontAwesomeIcon className={cx('icon-btn')} icon={faChevronUp} />
                        </span>
                    ) : (
                        <span className={cx('btn-name')}>
                            Xem thêm ưu đãi khác <FontAwesomeIcon className={cx('icon-btn')} icon={faChevronDown} />
                        </span>
                    )}
                </Link>
            </div>
        </div>
    );
}

export default Gift;
