import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './auth/LoginPage'; // LoginPage'i import ediyoruz
import SignupPage from './auth/SignupPage';

function App() {
  return (
    <Routes>
      {/* Ana yol ("/") için /login'e yönlendirme yapıyoruz */}
      <Route path="/" element={<Navigate to="/login" replace />} />
      
      {/* Login sayfası için route */}
      <Route path="/login" element={<LoginPage />} />

      {/* Login sayfası için route */}
      <Route path="/signup" element={<SignupPage />} />
      
      {/* Gelecekte diğer sayfalar için Route'lar buraya eklenebilir */}
      {/* Örnek: <Route path="/dashboard" element={<DashboardPage />} /> */}
    </Routes>
  );
}

export default App; 