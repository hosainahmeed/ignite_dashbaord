import baseApis from "../baseApis";

const profileApis = baseApis.injectEndpoints({
    endpoints: (build) => ({
        userMyProfile: build.query({
            query: () => ({
                url: '/user/my-profile',
                method: 'GET',
            }),
            providesTags: ['profile']
        }),
        updateProfile: build.mutation({
            query: (data) => ({
                url: '/user/update-my-profile',
                method: 'PATCH',
                body: data
            }),
            invalidatesTags: ['profile']
        })
    })
})

export const { useUserMyProfileQuery, useUpdateProfileMutation } = profileApis
