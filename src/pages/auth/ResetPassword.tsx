import { Button, Card, Form, Input, Typography } from 'antd';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { primaryBtn } from '../../constant/btnStyle';
import { useResetPasswordMutation } from '../../redux/services/authApis';
import toast from 'react-hot-toast';
import Cookies from 'js-cookie';
const { Title } = Typography;

const ResetPassword = () => {
  const [resetPassword, { isLoading: isResetPasswordLoading }] = useResetPasswordMutation()
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const email = searchParams.get('email');

  const handleSubmit = async (values: any) => {
    try {
      if (['password', 'confirmPassword'].some(key => !values[key])) {
        toast.error(`All fields are required`);
        return;
      }
      if (values?.password !== values?.confirmPassword) {
        toast.error('Passwords do not match');
        return;
      }
      if (!email) {
        toast.error('Email is required');
        return;
      }
      const data = {
        email: email,
        password: values?.password,
        confirmPassword: values?.confirmPassword
      }
      const res = await resetPassword(data).unwrap();
      if (!res?.success) throw new Error(res?.message)
      if (res?.success) {
        toast.success(res?.data?.message || res?.message || "Password reset successfully.")
        Cookies.set('accessToken', res?.data?.accessToken);
        if (Cookies.get('accessToken')) {
          navigate('/', { replace: true });
        }else{
          navigate('/login', { replace: true });
        }
      }
    } catch (error: any) {
      toast.error(error?.data?.message || error?.message || "Failed to reset password.")
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card style={{ width: 500 }}>
        <div className='mb-5 flex items-center justify-center flex-col'>
          <Title level={3}>
            Set a new password
          </Title>
          <p className='text-center text-gray-600 mb-4'>
            Create a new password. Ensure it differs from
            previous ones for security
          </p>
        </div>

        <Form requiredMark={false} layout="vertical" className="mt-8 space-y-6" onFinish={handleSubmit}>
          <Form.Item name="password" label="New Password" rules={[{ required: true, message: 'Please input your password!' }]}>
            <Input.Password size="large" placeholder="New password" />
          </Form.Item>
          <Form.Item name="confirmPassword" label="Confirm New Password" rules={[{ required: true, message: 'Please confirm your password!' }, ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('The two passwords that you entered do not match!'));
            },
          })]}>
            <Input.Password size="large" placeholder="Confirm new password" />
          </Form.Item>
          <div>
            <Button
              size="large"
              htmlType="submit"
              loading={isResetPasswordLoading}
              disabled={isResetPasswordLoading}
              style={primaryBtn}
              block
              className='!w-full'
            >
              Reset Password
            </Button>
          </div>
        </Form>
      </Card>
    </div >
  );
};

export default ResetPassword;
