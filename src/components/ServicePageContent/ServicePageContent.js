import classNames from 'classnames/bind';
import styles from './ServicePageContent.module.scss';

import BannerPage from './component/BannerPage';
import Description from './component/Description';
import ListServices from './component/ListServices';

import * as BannerPageService from '~/services/BannerPageService';

const cx = classNames.bind(styles);

function ServicePage({ nameService, title }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('page-name')}>
                    <h1 className={cx('name')}>{title}</h1>
                </div>
                <BannerPage service={BannerPageService} name={title} />
                <ListServices nameService={nameService} />
                <Description name={title} />
            </div>
        </div>
    );
}

export default ServicePage;
