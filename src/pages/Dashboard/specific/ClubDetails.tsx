import { useNavigate, useParams } from "react-router-dom";
import { PageContent, PageLayout } from "../../../Layout/PageLayOut";
import { useDeleteClubMutation, useGetSingleClubQuery } from "../../../redux/services/clubApis";
import type { ClubRecord } from "../../../types/User";
import { Button, Popconfirm } from "antd";
import toast from "react-hot-toast";

function ClubDetails() {
  const { id } = useParams();
  const { data, isLoading } = useGetSingleClubQuery(id as string, { skip: !id });
  const [deleteClub] = useDeleteClubMutation()
  const navigate = useNavigate()

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const clubData: ClubRecord | undefined = data?.data;

  if (!clubData) {
    return <div>No club data found</div>;
  }

  const handleAction = async (record: ClubRecord) => {
    try {
      if (!record?._id) {
        throw new Error("Club not found")
      }
      const res = await deleteClub(record._id).unwrap()
      if (!res?.success) {
        throw new Error(res?.message || "Club deleted failed")
      }
      if (res?.success) {
        res?.message && toast.success(res?.message || "Club deleted successfully")
        navigate('/club-management')
      }
    } catch (error: any) {
      toast.error(error?.message || "Club deleted failed")
    }
  };

  return (
    <PageLayout title="Club Details">
      <PageContent>
        <div className="grid grid-cols-2 gap-4">
          <ClubDetailsCard title="Club Name" description={clubData.name} />

          {/* sportsOffered handling */}
          <ClubDetailsCard
            title="Sport Offered"
            description={
              Array.isArray(clubData.sportsOffered)
                ? clubData.sportsOffered
                  .map((sport: any) =>
                    typeof sport === "string" ? sport : sport.name
                  )
                  .join(", ")
                : "N/A"
            }
          />

          <ClubDetailsCard title="Club Website" description={clubData.websiteLink ?? "N/A"} />
          <ClubDetailsCard title="Join Fee" description={clubData.fee?.toString() ?? "N/A"} />
          <ClubDetailsCard title="Status" description={clubData.status ?? "N/A"} />
          <ClubDetailsCard title="Primary Contact Name" description={clubData.primaryContactName ?? "N/A"} />
          <ClubDetailsCard title="Primary Contact Email" description={clubData.primaryContactEmail ?? "N/A"} />
          <ClubDetailsCard title="Primary Contact Phone" description={clubData.primaryContactPhone ?? "N/A"} />
          <ClubDetailsCard title="Quantity" description={clubData.quantity?.toString() ?? "N/A"} />

          {/* Competition Levels */}
          <ClubDetailsCard
            title="Competition Levels"
            description={clubData.competitionLevel?.join(", ") ?? "N/A"}
          />

          {/* Address Info */}
          <div className="col-span-2 grid grid-cols-2 gap-4">
            {clubData.locations?.map((address, index) => (
              <div key={index} className="space-y-2 p-2 rounded-md border border-gray-300">
                <ClubDetailsCard
                  title={`Street Address ${index + 1}`}
                  description={address.streetAddress ?? "N/A"}
                />
                <ClubDetailsCard
                  title={`City ${index + 1}`}
                  description={address.city ?? "N/A"}
                />
                <ClubDetailsCard
                  title={`Zip Code ${index + 1}`}
                  description={address.zipCode ?? "N/A"}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-start">
          <Popconfirm
            title="Are you sure to remove this club?"
            okButtonProps={{
              style: {
                backgroundColor: "var(--bg-red-high)",
                color: "white",
              }
            }}
            cancelButtonProps={{
              style: {
                backgroundColor: "var(--color-white)",
                color: "var(--bg-red-high)",
              }
            }}
            onConfirm={() => handleAction(clubData)}>
            <Button style={{
              backgroundColor: '#D62828',
              color: 'white',
              borderRadius: '2px',
              padding: '5px 10px'
            }}>Remove from Club</Button>
          </Popconfirm>
        </div>
      </PageContent>
    </PageLayout>
  );
}

export default ClubDetails;

const ClubDetailsCard = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <div className="p-4 border border-gray-300 rounded bg-white">
      <p className="font-bold text-gray-800">{title}</p>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};
