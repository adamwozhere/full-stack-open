import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import { NotificationContextProvider } from './NotificationContext';
import { UserContextProvider } from './UserContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
    <UserContextProvider>
      <QueryClientProvider client={queryClient}>
        <NotificationContextProvider>
          <App />
        </NotificationContextProvider>
      </QueryClientProvider>
    </UserContextProvider>
  </Router>,
);
