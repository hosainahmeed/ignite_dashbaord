import { Table } from "antd";
import type { ClubRecord } from "../../../types/User";
import { renderField } from "../../../lib/renderField";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import clubTableColumns from "../columns/ClubTableColumns";
export const clubData: ClubRecord[] = [
    {
        key: 1,
        club_name: "youth sports club",
        sportOffered: "Wade Warren",
        website: "info@youthsportsclub.com",
        joinFee: "Suite 5B, San Diego, California, USA",
        joinDate: "+1 (555) 123-4567",
        status: "Active",
        email: "info@youthsportsclub.com",
        club_website: "info@youthsportsclub.com",
        clubAddress: [
            {
                streetAddress: "Suite 5B, San Diego, California, USA",
                city: "San Diego",
                state: "California",
                zipCode: "92101"
            },
            {
                streetAddress: "Suite 5B, San Diego, California, USA",
                city: "San Diego",
                state: "California",
                zipCode: "92101"
            }
        ],
        primaryContactName: "Wade Warren",
        primaryContactEmail: "info@youthsportsclub.com",
        primaryContactPhone: "+1 (555) 123-4567",
        competitionLevels: "Wade Warren",
        createdAt: "2025-09-15T01:29:19.326Z",
    },
];

const clubOptionData = [
    { label: "All Clubs", value: "all" },
    { label: "Swimming", value: "swimming" },
    { label: "Wrestling", value: "wrestling" },
    { label: "Tennis", value: "tennis" },
    { label: "Lacrosse", value: "lacrosse" },
    { label: "Hockey", value: "hockey" },
    { label: "Baseball", value: "baseball" },
    { label: "Football", value: "football" },
    { label: "Gymnastics", value: "gymnastics" },
    { label: "Basketball", value: "basketball" },
    { label: "Track & Field", value: "trackAndField" },
]

function Clubtable() {
    const navigate = useNavigate();

    const handleAction = (action: "view" | "block", record: ClubRecord) => {
        if (action === "view") {
            navigate(`/club/${record.key}`)
        }
        if (action === "block") {
            toast.success("Club Blocked")
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
                        options: clubOptionData,
                        props: { placeholder: "All Clubs" }
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
            <Table
                bordered
                columns={clubTableColumns(handleAction)}
                dataSource={clubData}
                rowKey="email"
            />
        </>
    );
}

export default Clubtable;
