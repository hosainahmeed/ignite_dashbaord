import { Button, Card, Form, Input, Typography } from 'antd';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { primaryBtn } from '../../constant/btnStyle';
const { Title } = Typography;

const OneTimePassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Get email from location state or use a default
  const email = location.state?.email || 'your.email@example.com';

  const handleSubmit = (values: any) => {
    console.log(values);
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate("/reset-password", { state: { email } });
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card style={{ width: 500 }}>
        <div className='flex items-center justify-center flex-col gap-2'>
          <Title level={3}>Check your email</Title>
          <p className='text-center text-gray-600 mb-4'>We sent a reset link to contact@dscode...com enter 5 digit code that mentioned in the email</p>
        </div>

        <Form
          layout="vertical"
          className="mt-8"
          onFinish={handleSubmit}
        >
          <div className='flex items-center justify-center'>
            <Form.Item name="otp" rules={[{ required: true, message: 'Please enter the OTP' }]}>
              <Input.OTP length={5} size="large" />
            </Form.Item>
          </div>
          <Button
            size="large"
            type="primary"
            htmlType="submit"
            loading={isLoading}
            disabled={isLoading}
            style={primaryBtn}
            block
            className='!w-full'
          >
            Verify
          </Button>
        </Form>

        <div className="text-center text-sm mt-2 text-gray-600">
          Didn't receive a code?{' '}
          <button
            type="button"
            className="font-medium text-[var(--bg-red-high)] hover:!underline"
            onClick={() => console.log('Resend OTP')}
          >
            Resend code
          </button>
        </div>
      </Card>
    </div>
  );
};

export default OneTimePassword