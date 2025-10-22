import baseApis from "../baseApis";

const authApis = baseApis.injectEndpoints({
    endpoints: (build) => ({
        login: build.mutation({
            query: (data: any) => ({
                url: '/auth/login',
                method: 'POST',
                body: data
            })
        }),
        changePassword: build.mutation({
            query: (data: any) => ({
                url: '/auth/change-password',
                method: 'POST',
                body: data
            })
        })
    })
})

export const { useLoginMutation, useChangePasswordMutation } = authApis