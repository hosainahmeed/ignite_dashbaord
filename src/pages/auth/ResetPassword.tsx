import { Button, Card, Form, Input, Typography } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { primaryBtn } from '../../constant/btnStyle';
const { Title } = Typography;

const ResetPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (values: any) => {
    console.log(values);
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate('/login');
    }, 1500);
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
              loading={isLoading}
              disabled={isLoading}
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
