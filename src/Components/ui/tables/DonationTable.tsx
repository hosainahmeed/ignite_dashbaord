import { Table } from "antd";
import type { donationsRecord } from "../../../types/User";
import { renderField } from "../../../lib/renderField";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import donationsTableColumns from "../columns/DonationsTableColumns";

interface donationTableTableProps {
    recentUser?: boolean;
}
// eslint-disable-next-line react-refresh/only-export-components
export const donationsData: donationsRecord[] = [
    {
        key: 1,
        amount: '$25.75',
        date: '2025-09-15T01:29:19.326Z',
        donor_name: 'Emily Carter',
        email: 'emily@email.com',
        fee_covered: true,
        frequency: 'Monthly',
        fund_type: 'IGNITE Fund',
        tier_selected:'Flame ($25)',
        createdAt: '2025-09-15T01:29:19.326Z',
        transaction_id:'TXN123456'
    },
];
function DonationTable({ recentUser }: donationTableTableProps) {



    const navigate = useNavigate();

    const handleAction = (action: "view" | "block", record: donationsRecord) => {
        if (action === "view") {
            navigate(`/donation/${record.key}`)
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
                        options: [{ label: "All Users", value: "all" }, { label: "Blocked Users", value: "blocked" }],
                        props: { placeholder: "Select User Type" }
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
            <Table bordered
                columns={donationsTableColumns(handleAction)}
                dataSource={donationsData}
                pagination={false}
                rowKey="email"
            />
        </div>
    );
}

export default DonationTable;
