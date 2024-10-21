import classNames from 'classnames/bind';
import styles from './CardItem.module.scss';
import { useEffect, useState } from 'react';

import Item from './Item';
import ButtonPage from './ButtonPage';

const cx = classNames.bind(styles);

const page_limit = 5;
var page_start = 1;
var page_end = 5;

const LIMIT_INIT = 12;

function CardItem({ nameService, total, category, idName }) {
    const [page, setPage] = useState(1);
    const [result, setResult] = useState([]);
    const [check, setCheck] = useState(1);

    const page_total = Math.ceil(total / LIMIT_INIT);

    useEffect(() => {
        if (page_total < page) {
            setPage(1);
        }

        idName !== category
            ? nameService
                  .get({ category: category, _page: page, _limit: LIMIT_INIT })
                  .then((data) => {
                      setCheck(page);
                      setResult(data);
                  })
                  .catch((error) => {
                      return error;
                  })
            : nameService
                  .getAll({ _page: page, _limit: LIMIT_INIT })
                  .then((data) => {
                      setCheck(page);
                      setResult(data);
                  })
                  .catch((error) => {
                      return error;
                  });
    }, [nameService, page, category, idName, page_total]);

    if (page_total < page_limit) {
        page_end = page_total;
    } else {
        if (page + 2 <= page_total) {
            page_end = page + 2;
        } else {
            page_end = page_total;
        }
        if (page - 2 >= 1) {
            page_start = page - 2;
        } else {
            page_start = 1;
        }
    }

    const page_x = [];

    for (let i = page_start; i <= page_end; i++) {
        page_x.push(i);
    }

    return (
        <div className={cx('wrapper')}>
            <div className={cx('category-box')}>
                {result.map((data, index) => (
                    <div key={index} className={cx('item-box')}>
                        <Item data={data} namePath={idName} />
                    </div>
                ))}
            </div>
            {page_total > 1 && (
                <div className={cx('button-page')}>
                    {page_start !== 1 && (
                        <ButtonPage
                            title={null}
                            link={'https://shopdunk.com/Themes/SD/Content/images/first.png'}
                            onChangeView={() => {
                                if (page > 1) {
                                    setPage(1);
                                }
                            }}
                        />
                    )}
                    {page > 1 && (
                        <ButtonPage
                            noActiveBtn
                            title={null}
                            link={'https://shopdunk.com/Themes/SD/Content/images/prev.png'}
                            onChangeView={() => {
                                if (page > 1) {
                                    setPage(page - 1);
                                }
                            }}
                        />
                    )}
                    {page_x.map((x, index) => (
                        <ButtonPage
                            key={index}
                            checkActive={check}
                            title={x}
                            link={null}
                            onChangeView={() => {
                                setPage(x);
                            }}
                        />
                    ))}

                    {page < page_total && (
                        <ButtonPage
                            noActiveBtn
                            title={null}
                            link={'https://shopdunk.com/Themes/SD/Content/images/next.png'}
                            onChangeView={() => {
                                if (page < total) {
                                    setPage(page + 1);
                                }
                            }}
                        />
                    )}
                    {page_end !== page_total && (
                        <ButtonPage
                            title={null}
                            link={'https://shopdunk.com/Themes/SD/Content/images/last.png'}
                            onChangeView={() => {
                                if (page < page_total) {
                                    setPage(page_total);
                                }
                            }}
                        />
                    )}
                </div>
            )}
        </div>
    );
}

export default CardItem;
