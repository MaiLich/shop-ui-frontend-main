import * as httpRequest from '~/util/httpRequest';

export const getBannerHome = async ({ id }) => {
    try {
        const res = await httpRequest.get('banner', {
            params: {
                id,
            },
        });
        return res;
    } catch (error) {
        console.log(error);
    }
};
