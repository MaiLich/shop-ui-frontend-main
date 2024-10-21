import classNames from 'classnames/bind';
import styles from './ButtonTab.module.scss';

const cx = classNames.bind(styles);

function ButtonTab({ idName, checkClick, active = true, title, handleChange }) {
    return (
        <div className={cx('wrapper')} onClick={handleChange}>
            {checkClick === idName ? (
                <div className={cx('button', { active })}>
                    <span className={cx('name-btn')}>{title}</span>
                </div>
            ) : (
                <div className={cx('button')}>
                    <span className={cx('name-btn')}>{title}</span>
                </div>
            )}
        </div>
    );
}

export default ButtonTab;
