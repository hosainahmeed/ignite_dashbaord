import { Form, Table, type UploadFile } from "antd";
import type { IigniteTeam } from "../../../types/category";
import IgniteTeamTableColumns from "../columns/EventCategoryTableColumns";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";
import FormWithImage from "../modals/FormWithImage";
import { useDeleteMemberMutation, useGetAllMemberQuery, useUpdateMemberMutation } from "../../../redux/services/userApis";


function IgniteTeamTable() {
    const [form] = Form.useForm();
    const [record, setRecord] = useState<IigniteTeam | null>(null);
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [page, setPage] = useState<number>(1);
    const { data: memberData } = useGetAllMemberQuery({ page, limit: 10})
    const [updateMember, { isLoading: isUpdateMemberLoading }] = useUpdateMemberMutation()
    const [deleteMember, { isLoading: isDeleteMemberLoading }] = useDeleteMemberMutation()
    const [fileList, setFileList] = useState<UploadFile[]>([]);

    const handleEditCategory = useCallback((record: IigniteTeam) => {
        setRecord(record);
        setModalVisible(true);
    }, []);

    const handleDeleteCategory = useCallback(async (id: string) => {
        try {
            const res = await deleteMember(id).unwrap()
            if (!res?.success) {
                throw new Error(res?.message)
            }
            toast.success(res?.message || "Member deleted successfully")
        } catch (error: any) {
            console.log(error)
            toast.error(error?.data?.message || error?.message || "Failed to delete member")
        }
    }, [deleteMember]);

    const handleUpdate = async (values: any) => {

        try {
            if (values?.name === '' || values?.position === '') {
                throw new Error("Name and position are required");
            }
            if (!record?._id) {
                throw new Error("Member id is required");
            }
            const updateData = {
                name: values?.name,
                position: values?.position
            }
            const formData = new FormData();
            formData.append('data', JSON.stringify(updateData));

            if (values?.avatar?.file === null || values?.avatar?.file === undefined) {
                formData?.delete('profile_image');
            } else {
                formData?.append('profile_image', values?.avatar?.file);
            }
            const res = await updateMember({ data: formData, id: record?._id }).unwrap()
            if (!res?.success) {
                throw new Error(res?.message)
            }
            toast.success(res?.message || "Member updated successfully")
            setModalVisible(false)
            setFileList([])
            form.resetFields()
        } catch (error: any) {
            toast.error(error?.data?.message || error?.message || "something went wrong while update member")
            setModalVisible(false)
            setFileList([])
            form.resetFields()
        }
    };

    return (
        <>
            <Table
                loading={isDeleteMemberLoading}
                bordered
                columns={IgniteTeamTableColumns({ handleEditCategory, handleDeleteCategory })}
                dataSource={memberData?.data?.result || []}
                pagination={{
                    position: ['bottomCenter'],
                    pageSize: memberData?.data?.meta?.limit || 10,
                    total: memberData?.data?.meta?.total || 0,
                    current: memberData?.data?.meta?.page || 1,
                    onChange: (page) => {
                        setPage(page)
                    }
                }}
                rowKey="email"
            />

            <FormWithImage
                loading={isUpdateMemberLoading}
                form={form}
                open={modalVisible}
                hide={setModalVisible}
                onFinish={handleUpdate}
                title={"Update Ignite Team"}
                record={record}
                btnText={"Update"}
                fileList={fileList}
                setFileList={setFileList}
            />
        </>
    );
}

export default IgniteTeamTable;
