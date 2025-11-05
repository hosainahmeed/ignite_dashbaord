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
            dataIndex: "donorName",
            key: "donorName",
            render: (donorName) => <span>{donorName || "N/A"}</span>,
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
            render: (email) => <span>{email || "N/A"}</span>,
        },
        {
            title: "Fund Type",
            dataIndex: "fundType",
            key: "fundType",
            render: (fundType) => <span>{fundType || "N/A"}</span>,
        },
        {
            title: "Amount",
            dataIndex: "amount",
            key: "amount",
            render: (amount) => <span>{amount || "N/A"}</span>,
        },
        {
            title: "Frequency",
            dataIndex: "frequency",
            key: "frequency",
            render: (frequency) => <span>{frequency || "N/A"}</span>,
        },
        {
            title: "Fee Covered",
            dataIndex: "feeCovered",
            key: "feeCovered",
            render: (_, record) => <span>{record.freeCovered === true ? 'Yes (3%)' : `No (0%)`}</span>,
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
