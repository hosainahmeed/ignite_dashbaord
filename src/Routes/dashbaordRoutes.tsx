import PrivateRoute from "./PrivetRoute";
import Dashboard from "../Layout/Dashboard";
import NominationsManagement from "../pages/Dashboard/NominationsManagement";
import ClubManagement from "../pages/Dashboard/ClubManagement";
import EventsManagement from "../pages/Dashboard/EventsManagement";
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
import OrganizerDetails from "../pages/Dashboard/specific/OrganizerDetails";
import EventDetails from "../pages/Dashboard/specific/EventDetails";
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
    { path: '/manage-events', element: <EventsManagement /> },
    { path: '/sports-category', element: <SportsCategory /> },
    { path: '/event-category', element: <EventCategory /> },
    { path: '/manage-pricing', element: <SubscriptionManage /> },
    { path: '/profile-setting', element: <Profile /> },
    { path: '/faq', element: <FAQ /> },
    { path: '/transaction-history', element: <TransactionManage /> },
    { path: '/privacy-policy', element: <PrivacyPolicy /> },
    { path: '/terms-and-conditions', element: <TermsAndConditions /> },
    { path: '/donation/:id', element: <DonationDetails /> },
    { path: '/organizer/:id', element: <OrganizerDetails /> },
    { path: '/event/:id', element: <EventDetails /> },
  ],
};
