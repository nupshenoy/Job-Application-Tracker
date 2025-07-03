
import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./components/Layout";
import RedirectIfLoggedIn from "./components/RedirectIfLoggedIn";
import { Toaster } from 'react-hot-toast';
import Insights from "./pages/Insights"
import ProfilePage from "./pages/ProfilePage";

function App() {
  return (
    <>
    <Toaster position="top-center" reverseOrder={false} />

      <Routes>
        <Route
          path="/"
          element={
            <RedirectIfLoggedIn>
              
                <LandingPage />
              
            </RedirectIfLoggedIn>
          }
        />
        <Route
          path="/login"
          element={
            <RedirectIfLoggedIn>
              <Layout>
                <LoginPage />
             </Layout>
            </RedirectIfLoggedIn>
          }
        />
        <Route
          path="/register"
          element={
            <RedirectIfLoggedIn>
              <Layout>
                <SignUpPage />
          </Layout>
            </RedirectIfLoggedIn>
          }
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Layout>
                <Dashboard />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/insights"
          element={
            <ProtectedRoute>
              <Layout>
                <Insights />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Layout>
                <ProfilePage />
              </Layout>
            </ProtectedRoute>
          }
        />

      </Routes>
    </>
  );
}

export default App;
