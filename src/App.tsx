import { useEffect } from 'react';
import './index.scss';
import './App.module.scss';

import ScrollToTop from './components/Layout/ScrollToTop';
import AppNavigator from './navigator/Navigator';
import { PlaidLinkContextProvider } from './services/plaid-link';
import { NotificationContextProvider } from './store/context/notifications.context';

function App() {

  return (
    <div id="root" className="mh-organization">
      <ScrollToTop />
      <PlaidLinkContextProvider>
        <NotificationContextProvider>
          <AppNavigator />
        </NotificationContextProvider>
      </PlaidLinkContextProvider>
    </div>
  );
}

export default App;
