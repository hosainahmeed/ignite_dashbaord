import { FaPlus } from "react-icons/fa"
import SportsCategoryTable from "../../Components/ui/tables/SportsCategoryTable"
import { PageContent, PageLayout } from "../../Layout/PageLayOut"
import { Form } from "antd"
import { useCallback, useState } from "react"
import type { IsportCategory } from "../../types/category"
import CategoryFormWithOutImage from "../../Components/ui/modals/CategoryFormWithOutImage"

function SportsCategory() {
  const [form] = Form.useForm();
  const [modalVisible, setModalVisible] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [record, setRecord] = useState<IsportCategory | null>(null);

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
      title="Sports Category Management"
      isButton={{
        buttonText: 'Add New Category',
        icon: <FaPlus />,
        type: 'action',
        onClick() {
          handleAddCategory()
        },
      }}
    >
      <PageContent>
        <SportsCategoryTable />
        <CategoryFormWithOutImage
          form={form}
          open={modalVisible}
          hide={setModalVisible}
          onFinish={handleSubmit}
          title={isUpdate ? "Update Category" : "Add New Sports Category"}
          btnText={isUpdate ? "Update" : "Add New"}
          record={record}
          loading={isUpdate}
        />
      </PageContent>
    </PageLayout>
  )
}

export default SportsCategory