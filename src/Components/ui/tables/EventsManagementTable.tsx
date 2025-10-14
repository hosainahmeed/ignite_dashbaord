import { Table } from "antd";
import type { IeventData } from "../../../types/event";
import eventTableColumns from "../columns/EventTableColumns";
import { renderField } from "../../../lib/renderField";
import { eventSelectData } from "../../../constant/options";

interface UserTableProps {
    recentUser?: boolean;
}
export const EventsData: IeventData[] = [
    {
        id: 1,
        title: "- In Solidity we trust",
        location: "New York, USA",
        dateRange: "June 15-17, 2025",
        ages: "10-14",
        rating: 4.9,
        reviewCount: 24,
        sport: "Soccer",
        photoUrl: "https://i.ibb.co.com/PZN7Lq13/8cdf4a01753ac5dcd0ec91ad19d3665448a437b7.png",
        status: "registration-open",
        registrationDeadline: "June 10, 2025 8:00 am",
        availableSlot: 100,
        eventType: "Tournament",
        eventStart: "June 15, 2025 9:00 am",
        price: 19.00,
        category: 'Track & Field',
        organizer: {
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
        contactEmail: "info@youthsportclub.com",
        contactPhone: "+1 (963) 123-4567",
        isMyFeedbackGiven: true,
        feedbackData: {
            profilePhotoUrl: 'https://avatar.iran.liara.run/public/15',
            name: 'John Doe',
            rating: 5
        },
        eventDetails: `
    <html>
<body>
<!--StartFragment--><div class="bg-white border rounded-xl shadow-sm p-5" style="box-sizing: border-box; border: 1px solid lab(90.952 -0.0000596046 0); margin: 0px 0px 24px; padding: 20px; outline-color: oklab(0.707999 -0.00000712276 0.0000166297 / 0.5); --tw-space-y-reverse: 0; border-radius: 14px; background-color: rgb(255, 255, 255); --tw-shadow: 0 1px 3px 0 rgba(0, 0, 0, .1), 0 1px 2px -1px rgba(0, 0, 0, .1); box-shadow: rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.1) 0px 1px 2px -1px; color: lab(2.75381 0 0); font-family: optima, &quot;optima Fallback&quot;; font-size: medium; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;"><h2 class="text-lg font-semibold mb-4" style="box-sizing: border-box; border: 0px solid lab(90.952 -0.0000596046 0); margin: 0px 0px 16px; padding: 0px; outline-color: oklab(0.707999 -0.00000712276 0.0000166297 / 0.5); font-size: 18px; font-weight: 600; line-height: 1.55556; --tw-font-weight: 600;">Event Details</h2><ul class="list-disc pl-6 space-y-2 text-gray-700" style="box-sizing: border-box; border: 0px solid lab(90.952 -0.0000596046 0); margin: 0px; padding: 0px 0px 0px 24px; outline-color: oklab(0.707999 -0.00000712276 0.0000166297 / 0.5); list-style: disc; color: lab(27.1134 -0.956401 -12.3224);"><li style="box-sizing: border-box; border: 0px solid lab(90.952 -0.0000596046 0); margin: 0px 0px 8px; padding: 0px; outline-color: oklab(0.707999 -0.00000712276 0.0000166297 / 0.5); --tw-space-y-reverse: 0;">3-day basketball camp focused on shooting, defense, and game IQ.</li><li style="box-sizing: border-box; border: 0px solid lab(90.952 -0.0000596046 0); margin: 0px 0px 8px; padding: 0px; outline-color: oklab(0.707999 -0.00000712276 0.0000166297 / 0.5); --tw-space-y-reverse: 0;">Led by former college players and certified coaches.</li><li style="box-sizing: border-box; border: 0px solid lab(90.952 -0.0000596046 0); margin: 0px; padding: 0px; outline-color: oklab(0.707999 -0.00000712276 0.0000166297 / 0.5);">Skill contests with awards and recognition.</li></ul></div><div class="bg-white border rounded-xl shadow-sm p-5" style="box-sizing: border-box; border: 1px solid lab(90.952 -0.0000596046 0); margin: 0px; padding: 20px; outline-color: oklab(0.707999 -0.00000712276 0.0000166297 / 0.5); border-radius: 14px; background-color: rgb(255, 255, 255); --tw-shadow: 0 1px 3px 0 rgba(0, 0, 0, .1), 0 1px 2px -1px rgba(0, 0, 0, .1); box-shadow: rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.1) 0px 1px 2px -1px; color: lab(2.75381 0 0); font-family: optima, &quot;optima Fallback&quot;; font-size: medium; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;"><h2 class="text-lg font-semibold mb-4" style="box-sizing: border-box; border: 0px solid lab(90.952 -0.0000596046 0); margin: 0px 0px 16px; padding: 0px; outline-color: oklab(0.707999 -0.00000712276 0.0000166297 / 0.5); font-size: 18px; font-weight: 600; line-height: 1.55556; --tw-font-weight: 600;">Schedule</h2><div class="space-y-4" style="box-sizing: border-box; border: 0px solid lab(90.952 -0.0000596046 0); margin: 0px; padding: 0px; outline-color: oklab(0.707999 -0.00000712276 0.0000166297 / 0.5);"><div class="p-4 border rounded-lg" style="box-sizing: border-box; border: 1px solid lab(90.952 -0.0000596046 0); margin: 0px 0px 16px; padding: 16px; outline-color: oklab(0.707999 -0.00000712276 0.0000166297 / 0.5); --tw-space-y-reverse: 0; border-radius: 10px;"><p class="font-semibold" style="box-sizing: border-box; border: 0px solid lab(90.952 -0.0000596046 0); margin: 0px; padding: 0px; outline-color: oklab(0.707999 -0.00000712276 0.0000166297 / 0.5); --tw-font-weight: 600; font-weight: 600;">Day 1 – July 20</p><ul class="list-disc pl-6 mt-2 text-gray-600" style="box-sizing: border-box; border: 0px solid lab(90.952 -0.0000596046 0); margin: 8px 0px 0px; padding: 0px 0px 0px 24px; outline-color: oklab(0.707999 -0.00000712276 0.0000166297 / 0.5); list-style: disc; color: lab(35.6337 -1.58697 -10.8425);"><li style="box-sizing: border-box; border: 0px solid lab(90.952 -0.0000596046 0); margin: 0px; padding: 0px; outline-color: oklab(0.707999 -0.00000712276 0.0000166297 / 0.5);">Warm-up &amp; Conditioning</li><li style="box-sizing: border-box; border: 0px solid lab(90.952 -0.0000596046 0); margin: 0px; padding: 0px; outline-color: oklab(0.707999 -0.00000712276 0.0000166297 / 0.5);">Shooting Drills</li><li style="box-sizing: border-box; border: 0px solid lab(90.952 -0.0000596046 0); margin: 0px; padding: 0px; outline-color: oklab(0.707999 -0.00000712276 0.0000166297 / 0.5);">3v3 Games</li></ul></div><div class="p-4 border rounded-lg" style="box-sizing: border-box; border: 1px solid lab(90.952 -0.0000596046 0); margin: 0px 0px 16px; padding: 16px; outline-color: oklab(0.707999 -0.00000712276 0.0000166297 / 0.5); --tw-space-y-reverse: 0; border-radius: 10px;"><p class="font-semibold" style="box-sizing: border-box; border: 0px solid lab(90.952 -0.0000596046 0); margin: 0px; padding: 0px; outline-color: oklab(0.707999 -0.00000712276 0.0000166297 / 0.5); --tw-font-weight: 600; font-weight: 600;">Day 2 – July 21</p><ul class="list-disc pl-6 mt-2 text-gray-600" style="box-sizing: border-box; border: 0px solid lab(90.952 -0.0000596046 0); margin: 8px 0px 0px; padding: 0px 0px 0px 24px; outline-color: oklab(0.707999 -0.00000712276 0.0000166297 / 0.5); list-style: disc; color: lab(35.6337 -1.58697 -10.8425);"><li style="box-sizing: border-box; border: 0px solid lab(90.952 -0.0000596046 0); margin: 0px; padding: 0px; outline-color: oklab(0.707999 -0.00000712276 0.0000166297 / 0.5);">Defense Drills</li><li style="box-sizing: border-box; border: 0px solid lab(90.952 -0.0000596046 0); margin: 0px; padding: 0px; outline-color: oklab(0.707999 -0.00000712276 0.0000166297 / 0.5);">Ball Handling</li><li style="box-sizing: border-box; border: 0px solid lab(90.952 -0.0000596046 0); margin: 0px; padding: 0px; outline-color: oklab(0.707999 -0.00000712276 0.0000166297 / 0.5);">Team Strategies</li></ul></div><div class="p-4 border rounded-lg" style="box-sizing: border-box; border: 1px solid lab(90.952 -0.0000596046 0); margin: 0px; padding: 16px; outline-color: oklab(0.707999 -0.00000712276 0.0000166297 / 0.5); border-radius: 10px;"><p class="font-semibold" style="box-sizing: border-box; border: 0px solid lab(90.952 -0.0000596046 0); margin: 0px; padding: 0px; outline-color: oklab(0.707999 -0.00000712276 0.0000166297 / 0.5); --tw-font-weight: 600; font-weight: 600;">Day 3 – July 22</p><ul class="list-disc pl-6 mt-2 text-gray-600" style="box-sizing: border-box; border: 0px solid lab(90.952 -0.0000596046 0); margin: 8px 0px 0px; padding: 0px 0px 0px 24px; outline-color: oklab(0.707999 -0.00000712276 0.0000166297 / 0.5); list-style: disc; color: lab(35.6337 -1.58697 -10.8425);"><li style="box-sizing: border-box; border: 0px solid lab(90.952 -0.0000596046 0); margin: 0px; padding: 0px; outline-color: oklab(0.707999 -0.00000712276 0.0000166297 / 0.5);">Full Court Games</li><li style="box-sizing: border-box; border: 0px solid lab(90.952 -0.0000596046 0); margin: 0px; padding: 0px; outline-color: oklab(0.707999 -0.00000712276 0.0000166297 / 0.5);">Skill Contest Finals</li><li style="box-sizing: border-box; border: 0px solid lab(90.952 -0.0000596046 0); margin: 0px; padding: 0px; outline-color: oklab(0.707999 -0.00000712276 0.0000166297 / 0.5);">Awards Ceremony</li></ul></div></div></div><!--EndFragment-->
</body>
</html>
    `,
    },
];

function EventsManagementTable({ recentUser }: UserTableProps) {
    console.log(recentUser)

    // const handleAction = (action: "view" | "block", record: OrganizerRecord) => {
    //     console.log(`Action: ${action}`, record);
    // };



    return (
        <>
            <div className="flex gap-4 justify-end">
                {renderField({
                    field: {
                        type: "select",
                        key: "eventStatus",
                        label: "Event Status",
                        options: eventSelectData,
                        props: { placeholder: "Select Event Status" }
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
                columns={eventTableColumns()}
                dataSource={EventsData}
                pagination={false}
                rowKey="email"
            />
        </>
    );
}

export default EventsManagementTable;
