import { useParams } from "react-router-dom";
import { PageContent, PageLayout } from "../../../Layout/PageLayOut";
import { useGetSingleDonationQuery } from "../../../redux/services/donationApis";
import type { donationsRecord } from "../../../types/User";

function DonationDetails() {
  const { id } = useParams();
  const { data: user, isLoading } = useGetSingleDonationQuery(id as string, { skip: !id })

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString();
  }
  if (isLoading) {
    return <div>Loading...</div>
  }
  const data: donationsRecord = !isLoading && user?.data
  const CardData: { title: string, description: string | number }[] = [
    { title: "Donor Name", description: data?.donorName || "N/A" },
    { title: "Donor Email", description: data?.email || "N/A" },
    { title: "Fund Type", description: data?.fundType || "N/A" },
    { title: "Donation Frequency", description: data?.frequency || "N/A" },
    { title: "Subscription Expiry Date", description: data?.freeCovered ? 'Yes (3%)' : 'No (0%)' },
    { title: "Total Paid", description: data?.amount || "N/A" },
    { title: "Donation Date", description: formatDate(data?.createdAt) },
    { title: "Payment Method", description: 'Stripe' },
    { title: "Transaction ID", description: data?.transactionId || "N/A" },
  ]
  return (
    <PageLayout title="Donation Details">
      <PageContent>
        {
          data && (
            <div>
              <div className="grid grid-cols-2 mt-4 gap-4">
                {Array.isArray(CardData) && CardData.map((item, index) => (
                  <DonationDetailsCard key={index} title={item.title} description={item.description} />
                ))}
              </div>
            </div>
          )
        }
      </PageContent>
    </PageLayout>
  )
}

export default DonationDetails


const DonationDetailsCard = ({ title, description }: { title: string, description: string | number }) => {
  return (
    <div
      className="p-4 border border-[#FFDAD9] rounded-xl bg-[#fff]">
      <p className="font-bold">{title}</p>
      <p className="text-gray-600">{description}</p>
    </div>
  )
}