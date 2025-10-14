import { Button, Form, Input, message } from "antd";
// import { usePatchNewPasswordMutation } from "../../../Redux/services/AuthApis/authApis";

const ChangePassword = () => {
  const [form] = Form.useForm();
  // const [setNewPassword, { isLoading: isNewPassChange }] =
  //   usePatchNewPasswordMutation({});

  const onFinish = async ({ oldPassword, newPassword, confirmPassword }: { oldPassword: string, newPassword: string, confirmPassword: string }) => {
    const ChangePasswordDatas = {
      oldPassword: oldPassword,
      newPassword: newPassword,
      confirmPassword: confirmPassword,
    };
    try {
      console.log(ChangePasswordDatas);
      // await setNewPassword(ChangePasswordDatas).unwrap();
      message.success("Password Changed successfully.");
    } catch (error) {
      console.error("Failed to change password:", error);
      message.error("Failed to change Password.");
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
        // disabled={isNewPassChange}
        style={{
          backgroundColor: "var(--bg-blue-high)",
          color: "#fff",
          height: 40,
        }}
        // loading={isNewPassChange}
        className=" w-full"
      >
        Update password
      </Button>
    </Form>
  );
};

export default ChangePassword;
