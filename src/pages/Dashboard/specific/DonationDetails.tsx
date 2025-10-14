import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { donationsData } from "../../../Components/ui/tables/DonationTable";
import type { donationsRecord } from "../../../types/User";
import { PageContent, PageLayout } from "../../../Layout/PageLayOut";

function DonationDetails() {
  const { id } = useParams();

  const [user, setUser] = useState<donationsRecord | null | undefined>(null);
  console.log(user)
  useEffect(() => {
    const user = donationsData.find((user) => user?.key === Number(id))
    console.log(user)
    setUser(user)
  }, [id])
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString();
  }

  return (
    <PageLayout title="Donation Details">
      <PageContent>
        {
          user && (
            <div>
              <div className="grid grid-cols-2 mt-4 gap-4">
                <DonationDetailsCard title="Donor Name" description={user?.donor_name} />
                <DonationDetailsCard title="Donor Email" description={user?.email} />
                <DonationDetailsCard title="Fund Type" description={user?.fund_type} />
                <DonationDetailsCard title="Tier Selected" description={user?.tier_selected} />
                <DonationDetailsCard title="Donation Frequency" description={user?.frequency} />
                <DonationDetailsCard title="Subscription Expiry Date" description={user?.fee_covered ? 'Yes (3%)' : 'No (0%)'} />
                <DonationDetailsCard title="Total Paid" description={user?.amount} />
                <DonationDetailsCard title="Donation Date" description={formatDate(user?.createdAt)} />
                <DonationDetailsCard title="Payment Method" description={'Stripe'} />
                <DonationDetailsCard title="Transaction ID" description={'TXN123456'} />
              </div>
            </div>
          )
        }
      </PageContent>
    </PageLayout>
  )
}

export default DonationDetails


const DonationDetailsCard = ({ title, description }: { title: string, description: string }) => {
  return (
    <div
      className="p-4 border border-[#FFDAD9] rounded-xl bg-[#fff]">
      <p className="font-bold">{title}</p>
      <p className="text-gray-600">{description}</p>
    </div>
  )
}