import { Form, Table } from "antd";
import type { IsportCategory } from "../../../types/category";
import categoryTableColumns from "../columns/CategoryTableColumns";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";
import CategoryFormWithOutImage from "../modals/CategoryFormWithOutImage";
import { useAllCategoriesQuery, useDeleteCategoryMutation, useUpdateCategoryMutation } from "../../../redux/services/categoryApi";

function SportsCategoryTable() {
    const [form] = Form.useForm();
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [record, setRecord] = useState<IsportCategory | null>(null);
    const [page, setPage] = useState<number>(1);
    const { data: categoryData, isLoading } = useAllCategoriesQuery({ page, limit: 10, sort: "name" })
    const [updateCategory, { isLoading: isUpdating }] = useUpdateCategoryMutation()
    const [deleteCategory] = useDeleteCategoryMutation()

    const handleAction = async (action: "edit" | "delete", record: IsportCategory) => {
        if (action === "edit") {
            setRecord(record);
            if (record?._id) {
                setModalVisible(true);
            }
        } else if (action === "delete") {
            try {
                if (!record?._id) return toast.error("Category not found");
                const res = await deleteCategory(record._id).unwrap()
                if (!res?.success) {
                    throw new Error(res?.message || "Category deleted failed")
                }
                if (res?.success) {
                    res?.message && toast.success(res?.message || "Category deleted successfully")
                }
            } catch (error: any) {
                toast.error(error?.message || "Category deleted failed")
            }
        }
    };

    const handleSubmitForUpdate = useCallback(
        async (values: any) => {
            try {
                if (!values.name) return toast.error("Category name is required");
                if (!record?._id) return toast.error("Category not found");
                const res = await updateCategory({ id: record._id, name: values.name }).unwrap()
                if (!res?.success) {
                    throw new Error(res?.message || "Category updated failed")
                }
                if (res?.success) {
                    res?.message && toast.success(res?.message || "Category updated successfully")
                    handleCancel()
                }
            } catch (error: any) {
                toast.error(error?.message || "Category updated failed")
                handleCancel()
            }
        },
        [record, updateCategory]
    );

    const handleCancel = () => {
        setRecord(null);
        setModalVisible(false);
    };

    return (
        <>
            <Table
                bordered
                loading={isLoading}
                columns={categoryTableColumns(handleAction)}
                dataSource={categoryData?.data?.result}
                pagination={{
                    position: ['bottomCenter'],
                    pageSize: categoryData?.data?.meta?.limit || 10,
                    total: categoryData?.data?.meta?.total,
                    current: categoryData?.data?.meta?.page,
                    onChange: (page) => {
                        setPage(page)
                    }
                }}
                rowKey="name"
            />
            <CategoryFormWithOutImage
                form={form}
                open={modalVisible}
                hide={setModalVisible}
                onFinish={handleSubmitForUpdate}
                title="Update Category"
                btnText="Update"
                record={record}
                loading={isUpdating}
            />
        </>
    );
}

export default SportsCategoryTable;
