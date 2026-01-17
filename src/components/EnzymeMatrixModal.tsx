
import React, { useState, useEffect } from 'react';
import type { Enzyme, Ingredient } from '../types';
import { COLUMN_HEADERS_AR } from '../constants';

interface EnzymeMatrixModalProps {
  enzyme: Enzyme;
  onSave: (updatedEnzyme: Enzyme) => void;
  onClose: () => void;
}

type MatrixState = Partial<Record<keyof Omit<Ingredient, 'id' | 'Name' | 'Inclusion_pct' | 'Price_USD_per_ton' | 'description'>, number | string>>;

const EnzymeMatrixModal: React.FC<EnzymeMatrixModalProps> = ({ enzyme, onSave, onClose }) => {
  const [editedName, setEditedName] = useState(enzyme.name);
  const [standardDosage, setStandardDosage] = useState(String(enzyme.standard_dosage_g_per_ton));
  const [price, setPrice] = useState(String(enzyme.Price_USD_per_ton || 0));
  const [matrixState, setMatrixState] = useState<MatrixState>(enzyme.matrix);

  useEffect(() => {
    setEditedName(enzyme.name);
    setStandardDosage(String(enzyme.standard_dosage_g_per_ton));
    setPrice(String(enzyme.Price_USD_per_ton || 0));
    setMatrixState(enzyme.matrix);
  }, [enzyme]);

  const handleChange = (field: keyof MatrixState, value: string) => {
    // Keep the raw string value to allow typing decimals correctly.
    setMatrixState(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    const cleanedMatrix = Object.entries(matrixState).reduce((acc, [key, value]) => {
      // Use parseFloat to correctly handle decimal strings and ignore trailing non-numeric characters.
      const numericValue = parseFloat(String(value));
      if (value !== '' && value !== null && value !== undefined && !isNaN(numericValue)) {
        acc[key as keyof Enzyme['matrix']] = numericValue;
      }
      return acc;
    }, {} as Enzyme['matrix']);

    let numericStandardDosage = parseFloat(standardDosage);
    if(isNaN(numericStandardDosage) || numericStandardDosage <= 0) {
        numericStandardDosage = 100; // Fallback to a safe default
    }

    let numericPrice = parseFloat(price);
    if (isNaN(numericPrice)) {
        numericPrice = 0;
    }

    onSave({ 
        ...enzyme, 
        name: editedName, 
        standard_dosage_g_per_ton: numericStandardDosage,
        Price_USD_per_ton: numericPrice,
        matrix: cleanedMatrix 
    });
  };
  
  const nutrientFields = Object.keys(COLUMN_HEADERS_AR).filter(
      key => !['id', 'Name', 'Inclusion_pct', 'Price_USD_per_ton', 'description', 'category'].includes(key)
  ) as (keyof MatrixState)[];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 no-print" onClick={onClose}>
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl p-6 m-4 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center border-b pb-3 mb-4">
          <h3 className="text-2xl font-bold text-gray-800">تعديل الأنزيم: {enzyme.name}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-3xl">&times;</button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-4 mb-4">
            <div>
                <label className="block text-sm font-medium text-gray-700">اسم الأنزيم</label>
                <input
                    type="text"
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
                />
            </div>
             <div>
                 <label className="block text-sm font-medium text-gray-700">الجرعة القياسية (جم/طن)</label>
                 <input
                    type="text"
                    inputMode="decimal"
                    value={standardDosage}
                    onChange={(e) => setStandardDosage(e.target.value)}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
                />
            </div>
            <div>
                 <label className="block text-sm font-medium text-gray-700">السعر (دولار/طن)</label>
                 <input
                    type="text"
                    inputMode="decimal"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
                />
            </div>
        </div>

        <div className="border-t my-4"></div>
        
        <p className="text-sm text-gray-600 mb-4 bg-gray-100 p-3 rounded-md">
          <b>تعليمات:</b> أدخل قيم العناصر الغذائية التي يضيفها الأنزيم عند استخدام <b>الجرعة القياسية</b> المحددة أعلاه. سيقوم التطبيق بحساب الإضافة الفعلية بناءً على الجرعة التي تحددها في شاشة الإدخال الرئيسية.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4">
            {nutrientFields.map(field => {
                 const value = matrixState[field];
                 const hasValue = value !== undefined && value !== '' && parseFloat(String(value)) !== 0;
                 return (
                     <div key={field}>
                         <label className="block text-sm font-medium text-gray-700">{COLUMN_HEADERS_AR[field as keyof typeof COLUMN_HEADERS_AR]}</label>
                         <input
                            type="text"
                            inputMode="decimal"
                            value={value ?? ''}
                            onChange={(e) => handleChange(field, e.target.value)}
                            placeholder="0.00"
                            className={`mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 transition-colors ${
                                hasValue ? 'bg-teal-50 border-teal-400' : 'border-gray-300'
                            }`}
                        />
                     </div>
                 );
            })}
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

export default EnzymeMatrixModal;