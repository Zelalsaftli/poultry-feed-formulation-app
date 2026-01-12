import type { Ingredient, RecommendationProfile, GrowthPhase, Enzyme, IngredientCategory } from './types';

export const CATEGORY_NAMES_AR: Record<IngredientCategory, string> = {
  Energy: 'مكونات طاقة',
  Protein: 'مكونات بروتين',
  AminoAcids: 'الأحماض الأمينية',
  MineralSupplements: 'مكملات معدنية',
  Medicated: 'مكملات دوائية',
  Other: 'مكملات أخرى',
};

export const CATEGORY_COLORS: Record<IngredientCategory, string> = {
  Energy: 'bg-amber-400',
  Protein: 'bg-sky-500',
  AminoAcids: 'bg-lime-500',
  MineralSupplements: 'bg-slate-400',
  Medicated: 'bg-rose-500',
  Other: 'bg-violet-500',
};

// This must match the Ingredient type in types.ts
export const COLUMN_HEADERS_AR: Record<keyof Omit<Ingredient, 'id'>, string> = {
  Name: 'الاسم',
  description: 'الوصف',
  category: 'الفئة',
  Inclusion_pct: 'نسبة الإدراج %',
  CP_pct: 'بروتين خام %',
  ME_kcal_per_kg: 'طاقة ME (kcal/kg)',
  Ca_pct: 'كالسيوم %',
  avP_pct: 'فوسفور متاح %',
  Na_pct: 'صوديوم %',
  K_pct: 'بوتاسيوم %',
  Cl_pct: 'كلور %',
  Lys_pct: 'لايسين %',
  TSAA_pct: 'ميثيونين+سيستين %',
  Thr_pct: 'ثريونين %',
  Val_pct: 'فالين %',
  Ile_pct: 'آيزولوسين %',
  Leu_pct: 'لوسين %',
  Arg_pct: 'أرجنين %',
  Try_pct: 'تريبتوفان %',
  Starch_pct: 'نشا %',
  CF_pct: 'ألياف خام %',
  NDF_pct: 'NDF %',
  ADF_pct: 'ADF %',
  Ash_pct: 'رماد %',
  Choline_mg_per_kg: 'كولين (mg/kg)',
  Price_USD_per_ton: 'سعر ($/طن)',
};

export const ANALYSIS_RESULTS_AR: Record<string, string> = {
  totalCostPerTon: 'إجمالي تكلفة الخلطة ($/طن)',
  totalCostPer100kg: 'إجمالي تكلفة الخلطة ($/100kg)',
  'nutrients.CP_pct': 'بروتين خام %',
  'nutrients.ME_kcal_per_kg': 'طاقة ME (kcal/kg)',
  'nutrients.MECP_Ratio': 'نسبة الطاقة للبروتين',
  'nutrients.Ca_pct': 'كالسيوم %',
  'nutrients.avP_pct': 'فوسفور متاح %',
  'nutrients.CaAvP_Ratio': 'نسبة الكالسيوم للفوسفور',
  'nutrients.Na_pct': 'صوديوم %',
  'nutrients.K_pct': 'بوتاسيوم %',
  'nutrients.Cl_pct': 'كلور %',
  'nutrients.K_Cl_Na_Ratio': '(K+Cl)/Na',
  'nutrients.dEB': 'dEB (mEq/kg)',
  'nutrients.Ash_pct': 'رماد %',
  'nutrients.Choline_mg_per_kg': 'كولين (mg/kg)',
  'nutrients.Lys_pct': 'لايسين %',
  'nutrients.TSAA_pct': 'ميثيونين+سيستين %',
  'nutrients.Thr_pct': 'ثريونين %',
  'nutrients.Val_pct': 'فالين %',
  'nutrients.Ile_pct': 'آيزولوسين %',
  'nutrients.Leu_pct': 'لوسين %',
  'nutrients.Arg_pct': 'أرجنين %',
  'nutrients.Try_pct': 'تريبتوفان %',
  'nutrients.Starch_pct': 'نشا %',
  'nutrients.CF_pct': 'ألياف خام %',
};

export const NUTRIENT_UNITS: Record<string, { baseUnit: string; units: Record<string, number> }> = {
  'totalCostPerTon': { baseUnit: '$/ton', units: { '$/ton': 1, '$/kg': 0.001 } },
  'totalCostPer100kg': { baseUnit: '$/100kg', units: { '$/100kg': 1, '$/kg': 0.01 } },
  'nutrients.CP_pct': { baseUnit: '%', units: { '%': 1, 'g/kg': 10 } },
  'nutrients.ME_kcal_per_kg': { baseUnit: 'kcal/kg', units: { 'kcal/kg': 1, 'MJ/kg': 1 / 239.006 } },
  'nutrients.MECP_Ratio': { baseUnit: '', units: { '': 1 } },
  'nutrients.Ca_pct': { baseUnit: '%', units: { '%': 1, 'g/kg': 10 } },
  'nutrients.avP_pct': { baseUnit: '%', units: { '%': 1, 'g/kg': 10 } },
  'nutrients.CaAvP_Ratio': { baseUnit: '', units: { '': 1 } },
  'nutrients.Na_pct': { baseUnit: '%', units: { '%': 1, 'g/kg': 10, 'ppm': 10000 } },
  'nutrients.K_pct': { baseUnit: '%', units: { '%': 1, 'g/kg': 10, 'ppm': 10000 } },
  'nutrients.Cl_pct': { baseUnit: '%', units: { '%': 1, 'g/kg': 10, 'ppm': 10000 } },
  'nutrients.K_Cl_Na_Ratio': { baseUnit: '', units: { '': 1 } },
  'nutrients.dEB': { baseUnit: 'mEq/kg', units: { 'mEq/kg': 1 } },
  'nutrients.Ash_pct': { baseUnit: '%', units: { '%': 1, 'g/kg': 10 } },
  'nutrients.Choline_mg_per_kg': { baseUnit: 'mg/kg', units: { 'mg/kg': 1, 'g/kg': 0.001, '%': 0.0001, 'ppm': 1 } },
  'nutrients.Lys_pct': { baseUnit: '%', units: { '%': 1, 'g/kg': 10 } },
  'nutrients.TSAA_pct': { baseUnit: '%', units: { '%': 1, 'g/kg': 10 } },
  'nutrients.Thr_pct': { baseUnit: '%', units: { '%': 1, 'g/kg': 10 } },
  'nutrients.Val_pct': { baseUnit: '%', units: { '%': 1, 'g/kg': 10 } },
  'nutrients.Ile_pct': { baseUnit: '%', units: { '%': 1, 'g/kg': 10 } },
  'nutrients.Leu_pct': { baseUnit: '%', units: { '%': 1, 'g/kg': 10 } },
  'nutrients.Arg_pct': { baseUnit: '%', units: { '%': 1, 'g/kg': 10 } },
  'nutrients.Try_pct': { baseUnit: '%', units: { '%': 1, 'g/kg': 10 } },
  'nutrients.Starch_pct': { baseUnit: '%', units: { '%': 1, 'g/kg': 10 } },
  'nutrients.CF_pct': { baseUnit: '%', units: { '%': 1, 'g/kg': 10 } },
};

export const convertValue = (
    baseValue: number, 
    nutrientKey: string, 
    targetUnit: string
): { value: number; unit: string } => {
    const definition = NUTRIENT_UNITS[nutrientKey];
    if (!definition) {
        return { value: baseValue, unit: '' }; // No definition, return as is
    }

    const factor = definition.units[targetUnit];
    if (factor === undefined) {
        // Fallback to base unit if target is invalid
        return { value: baseValue, unit: definition.baseUnit };
    }

    const convertedValue = baseValue * factor;
    return { value: convertedValue, unit: targetUnit };
};

export const ROSS_308_RECOMMENDATIONS: Record<GrowthPhase, RecommendationProfile> = {
  Starter: { // 0-10 days
    'nutrients.ME_kcal_per_kg': { min: 2925, max: 3025, unit: 'kcal/kg' },
    'nutrients.CP_pct': { min: 22.5, max: 23.5, unit: '%' },
    'nutrients.Lys_pct': { min: 1.32, max: 1.34, unit: '%' },
    'nutrients.TSAA_pct': { min: 1.00, max: 1.02, unit: '%' },
    'nutrients.Arg_pct': { min: 1.40, max: 1.42, unit: '%' },
    'nutrients.Thr_pct': { min: 0.88, max: 0.90, unit: '%' },
    'nutrients.Val_pct': { min: 1.00, max: 1.02, unit: '%' },
    'nutrients.Ile_pct': { min: 0.88, max: 0.90, unit: '%' },
    'nutrients.Ca_pct': { min: 0.93, max: 0.97, unit: '%' },
    'nutrients.avP_pct': { min: 0.48, max: 0.52, unit: '%' },
    'nutrients.Na_pct': { min: 0.18, max: 0.23, unit: '%' },
    'nutrients.Ash_pct': { min: 5.0, max: 6.5, unit: '%' },
    'nutrients.Choline_mg_per_kg': { min: 1700, max: Infinity, unit: 'mg/kg' },
    'nutrients.CaAvP_Ratio': { min: 1.8, max: 2.0, unit: '' },
  },
  Grower: { // 11-24 days
    'nutrients.ME_kcal_per_kg': { min: 3000, max: 3100, unit: 'kcal/kg' },
    'nutrients.CP_pct': { min: 21.0, max: 22.0, unit: '%' },
    'nutrients.Lys_pct': { min: 1.18, max: 1.20, unit: '%' },
    'nutrients.TSAA_pct': { min: 0.92, max: 0.94, unit: '%' },
    'nutrients.Arg_pct': { min: 1.27, max: 1.29, unit: '%' },
    'nutrients.Thr_pct': { min: 0.79, max: 0.81, unit: '%' },
    'nutrients.Val_pct': { min: 0.91, max: 0.93, unit: '%' },
    'nutrients.Ile_pct': { min: 0.80, max: 0.82, unit: '%' },
    'nutrients.Ca_pct': { min: 0.73, max: 0.77, unit: '%' },
    'nutrients.avP_pct': { min: 0.40, max: 0.44, unit: '%' },
    'nutrients.Na_pct': { min: 0.18, max: 0.23, unit: '%' },
    'nutrients.Ash_pct': { min: 5.0, max: 6.0, unit: '%' },
    'nutrients.Choline_mg_per_kg': { min: 1600, max: Infinity, unit: 'mg/kg' },
    'nutrients.CaAvP_Ratio': { min: 1.7, max: 1.9, unit: '' },
  },
  'Finisher 1': { // 25-39 days
    'nutrients.ME_kcal_per_kg': { min: 3050, max: 3150, unit: 'kcal/kg' },
    'nutrients.CP_pct': { min: 19.0, max: 20.0, unit: '%' },
    'nutrients.Lys_pct': { min: 1.08, max: 1.10, unit: '%' },
    'nutrients.TSAA_pct': { min: 0.86, max: 0.88, unit: '%' },
    'nutrients.Arg_pct': { min: 1.17, max: 1.19, unit: '%' },
    'nutrients.Thr_pct': { min: 0.72, max: 0.74, unit: '%' },
    'nutrients.Val_pct': { min: 0.84, max: 0.86, unit: '%' },
    'nutrients.Ile_pct': { min: 0.75, max: 0.77, unit: '%' },
    'nutrients.Ca_pct': { min: 0.68, max: 0.72, unit: '%' },
    'nutrients.avP_pct': { min: 0.38, max: 0.42, unit: '%' },
    'nutrients.Na_pct': { min: 0.16, max: 0.21, unit: '%' },
    'nutrients.Ash_pct': { min: 4.5, max: 5.5, unit: '%' },
    'nutrients.Choline_mg_per_kg': { min: 1500, max: Infinity, unit: 'mg/kg' },
    'nutrients.CaAvP_Ratio': { min: 1.6, max: 1.8, unit: '' },
  },
   'Finisher 2': { // +40 days
    'nutrients.ME_kcal_per_kg': { min: 3100, max: 3200, unit: 'kcal/kg' },
    'nutrients.CP_pct': { min: 18.0, max: 19.0, unit: '%' },
    'nutrients.Lys_pct': { min: 1.02, max: 1.04, unit: '%' },
    'nutrients.TSAA_pct': { min: 0.82, max: 0.84, unit: '%' },
    'nutrients.Arg_pct': { min: 1.12, max: 1.14, unit: '%' },
    'nutrients.Thr_pct': { min: 0.68, max: 0.70, unit: '%' },
    'nutrients.Val_pct': { min: 0.80, max: 0.82, unit: '%' },
    'nutrients.Ile_pct': { min: 0.70, max: 0.72, unit: '%' },
    'nutrients.Ca_pct': { min: 0.63, max: 0.67, unit: '%' },
    'nutrients.avP_pct': { min: 0.35, max: 0.39, unit: '%' },
    'nutrients.Na_pct': { min: 0.16, max: 0.21, unit: '%' },
    'nutrients.Ash_pct': { min: 4.5, max: 5.5, unit: '%' },
    'nutrients.Choline_mg_per_kg': { min: 1400, max: Infinity, unit: 'mg/kg' },
    'nutrients.CaAvP_Ratio': { min: 1.6, max: 1.8, unit: '' },
  },
};


export const initialIngredients: Ingredient[] = [
  { id: 1, Name: 'ذرة صفراء', description: 'مصدر رئيسي للطاقة في الأعلاف، غني بالنشا.', category: 'Energy', Inclusion_pct: 60.00, CP_pct: 7.8, ME_kcal_per_kg: 3350, Ca_pct: 0.02, avP_pct: 0.05, Na_pct: 0.02, K_pct: 0.3, Cl_pct: 0.05, Lys_pct: 0.21, TSAA_pct: 0.29, Thr_pct: 0.28, Val_pct: 0.34, Ile_pct: 0.26, Leu_pct: 0.91, Arg_pct: 0.36, Try_pct: 0.06, Starch_pct: 62, CF_pct: 2.2, NDF_pct: 9.5, ADF_pct: 2.8, Ash_pct: 1.5, Choline_mg_per_kg: 550, Price_USD_per_ton: 325 },
  { id: 25, Name: 'قمح', description: 'مصدر طاقة وبروتين، يحتوي على نسبة جيدة من النشا.', category: 'Energy', Inclusion_pct: 0, CP_pct: 13.0, ME_kcal_per_kg: 3150, Ca_pct: 0.05, avP_pct: 0.17, Na_pct: 0.02, K_pct: 0.45, Cl_pct: 0.07, Lys_pct: 0.32, TSAA_pct: 0.42, Thr_pct: 0.36, Val_pct: 0.50, Ile_pct: 0.40, Leu_pct: 0.85, Arg_pct: 0.60, Try_pct: 0.15, Starch_pct: 60, CF_pct: 3.0, NDF_pct: 11, ADF_pct: 4, Ash_pct: 1.8, Choline_mg_per_kg: 1000, Price_USD_per_ton: 350 },
  { id: 23, Name: 'شعير', description: 'مصدر طاقة بديل، يحتوي على نسبة ألياف أعلى من الذرة.', category: 'Energy', Inclusion_pct: 0, CP_pct: 11.5, ME_kcal_per_kg: 2650, Ca_pct: 0.06, avP_pct: 0.16, Na_pct: 0.02, K_pct: 0.5, Cl_pct: 0.1, Lys_pct: 0.38, TSAA_pct: 0.40, Thr_pct: 0.35, Val_pct: 0.55, Ile_pct: 0.38, Leu_pct: 0.75, Arg_pct: 0.50, Try_pct: 0.14, Starch_pct: 55, CF_pct: 5.5, NDF_pct: 18, ADF_pct: 7, Ash_pct: 2.5, Choline_mg_per_kg: 900, Price_USD_per_ton: 350 },
  { id: 24, Name: 'نخالة القمح', description: 'منتج ثانوي غني بالألياف والبروتين، يستخدم لتحسين الهضم.', category: 'Energy', Inclusion_pct: 0, CP_pct: 15.5, ME_kcal_per_kg: 1400, Ca_pct: 0.13, avP_pct: 0.35, Na_pct: 0.05, K_pct: 1.2, Cl_pct: 0.1, Lys_pct: 0.65, TSAA_pct: 0.45, Thr_pct: 0.50, Val_pct: 0.75, Ile_pct: 0.55, Leu_pct: 1.0, Arg_pct: 1.0, Try_pct: 0.20, Starch_pct: 20, CF_pct: 11, NDF_pct: 40, ADF_pct: 13, Ash_pct: 6, Choline_mg_per_kg: 1200, Price_USD_per_ton: 220 },
  { id: 3, Name: 'زيت صويا', description: 'مصدر طاقة مركز عالي الدهون، يستخدم لزيادة كثافة الطاقة في العلف.', category: 'Energy', Inclusion_pct: 4.00, CP_pct: 0, ME_kcal_per_kg: 8800, Ca_pct: 0, avP_pct: 0, Na_pct: 0, K_pct: 0, Cl_pct: 0, Lys_pct: 0, TSAA_pct: 0, Thr_pct: 0, Val_pct: 0, Ile_pct: 0, Leu_pct: 0, Arg_pct: 0, Try_pct: 0, Starch_pct: 0, CF_pct: 0, NDF_pct: 0, ADF_pct: 0, Ash_pct: 0, Choline_mg_per_kg: 0, Price_USD_per_ton: 1500 },
  { id: 26, Name: 'مولاس', description: 'منتج ثانوي لصناعة السكر، يستخدم كمصدر للطاقة ومحسن للاستساغة.', category: 'Energy', Inclusion_pct: 0, CP_pct: 4.0, ME_kcal_per_kg: 2500, Ca_pct: 0.9, avP_pct: 0.08, Na_pct: 0.1, K_pct: 3.5, Cl_pct: 1.2, Lys_pct: 0.15, TSAA_pct: 0.06, Thr_pct: 0.1, Val_pct: 0.2, Ile_pct: 0.1, Leu_pct: 0.3, Arg_pct: 0.2, Try_pct: 0.02, Starch_pct: 0, CF_pct: 0, NDF_pct: 0, ADF_pct: 0, Ash_pct: 9, Choline_mg_per_kg: 600, Price_USD_per_ton: 180 },
  { id: 2, Name: 'كسبة فول الصويا 44 %', description: 'مصدر بروتين نباتي أساسي، غني بالأحماض الأمينية.', category: 'Protein', Inclusion_pct: 30.00, CP_pct: 44, ME_kcal_per_kg: 2230, Ca_pct: 0.3, avP_pct: 0.28, Na_pct: 0.03, K_pct: 2.0, Cl_pct: 0.06, Lys_pct: 2.52, TSAA_pct: 1.08, Thr_pct: 1.52, Val_pct: 1.87, Ile_pct: 1.79, Leu_pct: 3.02, Arg_pct: 3.0, Try_pct: 0.6, Starch_pct: 5, CF_pct: 7, NDF_pct: 12, ADF_pct: 9, Ash_pct: 6.0, Choline_mg_per_kg: 2800, Price_USD_per_ton: 500 },
  { id: 27, Name: 'كسبة فول الصويا 46 %', description: 'مصدر بروتين نباتي عالي التركيز، معالج لإزالة القشور.', category: 'Protein', Inclusion_pct: 0, CP_pct: 46, ME_kcal_per_kg: 2350, Ca_pct: 0.32, avP_pct: 0.30, Na_pct: 0.03, K_pct: 2.1, Cl_pct: 0.06, Lys_pct: 2.85, TSAA_pct: 1.35, Thr_pct: 1.85, Val_pct: 2.2, Ile_pct: 2.1, Leu_pct: 3.6, Arg_pct: 3.4, Try_pct: 0.65, Starch_pct: 4, CF_pct: 6, NDF_pct: 10, ADF_pct: 8, Ash_pct: 6.5, Choline_mg_per_kg: 2900, Price_USD_per_ton: 520 },
  { id: 12, Name: 'خميرة جافة', description: 'مصدر غني بالبروتين وفيتامينات ب، يعزز صحة الأمعاء.', category: 'Protein', Inclusion_pct: 0, CP_pct: 45, ME_kcal_per_kg: 2800, Ca_pct: 0.2, avP_pct: 1.2, Na_pct: 0.1, K_pct: 2.2, Cl_pct: 0.2, Lys_pct: 3.5, TSAA_pct: 1.2, Thr_pct: 2.2, Val_pct: 2.5, Ile_pct: 2.1, Leu_pct: 3.2, Arg_pct: 2.3, Try_pct: 0.5, Starch_pct: 8, CF_pct: 3, NDF_pct: 7, ADF_pct: 4, Ash_pct: 8, Choline_mg_per_kg: 4000, Price_USD_per_ton: 2700 },
  { id: 8, Name: 'دي إل-ميثيونين', description: 'حمض أميني صناعي، يستخدم لتحسين توازن البروتين في العلف.', category: 'AminoAcids', Inclusion_pct: 0.35, CP_pct: 0, ME_kcal_per_kg: 0, Ca_pct: 0, avP_pct: 0, Na_pct: 0, K_pct: 0, Cl_pct: 0, Lys_pct: 0, TSAA_pct: 99, Thr_pct: 0, Val_pct: 0, Ile_pct: 0, Leu_pct: 0, Arg_pct: 0, Try_pct: 0, Starch_pct: 0, CF_pct: 0, NDF_pct: 0, ADF_pct: 0, Ash_pct: 0, Choline_mg_per_kg: 0, Price_USD_per_ton: 3600 },
  { id: 9, Name: 'ل-لايسين هيدروكلوريد', description: 'حمض أميني صناعي، يعتبر الحمض الأميني المحدد الأول للدواجن.', category: 'AminoAcids', Inclusion_pct: 0.25, CP_pct: 0, ME_kcal_per_kg: 0, Ca_pct: 0, avP_pct: 0, Na_pct: 0, K_pct: 0, Cl_pct: 0, Lys_pct: 75.5, TSAA_pct: 0, Thr_pct: 0, Val_pct: 0, Ile_pct: 0, Leu_pct: 0, Arg_pct: 0, Try_pct: 0, Starch_pct: 0, CF_pct: 0, NDF_pct: 0, ADF_pct: 0, Ash_pct: 0, Choline_mg_per_kg: 0, Price_USD_per_ton: 2000 },
  { id: 10, Name: 'ل-ثريونين', description: 'حمض أميني صناعي، يستخدم لدعم النمو وإنتاج الريش.', category: 'AminoAcids', Inclusion_pct: 0.05, CP_pct: 0, ME_kcal_per_kg: 0, Ca_pct: 0, avP_pct: 0, Na_pct: 0, K_pct: 0, Cl_pct: 0, Lys_pct: 0, TSAA_pct: 0, Thr_pct: 96, Val_pct: 0, Ile_pct: 0, Leu_pct: 0, Arg_pct: 0, Try_pct: 0, Starch_pct: 0, CF_pct: 0, NDF_pct: 0, ADF_pct: 0, Ash_pct: 0, Choline_mg_per_kg: 0, Price_USD_per_ton: 2350 },
  { id: 20, Name: 'ل-أرجنين', category: 'AminoAcids', description: 'حمض أميني أساسي', Inclusion_pct: 0, CP_pct: 0, ME_kcal_per_kg: 0, Ca_pct: 0, avP_pct: 0, Na_pct: 0, K_pct: 0, Cl_pct: 0, Lys_pct: 0, TSAA_pct: 0, Thr_pct: 0, Val_pct: 0, Ile_pct: 0, Leu_pct: 0, Arg_pct: 96, Try_pct: 0, Starch_pct: 0, CF_pct: 0, NDF_pct: 0, ADF_pct: 0, Ash_pct: 0, Choline_mg_per_kg: 0, Price_USD_per_ton: 6500 },
  { id: 21, Name: 'ل-فالين', category: 'AminoAcids', description: 'حمض أميني أساسي', Inclusion_pct: 0, CP_pct: 0, ME_kcal_per_kg: 0, Ca_pct: 0, avP_pct: 0, Na_pct: 0, K_pct: 0, Cl_pct: 0, Lys_pct: 0, TSAA_pct: 0, Thr_pct: 0, Val_pct: 96, Ile_pct: 0, Leu_pct: 0, Arg_pct: 0, Try_pct: 0, Starch_pct: 0, CF_pct: 0, NDF_pct: 0, ADF_pct: 0, Ash_pct: 0, Choline_mg_per_kg: 0, Price_USD_per_ton: 5000 },
  { id: 22, Name: 'ل-آيزولوسين', category: 'AminoAcids', description: 'حمض أميني أساسي', Inclusion_pct: 0, CP_pct: 0, ME_kcal_per_kg: 0, Ca_pct: 0, avP_pct: 0, Na_pct: 0, K_pct: 0, Cl_pct: 0, Lys_pct: 0, TSAA_pct: 0, Thr_pct: 0, Val_pct: 0, Ile_pct: 96, Leu_pct: 0, Arg_pct: 0, Try_pct: 0, Starch_pct: 0, CF_pct: 0, NDF_pct: 0, ADF_pct: 0, Ash_pct: 0, Choline_mg_per_kg: 0, Price_USD_per_ton: 7000 },
  { id: 4, Name: 'حجر جيري', description: 'مصدر رئيسي للكالسيوم، ضروري لتكوين العظام.', category: 'MineralSupplements', Inclusion_pct: 1.5, CP_pct: 0, ME_kcal_per_kg: 0, Ca_pct: 36, avP_pct: 0, Na_pct: 0, K_pct: 0, Cl_pct: 0, Lys_pct: 0, TSAA_pct: 0, Thr_pct: 0, Val_pct: 0, Ile_pct: 0, Leu_pct: 0, Arg_pct: 0, Try_pct: 0, Starch_pct: 0, CF_pct: 0, NDF_pct: 0, ADF_pct: 0, Ash_pct: 98.0, Choline_mg_per_kg: 0, Price_USD_per_ton: 40 },
  { id: 30, Name: 'كربونات الكالسيوم النقية', description: 'مصدر عالي النقاء للكالسيوم.', category: 'MineralSupplements', Inclusion_pct: 0, CP_pct: 0, ME_kcal_per_kg: 0, Ca_pct: 40, avP_pct: 0, Na_pct: 0, K_pct: 0, Cl_pct: 0, Lys_pct: 0, TSAA_pct: 0, Thr_pct: 0, Val_pct: 0, Ile_pct: 0, Leu_pct: 0, Arg_pct: 0, Try_pct: 0, Starch_pct: 0, CF_pct: 0, NDF_pct: 0, ADF_pct: 0, Ash_pct: 99.5, Choline_mg_per_kg: 0, Price_USD_per_ton: 65 },
  { id: 5, Name: 'فوسفات ثنائي الكالسيوم', description: 'القيمة تمثل الفوسفور المتاح (حوالي 85% من الفوسفور الكلي)', category: 'MineralSupplements', Inclusion_pct: 1.5, CP_pct: 0, ME_kcal_per_kg: 0, Ca_pct: 22, avP_pct: 16, Na_pct: 0, K_pct: 0, Cl_pct: 0, Lys_pct: 0, TSAA_pct: 0, Thr_pct: 0, Val_pct: 0, Ile_pct: 0, Leu_pct: 0, Arg_pct: 0, Try_pct: 0, Starch_pct: 0, CF_pct: 0, NDF_pct: 0, ADF_pct: 0, Ash_pct: 55.0, Choline_mg_per_kg: 0, Price_USD_per_ton: 800 },
  { id: 31, Name: 'مونو كالسيوم فوسفات', description: 'القيمة تمثل الفوسفور المتاح (حوالي 95% من الفوسفور الكلي)', category: 'MineralSupplements', Inclusion_pct: 0, CP_pct: 0, ME_kcal_per_kg: 0, Ca_pct: 16.5, avP_pct: 20, Na_pct: 0, K_pct: 0, Cl_pct: 0, Lys_pct: 0, TSAA_pct: 0, Thr_pct: 0, Val_pct: 0, Ile_pct: 0, Leu_pct: 0, Arg_pct: 0, Try_pct: 0, Starch_pct: 0, CF_pct: 0, NDF_pct: 0, ADF_pct: 0, Ash_pct: 58.0, Choline_mg_per_kg: 0, Price_USD_per_ton: 1600 },
  { id: 6, Name: 'ملح طعام', description: 'مصدر للصوديوم والكلور، ضروري للتوازن الأيوني.', category: 'MineralSupplements', Inclusion_pct: 0.35, CP_pct: 0, ME_kcal_per_kg: 0, Ca_pct: 0, avP_pct: 0, Na_pct: 39, K_pct: 0, Cl_pct: 60, Lys_pct: 0, TSAA_pct: 0, Thr_pct: 0, Val_pct: 0, Ile_pct: 0, Leu_pct: 0, Arg_pct: 0, Try_pct: 0, Starch_pct: 0, CF_pct: 0, NDF_pct: 0, ADF_pct: 0, Ash_pct: 100, Choline_mg_per_kg: 0, Price_USD_per_ton: 100 },
  { id: 17, Name: 'بيكربونات الصوديوم', description: 'مصدر للصوديوم ويستخدم كموازن للحموضة في الجسم.', category: 'MineralSupplements', Inclusion_pct: 0, CP_pct: 0, ME_kcal_per_kg: 0, Ca_pct: 0, avP_pct: 0, Na_pct: 27, K_pct: 0, Cl_pct: 0, Lys_pct: 0, TSAA_pct: 0, Thr_pct: 0, Val_pct: 0, Ile_pct: 0, Leu_pct: 0, Arg_pct: 0, Try_pct: 0, Starch_pct: 0, CF_pct: 0, NDF_pct: 0, ADF_pct: 0, Ash_pct: 100, Choline_mg_per_kg: 0, Price_USD_per_ton: 750 },
  { id: 16, Name: 'سلفات الصوديوم', description: 'مصدر للصوديوم والكبريت.', category: 'MineralSupplements', Inclusion_pct: 0, CP_pct: 0, ME_kcal_per_kg: 0, Ca_pct: 0, avP_pct: 0, Na_pct: 32, K_pct: 0, Cl_pct: 0, Lys_pct: 0, TSAA_pct: 0, Thr_pct: 0, Val_pct: 0, Ile_pct: 0, Leu_pct: 0, Arg_pct: 0, Try_pct: 0, Starch_pct: 0, CF_pct: 0, NDF_pct: 0, ADF_pct: 0, Ash_pct: 100, Choline_mg_per_kg: 0, Price_USD_per_ton: 900 },
  { id: 14, Name: 'مضاد التهاب', description: 'مضاف دوائي للتحكم في الاستجابات الالتهابية.', category: 'Medicated', Inclusion_pct: 0, CP_pct: 0, ME_kcal_per_kg: 0, Ca_pct: 0, avP_pct: 0, Na_pct: 0, K_pct: 0, Cl_pct: 0, Lys_pct: 0, TSAA_pct: 0, Thr_pct: 0, Val_pct: 0, Ile_pct: 0, Leu_pct: 0, Arg_pct: 0, Try_pct: 0, Starch_pct: 0, CF_pct: 0, NDF_pct: 0, ADF_pct: 0, Ash_pct: 40, Choline_mg_per_kg: 0, Price_USD_per_ton: 6250 },
  { id: 15, Name: 'مضاد كوكسيديا', description: 'مضاف دوائي للوقاية من الإصابة بمرض الكوكسيديا.', category: 'Medicated', Inclusion_pct: 0, CP_pct: 0, ME_kcal_per_kg: 0, Ca_pct: 0, avP_pct: 0, Na_pct: 0, K_pct: 0, Cl_pct: 0, Lys_pct: 0, TSAA_pct: 0, Thr_pct: 0, Val_pct: 0, Ile_pct: 0, Leu_pct: 0, Arg_pct: 0, Try_pct: 0, Starch_pct: 0, CF_pct: 0, NDF_pct: 0, ADF_pct: 0, Ash_pct: 60, Choline_mg_per_kg: 0, Price_USD_per_ton: 40000 },
  { id: 28, Name: 'بريمكس فيتامينات', description: 'خليط مركز من الفيتامينات الأساسية لدعم الصحة والنمو.', category: 'Other', Inclusion_pct: 0.25, CP_pct: 0, ME_kcal_per_kg: 0, Ca_pct: 0, avP_pct: 0, Na_pct: 0, K_pct: 0, Cl_pct: 0, Lys_pct: 0, TSAA_pct: 0, Thr_pct: 0, Val_pct: 0, Ile_pct: 0, Leu_pct: 0, Arg_pct: 0, Try_pct: 0, Starch_pct: 0, CF_pct: 0, NDF_pct: 0, ADF_pct: 0, Ash_pct: 50.0, Choline_mg_per_kg: 0, Price_USD_per_ton: 10000 },
  { id: 29, Name: 'بريمكس معادن', description: 'خليط مركز من المعادن النادرة لدعم الوظائف الحيوية.', category: 'Other', Inclusion_pct: 0.25, CP_pct: 0, ME_kcal_per_kg: 0, Ca_pct: 0, avP_pct: 0, Na_pct: 0, K_pct: 0, Cl_pct: 0, Lys_pct: 0, TSAA_pct: 0, Thr_pct: 0, Val_pct: 0, Ile_pct: 0, Leu_pct: 0, Arg_pct: 0, Try_pct: 0, Starch_pct: 0, CF_pct: 0, NDF_pct: 0, ADF_pct: 0, Ash_pct: 95.0, Choline_mg_per_kg: 0, Price_USD_per_ton: 4000 },
  { id: 11, Name: 'قشور الرمان الجافة', description: 'مضاف طبيعي غني بمضادات الأكسدة، يستخدم لتحسين الصحة العامة.', category: 'Other', Inclusion_pct: 0, CP_pct: 5, ME_kcal_per_kg: 1500, Ca_pct: 0.4, avP_pct: 0.1, Na_pct: 0.05, K_pct: 1.2, Cl_pct: 0.1, Lys_pct: 0.1, TSAA_pct: 0.08, Thr_pct: 0.1, Val_pct: 0.15, Ile_pct: 0.1, Leu_pct: 0.2, Arg_pct: 0.15, Try_pct: 0.05, Starch_pct: 2, CF_pct: 18, NDF_pct: 35, ADF_pct: 25, Ash_pct: 6, Choline_mg_per_kg: 300, Price_USD_per_ton: 350 },
  { id: 13, Name: 'مضاد أكسدة', description: 'مضاف لحماية الدهون والفيتامينات من الأكسدة في العلف.', category: 'Other', Inclusion_pct: 0, CP_pct: 0, ME_kcal_per_kg: 0, Ca_pct: 0, avP_pct: 0, Na_pct: 0, K_pct: 0, Cl_pct: 0, Lys_pct: 0, TSAA_pct: 0, Thr_pct: 0, Val_pct: 0, Ile_pct: 0, Leu_pct: 0, Arg_pct: 0, Try_pct: 0, Starch_pct: 0, CF_pct: 0, NDF_pct: 0, ADF_pct: 0, Ash_pct: 50, Choline_mg_per_kg: 0, Price_USD_per_ton: 5000 },
  { id: 18, Name: 'مضاد فطور', description: 'مضاف لمنع نمو الفطريات والحفاظ على جودة العلف.', category: 'Other', Inclusion_pct: 0, CP_pct: 0, ME_kcal_per_kg: 0, Ca_pct: 0, avP_pct: 0, Na_pct: 0, K_pct: 0, Cl_pct: 0, Lys_pct: 0, TSAA_pct: 0, Thr_pct: 0, Val_pct: 0, Ile_pct: 0, Leu_pct: 0, Arg_pct: 0, Try_pct: 0, Starch_pct: 0, CF_pct: 0, NDF_pct: 0, ADF_pct: 0, Ash_pct: 55, Choline_mg_per_kg: 0, Price_USD_per_ton: 2250 },
  { id: 19, Name: 'مضاد سموم فطرية', description: 'مضاف لربط السموم الفطرية ومنع امتصاصها في الأمعاء.', category: 'Other', Inclusion_pct: 0, CP_pct: 0, ME_kcal_per_kg: 0, Ca_pct: 0, avP_pct: 0, Na_pct: 0.1, K_pct: 0.5, Cl_pct: 0.1, Lys_pct: 0, TSAA_pct: 0, Thr_pct: 0, Val_pct: 0, Ile_pct: 0, Leu_pct: 0, Arg_pct: 0, Try_pct: 0, Starch_pct: 0, CF_pct: 0, NDF_pct: 0, ADF_pct: 0, Ash_pct: 90, Choline_mg_per_kg: 0, Price_USD_per_ton: 2150 },
  { id: 32, Name: 'مستحلب دهون', category: 'Other', description: 'يساعد على هضم وامتصاص الدهون، مما يحسن من قيمة الطاقة.', Inclusion_pct: 0, CP_pct: 0, ME_kcal_per_kg: 0, Ca_pct: 0, avP_pct: 0, Na_pct: 0, K_pct: 0, Cl_pct: 0, Lys_pct: 0, TSAA_pct: 0, Thr_pct: 0, Val_pct: 0, Ile_pct: 0, Leu_pct: 0, Arg_pct: 0, Try_pct: 0, Starch_pct: 0, CF_pct: 0, NDF_pct: 0, ADF_pct: 0, Ash_pct: 50, Choline_mg_per_kg: 0, Price_USD_per_ton: 4500 },
  { id: 33, Name: 'زيوليت', category: 'Other', description: 'مادة طبيعية تستخدم كمضاد للتكتل ومادة رابطة للسموم الفطرية.', Inclusion_pct: 0, CP_pct: 0, ME_kcal_per_kg: 0, Ca_pct: 0, avP_pct: 0, Na_pct: 0, K_pct: 0, Cl_pct: 0, Lys_pct: 0, TSAA_pct: 0, Thr_pct: 0, Val_pct: 0, Ile_pct: 0, Leu_pct: 0, Arg_pct: 0, Try_pct: 0, Starch_pct: 0, CF_pct: 0, NDF_pct: 0, ADF_pct: 0, Ash_pct: 95, Choline_mg_per_kg: 0, Price_USD_per_ton: 250 },
  { id: 34, Name: 'مادة رابطة', category: 'Other', description: 'تحسن من جودة وتماسك حبيبات العلف.', Inclusion_pct: 0, CP_pct: 0, ME_kcal_per_kg: 500, Ca_pct: 0, avP_pct: 0, Na_pct: 0, K_pct: 0, Cl_pct: 0, Lys_pct: 0, TSAA_pct: 0, Thr_pct: 0, Val_pct: 0, Ile_pct: 0, Leu_pct: 0, Arg_pct: 0, Try_pct: 0, Starch_pct: 0, CF_pct: 0, NDF_pct: 0, ADF_pct: 0, Ash_pct: 60, Choline_mg_per_kg: 0, Price_USD_per_ton: 600 },
  // FIX: Added missing properties to the ingredient object below.
  { id: 35, Name: 'كلوريد الكولين 60 %', category: 'Other', description: 'مصدر رئيسي للكولين، وهو فيتامين أساسي. 60% كلوريد كولين على حامل نباتي.', Inclusion_pct: 0, CP_pct: 0, ME_kcal_per_kg: 0, Ca_pct: 0, avP_pct: 0, Na_pct: 0, K_pct: 0, Cl_pct: 0, Lys_pct: 0, TSAA_pct: 0, Thr_pct: 0, Val_pct: 0, Ile_pct: 0, Leu_pct: 0, Arg_pct: 0, Try_pct: 0, Starch_pct: 0, CF_pct: 5, NDF_pct: 10, ADF_pct: 7, Ash_pct: 5, Choline_mg_per_kg: 447600, Price_USD_per_ton: 1200 },
];

// FIX: Added initialEnzymes to be exported, resolving an import error in App.tsx.
export const initialEnzymes: Enzyme[] = [
  {
    id: 'phytase-standard',
    name: 'فايتيز (قياسي)',
    dosage_g_per_ton: 0,
    standard_dosage_g_per_ton: 100,
    Price_USD_per_ton: 15000,
    matrix: {
      avP_pct: 0.12,
      Ca_pct: 0.10,
      ME_kcal_per_kg: 50,
      CP_pct: 0.4,
      Lys_pct: 0.015,
      TSAA_pct: 0.012,
    },
  },
  {
    id: 'xylanase-standard',
    name: 'زایلانیز (قياسي)',
    dosage_g_per_ton: 0,
    standard_dosage_g_per_ton: 50,
    Price_USD_per_ton: 12000,
    matrix: {
      ME_kcal_per_kg: 75,
    },
  },
  {
    id: 'protease-standard',
    name: 'بروتياز (قياسي)',
    dosage_g_per_ton: 0,
    standard_dosage_g_per_ton: 200,
    Price_USD_per_ton: 18000,
    matrix: {
      CP_pct: 0.8,
      Lys_pct: 0.03,
      TSAA_pct: 0.02,
      Thr_pct: 0.025,
    },
  },
];
