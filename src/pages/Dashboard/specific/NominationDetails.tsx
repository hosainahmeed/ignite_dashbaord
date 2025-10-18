import { useParams } from "react-router-dom";
import { PageContent, PageLayout } from "../../../Layout/PageLayOut"
import type { ChildRegistrationData } from "../../../types/childRegistration";
import { registrationData } from "../../../Components/ui/tables/NominationsTable";
import { useEffect, useState } from "react";


function NominationDetails() {
  const { id } = useParams();

  const [user, setUser] = useState<ChildRegistrationData | null | undefined>(null);
  console.log(user)
  useEffect(() => {
    const user = registrationData.find((user) => user?._id === id)
    console.log(user)
    setUser(user)
  }, [id])


  return (
    <PageLayout title="Nomination Details">
      <PageContent>
        <div className="grid grid-cols-2 gap-4">
          <DetailsCard title="Child’s Sport" description={user?.childSport ?? 'N/A'} />
          <DetailsCard title="Child’s First Name" description={user?.childFirstName ?? 'N/A'} />
          <DetailsCard title="Child’s Last Name" description={user?.childLastName ?? 'N/A'} />
          <DetailsCard title="Child’s Date of Birth" description={user?.childDateOfBirth ?? 'N/A'} />
          <DetailsCard title="Child’s Gender" description={user?.gender ?? 'N/A'} />
          <DetailsCard title="Parent/Guardian First Name" description={user?.parentGuardianFirstName ?? 'N/A'} />
          <DetailsCard title="Parent/Guardian Last Name" description={user?.parentGuardianLastName ?? 'N/A'} />
          <DetailsCard title="Parent/Guardian Email" description={user?.parentGuardianEmail ?? 'N/A'} />
          <DetailsCard title="Parent/Guardian street address" description={user?.parentGuardianStreetAddress ?? 'N/A'} />
          <DetailsCard title="Parent/Guardian City / State" description={user?.parentGuardianCityState ?? 'N/A'} />
          <DetailsCard title="Annual Household Income" description={user?.annualHouseholdIncome ?? 'N/A'} />
          <DetailsCard title="Showcase Videos or Social Media link" description={user?.showcaseVideosOrSocialMediaLink ?? 'N/A'} />
        </div>
        <div className="p-4 border border-[#FFDAD9] rounded-xl bg-[#fff]">
          <h1 className="font-bold">Child’s Story</h1>
          <div dangerouslySetInnerHTML={{ __html: user?.childStory ?? '' }} />
        </div>
      </PageContent>
    </PageLayout>
  )
}

export default NominationDetails

const DetailsCard = ({ title, description }: { title: string, description: string }) => {
  return (
    <div
      className="p-4 border border-[#FFDAD9] rounded-xl bg-[#fff]">
      <p className="font-bold">{title}</p>
      <p className="text-gray-600">{description}</p>
    </div>
  )
}