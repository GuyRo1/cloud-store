
import './styles/app.css'
import Login from './components/Login';
import UserContextProvider from './context/user.context';
import DashBoard from './components/Dashboard';

function App() {
  return (
    <UserContextProvider>
      <div className="app">
        <h1>☁ Welcome to CloudStore ☁</h1>
        <DashBoard/>
      </div>
    </UserContextProvider>
  );
}

export default App;
