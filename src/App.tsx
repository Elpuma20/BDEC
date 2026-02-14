import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './layouts/Layout';
import Home from './views/Home';
import Jobs from './views/Jobs';
import PostJob from './views/PostJob';
import About from './views/About';
import Login from './views/Login';
import AdminDashboard from './views/AdminDashboard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="jobs" element={<Jobs />} />
          <Route path="post" element={<PostJob />} />
          <Route path="about" element={<About />} />
          <Route path="login" element={<Login />} />
          <Route path="admin" element={<AdminDashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
