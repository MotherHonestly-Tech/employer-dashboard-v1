import './App.module.scss';
import AppNavigator from './navigator/Navigator';
import { NotificationContextProvider } from './store/context/notifications.context';

function App() {
  return (
    <div className="mh-organization">
      <NotificationContextProvider>
        <AppNavigator />
      </NotificationContextProvider>
    </div>
  );
}

export default App;
