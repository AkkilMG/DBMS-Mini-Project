import React from 'react';

export const Signin = () => {
  return (
  <main className="flex flex-col">
    <header className="hidden lg:block lg:w-1/3 fixed top-0 z-50 w-full text-gray-100 transition-all duration-300 ease-in-out body-font">
      <div className="container flex flex-row flex-wrap items-center p-5 mx-auto">
        <a className="flex-grow font-semibold text-2x1" href="/"><img src='./assets/logo.png' className='w-40 no-drag' alt='Police Connect' /></a>
      </div>
    </header>
    <div className="flex flex-grow flex-row">
      <div className="hidden lg:block lg:w-1/3">
        <video className="h-screen w-full object-cover no-drag" autoPlay muted loop>
          <source src="/assets/police.mp4" type="video/mp4" /> {/* https://cdn.dribbble.com/uploads/48226/original/b8bd4e4273cceae2889d9d259b04f732.mp4?1689028949 */}
            Your browser does not support the video tag.
        </video>
      </div>
      <div className="flex flex-grow items-center justify-center p-6 lg:w-2/3 ">
        <div className="w-full max-w-md">
          <h2 className="mb-6 text-2xl font-bold flex flex-row">Sign in to <span> </span><img src='./assets/logo-dark.png' className='w-40 no-drag' alt='Police Connect' /></h2>
          <form>
            <div className="mb-4">
              <label className="text-sl mb-2 block font-bold text-gray-700"> Email </label>
              <input className="h-14 w-full appearance-none rounded-lg border px-3 py-2 leading-tight text-gray-700 shadow focus:border-indigo-500 focus:shadow-lg focus:outline-none focus:ring-2" id="email" type="email" />
            </div>
            <div className="mb-6">
              <span className="text-sl mb-2 flex items-center justify-between font-sans font-bold text-gray-700">
                Password
                <a href="#" className="cursor-pointer font-sans text-sm font-normal text-gray-600 underline">Forgot?</a>
              </span>
              <input className="focus:border-indifo-500 mb-3 h-14 w-full appearance-none rounded-lg border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none focus:ring" id="password" type="password" />
            </div>
            <div>
              <button type="submit" className="focus:shadow-outline h-14 w-full rounded-3xl bg-[#0D0C22] px-4 py-2 font-sans font-bold text-white hover:bg-gray-800 focus:outline-none">Sign In</button>
            </div>
            <p className="mt-4 text-center text-sm text-gray-600">
              Don't have an account?<span> </span>
              <a href="#" className="cursor-pointer font-sans text-sm text-gray-600 underline">Sign up </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  </main>
  );
};