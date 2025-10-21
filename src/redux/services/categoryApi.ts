import baseApis from "../baseApis";

const categoryApi = baseApis.injectEndpoints({
    endpoints: (build) => ({
        allCategories: build.query({
            query: () => ({
                url: '/category/get-all',
                method: 'GET',
            }),
            providesTags: ['category']
        }),
        updateCategory: build.mutation({
            query: ({ id, name }: { id: string, name: string }) => ({
                url: `/category/update/${id}`,
                method: 'PATCH',
                body: { name: name }
            }),
            invalidatesTags: ['category']
        }),
        deleteCategory: build.mutation({
            query: (id: string) => ({
                url: `/category/delete/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['category']
        }),
        createCategory: build.mutation({
            query: (data: { name: string }) => ({
                url: '/category/create',
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['category']
        })
    })
})

export const { useAllCategoriesQuery, useUpdateCategoryMutation, useDeleteCategoryMutation, useCreateCategoryMutation } = categoryApi