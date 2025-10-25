import { Table } from "antd";
import type { donationsRecord } from "../../../types/User";
import { renderField } from "../../../lib/renderField";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import donationsTableColumns from "../columns/DonationsTableColumns";
import { useGetAllDonationsQuery } from "../../../redux/services/donationApis";

interface donationTableTableProps {
    recentUser?: boolean;
}
// eslint-disable-next-line react-refresh/only-export-components
const userTypeOptions = [
    { label: "All Donors", value: "all" },
    { label: "IGNITE Fund", value: "IGNITE Fund" },
    { label: "IGNITE a Child", value: "IGNITE a Child" },
];
function DonationTable({ recentUser }: donationTableTableProps) {
    const navigate = useNavigate();
    const { data: donationsData, isLoading } = useGetAllDonationsQuery(undefined)
    const handleAction = (action: "view" | "block", record: donationsRecord) => {
        if (action === "view") {
            navigate(`/donation/${record._id}`)
        }
        if (action === "block") {
            toast.success("User Blocked")
        }
    };

    return (
        <div className="mt-3">
            {!recentUser && <div className="flex gap-4 mb-2 justify-end">
                {renderField({
                    field: {
                        type: "select",
                        key: "userType",
                        label: "User Type",
                        options: userTypeOptions,
                        props: { placeholder: "All Donor" }
                    },
                    className: "!w-[300px]"
                })}
                {renderField({
                    field: {
                        type: "text",
                        key: "username",
                        label: "Username",
                        props: { placeholder: "Search By Name", onChange: (e) => console.log(e.target.value) },
                    },
                    className: "!w-[300px]"
                })}

            </div>}
            <Table bordered loading={isLoading}
                columns={donationsTableColumns(handleAction)}
                dataSource={Array.isArray(donationsData?.data?.result) ? donationsData?.data?.result : []}
                pagination={false}
                rowKey="email"
            />
        </div>
    );
}

export default DonationTable;
