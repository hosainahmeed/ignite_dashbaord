import baseApis from "../baseApis";

const userApis = baseApis.injectEndpoints({
    endpoints: (build) => ({
        getAllMember: build.query({
            query: () => ({
                url: '/member/get-all',
                method: 'GET',
            }),
            providesTags: ['member']
        }),
        getSingleMember: build.query({
            query: (id: string) => ({
                url: `/member/get-single/${id}`,
                method: 'GET',
            }),
            providesTags: ['member']
        }),
        updateMember: build.mutation({
            query: ({ data, id }: { data: any; id: string }) => ({
                url: `/member/update/${id}`,
                method: 'PATCH',
                body: data
            }),
            invalidatesTags: ['member']
        }),
        createMember: build.mutation({
            query: ((data) => ({
                url: '/member/create',
                method: 'POST',
                body: data
            })),
            invalidatesTags: ['member']
        }),
        deleteMember: build.mutation({
            query: (id: string) => ({
                url: `/member/delete/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['member']
        })
    })
})

export const {
    useGetAllMemberQuery,
    useCreateMemberMutation,
    useGetSingleMemberQuery,
    useUpdateMemberMutation,
    useDeleteMemberMutation
} = userApis