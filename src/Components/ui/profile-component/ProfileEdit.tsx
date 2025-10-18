import { Button, Form, Input } from 'antd';

const ProfileEdit = ({ image, data }: {
  image: File | null;
  data: any;
}) => {
  const [form] = Form.useForm();
  const onFinish = async ({ name }: { name: string }) => {
    console.log(name);
    const updateData = {
      name: name,
    };
    console.log(updateData);
    const formData = new FormData();
    if (updateData) {
      Object.keys(updateData).forEach((key) => {
        formData?.append(key, updateData[key as keyof typeof updateData]);
      });
    }

    if (image === null) {
      formData?.delete('profile_image');
    } else {
      formData?.append('profile_image', image);
    }

    try {
      // update profile logic here
    } catch (error) {
      console.error('Failed to update profile:', error);
    }
  };
  console.log(data);
  return (
    <div>
      <p className="text-[var(--bg-red-high)] text-3xl text-center">
        Edit Your Profile
      </p>
      <Form
        className="text-white"
        requiredMark={false}
        form={form}
        onFinish={onFinish}
        layout="vertical"
        initialValues={{
          name: data?.name || '',
          email: data?.email || '',
        }}
      >
        <Form.Item
          name="name"
          label={<span className="text-black">Name</span>}
          rules={[{ required: true, message: 'Name is required' }]}
        >
          <Input
            placeholder="Name"
            className="p-2 w-full outline-none border-none h-11 text-[var(--white-600)]"
          />
        </Form.Item>

        <Form.Item
          name="email"
          label={<span className="text-black">Email</span>}
        >
          <Input
            disabled
            type="email"
            placeholder="Email"
            className="cursor-not-allowed  p-2 w-full outline-none border-none h-11 text-[var(--white-600)]"
          />
        </Form.Item>

        <Button
          htmlType="submit"
          style={{
            backgroundColor: 'var(--bg-red-high)',
            color: '#fff',
            height: 40,
          }}
          className="!bg-[var(--bg-red-high] !hover:bg-[var(--bg-blue-low] w-full"
        >
          Update Profile
        </Button>
      </Form>
    </div>
  );
};

export default ProfileEdit;
