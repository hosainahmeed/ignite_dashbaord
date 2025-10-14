import { Form, Table } from "antd";
import type { IsportCategory } from "../../../types/category";
import categoryTableColumns from "../columns/CategoryTableColumns";
import CategoryForm from "../modals/CategoryForm";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";

interface UserTableProps {
    recentUser?: boolean;
}

function SportsCategoryTable({ recentUser }: UserTableProps) {
    console.log(recentUser)
    const [form] = Form.useForm();
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [isUpdate, setIsUpdate] = useState<boolean>(false);
    const [record, setRecord] = useState<IsportCategory | null>(null);
   
    const categoryData: IsportCategory[] = [
        {
            id: 1,
            name: "Soccer",
            photo_url: "https://static.vecteezy.com/system/resources/previews/021/629/700/non_2x/soccer-ball-football-cartoon-icon-illustration-sports-icon-concept-illustration-suitable-for-icon-logo-sticker-clipart-free-vector.jpg",
            total_events: 4
        },
    ];

    const handleAction = (action: "edit" | "delete", record: IsportCategory) => {
        if (action === "edit") {
            setIsUpdate(true);
            setRecord(record);
            setModalVisible(true);
        } else if (action === "delete") {
            console.log(record)
        }
    };

    const handleSubmit = useCallback(
        async (values: any) => {
            console.log(values)
            setIsUpdate(false);
            setRecord(null);
            setModalVisible(false);
            toast.success("Category added successfully")
        },
        []
    );

    return (
        <>
            <Table
                bordered
                columns={categoryTableColumns(handleAction)}
                dataSource={categoryData}
                pagination={false}
                rowKey="email"
            />
            <CategoryForm
                form={form}
                open={modalVisible}
                hide={setModalVisible}
                onFinish={handleSubmit}
                title={isUpdate ? "Update Category" : "Add New Sports Category"}
                btnText={isUpdate ? "Update" : "Add New"}
                record={record}
            />
        </>
    );
}

export default SportsCategoryTable;
