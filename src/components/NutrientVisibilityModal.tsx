import React, { useState } from 'react';
import { ANALYSIS_RESULTS_AR } from '../constants';

interface NutrientVisibilityModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (newVisibility: Record<string, boolean>) => void;
  currentVisibility: Record<string, boolean>;
}

// Group nutrients for a structured view in the modal
const MODAL_NUTRIENT_GROUPS: Record<string, string[]> = {
  'ملخص التكلفة والأداء': ['totalCostPerTon', 'totalCostPer100kg', 'nutrients.ME_kcal_per_kg', 'nutrients.CP_pct', 'nutrients.MECP_Ratio'],
  'المعادن والشوارد': ['nutrients.Ca_pct', 'nutrients.avP_pct', 'nutrients.Na_pct', 'nutrients.K_pct', 'nutrients.Cl_pct', 'nutrients.Ash_pct', 'nutrients.CaAvP_Ratio', 'nutrients.K_Cl_Na_Ratio', 'nutrients.dEB'],
  'الأحماض الأمينية': ['nutrients.Lys_pct', 'nutrients.TSAA_pct', 'nutrients.Thr_pct', 'nutrients.Val_pct', 'nutrients.Ile_pct', 'nutrients.Leu_pct', 'nutrients.Arg_pct', 'nutrients.Try_pct'],
  'مكونات أخرى': ['nutrients.Choline_mg_per_kg', 'nutrients.Starch_pct', 'nutrients.CF_pct'],
};

const NutrientVisibilityModal: React.FC<NutrientVisibilityModalProps> = ({ isOpen, onClose, onSave, currentVisibility }) => {
  const [visibility, setVisibility] = useState(currentVisibility);

  if (!isOpen) return null;

  const handleToggle = (key: string) => {
    setVisibility(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSelectAll = (select: boolean) => {
    const newVisibility = { ...visibility };
    Object.keys(ANALYSIS_RESULTS_AR).forEach(key => {
      newVisibility[key] = select;
    });
    setVisibility(newVisibility);
  };
  
  const handleSave = () => {
      onSave(visibility);
      onClose();
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 no-print" onClick={onClose}>
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl p-6 m-4 max-h-[90vh] flex flex-col" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center border-b pb-3 mb-4">
          <h3 className="text-2xl font-bold text-gray-800">تخصيص عرض العناصر الغذائية</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-3xl">&times;</button>
        </div>
        
        <div className="flex-grow overflow-y-auto pr-2">
            <div className="flex justify-between items-center mb-4 sticky top-0 bg-white py-2 z-10">
                 <p className="text-sm text-gray-600">اختر العناصر التي تريد عرضها في التقرير.</p>
                 <div className="flex space-x-2 space-x-reverse">
                    <button onClick={() => handleSelectAll(true)} className="text-sm bg-blue-100 text-blue-700 font-semibold py-1 px-3 rounded-md hover:bg-blue-200">تحديد الكل</button>
                    <button onClick={() => handleSelectAll(false)} className="text-sm bg-gray-200 text-gray-700 font-semibold py-1 px-3 rounded-md hover:bg-gray-300">إلغاء الكل</button>
                 </div>
            </div>

            {Object.entries(MODAL_NUTRIENT_GROUPS).map(([groupName, keys]) => (
                <div key={groupName} className="mb-4">
                    <h4 className="font-bold text-teal-700 border-b border-teal-200 pb-1 mb-2">{groupName}</h4>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                        {keys.map(key => (
                           ANALYSIS_RESULTS_AR[key] && (
                             <label key={key} className="flex items-center space-x-2 space-x-reverse cursor-pointer p-1 rounded-md hover:bg-gray-100">
                                <input
                                    type="checkbox"
                                    checked={!!visibility[key]}
                                    onChange={() => handleToggle(key)}
                                    className="h-4 w-4 rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                                />
                                <span className="text-sm text-gray-800 select-none">{ANALYSIS_RESULTS_AR[key]}</span>
                            </label>
                           )
                        ))}
                    </div>
                </div>
            ))}
        </div>

        <div className="mt-6 pt-4 border-t flex justify-end space-x-3 space-x-reverse">
          <button onClick={onClose} className="bg-gray-200 text-gray-800 font-semibold py-2 px-4 rounded-md hover:bg-gray-300">
            إلغاء
          </button>
          <button onClick={handleSave} className="bg-teal-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-teal-700">
            حفظ التغييرات
          </button>
        </div>
      </div>
    </div>
  );
};
export default NutrientVisibilityModal;