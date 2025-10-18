import PrivateRoute from "./PrivetRoute";
import Dashboard from "../Layout/Dashboard";
import NominationsManagement from "../pages/Dashboard/NominationsManagement";
import ClubManagement from "../pages/Dashboard/ClubManagement";
import DonationsManagement from "../pages/Dashboard/DonationsManagement";
import PageNotFound from "../pages/PageNotFound";
import DashboardHome from "../pages/Dashboard/DashboardHome";
import SportsCategory from "../pages/Dashboard/SportsCategory";
import IgniteTeam from "../pages/Dashboard/IgniteTeam";
import SubscriptionManage from "../pages/Dashboard/SubscriptionManage";
import Profile from "../pages/Dashboard/Profile";
import TermsAndConditions from "../pages/Dashboard/TermsAndConditions";
import FAQ from "../pages/Dashboard/FAQ";
import PrivacyPolicy from "../pages/Dashboard/PrivacyPolicy";
import ClubDetails from "../pages/Dashboard/specific/ClubDetails";
import NominationDetails from "../pages/Dashboard/specific/NominationDetails";
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
    { path: '/nomination-management', element: <NominationsManagement /> },
    { path: '/club-management', element: <ClubManagement /> },
    { path: '/donations-management', element: <DonationsManagement /> },
    { path: '/sports-category', element: <SportsCategory /> },
    { path: '/ignite-team', element: <IgniteTeam /> },
    { path: '/club-join-fee', element: <SubscriptionManage /> },
    { path: '/profile-setting', element: <Profile /> },
    { path: '/faq', element: <FAQ /> },
    { path: '/privacy-policy', element: <PrivacyPolicy /> },
    { path: '/terms-and-conditions', element: <TermsAndConditions /> },
    { path: '/donation/:id', element: <DonationDetails /> },
    { path: '/club/:id', element: <ClubDetails /> },
    { path: '/nominations-details/:id', element: <NominationDetails /> },
  ],
};
