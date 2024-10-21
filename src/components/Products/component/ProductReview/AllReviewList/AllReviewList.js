import classNames from 'classnames/bind';
import styles from './AllReviewList.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

import Image from '~/components/Image';
import images from '~/assets/images';

const cx = classNames.bind(styles);

function AllReviewList({ data = [] }) {
    return (
        <div className={cx('wrapper')}>
            {data.map((res, index) => (
                <div key={index} className={cx('inner')}>
                    <div className={cx('avatar')}>
                        <Image className={cx('img-avatar')} src={images.noAvatar} alt="avatar" />
                        <div className={cx('name-avatar')}>
                            <span className={cx('name')}>{res.data.name}</span>
                        </div>
                        <div className={cx('date')}>{`- ${res.data.dateReview}`}</div>
                    </div>
                    <div className={cx('quality')}>
                        {res.data.stars.map((e, index) => (
                            <div key={index}>
                                {e === true && <FontAwesomeIcon className={cx('active')} icon={faStar} />}
                            </div>
                        ))}
                        {res.data.stars.map((e, index) => (
                            <div key={index}>
                                {e === false && <FontAwesomeIcon className={cx('no-active')} icon={faStar} />}
                            </div>
                        ))}

                        {/* <FontAwesomeIcon className={cx('active')} icon={faStar} />
                        <FontAwesomeIcon className={cx('no-active')} icon={faStar} /> */}
                    </div>
                    <div className={cx('review')}>
                        <p className={cx('cmt')}>{res.data.review}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default AllReviewList;
