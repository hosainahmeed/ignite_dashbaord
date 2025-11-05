import baseApis from "../baseApis";

const donationApis = baseApis.injectEndpoints({
    endpoints: (build) => ({
        getAllDonations: build.query({
            query: ({ fundType }) => ({
                url: '/donation/get-all',
                method: 'GET',
                params: { fundType }
            }),
            providesTags: ['donations']
        }),
        getSingleDonation: build.query({
            query: (id: string) => ({
                url: `/donation/get-single/${id}`,
                method: 'GET'
            }),
            providesTags: ['donations']
        }),
    })
})

export const { useGetAllDonationsQuery, useGetSingleDonationQuery } = donationApis