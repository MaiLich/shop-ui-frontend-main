import * as httpRequest from '~/util/httpRequest';

export const get = async ({ name }) => {
    try {
        const res = await httpRequest.get('blog', {
            params: {
                name: name,
            },
        });
        return res;
    } catch (error) {
        console.log(error);
    }
};
