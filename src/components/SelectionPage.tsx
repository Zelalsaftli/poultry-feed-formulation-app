import React, { useState, useMemo, useRef } from 'react';
import type { Ingredient, IngredientCategory, Enzyme } from '../types';
import { CATEGORY_NAMES_AR } from '../constants';
import IngredientEditModal from './IngredientEditModal';
import EnzymeMatrixModal from './EnzymeMatrixModal';
import ConfirmationModal from './ConfirmationModal';
import { exportIngredientsToCSV, parseCSV } from '../services/csvService';


interface SelectionPageProps {
  masterIngredients: Ingredient[];
  recipeIngredients: Ingredient[];
  masterEnzymes: Enzyme[];
  recipeEnzymes: Enzyme[];
  onProceed: (selectedIngredientIds: number[], selectedEnzymeIds: string[]) => void;
  onAddMasterIngredient: (ingredient: Ingredient) => void;
  onUpdateMasterIngredient: (ingredient: Ingredient) => void;
  onResetMasterIngredients: () => void;
  onMergeMasterIngredients: (ingredients: Ingredient[]) => void;
  onUpdateMasterEnzyme: (enzyme: Enzyme) => void;
  onResetMasterEnzymes: () => void;
}

const SelectionPage: React.FC<SelectionPageProps> = ({ 
    masterIngredients, 
    recipeIngredients, 
    masterEnzymes,
    recipeEnzymes,
    onProceed, 
    onAddMasterIngredient,
    onUpdateMasterIngredient, 
    onResetMasterIngredients,
    onMergeMasterIngredients,
    onUpdateMasterEnzyme,
    onResetMasterEnzymes 
}) => {
  const [selectedIngredientIds, setSelectedIngredientIds] = useState<Set<number>>(() => 
    new Set(recipeIngredients.map(i => i.id))
  );
  const [selectedEnzymeIds, setSelectedEnzymeIds] = useState<Set<string>>(() =>
    new Set(recipeEnzymes.map(e => e.id))
  );
  const [editingIngredient, setEditingIngredient] = useState<Ingredient | null>(null);
  const [editingEnzyme, setEditingEnzyme] = useState<Enzyme | null>(null);
  const [activeFilter, setActiveFilter] = useState<IngredientCategory | 'all'>('all');
  const [confirmation, setConfirmation] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
  } | null>(null);
  
  const premixFileInputRef = useRef<HTMLInputElement>(null);

  const groupedIngredients = useMemo(() => {
    return masterIngredients.reduce((acc, ingredient) => {
      const category = ingredient.category || 'Other';
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(ingredient);
      return acc;
    }, {} as Record<IngredientCategory, Ingredient[]>);
  }, [masterIngredients]);

  const [expandedCategories, setExpandedCategories] = useState<Set<string | IngredientCategory>>(() => {
    const allCategories = Object.keys(groupedIngredients);
    allCategories.push('enzymes');
    return new Set(allCategories);
  });

  const displayedCategories = useMemo(() => {
    const all = Object.keys(groupedIngredients) as IngredientCategory[];
    if (activeFilter === 'all') {
      return all;
    }
    return all.filter(c => c === activeFilter);
  }, [activeFilter, groupedIngredients]);

  const handleFilterChange = (category: IngredientCategory | 'all') => {
    if (category === 'all') {
        setActiveFilter('all');
    } else {
        // Toggle the selected category filter
        setActiveFilter(prev => (prev === category ? 'all' : category));
    }
  };

  const toggleCategory = (category: string | IngredientCategory) => {
    setExpandedCategories(prev => {
        const newSet = new Set(prev);
        if (newSet.has(category)) {
            newSet.delete(category);
        } else {
            newSet.add(category);
        }
        return newSet;
    });
  };

  const handleToggleIngredient = (id: number) => {
    setSelectedIngredientIds(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const handleToggleEnzyme = (id: string) => {
    setSelectedEnzymeIds(prev => {
        const newSet = new Set(prev);
        if (newSet.has(id)) {
            newSet.delete(id);
        } else {
            newSet.add(id);
        }
        return newSet;
    });
  };

  const handleSelectCategory = (category: IngredientCategory, select: boolean) => {
    const categoryIds = groupedIngredients[category]?.map(ing => ing.id) || [];
    setSelectedIngredientIds(prev => {
      const newSet = new Set(prev);
      if (select) {
        categoryIds.forEach(id => newSet.add(id));
      } else {
        categoryIds.forEach(id => newSet.delete(id));
      }
      return newSet;
    });
  };

  const handleSelectAllEnzymes = (select: boolean) => {
      const allEnzymeIds = masterEnzymes.map(e => e.id);
      setSelectedEnzymeIds(prev => {
          const newSet = new Set(prev);
          if (select) {
              allEnzymeIds.forEach(id => newSet.add(id));
          } else {
              allEnzymeIds.forEach(id => newSet.delete(id));
          }
          return newSet;
      });
  };
  
  const handleAddNewIngredient = () => {
    const newIngredient: Ingredient = {
      id: Date.now(), // Temporary unique ID
      Name: 'مكون جديد',
      description: '',
      category: 'Other',
      Inclusion_pct: 0, CP_pct: 0, ME_kcal_per_kg: 0, Ca_pct: 0, avP_pct: 0, Na_pct: 0, K_pct: 0, Cl_pct: 0, Lys_pct: 0, TSAA_pct: 0, Thr_pct: 0, Val_pct: 0, Ile_pct: 0, Leu_pct: 0, Arg_pct: 0, Try_pct: 0, Starch_pct: 0, CF_pct: 0, NDF_pct: 0, ADF_pct: 0, Ash_pct: 0, Choline_mg_per_kg: 0, Price_USD_per_ton: 0,
    };
    setEditingIngredient(newIngredient);
  };

  const handleSaveIngredient = (updatedIngredient: Ingredient) => {
    const isExisting = masterIngredients.some(ing => ing.id === updatedIngredient.id);
    if (isExisting) {
      onUpdateMasterIngredient(updatedIngredient);
    } else {
      onAddMasterIngredient(updatedIngredient);
    }
    setEditingIngredient(null);
  };

  const handleSaveEnzyme = (updatedEnzyme: Enzyme) => {
      onUpdateMasterEnzyme(updatedEnzyme);
      setEditingEnzyme(null);
  };

  const handleRequestResetIngredients = () => {
    setConfirmation({
      isOpen: true,
      title: 'استعادة المكونات الافتراضية',
      message: 'هل أنت متأكد من أنك تريد استعادة قائمة المكونات الافتراضية؟ سيتم حذف جميع التعديلات المخصصة.',
      onConfirm: onResetMasterIngredients
    });
  };

  const handleRequestResetEnzymes = () => {
    setConfirmation({
      isOpen: true,
      title: 'استعادة الأنزيمات الافتراضية',
      message: 'هل أنت متأكد من أنك تريد استعادة قائمة الأنزيمات الافتراضية؟ سيتم حذف جميع التعديلات المخصصة.',
      onConfirm: onResetMasterEnzymes
    });
  };
  
  const PREMIX_CATEGORIES: IngredientCategory[] = ['Other', 'MineralSupplements', 'AminoAcids', 'Medicated'];

  const handleExportPremix = () => {
      const premixIngredients = masterIngredients.filter(ing => PREMIX_CATEGORIES.includes(ing.category));
      if (premixIngredients.length === 0) {
          alert('لا توجد مكونات بريمكس لتصديرها. البريمكسات هي المكونات من فئات: المكملات الأخرى، المكملات المعدنية، الأحماض الأمينية، والمكملات الدوائية.');
          return;
      }
      exportIngredientsToCSV(premixIngredients, 'premix_export.csv');
  };

  const handleImportPremixClick = () => {
      premixFileInputRef.current?.click();
  };

  const handlePremixFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (e) => {
          const text = e.target?.result as string;
          if (text) {
              const importedIngredients = parseCSV(text);
              if (importedIngredients.length > 0) {
                  if (window.confirm(`تم العثور على ${importedIngredients.length} مكون. سيؤدي هذا إلى تحديث المكونات الحالية وإضافة مكونات جديدة إلى القائمة الرئيسية. هل تريد المتابعة؟`)) {
                      onMergeMasterIngredients(importedIngredients);
                  }
              } else {
                  alert('لم يتم العثور على مكونات صالحة في الملف.');
              }
          }
      };
      reader.readAsText(file, 'UTF-8');
      if (event.target) {
          event.target.value = '';
      }
  };

  const closeConfirmation = () => {
    setConfirmation(null);
  };

  return (
    <>
      <input type="file" ref={premixFileInputRef} onChange={handlePremixFileChange} style={{ display: 'none' }} accept=".csv" />
      <div className="space-y-6">
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <div className="flex flex-wrap justify-between items-center mb-2 gap-4">
             <h2 className="text-2xl font-bold text-gray-700">اختيار مكونات الخلطة</h2>
             <div className="flex gap-2 flex-wrap">
                <button
                    onClick={handleAddNewIngredient}
                    className="bg-teal-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-teal-700 transition-colors text-sm"
                >
                    إضافة مكون جديد
                </button>
                <button
                    onClick={handleImportPremixClick}
                    className="bg-gray-200 text-gray-700 font-semibold py-2 px-4 rounded-md hover:bg-gray-300 transition-colors text-sm"
                >
                    استيراد بريمكس
                </button>
                 <button
                    onClick={handleExportPremix}
                    className="bg-gray-200 text-gray-700 font-semibold py-2 px-4 rounded-md hover:bg-gray-300 transition-colors text-sm"
                 >
                    تصدير بريمكس
                 </button>
                <button
                    onClick={handleRequestResetIngredients}
                    className="bg-gray-200 text-gray-700 font-semibold py-2 px-4 rounded-md hover:bg-gray-300 transition-colors text-sm"
                >
                    استعادة المكونات الافتراضية
                </button>
                 <button
                    onClick={handleRequestResetEnzymes}
                    className="bg-gray-200 text-gray-700 font-semibold py-2 px-4 rounded-md hover:bg-gray-300 transition-colors text-sm"
                 >
                    استعادة الأنزيمات الافتراضية
                 </button>
             </div>
          </div>
          <p className="text-gray-600 mb-6">حدد المكونات والأنزيمات التي ترغب في تضمينها في خلطتك. يمكنك تعديل التحليل الافتراضي لأي عنصر بالضغط على أيقونة القلم.</p>
          
          <div className="mb-6">
            <h4 className="text-md font-semibold text-gray-700 mb-3">تصفية حسب الفئة:</h4>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => handleFilterChange('all')}
                className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                  activeFilter === 'all'
                    ? 'bg-teal-600 text-white shadow'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                الكل
              </button>
              {(Object.keys(CATEGORY_NAMES_AR) as IngredientCategory[]).map(categoryKey => (
                <button
                  key={categoryKey}
                  onClick={() => handleFilterChange(categoryKey)}
                  className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                    activeFilter === categoryKey
                      ? 'bg-teal-600 text-white shadow'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {CATEGORY_NAMES_AR[categoryKey]}
                </button>
              ))}
            </div>
          </div>
          
          <div className="space-y-4">
            {displayedCategories.map(category => (
              <div key={category} className="border border-gray-200 rounded-lg overflow-hidden transition-all duration-300">
                <button
                  onClick={() => toggleCategory(category)}
                  className="w-full flex justify-between items-center p-4 bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-teal-500"
                  aria-expanded={expandedCategories.has(category)}
                  aria-controls={`category-content-${category}`}
                >
                  <h3 className="text-xl font-semibold text-teal-700">{CATEGORY_NAMES_AR[category]}</h3>
                  <div className="flex items-center">
                    <div className="flex space-x-2 space-x-reverse text-sm mr-4">
                       <span onClick={(e) => { e.stopPropagation(); handleSelectCategory(category, true); }} className="font-medium text-teal-600 hover:text-teal-800 cursor-pointer p-1">تحديد الكل</span>
                       <span onClick={(e) => { e.stopPropagation(); handleSelectCategory(category, false); }} className="font-medium text-gray-500 hover:text-gray-700 cursor-pointer p-1">إلغاء الكل</span>
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 text-gray-500 transform transition-transform ${expandedCategories.has(category) ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </button>
                {expandedCategories.has(category) && (
                  <div id={`category-content-${category}`} className="p-4 border-t border-gray-200">
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                      {groupedIngredients[category].map(ingredient => (
                        <label key={ingredient.id} className="flex items-center group cursor-pointer justify-between">
                          <div className="flex items-center" title={ingredient.description || ''}>
                            <input
                              type="checkbox"
                              checked={selectedIngredientIds.has(ingredient.id)}
                              onChange={() => handleToggleIngredient(ingredient.id)}
                              className="h-4 w-4 rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                            />
                            <span 
                              onClick={(e) => { e.stopPropagation(); setEditingIngredient(ingredient); }}
                              className="mr-3 text-sm font-medium text-gray-700 select-none hover:text-teal-600 hover:underline"
                            >
                              {ingredient.Name}
                            </span>
                            {ingredient.description && (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                </svg>
                            )}
                          </div>
                          <button 
                            onClick={(e) => { e.stopPropagation(); setEditingIngredient(ingredient); }}
                            className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-teal-600"
                            title={`تعديل ${ingredient.Name}`}
                          >
                             <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                               <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                               <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" />
                             </svg>
                          </button>
                        </label>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}

            {/* Enzyme Selection Section */}
            <div key="enzymes" className="border border-gray-200 rounded-lg overflow-hidden transition-all duration-300">
               <button
                  onClick={() => toggleCategory('enzymes')}
                  className="w-full flex justify-between items-center p-4 bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-teal-500"
                  aria-expanded={expandedCategories.has('enzymes')}
                  aria-controls="category-content-enzymes"
                >
                    <h3 className="text-xl font-semibold text-teal-700">المكملات الأنزيمية</h3>
                    <div className="flex items-center">
                        <div className="flex space-x-2 space-x-reverse text-sm mr-4">
                            <span onClick={(e) => { e.stopPropagation(); handleSelectAllEnzymes(true); }} className="font-medium text-teal-600 hover:text-teal-800 cursor-pointer p-1">تحديد الكل</span>
                            <span onClick={(e) => { e.stopPropagation(); handleSelectAllEnzymes(false); }} className="font-medium text-gray-500 hover:text-gray-700 cursor-pointer p-1">إلغاء الكل</span>
                        </div>
                        <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 text-gray-500 transform transition-transform ${expandedCategories.has('enzymes') ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </div>
                </button>
                {expandedCategories.has('enzymes') && (
                    <div id="category-content-enzymes" className="p-4 border-t border-gray-200">
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                            {masterEnzymes.map(enzyme => (
                                <div key={enzyme.id} className="flex items-center group justify-between">
                                    <div className="flex items-center">
                                        <input
                                            type="checkbox"
                                            id={`enzyme-${enzyme.id}`}
                                            checked={selectedEnzymeIds.has(enzyme.id)}
                                            onChange={() => handleToggleEnzyme(enzyme.id)}
                                            className="h-4 w-4 rounded border-gray-300 text-teal-600 focus:ring-teal-500 cursor-pointer"
                                        />
                                        <label htmlFor={`enzyme-${enzyme.id}`} className="mr-3 text-sm font-medium text-gray-700 select-none cursor-pointer">
                                            {enzyme.name}
                                        </label>
                                        <div className="relative flex items-center group/tooltip mr-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400 cursor-help" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                            </svg>
                                            <div className="absolute bottom-full right-1/2 transform translate-x-1/2 mb-2 w-max max-w-xs p-3 bg-gray-800 text-white text-xs rounded-md shadow-lg opacity-0 group-hover/tooltip:opacity-100 transition-opacity pointer-events-none z-10">
                                                <p className="font-semibold">الجرعة القياسية: <span className="font-mono">{enzyme.standard_dosage_g_per_ton}</span> جم/طن</p>
                                                <p className="font-semibold">السعر: <span className="font-mono">${enzyme.Price_USD_per_ton}</span> / طن</p>
                                                <div className="absolute top-full right-1/2 transform -translate-x-1/2 w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-gray-800"></div>
                                            </div>
                                        </div>
                                    </div>
                                    <button 
                                        onClick={() => setEditingEnzyme(enzyme)}
                                        className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-teal-600"
                                        title={`تعديل ${enzyme.name}`}
                                    >
                                       <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                         <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                                         <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" />
                                       </svg>
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200 sticky bottom-4">
          <div className="flex justify-between items-center">
            <p className="font-semibold text-gray-700">
              تم تحديد <span className="text-teal-600 text-lg">{selectedIngredientIds.size}</span> مكون
              و <span className="text-teal-600 text-lg">{selectedEnzymeIds.size}</span> أنزيم
            </p>
            <button
              onClick={() => onProceed(Array.from(selectedIngredientIds), Array.from(selectedEnzymeIds))}
              className="bg-teal-600 text-white font-bold py-3 px-8 rounded-md hover:bg-teal-700 transition-colors shadow-lg text-lg disabled:bg-gray-400"
              disabled={selectedIngredientIds.size === 0}
            >
              الانتقال لتركيب الخلطة &larr;
            </button>
          </div>
        </div>
      </div>
      {editingIngredient && (
        <IngredientEditModal
          ingredient={editingIngredient}
          onSave={handleSaveIngredient}
          onClose={() => setEditingIngredient(null)}
        />
      )}
      {editingEnzyme && (
        <EnzymeMatrixModal
          enzyme={editingEnzyme}
          onSave={handleSaveEnzyme}
          onClose={() => setEditingEnzyme(null)}
        />
      )}
      {confirmation?.isOpen && (
        <ConfirmationModal
          isOpen={confirmation.isOpen}
          title={confirmation.title}
          message={confirmation.message}
          onConfirm={confirmation.onConfirm}
          onClose={closeConfirmation}
        />
      )}
    </>
  );
};

export default SelectionPage;