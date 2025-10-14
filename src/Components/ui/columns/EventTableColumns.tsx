import { Space, Button, Tooltip, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import UserInformation from "../reuseable/UserInformation";
import type { EventStatus, IeventData } from "../../../types/event";
import { ViewDetailIcon } from "../icons/SvgIcons";
import { Link } from "react-router-dom";

export default function eventTableColumns(
    onAction?: (action: "view" | "block", record: IeventData) => void
): ColumnsType<IeventData> {
    return [
        {
            title: "Event Name",
            dataIndex: "title",
            key: "title",
            render: (_, record) => (
                <Space size="middle">
                    <UserInformation
                        shape="square"
                        name={record.title}
                        profile_image={record.photoUrl}
                    />
                </Space>
            ),
        },
        {
            title: "Sport Category",
            dataIndex: "category",
            key: "category",
            render: (category: string) => <span className="capitalize">{category}</span>,
        },
        {
            title: "Organizer",
            dataIndex: "organizer",
            key: "organizer",
            render: (_, record) => (
                <Space size="middle">
                    <UserInformation
                        shape="circle"
                        name={record.organizer?.club_name}
                        profile_image={record.organizer?.profile_image}
                        description={record.organizer?.name}
                    />
                </Space>
            ),
        },
        {
            title: "Location",
            dataIndex: "location",
            key: "location",
            render: (location: string) => <span>{location}</span>,
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            render: (status: EventStatus) => (
                <Tag color={getStatusColor(status)}>{formatStatus(status)}</Tag>
            ),
        },
        {
            title: "Action",
            key: "action",
            render: (_, record) => (
                <Space size="middle">
                    <Tooltip title="View Details">
                        <Link to={`/event/${record.id}`}>
                            <Button
                                style={{
                                    backgroundColor: "#D62828",
                                    color: "white",
                                }}
                                icon={<ViewDetailIcon />}
                                onClick={() => onAction?.("view", record)}
                            />
                        </Link>
                    </Tooltip>
                </Space>
            ),
        },
    ];
}


function getStatusColor(status: EventStatus): string {
    switch (status) {
        case "registration-open":
            return "blue";
        case "started-event":
            return "orange";
        case "finished-event":
            return "green";
        default:
            return "default";
    }
}

function formatStatus(status: EventStatus): string {
    return status
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
}
