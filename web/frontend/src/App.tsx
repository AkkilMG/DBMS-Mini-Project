import React from 'react';
import { Route, Routes, useParams } from 'react-router-dom';
import { Signin } from './pages/auth/signin';
import { Signup } from './pages/auth/signup';
import { Home } from './pages/home/Home';
import { NotFound } from './pages/extras/NotFound';
import { Header } from './components/common/header';
import { Footer } from './components/common/footer';

const Routing= () => {
  var path = useParams().path;
  let component;
  if (path === "signin") {
    component = <Signin />;
  } else if (path === "signup") {
    component = <Signup />;
  } else {
    component = <NotFound />;
  }
  return (
    <div className="flex flex-col w-full min-h-screen bg-fixed bg-no-repeat bg-cover backdrop-blur-sm" id="journal-scroll" style={{backgroundImage: `url("/assets/home.jpg")`}}>
      <Header />
      {component}
      <Footer />
    </div>
  );
};

export const App = () => {
  return (
    <Routes>
      <Route path="/signin" element={<Signin />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/*" element={<Routing />} />
    </Routes>
    // <div>
    //   <Routes>
    //     <Header />
    //     <Route path="/" element={<Home />} />
    //     <Route element={<NotFound />} />
    //     <Footer />
    //   </div>
    // </Routes>
    // </div>
    
  );
};
