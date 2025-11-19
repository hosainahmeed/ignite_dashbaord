import { Table } from "antd";
import type { ClubRecord } from "../../../types/User";
import { renderField } from "../../../lib/renderField";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import clubTableColumns from "../columns/ClubTableColumns";
import { useGetAllClubQuery } from "../../../redux/services/clubApis";
import { useState } from "react";
import { useAllCategoriesQuery } from "../../../redux/services/categoryApi";
export const clubData: ClubRecord[] = [
    {
        _id: "68f7535139e27102b52206ed",
        name: "Desiree Bailey",
        sportsOffered: [
            {
                _id: "68eb546572c6b441715602ea",
                name: "Hosain 1212",
                isDeleted: true
            }
        ],
        websiteLink: "https://www.xewiryzi.in",
        fee: 80,
        status: "Unpaid",
        primaryContactName: "Zachery Willis",
        quantity: 2,
        primaryContactEmail: "tevipysyve@mailinator.com",
        primaryContactPhone: "+1 (697) 325-8792",
        locations: [
            {
                streetAddress: "Fugit blanditiis co",
                city: "Aliqua Rerum ipsam ",
                zipCode: "89844"
            },
            {
                streetAddress: "32 Rocky New Freeway",
                city: "10 South Clarendon Court",
                zipCode: "45085"
            }
        ],
        competitionLevel: [
            "Local (city) Recreational",
            "Local (city) Competitive"
        ],
        transactionId: "",
        expireDate: null,
        joinDate: "2025-10-21T09:33:05.162Z",
        createdAt: "2025-10-21T09:33:05.163Z",
        updatedAt: "2025-10-21T09:33:05.163Z",
        __v: 0
    },
];

function Clubtable() {
    const navigate = useNavigate();
    const [page, setPage] = useState<number>(1);
    const { data: categoryData, isLoading: categoryLoading } = useAllCategoriesQuery({ limit: 999 , sort: "name"})
    const [sportsOffered, setSportsOffered] = useState<string>('')
    const [searchTerm, setSearchTerm] = useState<string>('')
    const { data: clubDatas, isLoading, isFetching } = useGetAllClubQuery(
        {
            ...(searchTerm !== '' && { searchTerm }),
            ...(sportsOffered !== '' && { sportsOffered }),
            page,
            limit: 10
        }
    )

    const handleAction = (action: "view" | "block", record: ClubRecord) => {
        if (action === "view") {
            navigate(`/club/${record._id}`)
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
                        options: Array.isArray(categoryData?.data?.result) ? categoryData?.data?.result?.map((item: any) => ({ label: item?.name, value: item?._id })) : [],
                        props: { placeholder: "All Clubs" }
                    },
                    className: "!w-[300px]",
                    isLoading: categoryLoading as boolean,
                    onChange: (value) => setSportsOffered(value)
                })}
                {renderField({
                    field: {
                        type: "text",
                        key: "username",
                        label: "Search By Name",
                        props: { placeholder: "Search By Name", onChange: (e) => setSearchTerm(e.target.value) },
                    },
                    className: "!w-[300px]"
                })}

            </div>
            <Table
                bordered
                loading={isLoading || isFetching}
                columns={clubTableColumns(handleAction)}
                dataSource={clubDatas?.data?.result}
                pagination={{
                    position: ['bottomCenter'],
                    pageSize: clubDatas?.data?.meta?.limit || 10,
                    total: clubDatas?.data?.meta?.total || 0,
                    current: clubDatas?.data?.meta?.page || 1,
                    onChange: (page) => {
                        setPage(page)
                    }
                }}
                rowKey="_id"
            />
        </>
    );
}

export default Clubtable;
