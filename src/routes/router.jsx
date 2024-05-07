import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage.jsx";
import Login from "../pages/auth/Login.jsx";
import Register from "../pages/auth/Register.jsx";
import CreateProfile from "../pages/auth/CreateProfile.jsx";
import JobDetails from "../pages/JobDetails.jsx";
import Dashboard from "../pages/Dashboard.jsx";
import CreateJob from "../pages/CreateJob.jsx";
import ProfilePage from "../pages/auth/ProfilePage.jsx";
import DashboardJob from "../pages/DashboardJob.jsx";
import DashboardJobs from "../pages/DashboardJobs.jsx";
import SingleApplication from "../pages/SingleApplication.jsx";
import Layout from "../components/Layout.jsx";
import Applications from "../pages/Applications.jsx";

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      { path: "/create-profile", element: <CreateProfile /> },
      { path: "/profile", element: <ProfilePage /> },
      { path: "/dashboard", element: <Dashboard /> },
      { path: "/create-job", element: <CreateJob /> },

      // not done yet
      { path: "/job/:slug", element: <JobDetails /> },

      // Not done
      { path: "/applications", element: <Applications /> },
      // not done
      { path: "/dashboard-jobs", element: <DashboardJobs /> },
    ],
  },

  // done
  { path: "/login", element: <Login /> },
  // done
  { path: "/register", element: <Register /> },

  { path: "/profile", element: <ProfilePage /> },

  { path: "/single-dashboard-job/:slug", element: <DashboardJob /> },
  { path: "/application/:slug", element: <SingleApplication /> },
]);
