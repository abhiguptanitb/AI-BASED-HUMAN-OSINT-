import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Search from "./pages/Search";
import Reports from "./pages/Reports";
import Profiles from "./pages/Profiles";
import ProfileDetails from "./pages/ProfileDetails";
import ConnectionsGraph from "./pages/ConnectionsGraph";
import Settings from "./pages/Settings";
import DataSourceInsights from "./pages/DataSourceInsights";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected layout routes */}
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/profiles" element={<Profiles />} />
          <Route path="/profile-details" element={<ProfileDetails />} />
          <Route path="/connections-graph" element={<ConnectionsGraph />} />
          <Route path="/data-source-insights" element={<DataSourceInsights />} />
          <Route path="/search" element={<Search />} />
          <Route path="/reports" element={<Reports />} />
          {/* <Route path="/settings" element={<Settings />} /> */}
        </Route>
      </Routes>
    </Router>
  );
}
