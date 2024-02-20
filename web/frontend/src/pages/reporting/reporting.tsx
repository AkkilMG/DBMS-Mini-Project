import React, { useEffect, useState } from 'react';
import { StepTwo } from './steps/StepTwo';
import { StepOne } from './steps/StepOne';
import { StepThree } from './steps/StepThree';
import { ScreenLoading } from '../../components/common/lottie';
import { TiTick } from "react-icons/ti";
import { Completed } from './steps/Completed';

export const Reporting = () => {
    const [loading, setLoading] = useState(true);
    const [complete, setComplete] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);
    const [formData, setFormData] = useState({});
    const steps = ["Basic Info on Incident", "Details on Incident", "Evidence of the Incident"];
    useEffect(() => {
        const timer = setTimeout(() => {
        setLoading(false);
        }, 2000);

        return () => clearTimeout(timer); 
    }, []);
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
    console.log(currentStep)
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
        <div className="relative hidden lg:block lg:w-1/4">
            <div id="iconoo" className={`absolute top-0 left-0 flex items-center justify-center w-4/5 h-full ${loading ? "hidden": ''}`}>
                <div className="flex flex-col items-center justify-center gap-10">
                    <div className="flex flex-col gap-4">
                        {steps?.map((step, i) => (
                        <div key={i} className={`step-item ${currentStep === i && "active"} ${i < currentStep || complete ? "complete" : ""}`}>
                            <div className="step">
                                {i < currentStep || complete ? <TiTick size={24} /> : i + 1}
                            </div>
                            <p className="leading-tight text-white font-sans font-semibold">{step}</p>
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
        <div className='flex flex-auto'>
            {!complete && (
                <div className="relative w-1/5 flex justify-between px-10 mb-10">
                    {currentStep > 0 && (
                        <button onClick={prevStep} className="absolute bottom-5 focus:shadow-outline h-14 w-full max-w-[calc(50%-0.5rem)] rounded-3xl bg-[#0D0C22] px-4 py-2 font-sans font-bold text-white hover:bg-gray-800 focus:outline-none">Back</button>
                    )}
                </div>
            )}
            <div className="flex items-center justify-center flex-grow p-4 lg:w-2/3 ">
                {currentStep === 0 ? (
                    <StepOne formData={formData} setFormData={setFormData} />
                ) : (
                    currentStep === 1 ? (
                        <StepTwo formData={formData} setFormData={setFormData} />
                    ) : (
                        <StepThree formData={formData} setFormData={setFormData} />
                    )
                )}
            </div>
            {!complete && (
                <div className="relative w-1/5 flex justify-between px-10 mb-10">
                    {currentStep < steps.length - 1 ? (
                        <button onClick={nextStep} className="absolute bottom-5 focus:shadow-outline h-14 w-full max-w-[calc(50%-0.5rem)] rounded-3xl bg-[#0D0C22] px-4 py-2 font-sans font-bold text-white hover:bg-gray-800 focus:outline-none">Next</button>
                    ) : (
                        <button type='submit' onClick={handleSubmit} className="absolute bottom-5 focus:shadow-outline h-14 w-full max-w-[calc(50%-0.5rem)] rounded-3xl bg-[#0D0C22] px-4 py-2 font-sans font-bold text-white hover:bg-gray-800 focus:outline-none">Submit</button>
                    )}
                </div>
            )}
        </div>
    </div>
  </main>
    </>
    );
}
