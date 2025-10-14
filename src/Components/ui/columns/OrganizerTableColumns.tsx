import { Space, Button, Tooltip } from "antd";
import { PhoneOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import UserInformation from "../reuseable/UserInformation";
import type { OrganizerRecord } from "../../../types/User";
import { FaRegCircle, FaUserCircle } from "react-icons/fa";
import { MdBlock } from "react-icons/md";

export default function organizerTableColumns(
    onAction?: (action: "view" | "block", record: OrganizerRecord) => void
): ColumnsType<OrganizerRecord> {
    return [
        {
            title: "User Name",
            dataIndex: "name",
            key: "name",
            render: (_, record) => (
                <Space size="middle">
                    <UserInformation
                        name={record.name}
                        profile_image={record.profile_image}
                    />
                </Space>
            ),
        },
        {
            title: "Mobile Number",
            dataIndex: "contactNumber",
            key: "contactNumber",
            render: (contactNumber) => (
                <Space>
                    <PhoneOutlined />
                    {contactNumber}
                </Space>
            ),
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
            render: (email) => <span>{email}</span>,
        },
        {
            title: "Joined",
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
            title: "Active Event",
            dataIndex: 'active_event',
            key: 'active_event',
        },
        {
            title: "Action",
            key: "action",
            render: (_, record) => (
                <Space size="middle">
                    <Tooltip
                        title="View Organizer Information"
                    >
                        <Button
                            style={{
                                backgroundColor: '#D62828',
                                color: 'white'
                            }}
                            icon={<FaUserCircle />}
                            onClick={() => onAction?.("view", record)}
                        />
                    </Tooltip>
                    <Tooltip
                        title="Block or Unblock"
                    >
                        <Button
                            style={{
                                backgroundColor: '#D62828',
                                color: 'white'
                            }}
                            onClick={() => onAction?.("block", record)}
                            icon={record.isBlock ? <MdBlock style={{ color: 'white' }} /> : <FaRegCircle />}
                        />
                    </Tooltip>
                </Space>
            ),
        },
    ];
}
