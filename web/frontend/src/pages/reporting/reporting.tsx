import React, { useEffect, useState } from 'react';
import { StepCommit } from './steps/StepCommit';
import { StepDetails } from './steps/StepDetails';
import { StepProof } from './steps/StepProof';
import { ScreenLoading } from '../../components/common/lottie';
import { TiTick } from "react-icons/ti";
import { Completed } from '../extras/Completed';

export const Reporting = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer); 
  }, []);
  
  const steps = ["Customer Info", "Shipping Info", "Payment", "Step 4"];
  const [currentStep, setCurrentStep] = useState(1);
  const [complete, setComplete] = useState(false);

//   const [currentStep, setCurrentStep] = useState(0);
    const [formData, setFormData] = useState({});
    
    const nextStep = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
        }
    };

    const prevStep = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    const handleSubmit = () => {
        console.log(formData);
        setComplete(true);
        // Submit your formData
    };

    const StepComponent = steps[currentStep];
  return complete ? (
     <Completed />
    ) : (
    <>
    {loading && (
        <ScreenLoading />
    )}
    <main className="flex flex-col">
    <header className="fixed top-0 z-50 hidden w-full text-gray-100 transition-all duration-300 ease-in-out lg:block lg:w-1/3 body-font">
      <div className="container flex flex-row flex-wrap items-center p-5 mx-auto">
        <a className="flex-grow font-semibold text-2x1" href="/"><img src='./assets/logo.png' className='w-40 no-drag' alt='Police Connect' /></a>
      </div>
    </header>
    <div className="flex flex-row flex-grow">
        <div className="relative hidden lg:block lg:w-1/3">
        {/* Center the below iconoo from left and top */}
        <div id="iconoo" className={`absolute top-0 left-0 flex items-center justify-center w-3/5 h-full ${loading ? "hidden": ''}`}>
            <div className="flex flex-col items-center justify-center gap-10">
                <div className="flex flex-col gap-4">
                    {steps?.map((step, i) => (
                    <div key={i} className={`step-item ${currentStep === i + 1 && "active"} ${i + 1 < currentStep || complete ? "complete" : ""}`}>
                        <div className="step">
                            {i + 1 < currentStep || complete ? <TiTick size={24} /> : i + 1}
                        </div>
                        <p className="leading-tight text-white ">{step}</p>
                    </div>
                    ))}
                </div>
            </div>
        </div>
        <video className="object-cover w-full h-screen no-drag" autoPlay muted loop>
            <source src="/assets/police.mp4" type="video/mp4" /> {/* https://cdn.dribbble.com/uploads/48226/original/b8bd4e4273cceae2889d9d259b04f732.mp4?1689028949 */}
            Your browser does not support the video tag.
        </video>
        </div>
        <div className="flex items-center justify-center flex-grow p-6 lg:w-2/3 ">
            {currentStep === 0 ? (
                <StepProof formData={formData} setFormData={setFormData} />
            ) : (
                currentStep === 1 ? (
                    <StepDetails formData={formData} setFormData={setFormData} />
                ) : (
                    <StepCommit formData={formData} setFormData={setFormData} />
                )
            )}
        </div>
        {/* {!complete && (
            <div className='relative w-1/5'>
                <button className="absolute bottom-5 right-10 mb-10 focus:shadow-outline h-14 w-full rounded-3xl bg-[#0D0C22] px-4 py-2 font-sans font-bold text-white hover:bg-gray-800 focus:outline-none items-rigth justify-end" 
                onClick={() => { 
                    currentStep === steps.length ? setComplete(true) : setCurrentStep((prev) => prev + 1); 
                }}> {currentStep === steps.length ? "Finish" : "Next"} </button>
            </div>
        )} */}
        {!complete && (<div className="relative w-1/5">
            {currentStep > 0 && (
                <button onClick={prevStep} className="absolute bottom-5 left-10 mb-10 focus:shadow-outline h-14 w-full rounded-3xl bg-[#0D0C22] px-4 py-2 font-sans font-bold text-white hover:bg-gray-800 focus:outline-none items-left justify-start">Back</button>
            )}
            {currentStep < steps.length - 1 ? (
                <button onClick={nextStep} className="absolute bottom-5 right-10 mb-10 focus:shadow-outline h-14 w-full rounded-3xl bg-[#0D0C22] px-4 py-2 font-sans font-bold text-white hover:bg-gray-800 focus:outline-none items-right justify-end">Next</button>
            ) : (
                <button onClick={handleSubmit} className="absolute bottom-5 right-10 mb-10 focus:shadow-outline h-14 w-full rounded-3xl bg-[#0D0C22] px-4 py-2 font-sans font-bold text-white hover:bg-gray-800 focus:outline-none items-right justify-end">Submit</button>
            )}
        </div>)}
    </div>
  </main>
    </>
    );
}
