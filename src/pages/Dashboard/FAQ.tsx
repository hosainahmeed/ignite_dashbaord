import React, { useState } from "react";
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

const { Paragraph } = Typography;

/* ---------- FAQ Type ---------- */
interface IFaq {
  _id: string;
  question: string;
  description: string;
}

/* ---------- Component ---------- */
const FAQ: React.FC = () => {
  /* Dummy initial FAQs */
  const [faqs, setFaqs] = useState<IFaq[]>([
    {
      _id: "1",
      question: "What is your return policy?",
      description:
        "We accept returns within 30 days of purchase with a valid receipt.",
    },
    {
      _id: "2",
      question: "How can I contact support?",
      description:
        "You can contact our support team via email at support@example.com.",
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<IFaq | null>(null);
  const [form] = Form.useForm<IFaq>();

  /* ---------- Handlers ---------- */
  const handleOpenModal = (item?: IFaq) => {
    setEditingItem(item || null);
    setIsModalOpen(true);
    form.setFieldsValue(item || { question: "", description: "" });
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingItem(null);
    form.resetFields();
  };

  const handleSubmit = (values: Omit<IFaq, "_id">) => {
    if (editingItem) {
      // Update
      setFaqs((prev) =>
        prev.map((faq) =>
          faq._id === editingItem._id ? { ...faq, ...values } : faq
        )
      );
      toast.success("FAQ updated successfully");
    } else {
      // Add new
      const newFaq: IFaq = {
        _id: crypto.randomUUID(),
        ...values,
      };
      setFaqs((prev) => [...prev, newFaq]);
      toast.success("FAQ added successfully");
    }
    handleCloseModal();
  };

  const handleDelete = (item: IFaq) => {
    setFaqs((prev) => prev.filter((faq) => faq._id !== item._id));
    toast.success("FAQ deleted successfully");
  };

  /* ---------- Render ---------- */
  return (
    <PageLayout title="Frequently Asked Questions">
      <PageContent>
        {/* Add Button */}
        <div className="flex items-center justify-between mb-6">
          <Button
            style={primaryBtn}
            icon={<FaPlus />}
            onClick={() => handleOpenModal()}
          >
            Add New FAQ
          </Button>
        </div>

        {/* FAQ List */}
        {faqs.length ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {faqs.map((item) => (
              <Card
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
                  {item.description}
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
              name="description"
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
