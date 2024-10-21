import * as httpRequest from '~/util/httpRequest';

export const getEndow = async ({ id }) => {
    try {
        const res = await httpRequest.get('endow', {
            params: {
                id,
            },
        });
        return res;
    } catch (error) {
        console.log(error);
    }
};
