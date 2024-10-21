import * as httpRequest from '~/util/httpRequest';

export const getBannerSmallHome = async () => {
    try {
        const res = await httpRequest.get('bannerSmall', {
            params: {},
        });
        return res;
    } catch (error) {
        console.log(error);
    }
};
