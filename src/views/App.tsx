import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './auth/LoginPage'; // LoginPage'i import ediyoruz
import SignupPage from './auth/SignupPage';
import HomePage from './HomePage'; // Yeni ana sayfa import edildi
import ProtectedRoute from '@/components/ProtectedRoute'; // ProtectedRoute import edildi

function App() {
  return (
    <Routes>
      {/* Ana yol ("/") artık /login'e yönleniyor */}
      <Route path="/" element={<Navigate to="/login" replace />} />
      
      {/* Login ve Signup sayfaları */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      
      {/* Korunmuş ana sayfa için route */}
      <Route element={<ProtectedRoute />}>
        <Route path="/home" element={<HomePage />} />
      </Route>
      
      {/* Gelecekte diğer sayfalar için Route'lar buraya eklenebilir */}
      {/* Örnek: <Route path="/dashboard" element={<DashboardPage />} /> */}
    </Routes>
  );
}

export default App; 