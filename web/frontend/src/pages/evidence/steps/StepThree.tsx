/**
 * @author: @AkkilMG
 * @description: DBMS Project - Police Connect
 */

import React from 'react';
import { Dropdown } from "../../../components/inputs/dropdown";

export const StepThree: React.FC<Props>  = ({formData, setFormData}) => {
    var anonymous = ["Yes", "No"];
    return (
    <div className="w-full max-w-md">
        <h2 className="flex flex-row mb-6 text-2xl font-bold">Evidence of the incident for reporting</h2>
        <form>
            <div className="mb-4">
                <label className="block mb-2 font-bold text-gray-700 text-sl"> May I have the evidence of the incident? </label>
                <input required value={formData.EvidenceDocs} onChange={(e) => setFormData({...formData, EvidenceDocs: e.target.value})} className="w-full px-3 py-2 leading-tight text-gray-700 border rounded-lg shadow appearance-none h-14 focus:border-indigo-500 focus:shadow-lg focus:outline-none focus:ring-2" id="EvidenceDocs" type="file" />
            </div>
            <div className="mb-4">
                <label className="block mb-2 font-bold text-gray-700 text-sl"> May I know if you have an suspecious incident? </label>
                <input required value={formData.SuspeciousDocs} onChange={(e) => setFormData({...formData, SuspeciousDocs: e.target.value})} className="w-full px-3 py-2 leading-tight text-gray-700 border rounded-lg shadow appearance-none h-14 focus:border-indigo-500 focus:shadow-lg focus:outline-none focus:ring-2" id="SuspeciousDocs" type="file" />
            </div>
            <div className="mb-4">
                <label className="block mb-2 font-bold text-gray-700 text-sl"> May I know if you have an suspecious incident? </label>
                <input required value={formData.SuspeciousDesc} onChange={(e) => setFormData({...formData, SuspeciousDesc: e.target.value})} className="w-full px-3 py-2 leading-tight text-gray-700 border rounded-lg shadow appearance-none h-14 focus:border-indigo-500 focus:shadow-lg focus:outline-none focus:ring-2" id="SuspeciousDesc" type="text" />
            </div>
            <div className="mb-6">
                <span className="flex items-center justify-between mb-2 font-sans font-bold text-gray-700 text-sl">
                Do you want to keep your identity anonymous?
                </span>
                <Dropdown options={anonymous} value={formData.Anonymous} onSelect={(e) => setFormData({...formData, Anonymous: anonymous.indexOf(e)})} />
            </div>
            <div className="flex items-center mb-6">
                <input id="agreement" type="checkbox" className="w-6 h-6 bg-gray-100 border-gray-300 rounded" />
                <label className="block mt-0 ml-2 text-sm text-gray-900">
                    I agree with all terms of Police Connect.
                </label>
            </div>
            {/* <div>
                <button type="submit" className="focus:shadow-outline h-14 w-full rounded-3xl bg-[#0D0C22] px-4 py-2 font-sans font-bold text-white hover:bg-gray-800 focus:outline-none">Sign In</button>
            </div> */}
        </form>
    </div>
    );
};

interface Props {
    formData: any;
    setFormData: React.Dispatch<React.SetStateAction<any>>;
}
