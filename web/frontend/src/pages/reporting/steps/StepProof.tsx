import React from 'react';

export const StepProof: React.FC<StepOneProps>  = ({formData, setFormData}) => {
    return (
    <div className="w-full max-w-md">
        <h2 className="flex flex-row mb-6 text-2xl font-bold">Sign in to <span> </span><img src='./assets/logo-dark.png' className='w-40 no-drag' alt='Police Connect' /></h2>
        <form>
            <div className="mb-4">
                <label className="block mb-2 font-bold text-gray-700 text-sl"> Email </label>
                <input value={formData.firstName} onChange={(e) => setFormData({...formData, firstName: e.target.value})} className="w-full px-3 py-2 leading-tight text-gray-700 border rounded-lg shadow appearance-none h-14 focus:border-indigo-500 focus:shadow-lg focus:outline-none focus:ring-2" id="email" type="email" />
            </div>
            <div className="mb-6">
                <span className="flex items-center justify-between mb-2 font-sans font-bold text-gray-700 text-sl">
                Password
                <a href="#" className="font-sans text-sm font-normal text-gray-600 underline cursor-pointer">Forgot?</a>
                </span>
                <input value={formData.firstName} onChange={(e) => setFormData({...formData, firstName: e.target.value})} className="w-full px-3 py-2 mb-3 leading-tight text-gray-700 border rounded-lg shadow appearance-none focus:border-indifo-500 h-14 focus:outline-none focus:ring" id="password" type="password" />
            </div>
            {/* <div>
                <button type="submit" className="focus:shadow-outline h-14 w-full rounded-3xl bg-[#0D0C22] px-4 py-2 font-sans font-bold text-white hover:bg-gray-800 focus:outline-none">Sign In</button>
            </div> */}
        </form>
    </div>
    );
};

interface StepOneProps {
    formData: any;
    setFormData: React.Dispatch<React.SetStateAction<any>>;
}
