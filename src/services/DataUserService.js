import * as httpRequest from '~/util/httpRequest';

export const post = async ({ dataUser }) => {
    try {
        const res = await httpRequest.post('dataUsers', {
            dataUser: dataUser,
            deliveryAddress: [],
        });
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const getLogin = async ({ userName, password }) => {
    try {
        const res = await httpRequest.post('dataUsers/confirmDataUsers', {
            userName: userName,
            password: password,
        });

        return res;
    } catch (error) {
        console.log(error);
    }
};

export const getUser = async ({ id }) => {
    try {
        const res = await httpRequest.get('dataUsers', {
            params: {
                id: id,
            },
        });

        return res;
    } catch (error) {
        console.log(error);
    }
};

export const putData = async ({ id, dataUser }) => {
    try {
        const oldRes = await httpRequest.get('dataUsers', {
            params: {
                id: id,
            },
        });

        const res = await httpRequest.put(`dataUsers/${id}`, {
            dataUser: dataUser,
            deliveryAddress: oldRes[0].deliveryAddress,
        });

        return res;
    } catch (error) {
        console.log(error);
    }
};

export const getAddress = async ({ id }) => {
    try {
        const res = await httpRequest.get('dataUsers', {
            params: {
                id: id,
            },
        });

        return res[0].deliveryAddress;
    } catch (error) {
        console.log(error);
    }
};

export const putAddress = async ({ id, deliveryAddress }) => {
    try {
        const oldRes = await httpRequest.get('dataUsers', {
            params: {
                id: id,
            },
        });
        const res = await httpRequest.put(`dataUsers/${id}`, {
            dataUser: oldRes[0].dataUser,
            deliveryAddress: deliveryAddress,
        });

        return res;
    } catch (error) {
        console.log(error);
    }
};
