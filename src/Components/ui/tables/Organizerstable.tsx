import { Table } from "antd";
import type { OrganizerRecord } from "../../../types/User";
import organizerTableColumns from "../columns/OrganizerTableColumns";
import { renderField } from "../../../lib/renderField";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
export const OrganizersData: OrganizerRecord[] = [
    {
        key: 1,
        club_name: "youth sports club",
        name: "Wade Warren",
        email: "info@youthsportsclub.com",
        profile_image:
            "https://plus.unsplash.com/premium_photo-1689568126014-06fea9d5d341?fm=jpg&q=60&w=3000",
        location: "Suite 5B, San Diego, California, USA",
        contactNumber: "+1 (555) 123-4567",
        isBlock: false,
        active_event: 2,
        rating: 4.5,
        total_rating: 125,
        subscription_prchase_date: "2025-09-15T01:29:19.326Z",
        createdAt: "2025-09-15T01:29:19.326Z",
    },
];

function Organizerstable() {
    const navigate = useNavigate();

    const handleAction = (action: "view" | "block", record: OrganizerRecord) => {
        if (action === "view") {
            navigate(`/organizer/${record.key}`)
        }
        if (action === "block") {
            toast.success("Organizer Blocked")
        }
    };

    return (
        <>
            <div className="flex gap-4 justify-end">
                {renderField({
                    field: {
                        type: "select",
                        key: "userType",
                        label: "Organizer Type",
                        options: [{ label: "All Organizers", value: "all" }, { label: "Blocked Organizers", value: "blocked" }],
                        props: { placeholder: "Select Organizer Type" }
                    },
                    className: "!w-[300px]"
                })}
                {renderField({
                    field: {
                        type: "text",
                        key: "username",
                        label: "Search By Name",
                        props: { placeholder: "Search By Name", onChange: (e) => console.log(e.target.value) },
                    },
                    className: "!w-[300px]"
                })}

            </div>
            <Table bordered
                columns={organizerTableColumns(handleAction)}
                dataSource={OrganizersData}
                pagination={true}
                rowKey="email"
            />
        </>
    );
}

export default Organizerstable;
