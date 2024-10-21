import classNames from 'classnames/bind';
import styles from './SeriesProduct.module.scss';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

const cx = classNames.bind(styles);

function SeriesProduct({ service, name, path, onChangeView, idName }) {
    const [data, setData] = useState([]);

    useEffect(() => {
        service
            .getSeries({ name: name })
            .then((res) => {
                setData(res[0].category);
            })
            .catch((error) => {
                return error;
            });
    }, [service, name]);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('series-menu')}>
                <div className={cx('series-btn')}>
                    <NavLink
                        className={(nav) => cx('series-name', { active: nav.isActive })}
                        to={path}
                        onClick={() => {
                            onChangeView({ title: idName });
                        }}
                    >
                        <span className={cx('active-s')}>Tất cả</span>
                        <span className={cx('no-active-s')}>Tất cả</span>
                    </NavLink>
                </div>

                {data.map((res, index) => (
                    <div key={index} className={cx('series-btn')}>
                        <NavLink
                            className={(nav) => cx('series-name', { active: nav.isActive })}
                            to={res.path}
                            onClick={() => {
                                onChangeView({ title: res.title });
                            }}
                        >
                            <span className={cx('active-s')}>{res.title}</span>
                            <span className={cx('no-active-s')}>{res.title}</span>
                        </NavLink>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default SeriesProduct;
