import { Form } from "antd";
import { FaPlus } from "react-icons/fa"
import IgniteTeamTable from "../../Components/ui/tables/IgniteTeamTable"
import { PageContent, PageLayout } from "../../Layout/PageLayOut"
import { useCallback, useState } from "react";
import type { IigniteTeam } from "../../types/category";
import FormWithImage from "../../Components/ui/modals/FormWithImage";

function IgniteTeam() {
  const [form] = Form.useForm();
  const [isUpdate, setIsUpdate] = useState<boolean>(false);
  const [record, setRecord] = useState<IigniteTeam | null>(null);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const handleAddCategory = useCallback(() => {
    setIsUpdate(false);
    setRecord(null);
    setModalVisible(true);
  }, []);

  const handleSubmit = useCallback(
    async (values: any) => {
      console.log(values)
    },
    []
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
          title={isUpdate ? "Update Ignite Team" : "Add New Ignite Team"}
          btnText={isUpdate ? "Update" : "Add New"}
          record={record}
          loading={isUpdate}
        />
      </PageContent>
    </PageLayout>
  )
}

export default IgniteTeam