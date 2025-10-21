import { FaPlus } from "react-icons/fa"
import SportsCategoryTable from "../../Components/ui/tables/SportsCategoryTable"
import { PageContent, PageLayout } from "../../Layout/PageLayOut"
import { Form } from "antd"
import { useCallback, useState } from "react"
import CategoryFormWithOutImage from "../../Components/ui/modals/CategoryFormWithOutImage"
import { useCreateCategoryMutation } from "../../redux/services/categoryApi"
import toast from "react-hot-toast"

function SportsCategory() {
  const [form] = Form.useForm();
  const [modalVisible, setModalVisible] = useState(false);
  const [createCategory, { isLoading: isCreating }] = useCreateCategoryMutation()

  const handleAddCategory = useCallback(() => {
    setModalVisible(true);
  }, []);

  const handleSubmitForCreate = useCallback(
    async (values: any) => {
      try {
        if (!values.name) return toast.error("Category name is required");
        const res = await createCategory(values).unwrap()
        if (!res?.success) {
          throw new Error(res?.message || "Category created failed")
        }
        if (res?.success) {
          res?.message && toast.success(res?.message || "Category created successfully")
          handleCancel()
          form.resetFields()
        }
      } catch (error: any) {
        toast.error(error?.data?.message || error?.message || "Category created failed")
        handleCancel()
        form.resetFields()
      }
    },
    [createCategory]
  );

  const handleCancel = () => {
    setModalVisible(false);
  };

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
          onFinish={handleSubmitForCreate}
          title="Add New Sports Category"
          btnText="Add New"
          loading={isCreating}
        />
      </PageContent>
    </PageLayout>
  )
}

export default SportsCategory