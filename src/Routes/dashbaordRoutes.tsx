import PrivateRoute from "./PrivetRoute";
import Dashboard from "../Layout/Dashboard";
import NominationsManagement from "../pages/Dashboard/NominationsManagement";
import ClubManagement from "../pages/Dashboard/ClubManagement";
import DonationsManagement from "../pages/Dashboard/DonationsManagement";
import PageNotFound from "../pages/PageNotFound";
import DashboardHome from "../pages/Dashboard/DashboardHome";
import SportsCategory from "../pages/Dashboard/SportsCategory";
import EventCategory from "../pages/Dashboard/EventCategory";
import SubscriptionManage from "../pages/Dashboard/SubscriptionManage";
import Profile from "../pages/Dashboard/Profile";
import TransactionManage from "../pages/Dashboard/TransactionManage";
import TermsAndConditions from "../pages/Dashboard/TermsAndConditions";
import FAQ from "../pages/Dashboard/FAQ";
import PrivacyPolicy from "../pages/Dashboard/PrivacyPolicy";
import ClubDetails from "../pages/Dashboard/specific/ClubDetails";
// import EventDetails from "../pages/Dashboard/specific/EventDetails";
import DonationDetails from "../pages/Dashboard/specific/DonationDetails";

export const dashbaordRoutes = {
  path: "/",
  errorElement: <PageNotFound />,
  element: (
    <PrivateRoute>
      <Dashboard />
    </PrivateRoute>
  ),
  children: [
    { path: '/', element: <DashboardHome /> },
    { path: '/user-management', element: <NominationsManagement /> },
    { path: '/club-management', element: <ClubManagement /> },
    { path: '/donations-management', element: <DonationsManagement /> },
    { path: '/sports-category', element: <SportsCategory /> },
    { path: '/event-category', element: <EventCategory /> },
    { path: '/manage-pricing', element: <SubscriptionManage /> },
    { path: '/profile-setting', element: <Profile /> },
    { path: '/faq', element: <FAQ /> },
    { path: '/transaction-history', element: <TransactionManage /> },
    { path: '/privacy-policy', element: <PrivacyPolicy /> },
    { path: '/terms-and-conditions', element: <TermsAndConditions /> },
    { path: '/donation/:id', element: <DonationDetails /> },
    { path: '/club/:id', element: <ClubDetails /> },
    // { path: '/event/:id', element: <EventDetails /> },
  ],
};
