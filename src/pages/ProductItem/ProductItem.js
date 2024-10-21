import classNames from 'classnames/bind';
import styles from './ProductItem.module.scss';
import ProductDetail from '~/components/ProductDetail';
import { useParams } from 'react-router-dom';

import * as ItemProductService from '~/services/ItemProductService';
import { useEffect, useState } from 'react';
import { isEmptyObject } from 'jquery';
const cx = classNames.bind(styles);

function ProductItem() {
    const data = useParams();

    const [dataItem, setDataItem] = useState({});

    useEffect(() => {
        ItemProductService.getItem({ name: data.namePath, path: data.category })
            .then((res) => {
                setDataItem(res[0]);
            })
            .catch((error) => {
                return error;
            });
    }, [data]);

    return (
        <div className={cx('wrapper')}>
            {!isEmptyObject(dataItem) && <ProductDetail directive={true} title={dataItem.name} item={dataItem} />}
        </div>
    );
}

export default ProductItem;
