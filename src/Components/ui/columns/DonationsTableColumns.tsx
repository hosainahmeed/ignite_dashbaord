import { Space, Button, Tooltip } from "antd";
import type { ColumnsType } from "antd/es/table";
import type { donationsRecord } from "../../../types/User";
import { ViewDetailIcon } from "../icons/SvgIcons";

export default function donationsTableColumns(
    onAction?: (action: "view" | "block", record: donationsRecord) => void
): ColumnsType<donationsRecord> {
    return [
        {
            title: "Donor Name",
            dataIndex: "donor_name",
            key: "donor_name",
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
        },
        {
            title: "Fund Type",
            dataIndex: "fund_type",
            key: "email",
            render: (email) => <span>{email}</span>,
        },
        {
            title: "Amount",
            dataIndex: "amount",
            key: "amount",
        },
        {
            title: "Frequency",
            dataIndex: "frequency",
            key: "frequency",
        },
        {
            title: "Fee Covered",
            dataIndex: "fee_covered",
            key: "fee_covered",
            render: (fee_covered) => <span>{fee_covered ? 'Yes (3%)' : 'No (0%)'}</span>,
        },
        {
            title: "Date",
            dataIndex: "createdAt",
            key: "createdAt",
            render: (createdAt: string) => {
                const date = new Date(createdAt);
                const formatted = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(
                    date.getDate()
                ).padStart(2, "0")}`;
                return <span>{formatted}</span>;
            },
        },
        {
            title: "Action",
            key: "action",
            render: (_, record) => (
                <Space size="middle">
                    <Tooltip
                        title="View User Information"
                    >
                        <Button
                            style={{
                                backgroundColor: '#D62828',
                                color: 'white'
                            }}
                            icon={<ViewDetailIcon />}
                            onClick={() => onAction?.("view", record)}
                        />
                    </Tooltip>
                </Space>
            ),
        },
    ];
}
