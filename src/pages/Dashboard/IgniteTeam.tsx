import { Form, type UploadFile } from "antd";
import { FaPlus } from "react-icons/fa"
import IgniteTeamTable from "../../Components/ui/tables/IgniteTeamTable"
import { PageContent, PageLayout } from "../../Layout/PageLayOut"
import { useCallback, useState } from "react";
import type { IigniteTeam } from "../../types/category";
import FormWithImage from "../../Components/ui/modals/FormWithImage";
import { useCreateMemberMutation } from "../../redux/services/userApis";
import toast from "react-hot-toast";

function IgniteTeam() {
  const [form] = Form.useForm();
  const [record, setRecord] = useState<IigniteTeam | null>(null);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
   const [fileList, setFileList] = useState<UploadFile[]>([]);
  const handleAddCategory = useCallback(() => {
    setRecord(null);
    setModalVisible(true);
  }, []);

  const [createMember, { isLoading: isCreateMemberLoading }] = useCreateMemberMutation()

  const handleSubmit = useCallback(
    async (values: any) => {
      try {
        if (values?.name === '' || values?.position === '') {
          throw new Error("Name and position are required");
        }
        const formData = new FormData();
        formData.append('data', JSON.stringify(values));
        if (values?.avatar?.file === null || values?.avatar?.file === undefined) {
          formData?.delete('profile_image');
        } else {
          formData?.append('profile_image', values?.avatar?.file);
        }
        const res = await createMember(formData).unwrap()
        if (!res?.success) {
          throw new Error(res?.message)
        }
        toast.success(res?.message || "Member updated successfully")
        setModalVisible(false)
        form.resetFields()
        setRecord(null)
        setFileList([])
      } catch (error: any) {
        toast.error(error?.data?.message || error?.message || "something went wrong while update member")
        setModalVisible(false)
        form.resetFields()
        setRecord(null)
        setFileList([])
      }
    },
    [createMember]
  );
  return (
    <PageLayout
      title="IGNITE Team Management"
      isButton={{
        buttonText: 'Add New Member',
        icon: <FaPlus />,
        type: 'action',
        onClick() {
          handleAddCategory()
        },
      }}
    >
      <PageContent>
        <IgniteTeamTable />
        <FormWithImage
          form={form}
          open={modalVisible}
          hide={setModalVisible}
          onFinish={handleSubmit}
          title="Add New Ignite Team"
          btnText="Add New"
          record={record}
          loading={isCreateMemberLoading}
          fileList={fileList}
          setFileList={setFileList}
        />
      </PageContent>
    </PageLayout>
  )
}

export default IgniteTeam