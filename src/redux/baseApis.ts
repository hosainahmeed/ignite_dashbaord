
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';
const baseApis = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: "http://10.10.20.9:5070",
        prepareHeaders: (headers) => {
            const token = Cookies.get('accessToken');
            if (token) {
                headers.set('Authorization', `${token}`);
            }
            return headers;
        },
    }),
    tagTypes: [
        'termsAndConditions',
        'privacyPolicy',
        'faq',
        'post',
        'profile',
        'subscription',
        'category',
        'member',
        'nomination'
    ],
    endpoints: () => ({}),
});

export default baseApis;
