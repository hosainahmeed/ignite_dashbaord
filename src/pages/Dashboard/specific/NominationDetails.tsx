import { useParams } from "react-router-dom";
import { PageContent, PageLayout } from "../../../Layout/PageLayOut"
import { useGetSingleNominationQuery, useMarkAsPlacedMutation } from "../../../redux/services/nominationApis";
import type { ChildRegistrationData } from "../../../types/childRegistration";
import { Card } from "antd";
import { Button } from "antd";

import toast from "react-hot-toast";

function NominationDetails() {
  const { id } = useParams();
  const { data: singleNominationData, isLoading } = useGetSingleNominationQuery(id as string, { skip: !id })
  const [markAsPlaced, { isLoading: markAsPlacedLoading }] = useMarkAsPlacedMutation()

  const data: ChildRegistrationData = singleNominationData?.data
  const DetailsData = [
    { title: "Child’s Sport", description: data?.childSport?.name ?? 'N/A' },
    { title: "Child’s First Name", description: data?.childFirstName ?? 'N/A' },
    { title: "Child’s Last Name", description: data?.childLastName ?? 'N/A' },
    { title: "Child’s Date of Birth", description: data?.dateOfBirth ?? 'N/A' },
    { title: "Child’s Gender", description: data?.gender ?? 'N/A' },
    { title: "Parent/Guardian First Name", description: data?.guardianFirstName ?? 'N/A' },
    { title: "Parent/Guardian Last Name", description: data?.guardianLastName ?? 'N/A' },
    { title: "Parent/Guardian Email", description: data?.guardianEmail ?? 'N/A' },
    { title: "Parent/Guardian street address", description: data?.guardianStreetAddress ?? 'N/A' },
    { title: "Parent/Guardian City / State", description: data?.guardianCityS ?? 'N/A' },
    { title: "Annual Household Income", description: data?.annualHouseHoldIncome ?? 'N/A' },
    { title: "Showcase Videos or Social Media link", description: data?.showcaseVideoLink ?? 'N/A' },
  ]
  console.log(data?.isPlaced ? "Placed" : "Not Placed")
  const handleMarkAsPlaced = async () => {
    try {
      if (!id) {
        throw new Error("No id found")
      }
      const res = await markAsPlaced(id).unwrap()
      if (!res?.success) {
        throw new Error(res?.data?.message || res?.message || "Failed to mark as placed")
      }
      if (res?.success) {
        toast.success(res?.data?.message || res?.message || "Marked as placed")
      }
    } catch (error: any) {
      toast.error(error?.data?.message || error?.message || "Failed to mark as placed")
    }
  }
  return (
    <PageLayout title="Nomination Details">
      <PageContent>
        <div className="grid grid-cols-2 gap-4">
          {DetailsData.map((item, index) => (
            <DetailsCard loading={isLoading} key={index} title={item.title} description={item.description} />
          ))}
        </div>
        <div className="p-4 border border-[#FFDAD9] rounded-xl bg-[#fff]">
          <h1 className="font-bold">Child’s Story</h1>
          <div dangerouslySetInnerHTML={{ __html: data?.childStory ?? '' }} />
        </div>
        <Button
          onClick={() => handleMarkAsPlaced()}
          disabled={markAsPlacedLoading}
          loading={markAsPlacedLoading}
          style={{
            backgroundColor: '#D62828',
            color: 'white',
            border: 'none',
            borderRadius: '0px',
            padding: '10px 20px',
            cursor: 'pointer',
          }}
        >
          {data?.isPlaced ? "Remove from Nomination" : "Mark as Placed"}
        </Button>
      </PageContent>
    </PageLayout>
  )
}

export default NominationDetails

const DetailsCard = ({ title, description, loading }: { title: string, description: string | number, loading?: boolean }) => {
  return (
    <>
      {
        loading ? <Card loading /> : (
          <div
            className="p-4 border border-[#FFDAD9] rounded-xl bg-[#fff]">
            <p className="font-bold">{title}</p>
            <p className="text-gray-600">{description}</p>
          </div>
        )
      }
    </>
  )
}