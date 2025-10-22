import baseApis from "../baseApis";

const manageApis = baseApis.injectEndpoints({
    endpoints: ((builder) => ({
        getTermsAndConditions: builder.query({
            query: () => ({
                url: '/terms-condition',
                method: 'GET'
            }),
            providesTags: ['termsAndConditions']
        }),
        updateTermsAndConditions: builder.mutation({
            query: (data) => ({
                url: '/terms-condition/create-or-update',
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['termsAndConditions']
        }),
        getPrivacyPolicy: builder.query({
            query: () => ({
                url: '/privacy-policy',
                method: 'GET'
            }),
            providesTags: ['privacyPolicy']
        }),
        updatePrivacyPolicy: builder.mutation({
            query: (data) => ({
                url: '/privacy-policy/create-or-update',
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['privacyPolicy']
        }),
        getFaq: builder.query({
            query: () => ({
                url: '/faq/get-all',
                method: 'GET'
            }),
            providesTags: ['faq']
        }),
        createFaq: builder.mutation({
            query: (data) => ({
                url: '/faq/create',
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['faq']
        }),
        updateFaq: builder.mutation({
            query: ({ data, id }) => ({
                url: `/faq/update/${id}`,
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['faq']
        }),
        deleteFaq: builder.mutation({
            query: (id) => ({
                url: `/faq/delete/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['faq']
        })
    }))
})

export const {
    useGetTermsAndConditionsQuery,
    useUpdateTermsAndConditionsMutation,
    useGetPrivacyPolicyQuery,
    useUpdatePrivacyPolicyMutation,
    useGetFaqQuery,
    useCreateFaqMutation,
    useUpdateFaqMutation,
    useDeleteFaqMutation
} = manageApis

