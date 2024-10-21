import * as httpRequest from '~/util/httpRequest';

export const getBanner = async ({ name }) => {
    try {
        const res = await httpRequest.get('bannerPage', {
            params: {
                name,
            },
        });
        return res;
    } catch (error) {
        console.log(error);
    }
};
