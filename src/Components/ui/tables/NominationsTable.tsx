import { Table } from "antd";
import { renderField } from "../../../lib/renderField";
import type { ChildRegistrationData } from "../../../types/childRegistration";
import { useNavigate } from "react-router-dom";
import nominationsTableColumns from "../columns/NominationsTableColumns";

export const registrationData: ChildRegistrationData[] = [
  {
    _id: "1",
    childFirstName: "Wade",
    childLastName: "Warren",
    childDateOfBirth: "26-03-25",
    gender: "Male",
    childSport: "Track & Field",
    parentGuardianFirstName: "Ralph",
    parentGuardianLastName: "Edwards",
    parentGuardianEmail: "matthew.martin15@gmail.com",
    parentGuardianStreetAddress: "123 Elm Street, Apt 2B",
    parentGuardianCityState: "Chicago, IL USA",
    parentGuardianZipPostalCode: "60616",
    annualHouseholdIncome: "$45,000",
    showcaseVideosOrSocialMediaLink: "http://youtube.com/alex-baseball-highlights",
    childStory: "Alex has shown exceptional interest in baseball since age 7. Despite financial challenges, he continues to train daily and dreams of playing competitively. We believe being part of an academy will provide him the exposure and structured training he needs.",
    showcasingOptIn: "Yes",
    placement: "Not Placed",
    createdAt: "2025-09-15T01:29:19.326Z",
  }

];

const allSportOption = [
  { label: "All Sports", value: "all" },
  { label: "Baseball", value: "baseball" },
  { label: "Lacrosse", value: "lacrosse" },
  { label: "Wrestling", value: "wrestling" },
  { label: "Soccer", value: "soccer" },
  { label: "Track & Field", value: "trackAndField" },
  { label: "Basketball", value: "basketball" },
  { label: "Tennis", value: "tennis" },
  { label: "Swimming", value: "swimming" },
  { label: "Gymnastics", value: "gymnastics" },
  { label: "Football", value: "football" },
]

const ageOption = [
  { label: "Any Age", value: "all" },
  { label: "2-4 years", value: "2-4" },
  { label: "5-7 years", value: "5-7" },
  { label: "8-10 years", value: "8-10" },
  { label: "11-13 years", value: "11-13" },
  { label: "14-16 years", value: "14-16" },
  { label: "17+ years", value: "17+" },
]

const genderOption = [
  { label: "Any Gender", value: "all" },
  { label: "Male", value: "male" },
  { label: "Female", value: "female" },
]

const placementOption = [
  { label: "All Placement", value: "all" },
  { label: "Not Placed", value: "notPlaced" },
  { label: "Placed", value: "placed" },
]

function NominationsTable() {

  const navigate = useNavigate();
  const handleAction = (action: "view" | "block", record: ChildRegistrationData) => {
    if (action === "view") {
      navigate(`/nominations-details/${record._id}`)
    }
    if (action === "block") {
      console.log(record)
    }
  };


  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-4 justify-end">
        {renderField({
          field: {
            type: "select",
            key: "sportType",
            label: "All Sports",
            options: allSportOption,
            props: { placeholder: "All Sports" }
          },
          className: "w-full"
        })}
        {renderField({
          field: {
            type: "select",
            key: "ageType",
            label: "Any Age",
            options: ageOption,
            props: { placeholder: "Any Age" }
          },
          className: "w-full"
        })}
        {renderField({
          field: {
            type: "select",
            key: "genderType",
            label: "Any Gender",
            options: genderOption,
            props: { placeholder: "All Gender" }
          },
          className: "w-full"
        })}
        {renderField({
          field: {
            type: "select",
            key: "placementType",
            label: "All Placement",
            options: placementOption,
            props: { placeholder: "All Placement" }
          },
          className: "w-full"
        })}
        {renderField({
          field: {
            type: "text",
            key: "location",
            label: "Search By Location",
            props: { placeholder: "Search By Location", onChange: (e) => console.log(e.target.value) },
          },
          className: "w-full"
        })}
        {renderField({
          field: {
            type: "text",
            key: "name",
            label: "Search By Name",
            props: { placeholder: "Search By Name", onChange: (e) => console.log(e.target.value) },
          },
          className: "w-full"
        })}

      </div>
      <Table bordered
        scroll={{ x: "max-content" }}
        columns={nominationsTableColumns(handleAction)}
        dataSource={registrationData}
        pagination={false}
        rowKey="childFirstName"
      />
    </>
  );
}

export default NominationsTable;
