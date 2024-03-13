/**
 * @author: @AkkilMG
 * @description: DBMS Project - Police Connect
 */

import React from 'react';

export const Privacy = () => {
  return (
    <main className="flex flex-col h-screen">
      <div className="flex flex-row flex-grow h-full">
        <div className="hidden h-full lg:block lg:w-1/3">
          <video className="object-cover w-full h-full no-drag" autoPlay muted loop>
            <source src="/assets/police.mp4" type="video/mp4" /> 
              Your browser does not support the video tag.
          </video>
        </div>
        <div className="flex-auto h-full m-10 ml-20 overflow-auto bg-opacity-75">
          <div className="max-w-3xl p-4 mx-auto">
            <h1 className="mb-4 text-3xl font-bold">Privacy Policy</h1>
            <p className="text-lg leading-relaxed">
            </p>
            <p className="mt-6 text-lg leading-relaxed">
            </p>
            <div className="mt-8">
              <h2 className="mb-2 text-xl font-bold">Our Mission</h2>
              <p className="text-lg leading-relaxed">
              </p>
            </div>
            <div className="mt-8">
              <h2 className="mb-2 text-xl font-bold">Our Vision</h2>
              <p className="text-lg leading-relaxed">
                
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};