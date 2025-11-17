import baseApis from "../baseApis";

const donationApis = baseApis.injectEndpoints({
    endpoints: (build) => ({
        getAllDonations: build.query({
            query: ({ fundType, searchTerm, page, limit }) => ({
                url: '/donation/get-all',
                method: 'GET',
                params: { fundType, searchTerm, page, limit }
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