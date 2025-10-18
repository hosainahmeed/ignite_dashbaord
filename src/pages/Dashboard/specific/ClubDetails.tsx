import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PageContent, PageLayout } from "../../../Layout/PageLayOut";
import { clubData } from "../../../Components/ui/tables/Clubtable";
import type { ClubRecord } from "../../../types/User";

function ClubDetails() {
  const { id } = useParams();
  const [data, setData] = useState<ClubRecord | null | undefined>(null);
  useEffect(() => {
    const singleClubdata = clubData.find((user) => user?.key === Number(id))
    console.log(singleClubdata)
    setData(singleClubdata)
  }, [id])
  console.log(data)
  if (!data) {
    return <div>Loading...</div>
  }

  return (
    <PageLayout title="Clubs  Details ">
      <PageContent>
        <div className="grid grid-cols-2 gap-4">
          <ClubDetailsCard title="Club Name" description={data?.club_name} />
          <ClubDetailsCard title="Sport Offered" description={data?.sportOffered} />
          <ClubDetailsCard title="Club Website" description={data?.club_website} />
          <ClubDetailsCard title="Join Fee" description={data?.joinFee} />
          <ClubDetailsCard title="Status" description={data?.status} />
          <ClubDetailsCard title="Primary Contact Name" description={data?.primaryContactName} />
          <ClubDetailsCard title="Primary Contact Email" description={data?.primaryContactEmail} />
          <ClubDetailsCard title="Primary Contact Phone" description={data?.primaryContactPhone} />
          <div className="grid col-span-2 space-y-2 grid-cols-2 gap-4">
            {
              data?.clubAddress.map((address, index) => (
                <div key={index} className="space-y-4 p-2 rounded-md">
                  <ClubDetailsCard title={`Street Address ${index + 1}`} description={address.streetAddress ?? 'N/A'} />
                  <ClubDetailsCard title={`City ${index + 1}`} description={address.city ?? 'N/A'} />
                  <ClubDetailsCard title={`State ${index + 1}`} description={address.state ?? 'N/A'} />
                  <ClubDetailsCard title={`Zip Code ${index + 1}`} description={address.zipCode ?? 'N/A'} />
                </div>
              ))
            }
          </div>
          <ClubDetailsCard title="Quantity" description={data?.quantity} />
          <ClubDetailsCard title={`Competition Levels`} description={data?.competitionLevels ?? 'N/A'} />
        </div>
      </PageContent>
    </PageLayout>
  )
}

export default ClubDetails


const ClubDetailsCard = ({ title, description }: { title: string, description: string }) => {
  return (
    <div
      className="p-4 border border-gray-300 rounded bg-[#fff]">
      <p className="font-bold">{title}</p>
      <p className="text-gray-600">{description}</p>
    </div>
  )
}