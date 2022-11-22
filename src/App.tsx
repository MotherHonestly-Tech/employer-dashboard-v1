import { useEffect } from 'react';
import './index.scss';
import './App.module.scss';

import ScrollToTop from './components/Layout/ScrollToTop';
import AppNavigator from './navigator/Navigator';
import { NotificationContextProvider } from './store/context/notifications.context';
import { PlaidLinkContextProvider } from './services/plaid-link';
import { MergeLinkContextProvider } from './services/merge-link';

function App() {
  return (
    <div id="root" className="mh-organization">
      <ScrollToTop />
      <PlaidLinkContextProvider>
        <MergeLinkContextProvider>
          <NotificationContextProvider>
            <AppNavigator />
          </NotificationContextProvider>
        </MergeLinkContextProvider>
      </PlaidLinkContextProvider>
    </div>
  );
}

export default App;
