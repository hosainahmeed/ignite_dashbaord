import { Table } from "antd";
import { renderField } from "../../../lib/renderField";
import type { ChildRegistrationData } from "../../../types/childRegistration";
import { useNavigate } from "react-router-dom";
import nominationsTableColumns from "../columns/NominationsTableColumns";
import { useGetAllNominationQuery } from "../../../redux/services/nominationApis";

export const registrationData: ChildRegistrationData[] = [
  {
    _id: "68f7122f4ebe449fff7bfccc",
    childFirstName: "Hosain",
    childLastName: "Ahmed",
    childSport: "68eb546a72c6b441715602ee",
    dateOfBirth: "2002-05-08T00:00:00.000Z",
    gender: "Male",
    guardianFirstName: "Hosain",
    guardianLastName: "Ali",
    guardianEmail: "a@yopmail.com",
    guardianStreetAddress: "Rampura-Khilgaon -Notun Rasta Rd",
    guardianCityS: "Dhaka",
    guardianZipCode: "1207",
    guardianState: "Dhaka",
    annualHouseHoldIncome: 445,
    showcaseVideoLink: "https://cdn.pixabay.com/video/2023/01/23/147704-792078376_large.mp4",
    childStory: "ignite-my-child",
    isPlaced: false,
    createdAt: "2025-10-21T04:55:11.978Z",
    updatedAt: "2025-10-21T04:55:11.978Z",
    age: 23
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
  const { data: nominationsData, isLoading } = useGetAllNominationQuery(undefined)
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
          className: "w-full",
          onChange: (value) => console.log(value)
        })}
        {renderField({
          field: {
            type: "select",
            key: "ageType",
            label: "Any Age",
            options: ageOption,
            props: { placeholder: "Any Age" }
          },
          className: "w-full",
          onChange: (value) => console.log(value)
        })}
        {renderField({
          field: {
            type: "select",
            key: "genderType",
            label: "Any Gender",
            options: genderOption,
            props: { placeholder: "All Gender" }
          },
          className: "w-full",
          onChange: (value) => console.log(value)
        })}
        {renderField({
          field: {
            type: "select",
            key: "placementType",
            label: "All Placement",
            options: placementOption,
            props: { placeholder: "All Placement" }
          },
          className: "w-full",
          onChange: (value) => console.log(value)
        })}
        {renderField({
          field: {
            type: "text",
            key: "location",
            label: "Search By Location",
            props: { placeholder: "Search By Location", onChange: (e) => console.log(e.target.value) },
          },
          className: "w-full",
          onChange: (value) => console.log(value)
        })}
        {renderField({
          field: {
            type: "text",
            key: "name",
            label: "Search By Name",
            props: { placeholder: "Search By Name", onChange: (e) => console.log(e.target.value) },
          },
          className: "w-full",
          onChange: (value) => console.log(value)
        })}

      </div>
      <Table
        bordered
        loading={isLoading}
        scroll={{ x: "max-content" }}
        columns={nominationsTableColumns(handleAction)}
        dataSource={nominationsData?.data?.data?.result}
        pagination={false}
        rowKey="_id"
      />
    </>
  );
}

export default NominationsTable;
