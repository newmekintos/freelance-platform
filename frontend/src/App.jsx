import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useGunAuth } from './context/GunAuthContext';
import Layout from './components/Layout/Layout';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import Jobs from './pages/Jobs';
import JobDetail from './pages/JobDetail';
import Services from './pages/Services';
import Create from './pages/Create';
import Messages from './pages/Messages';
import Profile from './pages/Profile';

const PrivateRoute = ({ children }) => {
  const { currentUser, loading } = useGunAuth();
  
  if (loading) {
    return <div className="text-center py-12">Yükleniyor...</div>;
  }
  
  return currentUser ? children : <Navigate to="/login" />;
};

const PublicRoute = ({ children }) => {
  const { currentUser, loading } = useGunAuth();
  
  if (loading) {
    return <div className="text-center py-12">Yükleniyor...</div>;
  }
  
  // Eğer kullanıcı giriş yapmışsa dashboard'a yönlendir
  return currentUser ? <Navigate to="/dashboard" /> : children;
};

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={
          <PublicRoute>
            <Home />
          </PublicRoute>
        } />
        <Route path="dashboard" element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        } />
        <Route path="login" element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        } />
        <Route path="register" element={
          <PublicRoute>
            <Register />
          </PublicRoute>
        } />
        <Route path="jobs" element={<Jobs />} />
        <Route path="jobs/:id" element={<JobDetail />} />
        <Route path="services" element={<Services />} />
        <Route path="create" element={
          <PrivateRoute>
            <Create />
          </PrivateRoute>
        } />
        <Route path="messages" element={
          <PrivateRoute>
            <Messages />
          </PrivateRoute>
        } />
        <Route path="profile" element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        } />
        <Route path="profile/:userId" element={<Profile />} />
      </Route>
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <SocketProvider>
          <AppRoutes />
        </SocketProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
