/**
 * @author: @AkkilMG
 * @description: DBMS Project - Police Connect
 */

import React from 'react';
import Lottie from 'react-lottie';
import comp from '../../../assets/completed.json';

export const Completed = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: comp,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <Lottie options={defaultOptions} height={512} width={512} />
      </div>
    </div>
  );
}