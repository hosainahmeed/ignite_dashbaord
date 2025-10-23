import baseApis from "../baseApis";

const nominationApis = baseApis.injectEndpoints({
    endpoints: (build) => ({
        getAllNomination: build.query({
            query: (params: any) => ({
                url: '/nomination/get-all',
                method: 'GET',
                params
            }),
            providesTags: ['nomination']
        }),
        getSingleNomination: build.query({
            query: (id: string) => ({
                url: `/nomination/get-single/${id}`,
                method: 'GET',
            }),
            providesTags: ['nomination']
        }),
    })
})

export const { useGetAllNominationQuery, useGetSingleNominationQuery } = nominationApis