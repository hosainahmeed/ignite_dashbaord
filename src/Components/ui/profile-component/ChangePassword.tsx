import { Button, Form, Input, message } from "antd";
import { useChangePasswordMutation } from "../../../redux/services/authApis";

const ChangePassword = () => {
  const [form] = Form.useForm();
  const [setNewPassword, { isLoading: isNewPassChange }] = useChangePasswordMutation();

  const onFinish = async ({ oldPassword, newPassword, confirmPassword }: { oldPassword: string, newPassword: string, confirmPassword: string }) => {
    const ChangePasswordDatas = {
      oldPassword: oldPassword,
      newPassword: newPassword,
      confirmPassword: confirmPassword,
    };
    try {
      const res = await setNewPassword(ChangePasswordDatas).unwrap();
      if (res?.success) {
        message.success("Password Changed successfully.");
      } else {
        throw new Error(res?.message || "Failed to change Password.");
      }
    } catch (error: any) {
      console.error("Failed to change password:", error);
      message.error(error?.data?.message || error?.message || "Failed to change Password.");
    }
  };
  return (
    <Form
      requiredMark={false}
      form={form}
      onFinish={onFinish}
      layout="vertical"
    >
      <Form.Item
        name="oldPassword"
        label={<span className="text-black">Old Password</span>}
        rules={[
          {
            required: true,
            message: "old password is required",
          },
        ]}
      >
        <Input.Password
          placeholder="Old Password"
          size="large"
          className=" p-2 w-full outline-none"
        />
      </Form.Item>

      <Form.Item
        name="newPassword"
        label={<span className="text-black">New Password</span>}
        rules={[
          {
            required: true,
            message: "New password is required",
          },
        ]}
      >
        <Input.Password
          placeholder="New Password"
          size="large"
          className=" p-2 w-full outline-none"
        />
      </Form.Item>

      <Form.Item
        name="confirmPassword"
        label={<span className="text-black">Confirm Password</span>}
        rules={[
          {
            required: true,
            message: "Confirm Password is required",
          },
        ]}
      >
        <Input.Password
          placeholder="Confirm Password"
          size="large"
          className=" p-2 w-full outline-none"
        />
      </Form.Item>

      <Button
        type="primary"
        htmlType="submit"
        disabled={isNewPassChange}
        style={{
          backgroundColor: "var(--bg-red-high)",
          color: "#fff",
          height: 40,
        }}
        loading={isNewPassChange}
        className=" w-full"
      >
        Update password
      </Button>
    </Form>
  );
};

export default ChangePassword;
