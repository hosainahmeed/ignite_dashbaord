import baseApis from "../baseApis";

const clubApis = baseApis.injectEndpoints({
    endpoints: (build) => ({
        getAllClub: build.query({
            query: (params: any) => ({
                url: '/club/get-all',
                method: 'GET',
                params
            }),
            providesTags: ['club']
        }),
        getSingleClub: build.query({
            query: (id: string) => ({
                url: `/club/get-single/${id}`,
                method: 'GET',
            }),
            providesTags: ['club']
        }),
        deleteClub: build.mutation({
            query: (id: string) => ({
                url: `/club/delete/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['club']
        }),
        clubJoinFee: build.query({
            query: (params: any) => ({
                url: '/club-join-fee',
                method: 'GET',
                params
            }),
            providesTags: ['club-join-fee']
        }),
        createClubJoinFee: build.mutation({
            query: (data: any) => ({
                url: '/club-join-fee',
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['club-join-fee']
        }),
    })
})

export const {
    useGetAllClubQuery,
    useGetSingleClubQuery,
    useDeleteClubMutation,
    useClubJoinFeeQuery,
    useCreateClubJoinFeeMutation,
} = clubApis