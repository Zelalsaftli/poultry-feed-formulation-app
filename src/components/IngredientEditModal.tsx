
import React, { useState, useEffect } from 'react';
import type { Ingredient, IngredientCategory } from '../types';
import { COLUMN_HEADERS_AR, CATEGORY_NAMES_AR } from '../constants';

interface IngredientEditModalProps {
  ingredient: Ingredient;
  onSave: (updatedIngredient: Ingredient) => void;
  onClose: () => void;
}

// Helper to create an object with all values as strings for the form state
const createStringifiedState = (ing: Ingredient) => {
    return Object.entries(ing).reduce((acc, [key, value]) => {
        acc[key as keyof Ingredient] = String(value);
        return acc;
    }, {} as Record<keyof Ingredient, string>);
};

const IngredientEditModal: React.FC<IngredientEditModalProps> = ({ ingredient, onSave, onClose }) => {
  const [formState, setFormState] = useState(createStringifiedState(ingredient));

  useEffect(() => {
    setFormState(createStringifiedState(ingredient));
  }, [ingredient]);

  const handleChange = (field: keyof Ingredient, value: string) => {
    setFormState(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    const parsedEntries = Object.entries(formState).map(([key, value]) => {
        if (key === 'Name' || key === 'description' || key === 'category') {
            return [key, value];
        }
        return [key, parseFloat(value as string) || 0];
    });
    const updatedIngredient = Object.fromEntries(parsedEntries) as unknown as Ingredient;
    onSave(updatedIngredient);
  };
  
  const numericFields = Object.keys(COLUMN_HEADERS_AR).filter(key => !['id', 'Name', 'description', 'category'].includes(key)) as (keyof Ingredient)[];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 no-print" onClick={onClose}>
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl p-6 m-4 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center border-b pb-3 mb-4">
          <h3 className="text-2xl font-bold text-gray-800">تحليل المادة: {ingredient.Name}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-3xl">&times;</button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-4 mb-4">
            <div>
                <label className="block text-sm font-medium text-gray-700">{COLUMN_HEADERS_AR['Name']}</label>
                <input
                    type="text"
                    value={formState.Name}
                    onChange={(e) => handleChange('Name', e.target.value)}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
                />
            </div>
            <div>
                 <label className="block text-sm font-medium text-gray-700">{COLUMN_HEADERS_AR['category']}</label>
                 <select
                    value={formState.category}
                    onChange={(e) => handleChange('category', e.target.value)}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 bg-white"
                 >
                    {Object.entries(CATEGORY_NAMES_AR).map(([key, value]) => (
                        <option key={key} value={key}>{value}</option>
                    ))}
                 </select>
            </div>
             <div>
                 <label className="block text-sm font-medium text-gray-700">{COLUMN_HEADERS_AR['Price_USD_per_ton']}</label>
                 <input
                    type="text"
                    inputMode="decimal"
                    value={formState.Price_USD_per_ton}
                    onChange={(e) => handleChange('Price_USD_per_ton', e.target.value)}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
                />
            </div>
        </div>
        
        <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">{COLUMN_HEADERS_AR['description']}</label>
            <textarea
                value={formState.description || ''}
                onChange={(e) => handleChange('description', e.target.value)}
                rows={3}
                placeholder="أضف ملاحظات أو وصفًا للمكون هنا..."
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
            />
        </div>

        <div className="border-t my-4"></div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4">
            {numericFields.filter(f => f !== 'Price_USD_per_ton').map(field => (
                 <div key={field}>
                     <label className="block text-sm font-medium text-gray-700">{COLUMN_HEADERS_AR[field]}</label>
                     <input
                        type="text"
                        inputMode="decimal"
                        value={formState[field]}
                        onChange={(e) => handleChange(field, e.target.value)}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
                    />
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

export default IngredientEditModal;
