import { Table } from "antd";
import type { donationsRecord } from "../../../types/User";
import { renderField } from "../../../lib/renderField";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import donationsTableColumns from "../columns/DonationsTableColumns";
import { useGetAllDonationsQuery } from "../../../redux/services/donationApis";
import { useState } from "react";

interface donationTableTableProps {
    recentUser?: boolean;
}
const userTypeOptions = [
    { label: "All Donors", value: "" },
    { label: "IGNITE Fund", value: "IGNITE_FUND" },
    { label: "IGNITE a Child", value: "IGNITE_A_CHILD" },
];
function DonationTable({ recentUser }: donationTableTableProps) {
    const navigate = useNavigate();
    const [fundType, setFundType] = useState('')
    const { data: donationsData, isLoading } = useGetAllDonationsQuery({
        ...(fundType !== '' && { fundType: fundType })
    })
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
                    className: "!w-[300px]",
                    onChange: (e) => setFundType(e)
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
                dataSource={Array.isArray(donationsData?.data?.result) ? recentUser ? donationsData?.data?.result.slice(0, 3) : donationsData?.data?.result : []}
                pagination={false}
                rowKey="email"
            />
        </div>
    );
}

export default DonationTable;
