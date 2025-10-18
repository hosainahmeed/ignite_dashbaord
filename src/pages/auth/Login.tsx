import { useEffect } from 'react';
import { Button, Form, Input, Card, Typography, Divider, Checkbox } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { IMAGE } from '../../assets/index.image';
import { primaryBtn } from '../../constant/btnStyle';

const { Title } = Typography;

const Login = () => {

  const navigate = useNavigate();
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({
      email: '',
      password: '',
    });
  }, [form]);

  const onFinish = async ({ email, password }: { email: string, password: string }) => {
    if (!email || !password) {
      toast.error('Please fill all the fields');
      return;
    }

    try {
      navigate('/');
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <div className="w-full h-dvh flex max-w-screen-md mx-auto items-center justify-center">
      <Card style={{ width: 500 }}>
        <div className="flex flex-col items-center justify-center mb-3">
          <div className="w-full flex items-center justify-center mb-3">
            <img src={IMAGE.brandLogo} alt="Brand Icon" className="w-auto h-10" />
          </div>
          <Title level={3}>Login to Account</Title>
          <p className='text-center text-gray-600 mb-4'>Please enter your email and password to continue</p>
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
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Please input your Email!' }]}
          >
            <Input size="large" placeholder="Email" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your Password!' }]}
          >
            <Input size="large" type="password" placeholder="Password" />
          </Form.Item>

          <Form.Item>
            <div className="flex justify-between">
              <Form.Item className="flex items-center">
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox
                    defaultChecked
                  >Remember me</Checkbox>
                </Form.Item>
              </Form.Item>

              <Link to="/forgot-password" className="!text-[var(--bg-red-high)] !underline">
                Forgot password
              </Link>
            </div>
          </Form.Item>

          <Form.Item>
            <Button
              // loading={isLoading}
              // disabled={isLoading}
              size='large' style={primaryBtn}
              htmlType="submit"
              block
              type="primary"
              className='!w-full'
            >
              Log in
            </Button>
          </Form.Item>
        </Form>
      </Card>


    </div>
  );
};

export default Login;
