import { useEffect } from 'react';
import { Button, Form, Input, Card, Typography, Divider } from 'antd';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { primaryBtn } from '../../constant/btnStyle';

const { Title } = Typography;

const ForgetPassword = () => {

  const navigate = useNavigate();
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({
      email: '',
    });
  }, [form]);

  const onFinish = async ({ email }: { email: string }) => {
    if (!email) {
      toast.error('Please fill all the fields');
      return;
    }

    try {
      navigate('/otp');
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <div className="w-full h-dvh flex max-w-screen-md mx-auto items-center justify-center">
      <Card style={{ width: 500 }}>
        <div className="flex flex-col items-center justify-center mb-3">
          <Title level={3}>Forget Password</Title>
          <p className='text-center text-gray-600 mb-4'>Please enter your email to get verification code</p>
        </div>
        <Divider />
        <Form
          form={form}
          name="login"
          layout="vertical"
          requiredMark={false}
          style={{ width: 450 }}
          onFinish={onFinish}
        >
          <Form.Item
            label="Email address"
            name="email"
            rules={[{ required: true, message: 'Please input your Email!' }]}
          >
            <Input size="large" placeholder="Please input your Email address" />
          </Form.Item>

          <Form.Item>
            <Button
              size='large' style={primaryBtn}
              htmlType="submit"
              block
              type="primary"
              className='!w-full'
            >
              Continue
            </Button>
          </Form.Item>
        </Form>
      </Card>


    </div>
  );
};

export default ForgetPassword