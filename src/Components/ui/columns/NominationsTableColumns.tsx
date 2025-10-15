import { Space, Button } from "antd";
import type { ColumnsType } from "antd/es/table";
import type { ChildRegistrationData } from "../../../types/childRegistration";
import { Link } from "react-router-dom";
import { ViewDetailIcon } from "../icons/SvgIcons";

export default function nominationsTableColumns(
    onAction?: (action: "view" | "block", record: ChildRegistrationData) => void
): ColumnsType<ChildRegistrationData> {
    return [
        {
            title: "Child Name",
            dataIndex: "childFirstName",
            key: "childFirstName"
        },
        {
            title: "Sport",
            dataIndex: "childSport",
            key: "childSport"
        },
        {
            title: "Apply Date",
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
            title: "Gender",
            dataIndex: "gender",
            key: "gender",
        },
        {
            title: "Placement",
            dataIndex: 'placement',
            key: 'placement',
        },
        {
            title: "Parent/Guardian",
            dataIndex: 'parentGuardianFirstName',
            key: 'parentGuardianFirstName',
            render: (parentGuardianFirstName, record) => <span>{parentGuardianFirstName + ' ' + record.parentGuardianLastName}</span>,
        },
        {
            title: "Email",
            dataIndex: 'parentGuardianEmail',
            key: 'parentGuardianEmail',
        },
        {
            title: "Action",
            key: "action",
            render: (_, record) => (
                <Space size="middle">
                    <Link to={`/child-registration/${record.childFirstName}`}>
                        <Button
                            style={{
                                backgroundColor: '#D62828',
                                color: 'white'
                            }}
                            icon={<ViewDetailIcon />}
                            onClick={() => onAction?.("view", record)}
                        />
                    </Link>
                </Space>
            ),
        },
    ];
}
