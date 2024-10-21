import * as httpRequest from '~/util/httpRequest';

export const get = async ({ name }) => {
    try {
        const res = await httpRequest.get('address', {
            params: {
                name: name,
            },
        });
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const getAll = async () => {
    try {
        const res = await httpRequest.get('address', {
            params: {},
        });
        return res;
    } catch (error) {
        console.log(error);
    }
};
