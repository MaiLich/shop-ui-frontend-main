import classNames from 'classnames/bind';
import styles from './ListServices.module.scss';
import Image from '~/components/Image';
import { useEffect, useState } from 'react';

const cx = classNames.bind(styles);

function ListServices({ nameService }) {
    const [data, setData] = useState([]);

    useEffect(() => {
        nameService
            .get({ _page: 1, _limit: 9 })
            .then((res) => {
                setData(res);
            })
            .catch((error) => {
                return error;
            });
    }, [nameService]);

    return (
        <div className={cx('wrapper')}>
            {data.map((res, index) => (
                <div key={index} className={cx('item')}>
                    <Image className={cx('img-item')} src={res.img} alt="" />
                    <div className={cx('name-item')}>
                        <strong>{res.name}</strong>
                    </div>
                    {res.title && (
                        <div className={cx('title')}>
                            <span>{res.title}</span>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}

export default ListServices;
