/**
 * @author: @AkkilMG
 * @description: DBMS Project - Police Connect
 */

import React from 'react';
import MapComponent from '../../../components/inputs/mapping';
import axios from 'axios';

export const StepTwo: React.FC<Props>  = ({formData, setFormData}) => {
    const handleUpload = async (e: any) => {
        // const formDataToSend = new FormData();
        // formDataToSend.append('file', e.target.files[0]);
        try {
            // const response = await axios.post(
            //     "https://cors-anywhere.herokuapp.com/https://picdb.izaries.workers.dev/upload",
            //     formDataToSend,
            //     {
            //         headers: {
            //             'X-File-Type': e.target.files[0].type.split('/')[1],
            //             'Access-Control-Allow-Origin': '*',
            //             'Content-Type': 'multipart/form-data' // Set content type to multipart/form-data for file upload
            //         }
            //     }
            // );
            const formData = new FormData();
            formData.append('file', e.target.files[0], e.target.files[0].name);
            const config = {
                headers: {
                // accept: 'application/json',
                'Content-Type': 'multipart/form-data',
                }
            };
            var response = await axios.post('https://picdb-api.onrender.com/api/v1/upload', formData, config)
            if (response.status === 200 && response.data.success && response.data.durl) {
                setFormData({...formData, EvidenceDocs: response.data.durl});
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }
    const handleTextareaChange = (e: any) => {
        setFormData({
            ...formData,
            EvidenceDesc: e.target.value
        });
    };
    const handleAnonymity = (e: any) => {
        setFormData({...formData, Anonymity: e.target.checked})
    }

    return (
        <div className="w-full max-w-md">
            <h2 className="flex flex-row mb-6 text-2xl font-bold">Evidence related to case</h2>
            <div>
                <div className="flex items-center mb-6">
                    <input value={formData.Anonymity} onChange={handleAnonymity}  
                    required id="agreement" type="checkbox" className="w-6 h-6 bg-gray-100 border-gray-300 rounded" />
                    <label className="block mt-0 ml-2 font-sans font-bold text-gray-900 text-sl">
                        You want to be anonymous?
                    </label>
                </div>
                <div className="mb-4">
                    <label className="block mb-2 font-bold text-gray-700 text-sl"> May I have the evidence of the incident? </label>
                    <input required onChange={handleUpload} className="w-full px-3 py-2 leading-tight text-gray-700 border rounded-lg shadow appearance-none h-14 focus:border-indigo-500 focus:shadow-lg focus:outline-none focus:ring-2" id="EvidenceDocs" type="file" />
                </div>
                <div className="mb-4">
                    <label className="block mb-2 font-bold text-gray-700 text-sl"> May I know a detailed description of the incident/crime? </label>
                    <textarea value={formData.EvidenceDesc} onChange={handleTextareaChange} className="w-full px-3 py-2 leading-tight text-gray-700 border rounded-lg shadow appearance-none h-28 focus:border-indigo-500 focus:shadow-lg focus:outline-none focus:ring-2" id="EvidenceDesc" />
                </div>
                <div className="mb-6">
                    <span className="flex items-center justify-between mb-2 font-sans font-bold text-gray-700 text-sl">
                    Location of spot
                    </span>
                    <div className="w-full px-3 py-2 mb-3 leading-tight shadow appearance-none focus:border-indifo-500 h-14 focus:outline-none focus:ring">
                        <MapComponent formData={formData} setFormData={setFormData} />;
                    </div>
                </div>
            </div>
        </div>
    );
};


interface Props {
    formData: any;
    setFormData: React.Dispatch<React.SetStateAction<any>>;
}
