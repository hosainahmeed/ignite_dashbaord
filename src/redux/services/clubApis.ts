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
        })
    })
})

export const { useGetAllClubQuery ,useGetSingleClubQuery,useDeleteClubMutation} = clubApis