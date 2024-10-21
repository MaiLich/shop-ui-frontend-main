import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Admin.module.scss';

const cx = classNames.bind(styles);

function Admin() {
    const [activeTab, setActiveTab] = useState('orders');
    const [orders, setOrders] = useState([
        {
            id: 1,
            customer: {
                name: 'Mai Văn Lịch',
                email: 'anhemlich@gmail.com',
                phone: '0377574734',
                address: 'Nguyễn Văn Trỗi, Mộ lao, Hà Đông, Hà Nội',
            },
            items: [
                {
                    id: 1,
                    name: 'iPhone 13',
                    quantity: 1,
                    classification: { color: 'Black', capacity: '128GB' },
                },
                {
                    id: 2,
                    name: 'Apple Watch Series 7 Nhôm',
                    quantity: 1,
                    classification: { color: 'White', capacity: '41mm' },
                },
            ],
            paymentMethod: 'Chuyển khoản ngân hàng',
            total: '49.370.000',
            status: 'Đã xử lý',
            orderDate: '04-12-2023',
        },
        {
            id: 2,
            customer: {
                name: 'Nguyễn Văn Huy',
                email: 'huynguyen@gmail.com',
                phone: '0355662515',
                address: '133 đường Chương Dương, Hải Châu, Đà Nẵng',
            },
            items: [
                {
                    id: 3,
                    name: 'Ipad Air 4',
                    quantity: 2,
                    classification: { color: 'White', capacity: '64GB' },
                },
            ],
            paymentMethod: 'Payo',
            total: '29.990.000',
            status: 'Đang giao hàng',
            orderDate: '12-03-2024',
        },
        {
            id: 3,
            customer: {
                name: 'Trần Đức Đạt',
                email: 'datbeo@gmail.com',
                phone: '0355662515',
                address: 'Nguyễn Văn Tuyết, Cầu Giấy, Hà Nội',
            },
            items: [
                {
                    id: 4,
                    name: 'Macbook Air M1',
                    quantity: 1,
                    classification: { color: 'Gold', capacity: '128GB' },
                },
            ],
            paymentMethod: 'Chuyển khoản ngân hàng',
            total: '18.690.000',
            status: 'Đang giao hàng',
            orderDate: '12-05-2024',
        },
        {
            id: 4,
            customer: {
                name: 'Nguyễn Thị Linh',
                email: 'huynguyen@gmail.com',
                phone: '0355662515',
                address: 'Đường Đỗ Đức Dục, Hải Châu, Đà Nẵng',
            },
            items: [
                {
                    id: 5,
                    name: 'Ipad Air 4',
                    quantity: 2,
                    classification: { color: 'White', capacity: '64GB' },
                },
            ],
            paymentMethod: 'One Pay',
            total: '29.990.000',
            status: 'Đang giao hàng',
            orderDate: '12-03-2024',
        },
        {
            id: 5,
            customer: {
                name: 'Mai Văn Lịch',
                email: 'anhemlich@gmail.com',
                phone: '0377574734',
                address: 'Nguyễn Văn Trỗi, Mộ lao, Hà Đông, Hà Nội',
            },
            items: [
                {
                    id: 6,
                    name: 'iPhone 13',
                    quantity: 1,
                    classification: { color: 'Black', capacity: '128GB' },
                },
                {
                    id: 7,
                    name: 'Apple Watch Series 7 Nhôm',
                    quantity: 1,
                    classification: { color: 'White', capacity: '41mm' },
                },
            ],
            paymentMethod: 'Chuyển khoản ngân hàng',
            total: '49.370.000',
            status: 'Đã xử lý',
            orderDate: '04-12-2023',
        },
    ]);

    const [products, setProducts] = useState([
        {
            id: 1,
            name: 'iPhone 14 Pro',
            price: '26.390.000',
            stock: 14,
            category: 'iPhone',
            classification: { color: 'Black', capacity: '256GB' },
            image: 'https://shopdunk.com/images/thumbs/0018632_space-black_550.jpeg',
        },
        {
            id: 2,
            name: 'iPhone 14 Pro',
            price: '26.390.000',
            stock: 13,
            category: 'iPhone',
            classification: { color: 'silver', capacity: '128GB' },
            image: 'https://shopdunk.com/images/thumbs/0018643_silver_550.jpeg',
        },
        {
            id: 3,
            name: 'iPhone 14',
            price: '18.990.000',
            stock: 21,
            category: 'iPhone',
            classification: { color: 'purple', capacity: '64GB' },
            image: 'https://shopdunk.com/images/thumbs/0009209_iphone-14-128gb_550.png',
        },
        {
            id: 4,
            name: 'iPad Air 4',
            price: '14.990.000',
            stock: 32,
            category: 'iPad',
            classification: { color: 'Silver', capacity: '64GB' },
            image: 'https://shopdunk.com/images/thumbs/0007083_ipad-pro-m2-11-inch-wifi-128gb_550.webp',
        },
        {
            id: 5,
            name: 'iPad Pro M1',
            price: '14.990.000',
            stock: 8,
            category: 'iPad',
            classification: { color: 'Silver', capacity: '64GB' },
            image: 'https://shopdunk.com/images/thumbs/0010892_ipad-pro-m1-129-inch-wifi-cellular-512gb_550.webp',
        },
        {
            id: 6,
            name: 'iPad mini 6',
            price: '35.950.000',
            stock: 14,
            category: 'iPad',
            classification: { color: 'pink', capacity: '128GB' },
            image: 'https://shopdunk.com/images/thumbs/0001098_pink_550.webp',
        },
        {
            id: 7,
            name: 'MacBook Air M1',
            price: '18.690.000',
            stock: 14,
            category: 'Mac',
            classification: { color: 'silver', capacity: '256GB' },
            image: 'https://shopdunk.com/images/thumbs/0011196_silver_550.webp',
        },
        {
            id: 8,
            name: 'MacBook Air M1',
            price: '18.690.000',
            stock: 21,
            category: 'Mac',
            classification: { color: 'black', capacity: '128GB' },
            image: 'https://shopdunk.com/images/thumbs/0011410_space-gray_550.jpeg',
        },
        {
            id: 9,
            name: 'MacBook Pro 13 inch M2',
            price: '29.790.000',
            stock: 31,
            category: 'Mac',
            classification: { color: '18.690.000', capacity: '64GB' },
            image: 'https://shopdunk.com/images/thumbs/0011410_space-gray_550.jpeg',
        },
        {
            id: 10,
            name: 'Apple Watch Series 7 Nhôm GPS',
            price: '7.990.000',
            stock: 15,
            category: 'Watch',
            classification: { color: 'White', capacity: '42mm' },
            image: 'https://shopdunk.com/images/thumbs/0011842_midnight_550.webp',
        },
        {
            id: 11,
            name: 'Apple Watch Series 3 Nhôm',
            price: '5.990.000',
            stock: 21,
            category: 'Watch',
            classification: { color: 'silver', capacity: '42mm' },
            image: 'https://shopdunk.com/images/thumbs/0010162_silver_550.png',
        },
        {
            id: 12,
            name: 'AirPods Pro 2',
            price: '5.790.000',
            stock: 20,
            category: 'Âm thanh',
            classification: { color: 'White', capacity: 'N/A' },
            image: 'https://shopdunk.com/images/thumbs/0000211_airpods-pro-2_550.png',
        },
        {
            id: 13,
            name: 'AirPods Max',
            price: '12.590.000',
            stock: 30,
            category: 'Âm thanh',
            classification: { color: 'White', capacity: 'N/A' },
            image: 'https://shopdunk.com/images/thumbs/0012014_pink_550.webp',
        },
        {
            id: 14,
            name: 'Sạc 20W USB-C Power Adapter',
            price: '510.000',
            stock: 310,
            category: 'Phụ kiện',
            classification: { color: 'Black', capacity: 'N/A' },
            image: 'https://shopdunk.com/images/thumbs/0001395_sac-20w-usb-c-power-adapter_550.png',
        },
        {
            id: 15,
            name: 'Magic Mouse 2',
            price: '2.550.000',
            stock: 61,
            category: 'Phụ kiện',
            classification: { color: 'Black', capacity: 'N/A' },
            image: 'https://shopdunk.com/images/thumbs/0001442_white_550.jpeg',
        },
    ]);

    const handleStatusChange = (orderId, newStatus) => {
        const updatedOrders = orders.map((order) => (order.id === orderId ? { ...order, status: newStatus } : order));
        setOrders(updatedOrders);
    };

    const handleProductChange = (productId, field, value) => {
        const updatedProducts = products.map((product) =>
            product.id === productId ? { ...product, [field]: value } : product,
        );
        setProducts(updatedProducts);
    };

    const handleDeleteProduct = (productId) => {
        const updatedProducts = products.filter((product) => product.id !== productId);
        setProducts(updatedProducts);
    };

    const handleAddProduct = (newProduct) => {
        setProducts([...products, { ...newProduct, id: products.length + 1 }]);
    };

    const renderProductsByCategory = (category) => {
        return products
            .filter((product) => product.category === category)
            .map((product) => (
                <tr key={product.id}>
                    <td className={cx('image-column')}>
                        <img src={product.image} alt={product.name} />
                    </td>
                    <td>{product.name}</td>
                    <td>{product.classification.color}</td>
                    <td>{product.classification.capacity}</td>
                    <td>{product.price}</td>
                    <td>{product.stock}</td>
                    <td>
                        <input
                            type="number"
                            value={product.stock}
                            onChange={(e) => handleProductChange(product.id, 'stock', e.target.value)}
                        />
                    </td>
                    <td className={cx('action-column')}>
                        <button onClick={() => handleDeleteProduct(product.id)}>Xóa</button>
                    </td>
                </tr>
            ));
    };

    return (
        <div className={cx('admin')}>
            <div className={cx('tabs-container')}>
                <div className={cx('tabs')}>
                    <button onClick={() => setActiveTab('orders')} className={cx({ active: activeTab === 'orders' })}>
                        Quản lý đơn hàng
                    </button>
                    <button
                        onClick={() => setActiveTab('products')}
                        className={cx({ active: activeTab === 'products' })}
                    >
                        Quản lý sản phẩm
                    </button>
                </div>
            </div>
            <div className={cx('content')}>
                {activeTab === 'orders' && (
                    <div className={cx('orders')}>
                        <h2>Quản lý đơn hàng</h2>
                        <table className={cx('order-table')}>
                            <thead>
                                <tr>
                                    <th>Ngày mua</th>
                                    <th>Tên khách hàng</th>
                                    <th>Email</th>
                                    <th>Số điện thoại</th>
                                    <th>Địa chỉ</th>
                                    <th>Tên sản phẩm</th>
                                    <th>Số lượng</th>
                                    <th>Phân loại</th>
                                    <th>Hình thức thanh toán</th>
                                    <th>Tổng cộng</th>
                                    <th>Trạng thái</th>
                                    <th>Thay đổi trạng thái</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((order) => (
                                    <React.Fragment key={order.id}>
                                        {order.items.map((item, index) => (
                                            <tr key={item.id}>
                                                {index === 0 && (
                                                    <>
                                                        <td rowSpan={order.items.length}>{order.orderDate}</td>
                                                        <td rowSpan={order.items.length}>{order.customer.name}</td>
                                                        <td rowSpan={order.items.length}>{order.customer.email}</td>
                                                        <td rowSpan={order.items.length}>{order.customer.phone}</td>
                                                        <td rowSpan={order.items.length}>{order.customer.address}</td>
                                                    </>
                                                )}
                                                <td>{item.name}</td>
                                                <td>{item.quantity}</td>
                                                <td>
                                                    Màu sắc: {item.classification.color}, Dung lượng:{' '}
                                                    {item.classification.capacity}
                                                </td>
                                                {index === 0 && (
                                                    <>
                                                        <td rowSpan={order.items.length}>{order.paymentMethod}</td>
                                                        <td rowSpan={order.items.length}>{order.total}</td>
                                                        <td rowSpan={order.items.length}>{order.status}</td>
                                                        <td rowSpan={order.items.length}>
                                                            <select
                                                                value={order.status}
                                                                onChange={(e) =>
                                                                    handleStatusChange(order.id, e.target.value)
                                                                }
                                                            >
                                                                <option value="Chưa giải quyết">Chưa giải quyết</option>
                                                                <option value="Đang xử lý">Đang xử lý</option>
                                                                <option value="Đang giao hàng">Đang giao hàng</option>
                                                                <option value="Đã giao hàng">Đã giao hàng</option>
                                                                <option value="Đã xử lý">Đã xử lý</option>
                                                            </select>
                                                        </td>
                                                    </>
                                                )}
                                            </tr>
                                        ))}
                                    </React.Fragment>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
                {activeTab === 'products' && (
                    <div className={cx('products')}>
                        <h2>Quản lý sản phẩm</h2>
                        {['iPhone', 'iPad', 'Mac', 'Watch', 'Âm thanh', 'Phụ kiện'].map((category) => (
                            <div key={category} className={cx('product-category')}>
                                <h3>{category}</h3>
                                <table className={cx('product-table')}>
                                    <thead>
                                        <tr>
                                            <th>Ảnh</th>
                                            <th>Tên</th>
                                            <th>Màu sắc</th>
                                            <th>Dung lượng</th>
                                            <th>Giá</th>
                                            <th>Tồn kho</th>
                                            <th>Chỉnh sửa tồn kho</th>
                                            <th>Hành động</th>
                                        </tr>
                                    </thead>
                                    <tbody>{renderProductsByCategory(category)}</tbody>
                                </table>
                            </div>
                        ))}
                        <div className={cx('add-product')}>
                            <h3>Thêm sản phẩm mới</h3>
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    const formData = new FormData(e.target);
                                    const newProduct = {
                                        name: formData.get('name'),
                                        category: formData.get('category'),
                                        classification: {
                                            color: formData.get('color'),
                                            capacity: formData.get('capacity'),
                                        },
                                        price: formData.get('price'),
                                        stock: formData.get('stock'),
                                        image: formData.get('image'),
                                    };
                                    handleAddProduct(newProduct);
                                    e.target.reset();
                                }}
                            >
                                <div>
                                    <label htmlFor="name">Tên sản phẩm:</label>
                                    <input type="text" id="name" name="name" required />
                                </div>
                                <div>
                                    <label htmlFor="category">Danh mục:</label>
                                    <select id="category" name="category" required>
                                        <option value="iPhone">iPhone</option>
                                        <option value="iPad">iPad</option>
                                        <option value="Mac">Mac</option>
                                        <option value="Watch">Watch</option>
                                        <option value="Âm thanh">Âm thanh</option>
                                        <option value="Phụ kiện">Phụ kiện</option>
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="color">Màu sắc:</label>
                                    <input type="text" id="color" name="color" required />
                                </div>
                                <div>
                                    <label htmlFor="capacity">Dung lượng:</label>
                                    <input type="text" id="capacity" name="capacity" required />
                                </div>
                                <div>
                                    <label htmlFor="price">Giá:</label>
                                    <input type="number" id="price" name="price" required />
                                </div>
                                <div>
                                    <label htmlFor="stock">Tồn kho:</label>
                                    <input type="number" id="stock" name="stock" required />
                                </div>
                                <div>
                                    <label htmlFor="image">URL ảnh:</label>
                                    <input type="text" id="image" name="image" required />
                                </div>
                                <div>
                                    <button type="submit">Thêm sản phẩm</button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Admin;
