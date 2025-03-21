import { createBrowserRouter } from 'react-router-dom';
import { Home } from '../pages/home';
import { Auth } from '../pages/auth';
import { ProtectedRoute } from '../components/ProtectedRoute';

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
    ),
    errorElement: <h1>404</h1>,
  },
  {
    path: '/auth',
    element: <Auth />,
    errorElement: <h1>404</h1>,
  },
]);
