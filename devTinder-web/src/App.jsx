import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from "./component/login";
import Body from "./component/body"; 
import { Provider } from 'react-redux';
import appStore from './utils/appStore';
import Feed from './component/feed';
import EditProfile from './component/editProfile';
import Connection from './component/connections';
import Request from './component/request';
import Navbar from './component/navbar'; 

const App = () => {
  return (
    <Provider store={appStore}>
      <Router basename='/'>
        <Navbar />
        <Routes>
          <Route path="/" element={<Body />}>
            <Route index element={<Feed />} />  
            <Route path="profile" element={<EditProfile />} />
            <Route path="connection" element={<Connection />} />
            <Route path="request" element={<Request />} />
          </Route>
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
