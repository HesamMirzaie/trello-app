import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { HomePage } from './pages/HomePage';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { UserProvider } from './context/UserContext';
import { ThemeProvider } from './context/ThemeContext';
import { Login } from './pages/Login';
import { SignUp } from './pages/SignUp';
import { Dashboard } from './pages/Dashboard';
import { SelectedBoardProvider } from './context/SelectedBoardContext';

// Create a client
const queryClient = new QueryClient();

// Router
const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/signup',
    element: <SignUp />,
  },
  {
    path: '/dashboard',
    element: <Dashboard />,
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <SelectedBoardProvider>
          <ThemeProvider>
            <RouterProvider router={router} />
          </ThemeProvider>
        </SelectedBoardProvider>
      </UserProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </StrictMode>
);
