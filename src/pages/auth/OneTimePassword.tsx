import { Button, Card, Form, Input, Typography } from 'antd';
import { useNavigate, useSearchParams } from 'react-router';
import { primaryBtn } from '../../constant/btnStyle';
import { useResendResetCodeMutation, useVerifyResetOtpMutation } from '../../redux/services/authApis';
import toast from 'react-hot-toast';
const { Title } = Typography;

const OneTimePassword = () => {

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [verifyResetOtp, { isLoading: isVerifyResetOtpLoading }] = useVerifyResetOtpMutation()
  const [resendResetCode, { isLoading: isResendResetCodeLoading }] = useResendResetCodeMutation()

  const email = searchParams.get('email');

  const handleSubmit = async (values: any) => {

    try {
      if (!email) {
        throw new Error('Email is required')
      }
      if (!values?.otp) {
        throw new Error('OTP is required')
      }
      const data = {
        email: email,
        resetCode: parseInt(values?.otp)
      }
      const res = await verifyResetOtp(data).unwrap();
      if (!res?.success) throw new Error(res?.message)
      if (res?.success) {
        toast.success(res?.data?.message || res?.message || "Verification code sent successfully.")
        navigate(`/otp?email=${email}`);
      }
    } catch (error: any) {
      toast.error(error?.data?.message || error?.message || "Failed to send verification code.")
    }
  };

  const handleResendResetCode = async () => {
    try {
      if (!email) {
        throw new Error('Email is required')
      }
      const res = await resendResetCode({ email: email }).unwrap();
      if (!res?.success) throw new Error(res?.message)
      if (res?.success) {
        toast.success(res?.data?.message || res?.message || "Verification code sent successfully.")
      }
    } catch (error: any) {
      toast.error(error?.data?.message || error?.message || "Failed to send verification code.")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card style={{ width: 500 }}>
        <div className='flex items-center justify-center flex-col gap-2'>
          <Title level={3}>Check your email</Title>
          <p className='text-center text-gray-600 mb-4'>We sent a reset link to <b>{email ? email?.slice(0, 5) + '...' : 'your.email@example.com'}</b> enter 5 digit code that mentioned in the email</p>
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
            loading={isVerifyResetOtpLoading}
            disabled={isVerifyResetOtpLoading}
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
            onClick={() => handleResendResetCode()}
          >
            {isResendResetCodeLoading ? 'Resending...' : 'Resend code'}
          </button>
        </div>
      </Card>
    </div>
  );
};

export default OneTimePassword