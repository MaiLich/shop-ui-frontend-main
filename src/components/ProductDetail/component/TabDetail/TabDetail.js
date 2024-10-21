import classNames from 'classnames/bind';
import styles from './TabDetail.module.scss';
import ButtonTab from './ButtonTab';
import { useState } from 'react';

const cx = classNames.bind(styles);

function TabDetail() {
    const [checkClick, setCheckClick] = useState(1);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <ButtonTab
                    idName={1}
                    checkClick={checkClick}
                    active
                    title="Mô tả sản phẩm"
                    handleChange={() => {
                        setCheckClick(1);
                    }}
                />
                <ButtonTab
                    idName={2}
                    checkClick={checkClick}
                    title="So sánh"
                    handleChange={() => {
                        setCheckClick(2);
                    }}
                />
                <ButtonTab
                    idName={3}
                    checkClick={checkClick}
                    title="Thông số kĩ thuật"
                    handleChange={() => {
                        setCheckClick(3);
                    }}
                />
                <ButtonTab
                    idName={4}
                    checkClick={checkClick}
                    title="Chi tiết sản phẩm"
                    handleChange={() => {
                        setCheckClick(4);
                    }}
                />
                <ButtonTab
                    idName={5}
                    checkClick={checkClick}
                    title="Hỏi đáp"
                    handleChange={() => {
                        setCheckClick(5);
                    }}
                />
            </div>
        </div>
    );
}

export default TabDetail;
