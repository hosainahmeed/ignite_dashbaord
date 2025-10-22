import { useState } from "react";
import {
  Button,
  Card,
  Form,
  Input,
  Modal,
  Space,
  Empty,
  Typography,
  Popconfirm,
} from "antd";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { PageLayout, PageContent } from "../../Layout/PageLayOut";
import toast from "react-hot-toast";
import { primaryBtn, secondaryBtn } from "../../constant/btnStyle";
import {
  useGetFaqQuery,
  useCreateFaqMutation,
  useUpdateFaqMutation,
  useDeleteFaqMutation
} from "../../redux/services/manageApis";

const { Paragraph } = Typography;
interface IFaq {
  _id: string,
  question: string,
  answer: string,
}

const FAQ = () => {
  const { data: faqsData, isLoading } = useGetFaqQuery(undefined);
  const [createFaq, { isLoading: createLoading }] = useCreateFaqMutation();
  const [updateFaq, { isLoading: updateLoading }] = useUpdateFaqMutation();
  const [deleteFaq, { isLoading: deleteLoading }] = useDeleteFaqMutation();


  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<IFaq | null>(null);
  const [form] = Form.useForm<IFaq>();

  const handleOpenModal = (item?: IFaq) => {
    setEditingItem(item || null);
    setIsModalOpen(true);
    form.setFieldsValue(item || { question: "", answer: "" });
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingItem(null);
    form.resetFields();
  };

  const handleSubmit = async (values: Omit<IFaq, "_id">) => {
    try {
      if (editingItem) {
        if (!editingItem?._id) {
          throw new Error("Please enter question and answer");
        }
        if (!values.question || !values.answer) {
          throw new Error("Please enter question and answer");
        }
        const data = {
          question: values.question,
          answer: values.answer
        }
        const res = await updateFaq({ id: editingItem._id, data }).unwrap()
        if (!res?.success) {
          throw new Error(res?.message || "Failed to update FAQ");
        }
        toast.success("FAQ updated successfully");
        handleCloseModal();
      } else {
        const res = await createFaq(values).unwrap()
        if (!res?.success) {
          throw new Error(res?.message || "Failed to add FAQ");
        }
        toast.success("FAQ added successfully");
        handleCloseModal();
      }
    } catch (error: any) {
      toast.error(error?.data?.message || error?.message || "Something went wrong while FAQ management");
    }
  };

  const handleDelete = async (item: IFaq) => {
    try {
      const res = await deleteFaq(item._id).unwrap()
      if (res?.success) {
        toast.success(res?.message || "FAQ deleted successfully");
      } else {
        throw new Error(res?.message || "Failed to delete FAQ");
      }
    } catch (error: any) {
      toast.error(error?.data?.message || error?.message || "Something went wrong while FAQ management");
    }
  };

  return (
    <PageLayout title="Frequently Asked Questions">
      <PageContent>
        <div className="flex items-center justify-between mb-6">
          <Button
            style={primaryBtn}
            icon={<FaPlus />}
            onClick={() => handleOpenModal()}
          >
            Add New FAQ
          </Button>
        </div>

        {faqsData?.data.length ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {faqsData?.data.map((item: IFaq) => (
              <Card
                loading={deleteLoading || isLoading}
                key={item._id}
                className="transition-shadow duration-300 rounded-2xl"
                title={
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-base">
                      {item.question}
                    </span>
                    <Space>
                      <FaEdit
                        className="cursor-pointer text-blue-500 hover:text-blue-600"
                        onClick={() => handleOpenModal(item)}
                      />
                      <Popconfirm
                        title="Are you sure you want to delete this FAQ?"
                        onConfirm={() => handleDelete(item)}
                        okText="Yes"
                        cancelText="No"
                      >
                        <FaTrash
                          className="cursor-pointer text-red-500 hover:text-red-600"
                        />
                      </Popconfirm>
                    </Space>
                  </div>
                }
              >
                <Paragraph
                  ellipsis={{ rows: 3, expandable: true, symbol: "more" }}
                >
                  {item.answer}
                </Paragraph>
              </Card>
            ))}
          </div>
        ) : (
          <Empty
            description="No FAQs available yet"
            className="my-12"
            imageStyle={{ height: 80 }}
          />
        )}

        {/* Modal for Add/Edit */}
        <Modal
          title={editingItem ? "Edit FAQ" : "Add FAQ"}
          open={isModalOpen}
          centered
          width={600}
          onCancel={handleCloseModal}
          footer={null}
          destroyOnHidden
        >
          <Form
            form={form}
            layout="vertical"
            requiredMark={false}
            onFinish={handleSubmit}
          >
            <Form.Item
              name="question"
              label="Question"
              rules={[{ required: true, message: "Please enter a question" }]}
            >
              <Input placeholder="Enter the FAQ question" />
            </Form.Item>

            <Form.Item
              name="answer"
              label="Answer"
              rules={[{ required: true, message: "Please enter an answer" }]}
            >
              <Input.TextArea rows={4} placeholder="Enter the FAQ answer" />
            </Form.Item>

            <Form.Item>
              <div className="flex justify-end gap-3">
                <Button style={secondaryBtn} onClick={handleCloseModal}>Cancel</Button>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={primaryBtn}
                  loading={createLoading || updateLoading}
                >
                  {editingItem ? "Update FAQ" : "Create FAQ"}
                </Button>
              </div>
            </Form.Item>
          </Form>
        </Modal>
      </PageContent>
    </PageLayout>
  );
};

export default FAQ;
