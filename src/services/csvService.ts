import type { Ingredient } from '../types';
import { COLUMN_HEADERS_AR } from '../constants';

const HEADER_MAPPING: Record<string, keyof Ingredient> = {
  // Arabic
  'الاسم': 'Name',
  'نسبة الإدراج %': 'Inclusion_pct',
  'بروتين خام %': 'CP_pct',
  'طاقة ME (kcal/kg)': 'ME_kcal_per_kg',
  'كالسيوم %': 'Ca_pct',
  'فوسفور متاح %': 'avP_pct',
  'صوديوم %': 'Na_pct',
  'بوتاسيوم %': 'K_pct',
  'كلور %': 'Cl_pct',
  'لايسين %': 'Lys_pct',
  'ميثيونين+سيستين %': 'TSAA_pct',
  'ثريونين %': 'Thr_pct',
  'فالين %': 'Val_pct',
  'آيزولوسين %': 'Ile_pct',
  'لوسين %': 'Leu_pct',
  'أرجنين %': 'Arg_pct',
  'تريبتوفان %': 'Try_pct',
  'نشا %': 'Starch_pct',
  'ألياف خام %': 'CF_pct',
  'NDF %': 'NDF_pct',
  'ADF %': 'ADF_pct',
  'رماد %': 'Ash_pct',
  'كولين (mg/kg)': 'Choline_mg_per_kg',
  'سعر ($/طن)': 'Price_USD_per_ton',
  'الفئة': 'category',
  'الوصف': 'description',
  // English
  'name': 'Name',
  'inclusion_pct': 'Inclusion_pct',
  'price_usd_per_ton': 'Price_USD_per_ton',
  'cp_pct': 'CP_pct',
  'me_kcal_per_kg': 'ME_kcal_per_kg',
  'ca_pct': 'Ca_pct',
  'avp_pct': 'avP_pct',
  'na_pct': 'Na_pct',
  'k_pct': 'K_pct',
  'cl_pct': 'Cl_pct',
  'lys_pct': 'Lys_pct',
  'tsaa_pct': 'TSAA_pct',
  'thr_pct': 'Thr_pct',
  'val_pct': 'Val_pct',
  'ile_pct': 'Ile_pct',
  'leu_pct': 'Leu_pct',
  'arg_pct': 'Arg_pct',
  'try_pct': 'Try_pct',
  'starch_pct': 'Starch_pct',
  'cf_pct': 'CF_pct',
  'ndf_pct': 'NDF_pct',
  'adf_pct': 'ADF_pct',
  'ash_pct': 'Ash_pct',
  'choline_mg_per_kg': 'Choline_mg_per_kg',
  'category': 'category',
  'description': 'description',
};

export const parseCSV = (csvText: string): Ingredient[] => {
  const lines = csvText.trim().split(/\r\n|\n/);
  if (lines.length < 2) {
    alert('بيانات CSV غير صالحة. يجب أن تحتوي على رأس وعلي الأقل صف واحد من البيانات.');
    return [];
  }
  
  const headerLine = lines[0].trim();
  // Handle CSVs with semicolons as well
  const delimiter = headerLine.includes(';') ? ';' : ',';
  const headers = headerLine.split(delimiter).map(h => h.trim().toLowerCase().replace(/"/g, ''));
  
  const mappedHeaders = headers.map(h => {
    // Search for a matching key in HEADER_MAPPING (case-insensitive)
    const matchingKey = Object.keys(HEADER_MAPPING).find(key => key.toLowerCase() === h);
    return matchingKey ? HEADER_MAPPING[matchingKey as keyof typeof HEADER_MAPPING] : null;
  });
  
  if (mappedHeaders.filter(h => h === 'Name').length === 0) {
    alert('لم يتم العثور على عمود "الاسم" أو "Name" في ملف CSV. هذا العمود مطلوب.');
    return [];
  }

  const dataLines = lines.slice(1);
  
  const ingredients: Ingredient[] = dataLines.map((line, index) => {
    if (!line.trim()) return null; // Skip empty lines
    const values = line.split(delimiter);
    const ingredient: Partial<Ingredient> = { id: Date.now() + index, category: 'Other' }; // Default category
    
    mappedHeaders.forEach((key, i) => {
      const value = values[i] ? values[i].trim().replace(/"/g, '') : '';
      if (key) {
        if (key === 'Name' || key === 'description' || key === 'category') {
          (ingredient[key] as string) = value;
        } else {
          (ingredient[key] as number) = parseFloat(value) || 0;
        }
      }
    });

    return ingredient as Ingredient;
  }).filter((ing): ing is Ingredient => ing !== null);

  return ingredients;
};

const escapeCSVValue = (value: any): string => {
    if (value === null || value === undefined) {
        return '';
    }
    const stringValue = String(value);
    if (/[",\n\r]/.test(stringValue)) {
        return `"${stringValue.replace(/"/g, '""')}"`;
    }
    return stringValue;
};

export const exportIngredientsToCSV = (ingredients: Ingredient[], fileName: string = 'ingredients.csv') => {
    if (!ingredients.length) {
        alert('لا توجد مكونات لتصديرها.');
        return;
    }

    const columnOrder: (keyof Omit<Ingredient, 'id'>)[] = [
        'Name', 'Inclusion_pct', 'Price_USD_per_ton', 'CP_pct', 'ME_kcal_per_kg',
        'Ca_pct', 'avP_pct', 'Na_pct', 'K_pct', 'Cl_pct', 'Lys_pct', 'TSAA_pct',
        'Thr_pct', 'Val_pct', 'Ile_pct', 'Leu_pct', 'Arg_pct', 'Try_pct',
        'Starch_pct', 'CF_pct', 'NDF_pct', 'ADF_pct', 'Ash_pct', 'Choline_mg_per_kg',
        'category', 'description'
    ];

    const headers = columnOrder.map(key => COLUMN_HEADERS_AR[key] || key);
    
    const csvRows = ingredients.map(ingredient => {
        return columnOrder.map(key => {
            const value = ingredient[key as keyof Ingredient];
            return escapeCSVValue(value);
        }).join(',');
    });

    const csvString = [headers.join(','), ...csvRows].join('\n');
    
    // Add BOM for UTF-8 to support Arabic in Excel
    const blob = new Blob(['\uFEFF' + csvString], { type: 'text/csv;charset=utf-8;' });

    const link = document.createElement('a');
    if (link.download !== undefined) {
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', fileName);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }
};