import { Space, Button } from "antd";
import type { ColumnsType } from "antd/es/table";
import type { ClubRecord } from "../../../types/User";
import { ViewDetailIcon } from "../icons/SvgIcons";

export default function clubTableColumns(
    onAction?: (action: "view" | "block", record: ClubRecord) => void
): ColumnsType<ClubRecord> {
    return [
        {
            title: "Academy/Club Name",
            dataIndex: "club_name",
            key: "club_name",
        },
        {
            title: "Sport(s) Offered",
            dataIndex: "sportOffered",
            key: "sportOffered",
        },
        {
            title: "Join Date",
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
            title: "Contact Person",
            dataIndex: "primaryContactName",
            key: "primaryContactName",
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
        },
        {
            title: "Status",
            dataIndex: 'status',
            key: 'status',
        },
        {
            title: "Action",
            key: "action",
            render: (_, record) => (
                <Space size="middle">
                    <Button
                        style={{
                            backgroundColor: '#D62828',
                            color: 'white'
                        }}
                        onClick={() => onAction?.("view", record)}
                        icon={<ViewDetailIcon />}
                    />
                </Space>
            ),
        },
    ];
}
