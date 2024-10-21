import classNames from 'classnames/bind';
import styles from './BannerPage.module.scss';
import { useEffect, useState } from 'react';

import Image from '~/components/Image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleChevronLeft, faCircleChevronRight } from '@fortawesome/free-solid-svg-icons';

import PropTypes from 'prop-types';

const cx = classNames.bind(styles);
var timeOut;
const B_INIT = 1;

function BannerPage({ service, name }) {
    const [item, setItem] = useState(0);
    const [resItem, setResItem] = useState([]);
    const [link, setLink] = useState('');
    const [sumLink, setSumLink] = useState(B_INIT);
    const [check, setCheck] = useState(true);
    useEffect(() => {
        service
            .getBanner({ name: name })
            .then((data) => {
                const res = data[0].links;
                if (res.length === 1) {
                    setCheck(false);
                }
                setSumLink(res.length - 1);
                setLink(res[0]);
                setResItem(res);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [service, name]);

    const handleViewLeft = () => {
        if (item > 0) {
            setLink(resItem[item]);
            setItem(item - 1);
        } else {
            setLink(resItem[item]);
            setItem(sumLink);
        }
    };

    const handleViewRight = () => {
        if (item < sumLink) {
            setLink(resItem[item]);
            setItem(item + 1);
        } else {
            setLink(resItem[item]);
            setItem(0);
        }
    };

    clearTimeout(timeOut);
    timeOut = setTimeout(() => {
        if (item < sumLink) {
            setLink(resItem[item]);
            setItem(item + 1);
        } else {
            setLink(resItem[item]);
            setItem(0);
        }
    }, 5000);
    return (
        <div className={cx('wrapper')}>
            {check && (
                <FontAwesomeIcon className={cx('left-btn')} onClick={handleViewLeft} icon={faCircleChevronLeft} />
            )}
            {link && <Image className={cx('image')} src={link} />}
            {check && (
                <FontAwesomeIcon className={cx('right-btn')} onClick={handleViewRight} icon={faCircleChevronRight} />
            )}
        </div>
    );
}

BannerPage.propTypes = {
    name: PropTypes.string.isRequired,
};

export default BannerPage;
