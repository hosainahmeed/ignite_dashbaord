import { useEffect, useState } from "react";
import { Form, Input, Modal, Button, Upload } from "antd";
import type { UploadFile } from "antd/es/upload/interface";
import { UploadOutlined } from "@ant-design/icons";
import { imageUrl } from "../../../utils/imageHandler";
import { primaryBtn } from "../../../constant/btnStyle";
import type { IigniteTeam } from "../../../types/category";


interface CategoryFormValues {
    avatar?: UploadFile[];
    name: string;
}


interface CategoryFormProps {
    open: boolean;
    hide: (value: boolean) => void;
    title: string;
    onFinish: (values: CategoryFormValues) => void;
    record?: IigniteTeam | null;
    loading?: boolean;
    form: any;
    btnText: string;
}


function FormWithImage({
    open,
    hide,
    title,
    onFinish,
    record,
    loading,
    form,
    btnText
}: CategoryFormProps) {
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    console.log(fileList)
    useEffect(() => {
        if (record) {
            form.setFieldsValue({ name: record.name });
            if (record.photo_url) {
                setFileList([
                    {
                        uid: "-1",
                        name: record.name,
                        status: "done",
                        url: imageUrl({ image: record.photo_url }),
                    },
                ]);
            }
        } else {
            form.resetFields();
            setFileList([]);
        }
    }, [record, form]);


    const handleUploadChange = (info: { fileList: UploadFile[] }) => {
        setFileList(info.fileList);
    };

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
                <Form.Item name="avatar" label="Category Icon">
                    <Upload
                        name="avatar"
                        listType="picture"
                        maxCount={1}
                        accept="image/*"
                        fileList={fileList}
                        onChange={handleUploadChange}
                        beforeUpload={() => false}
                    >
                        <Button icon={<UploadOutlined />}>Upload</Button>
                    </Upload>
                </Form.Item>

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
                        loading={loading}
                        block
                        onClick={() => onFinish(form.getFieldsValue())}
                    >
                        {btnText}
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
}

export default FormWithImage;
