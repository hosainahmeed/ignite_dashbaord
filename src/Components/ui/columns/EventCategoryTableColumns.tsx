import { Space, Button, Tooltip, Popconfirm } from "antd";
import type { ColumnsType } from "antd/es/table";
import { EditIcon } from "../icons/SvgIcons";
import type { IeventCategory } from "../../../types/category";
import { FaTrash } from "react-icons/fa";

export default function eventCategoryTableColumns({ handleEditCategory, handleDeleteCategory }:
    { handleEditCategory: (record: IeventCategory) => void, handleDeleteCategory: (id: number) => void }): ColumnsType<IeventCategory> {
    return [
        {
            title: "Event Category Name",
            dataIndex: "name",
            key: "title",
        },
        {
            title: "Total Events",
            dataIndex: "total_events",
            key: "total_events",
        },
        {
            title: "Action",
            key: "action",
            render: (_, record) => (
                <Space size="middle">
                    <Tooltip title="Edit">
                        <Button
                            style={{
                                backgroundColor: "#D62828",
                                color: "white",
                            }}
                            icon={<EditIcon />}
                            onClick={() => handleEditCategory(record)}
                        />
                    </Tooltip>
                    <Popconfirm
                        title="Are you sure you want to delete this category?"
                        onConfirm={() => handleDeleteCategory(record?.id)}
                        placement="bottomRight"
                        okText="Yes"
                        cancelText="No"
                        okButtonProps={{
                            style: {
                                backgroundColor: "var(--bg-blue-high)",
                                color: "white",
                            }
                        }}
                        cancelButtonProps={{
                            style: {
                                backgroundColor: "var(--color-white)",
                                color: "var(--bg-blue-high)",
                            }
                        }}
                    >
                        <Tooltip title="Delete">
                            <Button
                                danger
                                icon={<FaTrash />}
                            />
                        </Tooltip>
                    </Popconfirm>
                </Space>
            ),
        },
    ];
}

