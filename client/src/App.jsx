import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/footer';
import Dashboard from './Pages/dashboard/Dashboard';
import Login from './Pages/login/Login';
import Register from './Pages/register/Register';
import Add from './Pages/add/Add';
import SeeNotes from './components/seeNotes/SeeNotes';
import './App.scss';

function Layout({ children }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          {/* Routes without Navbar/Footer */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Routes with Navbar/Footer */}
          <Route
            path="/"
            element={
              <Layout>
                <Dashboard />
              </Layout>
            }
          />
          <Route
            path="/add"
            element={
              <Layout>
                <Add />
              </Layout>
            }
          />
          <Route
            path="/note/:id"
            element={
              <Layout>
                <SeeNotes />
              </Layout>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
