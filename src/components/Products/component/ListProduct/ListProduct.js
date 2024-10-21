import classNames from 'classnames/bind';
import styles from './ListProduct.module.scss';
import CardItem from './CardItem';
import { useEffect, useState } from 'react';

import PropTypes from 'prop-types';

const cx = classNames.bind(styles);

function ListProduct({ service, idName, category }) {
    const [data, setData] = useState([]);

    useEffect(() => {
        category !== idName
            ? service
                  .get({ category: category, _page: 1, _limit: 10000 })
                  .then((res) => {
                      setData(res);
                  })
                  .catch((error) => {
                      return error;
                  })
            : service
                  .getAll({ _page: 1, _limit: 10000 })
                  .then((res) => {
                      setData(res);
                  })
                  .catch((error) => {
                      return error;
                  });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [service, category]);

    const total = data.length;

    return (
        <div className={cx('list-product')}>
            <CardItem nameService={service} total={total} category={category} idName={idName} />
        </div>
    );
}

ListProduct.propTypes = {
    path: PropTypes.node,
};

export default ListProduct;
