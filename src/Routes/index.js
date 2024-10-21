import Home from '~/pages/Home';
import Ipad from '~/pages/Ipad';
import Iphone from '~/pages/Iphone';
import Mac from '~/pages/Mac';
import ServicePage from '~/pages/ServicePage';
import SoundPage from '~/pages/SoundPage';
import Watch from '~/pages/Watch';
import AccessoryPage from '~/pages/AccessoryPage';
import ProductItem from '~/pages/ProductItem';
import Cart from '~/pages/Cart';
import Register from '~/pages/Register';
import Login from '~/pages/Login';
import User from '~/pages/User';
import Admin from '~/pages/Admin';

import config from '~/config';

const publicRoutes = [
    {
        path: config.routes.admin,
        component: Admin,
    },
    {
        path: config.routes.home,
        component: Home,
    },
    {
        path: config.routes.cart,
        component: Cart,
    },
    {
        path: config.routes.ipad,
        component: Ipad,
    },
    {
        path: config.routes.accessorypage,
        component: AccessoryPage,
    },
    {
        path: config.routes.iphone,
        component: Iphone,
    },
    {
        path: config.routes.mac,
        component: Mac,
    },
    {
        path: config.routes.servicepage,
        component: ServicePage,
    },
    {
        path: config.routes.soundpage,
        component: SoundPage,
    },
    {
        path: config.routes.watch,
        component: Watch,
    },
    {
        path: config.routes.productitem,
        component: ProductItem,
    },
    {
        path: config.routes.iphone11series,
        component: Iphone,
    },
    {
        path: config.routes.iphone12series,
        component: Iphone,
    },
    {
        path: config.routes.iphone13series,
        component: Iphone,
    },
    {
        path: config.routes.iphone14series,
        component: Iphone,
    },
    {
        path: config.routes.iphoneSE,
        component: Iphone,
    },
    {
        path: config.routes.ipad10,
        component: Ipad,
    },
    {
        path: config.routes.ipad9,
        component: Ipad,
    },
    {
        path: config.routes.ipadair,
        component: Ipad,
    },
    {
        path: config.routes.ipadmini,
        component: Ipad,
    },
    {
        path: config.routes.ipadprom1,
        component: Ipad,
    },
    {
        path: config.routes.ipadprom2,
        component: Ipad,
    },
    {
        path: config.routes.imac,
        component: Mac,
    },
    {
        path: config.routes.macbookair,
        component: Mac,
    },
    {
        path: config.routes.macbookpro,
        component: Mac,
    },
    {
        path: config.routes.macmini,
        component: Mac,
    },
    {
        path: config.routes.macpro,
        component: Mac,
    },
    {
        path: config.routes.macstudio,
        component: Mac,
    },
    {
        path: config.routes.applewatchse,
        component: Watch,
    },
    {
        path: config.routes.applewatchseries3,
        component: Watch,
    },
    {
        path: config.routes.applewatchseries6,
        component: Watch,
    },
    {
        path: config.routes.applewatchseries7,
        component: Watch,
    },
    {
        path: config.routes.applewatchseries8,
        component: Watch,
    },
    {
        path: config.routes.applewatchultra,
        component: Watch,
    },
    {
        path: config.routes.airpods,
        component: SoundPage,
    },
    {
        path: config.routes.airpods_pro,
        component: SoundPage,
    },
    {
        path: config.routes.audio_technica,
        component: SoundPage,
    },
    {
        path: config.routes.beats,
        component: SoundPage,
    },
    {
        path: config.routes.earpods,
        component: SoundPage,
    },
    {
        path: config.routes.google,
        component: SoundPage,
    },
    {
        path: config.routes.harman_kardon,
        component: SoundPage,
    },
    {
        path: config.routes.jabra,
        component: SoundPage,
    },
    {
        path: config.routes.jbl,
        component: SoundPage,
    },
    {
        path: config.routes.marshall,
        component: SoundPage,
    },
    {
        path: config.routes.apple_TV,
        component: AccessoryPage,
    },
    {
        path: config.routes.balo_tui_chong_soc,
        component: AccessoryPage,
    },
    {
        path: config.routes.bao_da_op_lung,
        component: AccessoryPage,
    },
    {
        path: config.routes.but_apple_pencil,
        component: AccessoryPage,
    },
    {
        path: config.routes.chuot_ban_phim,
        component: AccessoryPage,
    },
    {
        path: config.routes.cuong_luc_bao_ve,
        component: AccessoryPage,
    },
    {
        path: config.routes.day_deo_apple_watch,
        component: AccessoryPage,
    },
    {
        path: config.routes.dong_ho_garmin,
        component: AccessoryPage,
    },
    {
        path: config.routes.may_anh,
        component: AccessoryPage,
    },
    {
        path: config.routes.may_doc_sach,
        component: AccessoryPage,
    },
    {
        path: config.routes.sac_cap,
        component: AccessoryPage,
    },
    {
        path: config.routes.sac_du_phong,
        component: AccessoryPage,
    },
    {
        path: config.routes.air_tags,
        component: AccessoryPage,
    },
    {
        path: config.routes.register,
        component: Register,
    },
    {
        path: config.routes.login,
        component: Login,
    },
];

const privateRoutes = [
    ...publicRoutes,
    {
        path: config.routes.user,
        component: User,
    },
    {
        path: config.routes.account,
        component: User,
    },
    {
        path: config.routes.orderHistory,
        component: User,
    },
    {
        path: config.routes.deliveryAddress,
        component: User,
    },
    {
        path: config.routes.favoriteProducts,
        component: User,
    },
    {
        path: config.routes.giftYour,
        component: User,
    },
];

export { publicRoutes, privateRoutes };
