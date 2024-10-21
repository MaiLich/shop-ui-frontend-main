import classNames from 'classnames/bind';
import styles from './Item.module.scss';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import Image from '~/components/Image';
import { useEffect, useState } from 'react';
import * as EndowService from '~/services/EndowService';

const cx = classNames.bind(styles);

function Item({ data, namePath }) {
    const [endow, setEndow] = useState([]);

    const idEndow = data.productEndow;

    useEffect(() => {
        EndowService.getEndow({ id: idEndow })
            .then((result) => {
                setEndow(result);
            })
            .catch((error) => {
                return error;
            });
    }, [idEndow]);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('item')}>
                <div className={cx('icon')}>
                    {idEndow &&
                        endow.map((result, index) => (
                            <Image key={index} className={cx('icon-img')} src={result.link} alt="ctsv" />
                        ))}
                </div>
                <Link className={cx('item-img')} to={`/${namePath}/${data.path}`} reloadDocument>
                    <Image className={cx('product')} src={data.color.popular} alt="product" />
                </Link>
                <div className={cx('item-title')}>
                    <Link className={cx('title')} to={`/${namePath}/${data.path}`} reloadDocument>
                        {data.name}
                    </Link>
                </div>
                <div className={cx('price')}>
                    <span className={cx('actual-price')}>{data.actualPrice}</span>
                    {data.oldPrice && <span className={cx('old-price')}>{data.oldPrice}</span>}
                </div>
            </div>
        </div>
    );
}

Item.propTyles = {
    data: PropTypes.object.isRequired,
};

export default Item;
