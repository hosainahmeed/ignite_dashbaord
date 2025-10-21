import { useEffect } from "react";
import { Form, Input, Modal, Button } from "antd";
import { primaryBtn } from "../../../constant/btnStyle";


interface CategoryFormValues {
    name: string;
}


interface CategoryRecord {
    _id?: string;
    name: string;
    icon?: string;
}


interface CategoryFormProps {
    open: boolean;
    hide: (value: boolean) => void;
    title: string;
    onFinish: (values: CategoryFormValues) => void;
    record?: CategoryRecord | null;
    form: any;
    loading?: boolean;
    btnText: string;
}


function CategoryFormWithOutImage({
    open,
    hide,
    title,
    onFinish,
    record,
    form,
    loading,
    btnText
}: CategoryFormProps) {

    useEffect(() => {
        if (record) {
            form.setFieldsValue({ name: record.name });
        } else {
            form.resetFields();
        }
    }, [record, form]);


    return (
        <Modal
            title={title}
            open={open}
            onCancel={() => hide(false)}
            footer={null}
            centered
            destroyOnHidden
        >
            <Form<CategoryFormValues>
                layout="vertical"
                onFinish={onFinish}
                requiredMark={false}
                form={form}
            >

                <Form.Item
                    name="name"
                    label="Category Name"
                    rules={[{ required: true, message: "Please input category name!" }]}
                >
                    <Input size="large" placeholder="Enter category name" />
                </Form.Item>

                <Form.Item>
                    <Button
                        style={primaryBtn}
                        htmlType="submit"
                        block
                        loading={loading}
                    >
                        {btnText}
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
}

export default CategoryFormWithOutImage;
