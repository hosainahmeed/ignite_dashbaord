import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Popconfirm, Rate } from "antd";
import toast from "react-hot-toast";
import { PageContent, PageLayout } from "../../../Layout/PageLayOut";
import { OrganizersData } from "../../../Components/ui/tables/Organizerstable";
import type { OrganizerRecord } from "../../../types/User";

function OrganizerDetails() {
  const { id } = useParams();
  const [user, setUser] = useState<OrganizerRecord | null | undefined>(null);
  console.log(id);
  useEffect(() => {
    const user = OrganizersData.find((user) => user.key === Number(id))
    setUser(user)
  }, [id])

  const handleBlockUser = (id: any) => {
    console.log(id)
    toast.success("Organizer Blocked")
  }
  const handleUnBlockUser = (id: any) => {
    console.log(id)
    toast.success("Organizer UnBlocked")
  }
  return (
    <PageLayout title="Organizer Details">
      <PageContent>
        {
          user && (
            <div>
              <div className="w-48 h-48 rounded-full overflow-hidden shadow-2xl">
                <img src={user?.profile_image} alt="" className="w-full h-full object-cover" />
              </div>
              <div className="grid grid-cols-2 mt-4 gap-4">
                <OrganizerDetailsCard title="Business Name" description={user?.club_name} />
                <OrganizerRating rating={user?.rating} totalRating={user?.total_rating} />
                <OrganizerDetailsCard title="Name" description={user?.name} />
                <OrganizerDetailsCard title="Email" description={user?.email} />
                <OrganizerDetailsCard title="Contact Number" description={user?.contactNumber} />
                <OrganizerDetailsCard title="Location" description={user?.location} />
              </div>
              <div className="mt-4">
                <Popconfirm
                  title="Are you sure to block this organizer?"
                  onConfirm={() => {
                    if (user?.isBlock) {
                      handleUnBlockUser(user?.key)
                    } else {
                      handleBlockUser(user?.key)
                    }
                  }}
                  okText="Yes"
                  cancelText="No">
                  <Button
                    size="large"
                    className="w-[200px] !rounded"
                    style={{ backgroundColor: "#FF4D4F", borderColor: "#FF4D4F" }}
                    type="primary">{user?.isBlock ? "Unblock" : "Block"}</Button>
                </Popconfirm>
              </div>
            </div>
          )
        }
      </PageContent>
    </PageLayout>
  )
}

export default OrganizerDetails

const OrganizerRating = ({ rating, totalRating }: { rating: number, totalRating: number }) => {
  return (
    <div
      className="p-4 border flex flex-col items-center border-gray-300 rounded bg-[#fff]">
      <h1>{rating} / 5</h1>
      <Rate allowHalf disabled value={rating} />
      <p className="text-gray-600">Total Ratings : {totalRating}</p>
    </div>
  )
}


const OrganizerDetailsCard = ({ title, description }: { title: string, description: string }) => {
  return (
    <div
      className="p-4 border border-gray-300 rounded bg-[#fff]">
      <p className="font-bold">{title}</p>
      <p className="text-gray-600">{description}</p>
    </div>
  )
}