import { useRef } from "react";
import NominationsTable from '../../Components/ui/tables/NominationsTable';
import { PageContent, PageLayout } from '../../Layout/PageLayOut';
import { useGetAllNominationQuery } from '../../redux/services/nominationApis';
import { CSVLink } from "react-csv";
function NominationsManagement() {
    const csvRef: any = useRef(null);
    const { data, isLoading } = useGetAllNominationQuery({ limit: 9999 });
    const nominations = data?.data?.data?.result || [];
    const headers = [
        { label: "Child First Name", key: "childFirstName" },
        { label: "Child Last Name", key: "childLastName" },
        { label: "Sport", key: "childSport.name" },
        { label: "Date of Birth", key: "dateOfBirth" },
        { label: "Gender", key: "gender" },
        { label: "Guardian First Name", key: "guardianFirstName" },
        { label: "Guardian Last Name", key: "guardianLastName" },
        { label: "Guardian Email", key: "guardianEmail" },
        { label: "Street Address", key: "guardianStreetAddress" },
        { label: "City", key: "guardianCityS" },
        { label: "Zip Code", key: "guardianZipCode" },
        { label: "State", key: "guardianState" },
        { label: "Annual Income", key: "annualHouseHoldIncome" },
        { label: "Showcase Video", key: "showcaseVideoLink" },
        { label: "Child Story", key: "childStory" },
        { label: "Is Placed", key: "isPlaced" },
        { label: "Age", key: "age" },
        { label: "Created At", key: "createdAt" },
    ];

    const csvData = nominations.map((n: any) => ({
        childFirstName: n.childFirstName,
        childLastName: n.childLastName,
        sport: n.childSport?.name || "",
        dateOfBirth: new Date(n.dateOfBirth).toLocaleDateString(),
        gender: n.gender,
        guardianFirstName: n.guardianFirstName,
        guardianLastName: n.guardianLastName,
        guardianEmail: n.guardianEmail,
        guardianStreetAddress: n.guardianStreetAddress,
        guardianCityS: n.guardianCityS,
        guardianZipCode: n.guardianZipCode,
        guardianState: n.guardianState,
        annualHouseHoldIncome: n.annualHouseHoldIncome,
        showcaseVideoLink: n.showcaseVideoLink,
        childStory: n.childStory,
        isPlaced: n.isPlaced ? "Yes" : "No",
        age: n.age,
        createdAt: new Date(n.createdAt).toLocaleString(),
    }));

    return (
        <div>
            <PageLayout
                title="Nominations Management"
                isButton={{
                    buttonText: "Export CSV",
                    type: "action",
                    onClick: () => {
                        if (csvRef.current) {
                            csvRef.current.link.click();
                        }
                    }
                }}
            >
                <CSVLink
                    data={csvData}
                    headers={headers}
                    filename="nominations.csv"
                    className="hidden"
                    ref={csvRef}
                />

                <PageContent>
                    {isLoading ? (
                        <p>Loading...</p>
                    ) : (
                        <NominationsTable />
                    )}
                </PageContent>
            </PageLayout>
        </div>
    );
}

export default NominationsManagement;
