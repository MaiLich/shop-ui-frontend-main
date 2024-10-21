import classNames from 'classnames/bind';
import styles from './OverView.module.scss';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuilding, faCircleCheck, faGift, faRepeat } from '@fortawesome/free-solid-svg-icons';

import Gift from './Gift';
import config from '~/config';

const cx = classNames.bind(styles);

function OverView({ className, data, colorNew, userReview, handleLoading }) {
    const [attributes, setAttributes] = useState([]);
    const [colorChoose, setColorChoose] = useState(data.colorPopular);
    const [capacity, setCapacity] = useState(data.capacity);
    const [promotions, setPromotions] = useState('Mua thẳng');
    const [storeArea, setStoreArea] = useState('Khu vực miền Bắc');
    const [upOptions, setUpOptions] = useState(true);
    const [reloading, setReloading] = useState(false);

    const path = useParams();

    useEffect(() => {
        setAttributes(data.attributes);
        const fromCart = localStorage.getItem('fromCart');
        if (fromCart !== null && JSON.parse(fromCart) === true) {
            setUpOptions(true);
            localStorage.removeItem('fromCart');
        }
        const changeUpOptions = localStorage.getItem('upOptions');
        if (changeUpOptions !== null && JSON.parse(changeUpOptions) === true) {
            setUpOptions(false);
            localStorage.removeItem('upOptions');
        }
    }, [data]);
    let colorBoard, itemBoard;

    if (attributes.length >= 1) {
        colorBoard = attributes.find((e) => e.name === 'Màu sắc');
        if (!colorBoard) {
            itemBoard = attributes;
        } else {
            if (attributes.length === 1) {
                itemBoard = false;
            } else {
                itemBoard = attributes.slice(0, attributes.length - 1);
            }
        }
    }

    const handleBuy = () => {
        let priceItem = data.actualPrice;
        priceItem = priceItem.slice(0, priceItem.length - 1);
        priceItem = priceItem.replaceAll('.', '');
        const item = {
            id: Math.floor(Math.random() * 10 ** 6),
            namePath: path.namePath,
            category: path.category,
            storeArea: storeArea,
            img: data.color.popular,
            name: data.name,
            capacity: capacity,
            color: colorChoose,
            promotions: promotions,
            price: data.actualPrice,
            quantity: 1,
            totalItem: Number(priceItem),
        };
        let Items = [item];
        const userID = localStorage.getItem('sessionID');
        if (userID === null) {
            const randomID = Math.floor(Math.random() * 10 ** 8);
            localStorage.setItem('sessionID', JSON.stringify(randomID));
        }
        const dataItems = localStorage.getItem('dataItems');
        if (dataItems === null) {
            localStorage.setItem('dataItems', JSON.stringify(Items));
        } else {
            Items = JSON.parse(dataItems);

            let checkItem = false;
            for (let e of Items) {
                if (
                    e.name === item.name &&
                    e.capacity === item.capacity &&
                    e.color === item.color &&
                    upOptions === true
                ) {
                    e.quantity += 1;
                    e.totalItem = e.quantity * Number(priceItem);
                    checkItem = true;

                    break;
                } else if (
                    e.id === JSON.parse(localStorage.getItem('idChange')) &&
                    e.name === item.name &&
                    e.capacity === item.capacity &&
                    e.color === item.color &&
                    e.promotions === item.promotions &&
                    e.price === item.price &&
                    e.storeArea === item.storeArea &&
                    upOptions === false
                ) {
                    checkItem = true;

                    break;
                } else if (e.id === JSON.parse(localStorage.getItem('idChange')) && upOptions === false) {
                    e.capacity = item.capacity;
                    e.color = item.color;
                    e.promotions = item.promotions;
                    e.price = item.price;
                    e.storeArea = item.storeArea;
                    e.totalItem = e.quantity * Number(priceItem);
                    checkItem = true;

                    break;
                }
            }

            if (checkItem === false) {
                Items.push(item);
            }
        }
        localStorage.setItem('dataItems', JSON.stringify(Items));
        if (upOptions === false) {
            localStorage.setItem('fromCart', JSON.stringify(true));
            localStorage.removeItem('upOptions');
        }
        localStorage.setItem('clickButton', JSON.stringify(true));
    };

    const handleLinkBuy = (event) => {
        event.preventDefault();
        const linkUrl = event.currentTarget.getAttribute('href');
        if (!reloading) {
            setReloading(true);
            handleLoading(1);
            setTimeout(() => {
                window.location.href = linkUrl;
            }, 2000);
        }
    };

    return (
        <div className={cx('wrapper', { [className]: className })}>
            <div className={cx('over-rivew')}>
                <div className={cx('inner')}>
                    <div className={cx('info')}>
                        <div className={cx('product-name')}>
                            <h1 className={cx('name')}>{data.name}</h1>
                        </div>
                        <div className={cx('rating-star')}>
                            <div className={cx('review-box')}>
                                <div className={cx('rating')}></div>
                            </div>
                            <div className={cx('review-links')}>
                                <Link className={cx('links')}>{userReview} đánh giá</Link>
                                <span className={cx('separator')}>|</span>
                            </div>
                            <div className={cx('overview-btn')}>
                                <div className={cx('add-to-wishlist')}>
                                    <button
                                        type="button"
                                        id="add-to-wishlist-button-1798"
                                        className={cx('button-2')}
                                        data-productid="1798"
                                    >
                                        So sánh
                                    </button>
                                </div>
                            </div>
                            <div className={cx('storelocation-all')}>
                                <select
                                    className={cx('storelocation-ddl')}
                                    data-attr="2256"
                                    name="product_attribute_2256"
                                    id="product_attribute_2256"
                                    aria-invalid="false"
                                    defaultValue="5962"
                                    onChange={(e) => {
                                        setStoreArea(e.target.value);
                                    }}
                                >
                                    <option value="0">Vui lòng chọn</option>
                                    <option data-attr-value="5962" value="Khu vực miền Bắc">
                                        Khu vực miền Bắc
                                    </option>
                                    <option data-attr-value="5963" value="Khu vực miền Nam">
                                        Khu vực miền Nam
                                    </option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className={cx('prices')}>
                        <div className={cx('product-prices')}>
                            <span className={cx('low-prices')}>{data.actualPrice}</span>
                        </div>
                        <div className={cx('old-product-prices')}>
                            <span className={cx('old-prices')}>{data.oldPrice}</span>
                        </div>
                    </div>
                    {attributes.length >= 1 && (
                        <div className={cx('attributes')}>
                            {itemBoard
                                ? itemBoard.map((item, index) => (
                                      <div key={index} className={cx('attributes-item')}>
                                          <div className={cx('name-attributes')}>
                                              <span className={cx('label')}>{item.name}</span>
                                          </div>

                                          <div className={cx('value-attributes')}>
                                              {item.value.map((e, index) =>
                                                  capacity === e ? (
                                                      <div
                                                          key={index}
                                                          className={cx('value-item', 'value-item-active')}
                                                          onClick={() => {
                                                              setCapacity(e);
                                                          }}
                                                      >
                                                          <Link to="#">
                                                              <span className={cx('check-attr')}>{e}</span>
                                                          </Link>
                                                      </div>
                                                  ) : (
                                                      <div
                                                          key={index}
                                                          className={cx('value-item')}
                                                          onClick={() => {
                                                              setCapacity(e);
                                                          }}
                                                      >
                                                          <Link to="#">
                                                              <span className={cx('check-attr')}>{e}</span>
                                                          </Link>
                                                      </div>
                                                  ),
                                              )}
                                          </div>
                                      </div>
                                  ))
                                : undefined}

                            {colorBoard && (
                                <div className={cx('attributes-item')}>
                                    <div className={cx('name-attributes')}>
                                        <span className={cx('label')}>{colorBoard.name}</span>
                                    </div>

                                    <div className={cx('value-attributes')}>
                                        {colorBoard.value.map((color, index) => (
                                            <div key={index} className={cx('value-item-color')}>
                                                <label htmlFor={`color-${color}`}>
                                                    {colorChoose === color ? (
                                                        <span
                                                            className={cx(
                                                                'attribute-square-container',
                                                                'attribute-square-container-active',
                                                            )}
                                                            title={color}
                                                        >
                                                            <span
                                                                className={cx('attribute-square')}
                                                                style={{ backgroundColor: `var(--${color})` }}
                                                            >
                                                                &nbsp;
                                                            </span>
                                                        </span>
                                                    ) : (
                                                        <span
                                                            className={cx('attribute-square-container')}
                                                            title={color}
                                                        >
                                                            <span
                                                                className={cx('attribute-square')}
                                                                style={{ backgroundColor: `var(--${color})` }}
                                                            >
                                                                &nbsp;
                                                            </span>
                                                        </span>
                                                    )}
                                                    <input
                                                        className={cx('input-color')}
                                                        id={`color-${color}`}
                                                        type="radio"
                                                        name="color"
                                                        checked={colorChoose === color}
                                                        value={color}
                                                        onChange={() => {
                                                            setColorChoose(color);
                                                            colorNew(color);
                                                        }}
                                                    />
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                    <div className={cx('short-des')}>
                        <div className={cx('p-title')}>
                            <FontAwesomeIcon className={cx('icon')} icon={faGift} />
                            <p className={cx('title')}>Khuyến mại</p>
                        </div>
                        <div className={cx('inf-promotions')}>
                            <ul className={cx('option-list')}>
                                <li className={cx('option-item')}>
                                    <input
                                        className={cx('input-option')}
                                        id="buy-product"
                                        type="radio"
                                        name="buy"
                                        value="Mua thẳng"
                                        defaultChecked
                                        onChange={(e) => {
                                            setPromotions(e.target.value);
                                        }}
                                    />
                                    <label className={cx('label-option')} htmlFor="buy-product">
                                        Mua thẳng
                                    </label>
                                </li>
                                <li className={cx('option-item')}>
                                    <input
                                        className={cx('input-option')}
                                        id="buy-product-buy-0"
                                        type="radio"
                                        name="buy"
                                        value="Trả góp 0%"
                                        onChange={(e) => {
                                            setPromotions(e.target.value);
                                        }}
                                    />
                                    <label className={cx('label-option')} htmlFor="buy-product-buy-9">
                                        Trả góp 0%
                                    </label>
                                </li>
                                <li className={cx('option-item')}>
                                    <input
                                        className={cx('input-option')}
                                        id="buy-product-buy-vip"
                                        type="radio"
                                        name="buy"
                                        value="Giá ưu đãi mua kèm bảo hành kim cương, VIP"
                                        onChange={(e) => {
                                            setPromotions(e.target.value);
                                        }}
                                    />
                                    <label className={cx('label-option')} htmlFor="buy-product-buy-vip">
                                        Giá ưu đãi mua kèm bảo hành kim cương, VIP
                                    </label>
                                </li>
                            </ul>
                        </div>
                        <div className={cx('p-title', 'ud_mo')}>
                            <FontAwesomeIcon className={cx('icon')} icon={faGift} />
                            <p className={cx('title')}>Ưu đãi</p>
                        </div>
                        <Gift maxLength={126} />
                    </div>
                    <Link className={cx('popup-store')}>
                        <FontAwesomeIcon className={cx('popup-icon')} icon={faBuilding} />
                        Xem của hàng có sẵn sản phẩm
                    </Link>
                    <div className={cx('add-cart-button')}>
                        <div className={cx('add-to-cart')}>
                            <Link to={config.routes.cart} onClick={handleLinkBuy}>
                                <button className={cx('add-click')} onClick={handleBuy}>
                                    {upOptions === true ? <span>Mua ngay</span> : <span>Cập nhật</span>}
                                </button>
                            </Link>
                        </div>
                        <div className={cx('button-bottom')}>
                            <Link className={cx('choose-btn')}>Trả góp</Link>
                            <Link className={cx('choose-btn')}>
                                <FontAwesomeIcon icon={faRepeat} />
                                Thu cũ đổi mới
                            </Link>
                        </div>
                    </div>
                    <div className={cx('product-policy')}>
                        <ul className={cx('list-item')}>
                            <li className={cx('item')}>
                                <FontAwesomeIcon className={cx('item-icon')} icon={faCircleCheck} />
                                <span>Bộ sản phẩm gồm: Hộp, Sách hướng dẫn, Cây lấy sim, Cáp Lightning - Type C</span>
                            </li>
                            <li className={cx('item')}>
                                <FontAwesomeIcon className={cx('item-icon')} icon={faCircleCheck} />
                                <span>Bảo hành chính hãng 1 năm</span>
                                <Link className={cx('item-link')}>
                                    <strong>(Chi tiết)</strong>
                                </Link>
                            </li>
                            <li className={cx('item')}>
                                <FontAwesomeIcon className={cx('item-icon')} icon={faCircleCheck} />
                                <span>Giao hàng nhanh toàn quốc</span>
                                <Link className={cx('item-link')}>
                                    <strong>(Chi tiết)</strong>
                                </Link>
                            </li>
                            <li className={cx('item')}>
                                <FontAwesomeIcon className={cx('item-icon')} icon={faCircleCheck} />
                                <span>Gọi đặt mua </span>
                                <Link className={cx('item-link')}>1900.6626</Link>
                                <span>(7:30 - 22:00)</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OverView;
