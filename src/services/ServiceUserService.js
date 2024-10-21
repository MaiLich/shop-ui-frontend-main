import * as httpRequest from '~/util/httpRequest';

export const get = async ({ _page, _limit }) => {
    try {
        const res = await httpRequest.get('serviceUser', {
            params: {
                _page,
                _limit,
            },
        });
        return res;
    } catch (error) {
        console.log(error);
    }
};
