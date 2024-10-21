import classNames from 'classnames/bind';
import styles from './Home.module.scss';

import Banner from './component/Banner';
import BannerSmall from './component/BannerSmall';
import CategoryItem from './component/CategoryItem';
import * as IphoneService from '~/services/IphoneService';
import * as IpadService from '~/services/IpadService';
import * as MacService from '~/services/MacService';
import * as WatchService from '~/services/WatchService';
import * as SoundService from '~/services/SoundService';
import * as AccessoryService from '~/services/AccessoryService';
import config from '~/config';
import { Link } from 'react-router-dom';

import Image from '~/components/Image';

const cx = classNames.bind(styles);

function Home() {
    return (
        <div className={cx('wrapper')}>
            <Banner className={cx('banner-large')} />
            <div className={cx('inner')}>
                <BannerSmall className={cx('banner-small')} />
                <div className={cx('item-list')}>
                    <CategoryItem nameService={IphoneService} title="iPhone" path={config.routes.iphone} />
                    <CategoryItem nameService={IpadService} title="iPad" path={config.routes.ipad} />
                    <CategoryItem nameService={MacService} title="Mac" path={config.routes.mac} />
                    <CategoryItem nameService={WatchService} title="Watch" path={config.routes.watch} />
                    <CategoryItem nameService={SoundService} title="Âm thanh" path={config.routes.soundpage} />
                    <CategoryItem nameService={AccessoryService} title="Phụ kiện" path={config.routes.accessorypage} />
                </div>
                <div className={cx('banner-home-bottom')}>
                    <div className={cx('topic-block')}>
                        <div className={cx('topic-block-body')}>
                            <p>
                                <Link to="#">
                                    <Image
                                        className={cx('img-banner')}
                                        src="https://shopdunk.com/images/uploaded/Trang%20ch%E1%BB%A7/2.jpeg"
                                        alt="banner"
                                    />
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
