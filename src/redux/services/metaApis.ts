import baseApis from "../baseApis";

const metaApis = baseApis.injectEndpoints({
    endpoints: (builder) => ({
        getMetaData: builder.query({
            query: () => ({
                url: '/meta/get-meta-data',
                method: 'GET',
            }),
            providesTags: ['meta']
        }),
        getDonationChartData: builder.query({
            query: (args: { year?: number } = {}) => ({
                url: '/meta/donation-chart-data',
                method: 'GET',
                params: args.year ? { year: args.year } : undefined,
            }),
            providesTags: ['meta']
        })
    })
})

export const { useGetMetaDataQuery, useGetDonationChartDataQuery } = metaApis;