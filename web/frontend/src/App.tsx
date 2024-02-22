import React, { useState, useEffect } from 'react';
import { Route, Routes, useParams } from 'react-router-dom';
import { Signin } from './pages/auth/signin';
import { Signup } from './pages/auth/signup';
import { Home } from './pages/home/Home';
import { NotFoundPage } from './pages/extras/NotFound';
import { Header } from './components/common/header';
import { Footer } from './components/common/footer';
import { Reporting } from './pages/reporting/Reporting';
import { ScreenLoading } from './components/common/lottie';
import { ForgotForm } from './pages/auth/ForgotForm';


const Routing= () => {
  var { path } = useParams();
  // console.log(path);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 5000);
    return () => clearTimeout(timeout);
  }, []);

  let component;
  if (path === undefined || path === "/") {
    component = <Home />
  } else {
    component = <NotFoundPage />;
  }
  return (
    <>
      {loading && (
        <ScreenLoading />
      )}
      <div className="flex flex-col w-full min-h-screen bg-fixed bg-black bg-no-repeat bg-cover bg-opacity-85 backdrop-blur-sm" id="journal-scroll" style={{backgroundImage: `url("/assets/home.jpg")`}}>
        <Header />
        {component}
        <Footer />
      </div>
    </>
    
  );
};

export const App = () => {
  return (
    <Routes>
      <Route path="/report" element={<Reporting />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgot" element={<ForgotForm />} />
      <Route path="/" element={<Routing />} />
      <Route path="/:path" element={<Routing />} />
    </Routes>
  );
};
