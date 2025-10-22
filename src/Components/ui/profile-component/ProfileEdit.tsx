import { Button, Form, Input } from 'antd';
import { useUpdateProfileMutation } from '../../../redux/services/profileApis';
import toast from 'react-hot-toast';

const ProfileEdit = ({ image, data, setImage }: {
  image: File | null;
  data: any;
  setImage: (image: File | null) => void;
}) => {
  const [form] = Form.useForm();
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();


  const onFinish = async ({ name }: { name: string }) => {
    if (name === '') {
      throw new Error("Name is required");
    }
    const updateData = {
      name: name,
    };
    const formData = new FormData();
    formData.append('data', JSON.stringify(updateData));

    if (image === null) {
      formData?.delete('profile_image');
    } else {
      formData?.append('profile_image', image);
    }

    try {
      const res = await updateProfile(formData).unwrap();
      if (!res?.success) {
        throw new Error(res?.message || "Failed to update profile.");
      }
      if (res?.success) {
        toast.success("Profile updated successfully.");
        form.resetFields();
        setImage(null);
      }
    } catch (error: any) {
      toast.error(error?.data?.message || error?.message || "Failed to update profile.");
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
          loading={isLoading}
          disabled={isLoading}
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
