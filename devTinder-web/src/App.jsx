import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from "./component/login";
import Body from "./component/body"; 
import { Provider } from 'react-redux';
import appStore from './utils/appStore';
import Feed from './component/feed';
import EditProfile from './component/editProfile';
import Connection from './component/connections';
import Request from './component/request';
import Navbar from './component/navbar'; 
import Footer from './component/footer';

const App = () => {
  return (
    <Provider store={appStore}>
      <Router basename='/'>
        <div className="flex flex-col min-h-screen">
          <Navbar /> {/* Navbar is outside Routes */}
          
          <div className="flex-grow">
            <Routes>
              {/* Redirect root to the login page */}
              <Route path="/" element={<Navigate to="/login" replace />} />
              
              {/* Login page route */}
              <Route path="/login" element={<Login />} />

              {/* Protected routes for authenticated users */}
              <Route path="/body" element={<Body />} >
                <Route index element={<Feed />} />  
                <Route path="profile" element={<EditProfile />} />
                <Route path="connection" element={<Connection />} />
                <Route path="request" element={<Request />} />
              </Route>
            </Routes>
          </div>

          <Footer />
        </div>
      </Router>
    </Provider>
  );
};

export default App;
