import * as httpRequest from '~/util/httpRequest';

export const post = async ({ dataUser, dataProduct, total, sessionID }) => {
    try {
        const res = await httpRequest.post('client', {
            dataUser: dataUser,
            dataProduct: dataProduct,
            total: total,
            sessionID: sessionID,
        });
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const get = async ({ id }) => {
    try {
        const res = await httpRequest.get('client', {
            params: {
                id: id,
            },
        });
        return res;
    } catch (error) {
        console.log(error);
    }
};
