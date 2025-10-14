import { Form, Table } from "antd";
import type { IeventCategory } from "../../../types/category";
import eventCategoryTableColumns from "../columns/EventCategoryTableColumns";
import CategoryFormWithOutImage from "../modals/CategoryFormWithOutImage";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";

interface UserTableProps {
    recentUser?: boolean;
}

function EventCategoryTable({ recentUser }: UserTableProps) {
    console.log(recentUser)
    const [form] = Form.useForm();
    const [isUpdate, setIsUpdate] = useState<boolean>(false);
    const [record, setRecord] = useState<IeventCategory | null>(null);
    const [modalVisible, setModalVisible] = useState<boolean>(false);

    const categoryData: IeventCategory[] = [
        {
            id: 1,
            name: "League",
            total_events: 46
        },
    ];


    const handleEditCategory = useCallback((record: IeventCategory) => {
        setIsUpdate(true);
        setRecord(record);
        setModalVisible(true);
    }, []);

    const handleDeleteCategory = useCallback(async (id: number) => {
        try {
            console.log(id)
            toast.error("This function is on hold")
        } catch (error) {
            console.log(error)
            toast.error("Failed to delete category")
        }
    }, []);

    const handleSubmit = () => { };

    return (
        <>
            <Table
                bordered
                columns={eventCategoryTableColumns({ handleEditCategory, handleDeleteCategory })}
                dataSource={categoryData}
                pagination={false}
                rowKey="email"
            />

            <CategoryFormWithOutImage
                form={form}
                open={modalVisible}
                hide={setModalVisible}
                onFinish={handleSubmit}
                title={isUpdate ? "Update Category" : "Add Category"}
                record={record}
                btnText={isUpdate ? "Update" : "Add Category"}
            />
        </>
    );
}

export default EventCategoryTable;
