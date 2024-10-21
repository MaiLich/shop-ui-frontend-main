import * as httpRequest from '~/util/httpRequest';

export const get = async ({ title, _sort, _order, _page, _limit }) => {
    try {
        const res = await httpRequest.get('rating', {
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

export const post = async ({ title, name, stars, nStars, review, dateReview }) => {
    try {
        const res = await httpRequest.post('rating', {
            data: {
                name: name,
                stars: stars,
                nStars: nStars,
                review: review,
                dateReview: dateReview,
            },
            title: title,
        });
        return res;
    } catch (error) {
        console.log(error);
    }
};
