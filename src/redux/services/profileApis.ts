import baseApis from "../baseApis";

const profileApis = baseApis.injectEndpoints({
    endpoints: (build) => ({
        updateProfile: build.mutation({
            query: (data) => ({
                url: '/profile/update',
                method: 'PATCH',
                body: data
            }),
            invalidatesTags: ['profile']
        })
    })
})

export const { useUpdateProfileMutation } = profileApis
