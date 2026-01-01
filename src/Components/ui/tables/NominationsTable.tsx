import { Table } from "antd";
import { renderField } from "../../../lib/renderField";
import type { ChildRegistrationData } from "../../../types/childRegistration";
import { useNavigate } from "react-router-dom";
import nominationsTableColumns from "../columns/NominationsTableColumns";
import { useGetAllNominationQuery, useDeleteNominationMutation } from "../../../redux/services/nominationApis";
import { useAllCategoriesQuery } from "../../../redux/services/categoryApi";
import { useState } from "react";
import PlaceSearch from "../reuseable/PlaceSearch";
import toast from "react-hot-toast";

const ageOption = [
  { label: "Any Age", value: "all" },
  { label: "4-6 years", value: "4-6" },
  { label: "7-9 years", value: "7-9" },
  { label: "10-12 years", value: "10-13" },
  { label: "13-15 years", value: "13-15" },
  { label: "16-18 years", value: "16-18" },
]

const genderOption = [
  { label: "Any Gender", value: "all" },
  { label: "Male", value: "Male" },
  { label: "Female", value: "Female" },
]

const placementOption = [
  { label: "All Placement", value: "all" },
  { label: "Not Placed", value: false },
  { label: "Placed", value: true },
]


function NominationsTable() {
  const [page, setPage] = useState<number>(1)
  const [minAge, setMinAge] = useState<number | null>(null)
  const [maxAge, setMaxAge] = useState<number | null>(null)
  const [childSport, setChildSport] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState<string | null>(null)
  const [gender, setGender] = useState<string | null>(null)
  const [isPlaced, setIsPlaced] = useState<boolean | null>(null)
  const [maxDistance, setMaxDistance] = useState<number | null>(0)
  const [mapData, setMapData] = useState<{ longitude: number, latitude: number }>({
    longitude: 0,
    latitude: 0
  })

  const queryParams = { minAge, maxAge, childSport, searchTerm, gender, isPlaced, page, maxDistance, longitude: mapData?.longitude, latitude: mapData?.latitude }
  const params = Object.entries(queryParams).reduce((acc, [key, value]) => {
    if (!(value === null || value === '' || value === 0)) {
      return { ...acc, [key]: value }
    }
    return acc
  }, {})

  const { data: nominationsData, isLoading } = useGetAllNominationQuery(params)
  const { data: categoriesData, isLoading: categoriesLoading } = useAllCategoriesQuery({ limit: 999, sort: "name" })
  const [deleteNominationMutation] = useDeleteNominationMutation()
  const navigate = useNavigate();
  const handleAction = async (action: "view" | "block" | "delete", record: ChildRegistrationData) => {
    if (action === "view") {
      navigate(`/nominations-details/${record._id}`)
    }
    if (action === "delete") {
      try {
        if (!record?._id) {
          throw new Error("Nomination not found")
        }
        const res = await deleteNominationMutation(record?._id).unwrap()
        if (!res?.success) {
          throw new Error("Nomination not found")
        }

        toast.success(res?.message || "Nomination deleted successfully")
      } catch (error: any) {
        toast.error(error?.data?.message || error?.message || "Something went wrong")
      }
    }
  };


  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-7 gap-4 justify-end">
        {renderField({
          field: {
            type: "select",
            key: "sportType",
            label: "All Sports",
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            options: Array.isArray(categoriesData?.data?.result) ? categoriesData?.data?.result?.map((item: any) => ({ label: item?.name, value: item?._id })) : [],
            props: { placeholder: "All Sports" }
          },
          className: "w-full",
          isLoading: categoriesLoading as boolean,
          onChange: (value) => setChildSport(value)
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
          isLoading: categoriesLoading as boolean,
          onChange: (value) => {
            if (value === "all") {
              setMinAge(null)
              setMaxAge(null)
            } else {
              const ageRange = value.split("-")
              if (ageRange.length === 2) {
                setMinAge(Number(ageRange[0]))
                setMaxAge(Number(ageRange[1]))
              } else if (value === '18+') {
                setMinAge(18)
                setMaxAge(null)
              } else {
                setMinAge(null)
                setMaxAge(null)
              }
            }
          }
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
          isLoading: categoriesLoading as boolean,
          onChange: (value) => {
            if (value === "all") {
              setGender(null)
            } else {
              setGender(value)
            }
          }
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
          isLoading: categoriesLoading as boolean,
          onChange: (value) => {
            if (value === "all") {
              setIsPlaced(null)
            } else {
              setIsPlaced(value)
            }
          }
        })}
        <PlaceSearch setMapData={setMapData} />
        {renderField({
          field: {
            type: "number",
            key: "maxDistance",
            label: "search by distance",
            props: {
              placeholder: "search by distance", onChange: (distance) => {
                if (distance && Number(distance) > 0) {
                  setMaxDistance(Number(distance))
                }
              }
            },
          },
          className: "!w-full",
          isLoading: categoriesLoading as boolean,
        })}

        {renderField({
          field: {
            type: "text",
            key: "name",
            label: "Search By Name",
            props: { placeholder: "Search By Name", allowClear: true, onChange: (e) => setSearchTerm(e.target.value) },
          },
          className: "w-full",
          isLoading: categoriesLoading as boolean,
        })}

      </div>
      <Table
        bordered
        loading={isLoading}
        scroll={{ x: "max-content" }}
        columns={nominationsTableColumns(handleAction)}
        dataSource={nominationsData?.data?.data?.result}
        pagination={{
          position: ['bottomCenter'],
          pageSize: nominationsData?.data?.data?.meta?.limit || 10,
          total: nominationsData?.data?.data?.meta?.total,
          current: nominationsData?.data?.data?.meta?.page,
          onChange: (page) => {
            setPage(page)
          }
        }}
        rowKey="_id"
      />
    </>
  );
}

export default NominationsTable;
