import baseApis from "../baseApis";

const donationApis = baseApis.injectEndpoints({
    endpoints: (build) => ({
        getAllDonations: build.query({
            query: ({ fundType, searchTerm }) => ({
                url: '/donation/get-all',
                method: 'GET',
                params: { fundType, searchTerm }
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