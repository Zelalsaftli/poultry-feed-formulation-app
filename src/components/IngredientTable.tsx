import React, { useState, useEffect, useMemo, useRef } from 'react';
import type { Ingredient, InclusionMode } from '../types';
import { COLUMN_HEADERS_AR } from '../constants';
import ConfirmationModal from './ConfirmationModal';

interface IngredientTableProps {
  ingredients: Ingredient[];
  onUpdateIngredient: (index: number, field: keyof Ingredient, value: string | number) => void;
  onDeleteIngredient: (id: number) => void;
  inclusionMode: InclusionMode;
  totalInclusion: number;
}

const IngredientRow: React.FC<{
    ingredient: Ingredient;
    index: number;
    onUpdateIngredient: (index: number, field: keyof Ingredient, value: string | number) => void;
    onRequestDelete: (ingredient: Ingredient) => void;
    inclusionMode: InclusionMode;
    totalInclusion: number;
}> = ({ ingredient, index, onUpdateIngredient, onRequestDelete, inclusionMode, totalInclusion }) => {
    
    const initialDisplayValue = useMemo(() => {
        const value = inclusionMode === 'percent' 
            ? ingredient.Inclusion_pct 
            : ingredient.Inclusion_pct * 10;
        return String(value.toFixed(3).replace(/\.?0+$/, ""));
    }, [ingredient.Inclusion_pct, inclusionMode]);

    const [inputValue, setInputValue] = useState(initialDisplayValue);
    const inputRef = useRef<HTMLInputElement>(null);

    // Sync from props if not focused to avoid interrupting user input
    useEffect(() => {
        if (document.activeElement !== inputRef.current) {
             setInputValue(initialDisplayValue);
        }
    }, [initialDisplayValue]);

    const error = useMemo(() => {
        if (inputValue.trim() === '' || inputValue === '-') return null;

        const numericValue = Number(inputValue);

        if (isNaN(numericValue)) {
            return "قيمة غير صالحة";
        }

        const max = inclusionMode === 'percent' ? 100 : 1000;

        if (numericValue < 0) {
            return "القيمة لا يمكن أن تكون سالبة";
        }
        if (numericValue > max) {
            return `الحد الأقصى للمكون ${max}`;
        }

        const newPercentValue = inclusionMode === 'kg_per_ton' ? numericValue / 10 : numericValue;
        const otherIngredientsTotalPct = totalInclusion - ingredient.Inclusion_pct;
        const newTotalPct = otherIngredientsTotalPct + newPercentValue;

        if (newTotalPct > 100.001) { // Floating point tolerance
            return `المجموع يتجاوز 100% (سيصل إلى ${newTotalPct.toFixed(2)}%)`;
        }
        
        return null;
    }, [inputValue, inclusionMode, ingredient.Inclusion_pct, totalInclusion]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const handleInputBlur = () => {
        let numericValue = parseFloat(inputValue);
        const max = inclusionMode === 'percent' ? 100 : 1000;

        // Sanitize the value on blur
        if (isNaN(numericValue) || numericValue < 0) {
            numericValue = 0;
        } else if (numericValue > max) {
            numericValue = max;
        }

        const percentValue = inclusionMode === 'kg_per_ton' 
            ? numericValue / 10 
            : numericValue;

        onUpdateIngredient(index, 'Inclusion_pct', percentValue);
    };


    return (
        <tr className="hover:bg-gray-50">
            <td
                className="px-6 py-4 whitespace-nowrap text-right font-medium text-gray-800"
            >
                <div className="flex items-center">
                    {ingredient.description && (
                        // FIX: Replaced the 'title' attribute with a nested <title> element to comply with SVGProps type definitions.
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                            <title>{ingredient.description}</title>
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                        </svg>
                    )}
                    <span>{ingredient.Name}</span>
                </div>
            </td>
            <td className="px-2 py-2 whitespace-nowrap w-48 align-top">
                <div className="relative">
                    <input
                        ref={inputRef}
                        type="text"
                        inputMode="decimal"
                        value={inputValue}
                        onChange={handleInputChange}
                        onBlur={handleInputBlur}
                        className={`w-full p-2 border rounded-md shadow-sm transition-colors text-center ${
                            error 
                            ? 'border-red-500 bg-red-50 focus:ring-red-500 focus:border-red-500' 
                            : 'border-gray-300 focus:ring-teal-500 focus:border-teal-500'
                        }`}
                        aria-invalid={!!error}
                        aria-describedby={error ? `error-${ingredient.id}` : undefined}
                    />
                     {error && (
                        <p id={`error-${ingredient.id}`} className="text-xs text-red-600 mt-1" role="alert">
                            {error}
                        </p>
                    )}
                </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium w-24">
                  <button
                      onClick={() => onRequestDelete(ingredient)}
                      className="text-red-600 hover:text-red-900"
                      title="حذف المكون"
                  >
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v6a1 1 0 11-2 0V8z" clipRule="evenodd" />
                    </svg>
                  </button>
              </td>
        </tr>
    );
};


const IngredientTable: React.FC<IngredientTableProps> = ({ ingredients, onUpdateIngredient, onDeleteIngredient, inclusionMode, totalInclusion }) => {
  const [deletionCandidate, setDeletionCandidate] = useState<Ingredient | null>(null);

  const displayedData = useMemo(() => {
    return ingredients.map((ing, index) => ({ ingredient: ing, originalIndex: index }));
  }, [ingredients]);
  
  const inclusionHeader = inclusionMode === 'percent' ? COLUMN_HEADERS_AR['Inclusion_pct'] : 'الإدراج (كغ/طن)';

  const handleRequestDelete = (ingredient: Ingredient) => {
    setDeletionCandidate(ingredient);
  };

  const handleConfirmDelete = () => {
    if (deletionCandidate) {
      onDeleteIngredient(deletionCandidate.id);
      setDeletionCandidate(null);
    }
  };

  const handleCancelDelete = () => {
    setDeletionCandidate(null);
  };

  return (
    <>
      <div className="overflow-x-auto border border-gray-200 rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap"
              >
                {COLUMN_HEADERS_AR['Name']}
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap"
              >
                {inclusionHeader}
              </th>
              <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                الإجراء
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {displayedData.map(({ ingredient, originalIndex }) => (
              <IngredientRow 
                  key={ingredient.id} 
                  ingredient={ingredient}
                  index={originalIndex}
                  onUpdateIngredient={onUpdateIngredient}
                  onRequestDelete={handleRequestDelete}
                  inclusionMode={inclusionMode}
                  totalInclusion={totalInclusion}
              />
            ))}
          </tbody>
        </table>
      </div>
      {deletionCandidate && (
        <ConfirmationModal
          isOpen={!!deletionCandidate}
          title="تأكيد حذف المكون"
          message={`هل أنت متأكد أنك تريد حذف المكون "${deletionCandidate.Name}"؟`}
          onConfirm={handleConfirmDelete}
          onClose={handleCancelDelete}
        />
      )}
    </>
  );
};

export default IngredientTable;