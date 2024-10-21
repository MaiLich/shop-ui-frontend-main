import classNames from 'classnames/bind';
import styles from './ServicePage.module.scss';
import ServicePageContent from '~/components/ServicePageContent';
import * as ServiceUser from '~/services/ServiceUserService';
import TitleTab from '~/components/TitleTab';

const cx = classNames.bind(styles);

function ServicePage() {
    return (
        <div className={cx('wrapper')}>
            <TitleTab title={'Dịch vụ'} />
            <ServicePageContent nameService={ServiceUser} title="Dịch vụ" />
        </div>
    );
}

export default ServicePage;
