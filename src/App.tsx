import { useEffect } from 'react';
import './App.module.scss';

import ScrollToTop from './components/Layout/ScrollToTop';
import AppNavigator from './navigator/Navigator';
import { PlaidLinkContextProvider } from './services/plaid-link';
import { NotificationContextProvider } from './store/context/notifications.context';
// import { load } from 'web-component-load';

// import './angular-dist/runtime.js';
// import './angular-dist/polyfills.js';
// import './angular-dist/vendor.js';
// import './angular-dist/main.js';
// import './angular-dist/styles.css';
// import './angular-dist/8.a519b2406aafd1a87efa.js';
// import './angular-dist/7.462a065cbd820a3e6c7f.js';
// import './angular-dist/6.325c551c93ca777631bd.js';
// import './angular-dist/2.5d07d9f08085aa54c078.js';

function App() {

  // useEffect(() => {
  //   load('http://localhost:4200');
  // }, []);

  return (
    <div className="mh-organization">
      {/* @ts-ignore */}
      {/* <div><angular-component /></div> */}
      
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
