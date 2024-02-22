/**
 * @author: @AkkilMG
 * @description: DBMS Project - Police Connect
 */

import React from 'react';
import { Dropdown } from "../../../components/inputs/dropdown";

export const StepOne: React.FC<Props>  = ({formData, setFormData}) => {
    var crimeType = ["Robbery", "Homicide", "Assault", "Domestic Violence", "Kidnapping", "Child Labour", "Harassment", "Murder", "Assault", "Stalking", "Riot", "Fraud", "Cyber Crime", "Other"];
    return (
        <div className="w-full max-w-md">
            <h2 className="flex flex-row mb-6 text-2xl font-bold">Basic information for reporting</h2>
            <form>
                <div className="mb-6">
                    <span className="flex items-center justify-between mb-2 font-sans font-bold text-gray-700 text-sl">
                    What type of incident/crime was it?
                    </span>
                    <Dropdown options={crimeType} value={formData.CrimeType} onSelect={(e) => setFormData({...formData, CrimeType: e})} />
                    {formData.CrimeType==="Other" && (
                        <>
                            <span className="flex items-center justify-between mb-2 font-sans font-bold text-gray-700 text-sl">
                            can you specify what type of incident/crime was it?
                            </span>
                            <input required value={formData.firstName} onChange={(e) => setFormData({...formData, CrimeType: e.target.value})} className="w-full px-3 py-2 leading-tight text-gray-700 border rounded-lg shadow appearance-none h-14 focus:border-indigo-500 focus:shadow-lg focus:outline-none focus:ring-2" id="CrimeType" type="text" />
                        </>
                    )}
                </div>
                <div className="mb-6">
                    <span className="flex items-center justify-between mb-2 font-sans font-bold text-gray-700 text-sl">
                    May I know the date of the incident?
                    </span>
                    <input required value={formData.DateIncident} onChange={(e) => setFormData({...formData, DateIncident: e.target.value})} className="w-full px-3 py-2 mb-3 leading-tight text-gray-700 border rounded-lg shadow appearance-none focus:border-indifo-500 h-14 focus:outline-none focus:ring" id="DateIncident" type="date" />
                </div>
            </form>
        </div>
    );
};

interface Props {
    formData: any;
    setFormData: React.Dispatch<React.SetStateAction<any>>;
}
