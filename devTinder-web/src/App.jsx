import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from "./component/login";
import Body from "./component/body"; 
import { Provider } from 'react-redux';
import appStore from './utils/appStore';
import Feed from "./component/feed";
import EditProfile from "./component/editProfile";
import Connection from "./component/connections";
import Request from "./component/request";
import Navbar from "./component/navbar"; 
import Footer from "./component/footer";
import Policy from "./component/policy";
import About from "./component/about";
import Refund from "./component/refund";
import Contact from "./component/contact";
import Terms from "./component/terms";
// import Profile from "./component/profile";

const App = () => {
  return (
    <Provider store={appStore}>
      <Router basename="/">
        <div className="flex flex-col min-h-screen">
          <Navbar /> 

          <div className="flex-grow">
            <Routes>

              {/* Redirect root to login */}
              <Route path="/" element={<Navigate to="/login" replace />} />

              {/* Public Routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/policy" element={<Policy />} />
              <Route path="/about" element={<About />} />
              <Route path="/refund" element={<Refund />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/termsandcondition" element={<Terms />} />

              {/* Protected Layout with nested routes */}
              <Route path="/body" element={<Body />}>
                <Route index element={<Feed />} />
                {/* <Route path="profile" element={<Profile />} /> */}
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
