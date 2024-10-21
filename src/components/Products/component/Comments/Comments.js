import classNames from 'classnames/bind';
import styles from './Comments.module.scss';

import Image from '~/components/Image';
import images from '~/assets/images';
import { useEffect, useState } from 'react';
import * as CommentService from '~/services/CommentService';

const cx = classNames.bind(styles);

function ProductReview({ title }) {
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [comment, setComment] = useState('');
    const [data, setData] = useState({ name: name, phoneNumber: phoneNumber, commentUser: comment, dateComment: '' });
    const [check, setCheck] = useState(false);
    const [result, setResult] = useState([]);

    useEffect(() => {
        if (!check) {
            CommentService.get({ title, _sort: '_id', _order: 'desc', _page: 1, _limit: 10000 })
                .then((res) => {
                    if (res.length !== 0) {
                        setCheck(true);
                        setResult(res);
                    }
                })
                .catch((error) => {
                    return error;
                });
        }
        const fecthApi = async () => {
            if (data.name.trim() !== '' && data.phoneNumber.trim() !== '' && data.commentUser.trim() !== '') {
                await CommentService.post({
                    title: title,
                    name: data.name,
                    phoneNumber: data.phoneNumber,
                    commentUser: data.commentUser,
                    dateComment: data.dateComment,
                }).catch((error) => {
                    return error;
                });
                await CommentService.get({ title, _sort: 'id', _order: 'desc', _page: 1, _limit: 10000 })
                    .then((res) => {
                        setResult(res);
                    })
                    .catch((error) => {
                        return error;
                    });
            }
        };
        fecthApi();
    }, [data, check, title]);

    return (
        <div className={cx('wrapper')}>
            <p className={cx('title')}>Bình luận</p>
            <div className={cx('container')}>
                <div className={cx('review-page')}>
                    <div className={cx('title-review')}>
                        <strong className={cx('str-title')}>Viết bình luận của bạn</strong>
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
                        <div className={cx('label')}>Email hoặc số điện thoại</div>
                        <div className={cx('inner-input-name')}>
                            <input
                                className={cx('input')}
                                type="text"
                                value={phoneNumber}
                                onChange={(e) => {
                                    setPhoneNumber(e.target.value);
                                }}
                            />
                            <span className={cx('check-input')}>*</span>
                        </div>
                    </div>
                    <div className={cx('input-name')}>
                        <div className={cx('label')}>Nội dung bình luận</div>
                        <div className={cx('inner-input-name')}>
                            <textarea
                                className={cx('input')}
                                value={comment}
                                onChange={(e) => {
                                    setComment(e.target.value);
                                }}
                            />
                            <span className={cx('check-input')}>*</span>
                        </div>
                    </div>
                    <div
                        className={cx('button-sub')}
                        onClick={() => {
                            if (name.trim() !== '' && phoneNumber.trim() !== '' && comment.trim() !== '') {
                                const date = new Date();
                                var dd = date.getDate();
                                var mm = date.getMonth() + 1;
                                var yyyy = date.getFullYear();

                                if (mm < 10) {
                                    mm = '0' + mm;
                                }

                                const dateComment = `${dd}/${mm}/${yyyy}`;
                                setData({
                                    name: name,
                                    phoneNumber: phoneNumber,
                                    commentUser: comment,
                                    dateComment: dateComment,
                                });
                                setName('');
                                setPhoneNumber('');
                                setComment('');
                                setCheck(true);
                                setTimeout(() => {
                                    window.location.reload();
                                }, 500);
                            }
                        }}
                    >
                        <span className={cx('sub')}>Gửi</span>
                    </div>
                </div>
                <div className={cx('comment')}>
                    {!check && (
                        <div className={cx('placement-title')}>
                            <span>Hiện chưa có bình luận nào. Hãy trở thành người đầu tiên bình luận !!!!</span>
                        </div>
                    )}
                    {check &&
                        result.map((res) => (
                            <div key={res.id} className={cx('inner')}>
                                <div className={cx('avatar')}>
                                    <Image className={cx('img-avatar')} src={images.noAvatar} alt="avatar" />
                                    <div className={cx('name-avatar')}>
                                        <span className={cx('name')}>{res.data.name}</span>
                                    </div>
                                    <div className={cx('date')}>{`- ${res.data.dateComment}`}</div>
                                </div>

                                <div className={cx('review')}>
                                    <p className={cx('cmt')}>{res.data.commentUser}</p>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
}

export default ProductReview;
