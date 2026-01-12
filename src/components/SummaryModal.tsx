
import React from 'react';
import type { MixAnalysisResult, GrowthPhase } from '../types';
import { ROSS_308_RECOMMENDATIONS } from '../constants';

interface SummaryModalProps {
  results: MixAnalysisResult;
  growthPhase: GrowthPhase;
  onClose: () => void;
  onPrint: () => void;
  onSave: () => void;
}

const SummaryItem: React.FC<{ label: string; value: string; status?: 'good' | 'warn' | 'bad' }> = ({ label, value, status }) => {
  const statusClasses = {
    good: 'text-green-600',
    warn: 'text-yellow-600',
    bad: 'text-red-600',
  };
  return (
    <div className={`flex justify-between items-center py-2 px-3 rounded-md ${status ? 'bg-gray-100' : ''}`}>
      <span className="text-gray-600 font-medium">{label}:</span>
      <span className={`font-bold ${status ? statusClasses[status] : 'text-gray-800'}`}>{value}</span>
    </div>
  );
};

const getStatus = (value: number, min: number, max: number): 'good' | 'bad' => {
  return value >= min && value <= max ? 'good' : 'bad';
}

const SummaryModal: React.FC<SummaryModalProps> = ({ results, growthPhase, onClose, onPrint, onSave }) => {
  const recs = ROSS_308_RECOMMENDATIONS[growthPhase];

  const getNutrient = (key: string) => results.nutrients[key] || 0;
  
  const cholineStatus = getStatus(getNutrient('Choline_mg_per_kg'), recs['nutrients.Choline_mg_per_kg'].min, recs['nutrients.Choline_mg_per_kg'].max);
  
  const outOfSpecNutrients = Object.keys(recs).filter(key => {
    const value = key.includes('.') ? results.nutrients[key.split('.')[1]] : results[key];
    if (typeof value !== 'number') return false;
    const { min, max } = recs[key];
    return value < min || value > max;
  }).map(key => key.split('.').pop() || key);


  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 no-print" onClick={onClose}>
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl p-6 m-4" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center border-b pb-3">
          <h3 className="text-2xl font-bold text-gray-800">ملخص نتائج الخلطة</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">&times;</button>
        </div>
        <div className="mt-4 space-y-4">
          <h4 className="font-semibold text-lg text-teal-700">النقاط الحرجة:</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-base">
            <SummaryItem label="التكلفة الإجمالية" value={`$${results.totalCostPerTon.toFixed(2)} / طن`} />
            <SummaryItem 
                label="حالة الكولين" 
                value={cholineStatus === 'good' ? 'جيد' : 'نقص'} 
                status={cholineStatus} />
          </div>
          {outOfSpecNutrients.length > 0 && (
             <div>
                <h4 className="font-semibold text-yellow-700 mt-4">عناصر غذائية خارج المواصفات:</h4>
                <p className="text-sm text-gray-600">{outOfSpecNutrients.join(', ')}</p>
             </div>
          )}
        </div>
        <div className="mt-6 pt-4 border-t flex justify-end space-x-3 space-x-reverse">
          <button onClick={onClose} className="bg-gray-200 text-gray-800 font-semibold py-2 px-4 rounded-md hover:bg-gray-300">
            إغلاق
          </button>
          <button onClick={onSave} className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700">
            حفظ الوصفة
          </button>
          <button onClick={onPrint} className="bg-teal-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-teal-700">
            طباعة التقرير
          </button>
        </div>
      </div>
    </div>
  );
};

export default SummaryModal;
