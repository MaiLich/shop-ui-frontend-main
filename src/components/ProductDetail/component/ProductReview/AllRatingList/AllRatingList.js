import classNames from 'classnames/bind';
import styles from './AllRatingList.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';

import * as RatingService from '~/services/RatingService';

const cx = classNames.bind(styles);

function AllRatingList({ title, sendChildData }) {
    const [stars, setStars] = useState([true, true, true, true, true]);
    const [nStars, setNStars] = useState(5);
    const [name, setName] = useState('');
    const [review, setReview] = useState('');
    const [data, setData] = useState({ name: name, stars: stars, nStars: nStars, review: review, dateReview: '' });
    const [cmt, setCmt] = useState(0);

    const [barStars, setBarStars] = useState([0, 0, 0, 0, 0]);

    useEffect(() => {
        const fecthApi = async () => {
            if (data.name.trim() !== '' && data.review.trim() !== '') {
                const date = new Date();
                var dd = date.getDate();
                var mm = date.getMonth() + 1;
                var yyyy = date.getFullYear();

                if (mm < 10) {
                    mm = '0' + mm;
                }

                const dateReview = `${dd}/${mm}/${yyyy}`;

                await RatingService.post({
                    title: title,
                    name: data.name,
                    stars: data.stars,
                    nStars: data.nStars,
                    review: data.review,
                    dateReview: dateReview,
                }).catch((error) => {
                    return error;
                });
            }
            await RatingService.get({ title, _sort: '_id', _order: 'desc', _page: 1, _limit: 10000 })
                .then((res) => {
                    sendChildData(res);
                    setCmt(res.length);
                    var tmp = [0, 0, 0, 0, 0];
                    res.map((item) => (tmp[item.data.nStars - 1] += 1));
                    tmp.forEach((item, index) => (tmp[index] = Math.round((item / res.length) * 100)));
                    setBarStars(tmp);
                })
                .catch((error) => {
                    return error;
                });
        };
        fecthApi();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data, title]);

    var starTB = 0;

    barStars.forEach((e, index) => {
        starTB += (e / 100) * (index + 1);
    });

    starTB = Math.ceil(starTB * 10) / 10;

    if (isNaN(starTB)) {
        starTB = 0;
    }

    return (
        <div className={cx('wrapper')}>
            <div className={cx('rating-list')}>
                <div className={cx('rating-product')}>
                    <p className={cx('rating-review')}>{starTB}</p>
                    <div className={cx('reivews')}>
                        <span className={cx('re-content')}>{cmt} đánh giá</span>
                    </div>
                </div>

                <div className={cx('progress-review')}>
                    <div className={cx('progress')}>
                        <p className={cx('title')}>
                            <span className={cx('number-rating')}>5</span> <span className={cx('color-start')}></span>
                        </p>
                        <div className={cx('progress-bar')}>
                            <div
                                className={cx('bar')}
                                role="progressbar"
                                style={{ width: `${barStars[4]}%` }}
                                aria-valuemin="0"
                                aria-valuemax="100"
                            ></div>
                        </div>
                    </div>
                    <div className={cx('progress')}>
                        <p className={cx('title')}>
                            <span className={cx('number-rating')}>4</span> <span className={cx('color-start')}></span>
                        </p>
                        <div className={cx('progress-bar')}>
                            <div
                                className={cx('bar')}
                                role="progressbar"
                                style={{ width: `${barStars[3]}%` }}
                                aria-valuemin="0"
                                aria-valuemax="100"
                            ></div>
                        </div>
                    </div>
                    <div className={cx('progress')}>
                        <p className={cx('title')}>
                            <span className={cx('number-rating')}>3</span> <span className={cx('color-start')}></span>
                        </p>
                        <div className={cx('progress-bar')}>
                            <div
                                className={cx('bar')}
                                role="progressbar"
                                style={{ width: `${barStars[2]}%` }}
                                aria-valuemin="0"
                                aria-valuemax="100"
                            ></div>
                        </div>
                    </div>
                    <div className={cx('progress')}>
                        <p className={cx('title')}>
                            <span className={cx('number-rating')}>2</span> <span className={cx('color-start')}></span>
                        </p>
                        <div className={cx('progress-bar')}>
                            <div
                                className={cx('bar')}
                                role="progressbar"
                                style={{ width: `${barStars[1]}%` }}
                                aria-valuemin="0"
                                aria-valuemax="100"
                            ></div>
                        </div>
                    </div>
                    <div className={cx('progress')}>
                        <p className={cx('title')}>
                            <span className={cx('number-rating')}>1 </span> <span className={cx('color-start')}></span>
                        </p>
                        <div className={cx('progress-bar')}>
                            <div
                                className={cx('bar')}
                                role="progressbar"
                                style={{ width: `${barStars[0]}%` }}
                                aria-valuemin="0"
                                aria-valuemax="100"
                            ></div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={cx('review-page')}>
                <div className={cx('title-review')}>
                    <strong className={cx('str-title')}>Viết đánh giá của riêng bạn</strong>
                </div>
                <div className={cx('review-rating')}>
                    <div className={cx('name-description')}>
                        <span className={cx('name')}>Chất lượng*:</span>
                    </div>
                    <div className={cx('star-btn')}>
                        {stars.map((star, index) => (
                            <div
                                key={index}
                                className={cx('star')}
                                onClick={() => {
                                    const tmp = [];
                                    for (var i = 1; i < index + 1; i++) {
                                        tmp.push(false);
                                    }
                                    // eslint-disable-next-line no-redeclare
                                    for (var i = index + 1; i <= 5; i++) {
                                        tmp.push(true);
                                    }
                                    setStars(tmp);
                                    setNStars(5 - index);
                                }}
                            >
                                {star ? (
                                    <FontAwesomeIcon className={cx('active')} icon={faStar} />
                                ) : (
                                    <FontAwesomeIcon className={cx('no-active')} icon={faStar} />
                                )}
                            </div>
                        ))}
                    </div>
                </div>
                <div className={cx('input-name')}>
                    <div className={cx('label')}>Tên của bạn</div>
                    <div className={cx('inner-input-name')}>
                        <input
                            className={cx('input')}
                            type="text"
                            value={name}
                            onChange={(e) => {
                                setName(e.target.value);
                            }}
                        />
                        <span className={cx('check-input')}>*</span>
                    </div>
                </div>
                <div className={cx('input-name')}>
                    <div className={cx('label')}>Đánh giá danh mục</div>
                    <div className={cx('inner-input-name')}>
                        <textarea
                            className={cx('input')}
                            value={review}
                            onChange={(e) => {
                                setReview(e.target.value);
                            }}
                        />
                        <span className={cx('check-input')}>*</span>
                    </div>
                </div>
                <div
                    className={cx('button-sub')}
                    onClick={() => {
                        if (name.trim() !== '' && review.trim() !== '') {
                            // sendChildData(cmt + 1);
                            setData({ name: name, stars: stars, nStars: nStars, review: review });
                            setName('');
                            setReview('');
                            setStars([true, true, true, true, true]);
                            setNStars(5);
                            setTimeout(() => {
                                window.location.reload();
                            }, 500);
                        }
                    }}
                >
                    <span className={cx('sub')}>Gửi</span>
                </div>
            </div>
        </div>
    );
}

export default AllRatingList;
