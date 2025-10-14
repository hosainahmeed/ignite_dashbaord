import { Form } from "antd";
import { FaPlus } from "react-icons/fa"
import EventCategoryTable from "../../Components/ui/tables/EventCategoryTable"
import { PageContent, PageLayout } from "../../Layout/PageLayOut"
import { useCallback, useState } from "react";
import type { IeventCategory } from "../../types/category";
import CategoryFormWithOutImage from "../../Components/ui/modals/CategoryFormWithOutImage";

function EventCategory() {
  const [form] = Form.useForm();
  const [isUpdate, setIsUpdate] = useState<boolean>(false);
  const [record, setRecord] = useState<IeventCategory | null>(null);
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
      title="Event Category Management"
      isButton={{
        buttonText: 'Add New Event Category',
        icon: <FaPlus />,
        type: 'action',
        onClick() {
          handleAddCategory()
        },
      }}
    >
      <PageContent>
        <EventCategoryTable />
        <CategoryFormWithOutImage
          form={form}
          open={modalVisible}
          hide={setModalVisible}
          onFinish={handleSubmit}
          title={isUpdate ? "Update Category" : "Add New Event Category"}
          btnText={isUpdate ? "Update" : "Add New"}
          record={record}
          loading={isUpdate}
        />
      </PageContent>
    </PageLayout>
  )
}

export default EventCategory