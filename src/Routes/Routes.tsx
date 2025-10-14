import { createBrowserRouter } from 'react-router';
import Login from '../pages/auth/Login';
import ForgetPassword from '../pages/auth/ForgetPassword';
import OneTimePassword from '../pages/auth/OneTimePassword';
import ResetPassword from '../pages/auth/ResetPassword';
import { dashbaordRoutes } from './dashbaordRoutes';

export const Routes = createBrowserRouter([
  dashbaordRoutes,
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/forgot-password',
    element: <ForgetPassword />,
  },
  {
    path: '/otp',
    element: <OneTimePassword />,
  },
  {
    path: '/reset-password',
    element: <ResetPassword />,
  },
]);
