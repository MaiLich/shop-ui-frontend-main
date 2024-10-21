import * as httpRequest from '~/util/httpRequest';

export const get = async ({ title, _sort, _order, _page, _limit }) => {
    try {
        const res = await httpRequest.get('comment', {
            params: {
                title: title,
                _sort,
                _order,
                _page,
                _limit,
            },
        });
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const post = async ({ title, name, phoneNumber, commentUser, dateComment }) => {
    try {
        const res = await httpRequest.post('comment', {
            data: {
                name: name,
                phoneNumber: phoneNumber,
                commentUser: commentUser,
                dateComment: dateComment,
            },
            title: title,
        });
        return res;
    } catch (error) {
        console.log(error);
    }
};
