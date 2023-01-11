import { useEffect } from 'react';
import './index.scss';
import './App.module.scss';

import ScrollToTop from './components/Layout/ScrollToTop';
import AppNavigator from './navigator/Navigator';
import { NotificationContextProvider } from './store/context/notifications.context';
import { PlaidLinkContextProvider } from './services/plaid-link';
import { MergeLinkContextProvider } from './services/merge-link';
import { DashboardContextProvider } from './store/context/dashboard.context';

function App() {
  return (
    <div id="root" className="mh-organization">
      <ScrollToTop />
      <DashboardContextProvider>
        <PlaidLinkContextProvider>
          <MergeLinkContextProvider>
            {/* <NotificationContextProvider> */}
              <AppNavigator />
            {/* </NotificationContextProvider> */}
          </MergeLinkContextProvider>
        </PlaidLinkContextProvider>
      </DashboardContextProvider>
    </div>
  );
}

export default App;
