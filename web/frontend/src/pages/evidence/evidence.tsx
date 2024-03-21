/**
 * @author: @AkkilMG
 * @description: DBMS Project - Police Connect
 */

import React, { useEffect, useState } from 'react';
import { StepTwo } from './steps/StepTwo';
import { StepOne } from './steps/StepOne';
import { ScreenLoading } from '../../components/common/lottie';
import { TiTick } from "react-icons/ti";
import { Completed } from './steps/Completed';
import axios, { AxiosResponse, AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';

export const Evidence = () => {
    const [loading, setLoading] = useState(true);
    const [complete, setComplete] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);
    const [error, setError] = useState<any>('');
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const [formData, setFormData] = useState<any>({
        CaseID: '',
        CaseDesc: '',
        EvidenceDesc: '',
        EvidenceDocs: '',
        EvidenceLoc: undefined,
        Anonymity: false
    });
    const steps = ["Details on Case", "Evidence related to case"];
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
    const handleSubmit = async () => {
        console.log(formData);
        try {
            setFormData({...formData, EvidenceLoc: formData.location.toString()})
        } catch (e) {}
        try {
            if (formData.CaseID === '' || formData.CaseDesc === '' || formData.EvidenceDesc === '' || formData.EvidenceDocs === '') {
              setError('Please fill in all fields.');
            } else {
              const response = await axios.post(
                'http://localhost:7000/api/police/evidence', formData, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                }
              );
              console.log(response);
              if (response.status === 200 && response.data.success) {
                setComplete(true);
              } else if (response.status === 200 && !response.data.success) {
                setError(response.data.message);
              } else {
                setError("Unable to contact the server.")
              }
            }
        } catch (error) {
            setError("Unable to contact the server.")
        }
    };
    useEffect(() => {
        if (complete) {
           setTimeout(() => {
                navigate("/")
            }, 5000);
        }
    })
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
                            <p className="font-sans font-semibold leading-tight text-white">{step}</p>
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
                <div className="relative flex justify-between w-1/5 px-10 mb-10">
                    {currentStep > 0 && (
                        <button onClick={prevStep} className="absolute bottom-5 focus:shadow-outline h-14 w-full max-w-[calc(50%-0.5rem)] rounded-3xl bg-[#0D0C22] px-4 py-2 font-sans font-bold text-white hover:bg-gray-800 focus:outline-none">Back</button>
                    )}
                </div>
            )}
            <div className="flex items-center justify-center flex-grow p-4 lg:w-2/3 ">
                <>
                {currentStep === 0 ? (
                    <StepOne formData={formData} setFormData={setFormData} />
                ) : (
                    <StepTwo formData={formData} setFormData={setFormData} />
                )}
                {error && (
                <div className="items-center mb-6">
                    <label className="block mt-0 ml-2 font-sans font-bold text-red-900 text-sl">
                        {error}
                    </label>
                </div>
                )}
                </>
            </div>
            
            {!complete && (
                <div className="relative flex justify-between w-1/5 px-10 mb-10">
                    {currentStep < steps.length - 1 ? (
                        <button onClick={nextStep} className="absolute bottom-5 focus:shadow-outline h-14 w-full max-w-[calc(50%-0.5rem)] rounded-3xl bg-[#0D0C22] px-4 py-2 font-sans font-bold text-white hover:bg-gray-800 focus:outline-none">Next</button>
                    ) : (
                        <button onClick={handleSubmit} className="absolute bottom-5 focus:shadow-outline h-14 w-full max-w-[calc(50%-0.5rem)] rounded-3xl bg-[#0D0C22] px-4 py-2 font-sans font-bold text-white hover:bg-gray-800 focus:outline-none">Submit</button>
                    )}
                </div>
            )}
        </div>
    </div>
  </main>
    </>
    );
}
