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
        markAsPlaced: build.mutation({
            query: (id: string) => ({
                url: `/nomination/mark-as-placed/${id}`,
                method: 'PATCH'
            }),
            invalidatesTags: ['nomination']
        })
    })
})

export const { useGetAllNominationQuery, useGetSingleNominationQuery, useMarkAsPlacedMutation } = nominationApis