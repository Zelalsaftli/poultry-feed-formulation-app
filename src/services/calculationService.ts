import type { Ingredient, MixAnalysisResult, Enzyme } from '../types';

const sumProduct = (inclusions: number[], values: number[]): number => {
  return inclusions.reduce((acc, inclusion, i) => acc + (inclusion * (values[i] || 0)), 0);
};

export const calculateMixAnalysis = (ingredients: Ingredient[], enzymes: Enzyme[]): MixAnalysisResult => {
  if (!ingredients || ingredients.length === 0) {
    return { 
      totalInclusion: 0,
      totalCostPerTon: 0,
      totalCostPer100kg: 0,
      nutrients: {}
    };
  }

  const inclusions = ingredients.map(ing => ing.Inclusion_pct);
  const totalInclusion = inclusions.reduce((sum, val) => sum + val, 0);

  const nutrientKeys = Object.keys(ingredients[0] || {}).filter(
    key => key !== 'id' && key !== 'Name' && key !== 'Inclusion_pct' && key !== 'Price_USD_per_ton' && key !== 'category' && key !== 'description'
  );

  const results: Record<string, number> = {};

  nutrientKeys.forEach(key => {
    const values = ingredients.map(ing => ing[key as keyof Ingredient] as number);
    // بناءً على طلب المستخدم، يتم حساب قيم المغذيات على أساس خلطة إجمالية من 100 جزء.
    // يتم حساب قيمة كل مغذي كمجموع مساهمات كل مكون (نسبة الإدراج * قيمة المغذي) / 100.
    results[key] = sumProduct(inclusions, values) / 100;
  });

  // Apply enzyme matrices
  const activeEnzymes = enzymes.filter(e => e.dosage_g_per_ton > 0);
  activeEnzymes.forEach(enzyme => {
    for (const key in enzyme.matrix) {
      if (results[key] !== undefined) {
        const matrixValue = enzyme.matrix[key as keyof typeof enzyme.matrix]!;
        // بناءً على ملاحظات المستخدم، فإن المساهمة الغذائية للأنزيم ثابتة طالما تم تضمينه،
        // بغض النظر عن الجرعة المحددة. الجرعة نفسها ستؤثر فقط على التكلفة.
        results[key] += matrixValue;
      }
    }
  });


  // Special calculations (re-calculate after applying enzymes)
  results.MECP_Ratio = results.CP_pct > 0 ? results.ME_kcal_per_kg / results.CP_pct : 0;
  results.CaAvP_Ratio = results.avP_pct > 0 ? results.Ca_pct / results.avP_pct : 0;
  results.K_Cl_Na_Ratio = results.Na_pct > 0 ? (results.K_pct + results.Cl_pct) / results.Na_pct : 0;
  results.dEB = 434.78 * results.Na_pct + 256.4 * results.K_pct - 281.69 * results.Cl_pct;
  
  // Calculate cost per ton.
  // The logic is to determine the cost of a batch of size `totalInclusion` kg,
  // then normalize that cost to a 1-ton (1000 kg) basis.
  const ingredientCostForBatch = ingredients.reduce((acc, ing) => {
    // Cost for 'Inclusion_pct' kg of an ingredient: (Inclusion_pct kg) * (Price $/kg)
    // Price $/kg = Price $/ton / 1000
    const cost = ing.Inclusion_pct * ((ing.Price_USD_per_ton || 0) / 1000);
    return acc + cost;
  }, 0);

  // The batch size is `totalInclusion` kg.
  const costPerKgOfMix = totalInclusion > 0 ? ingredientCostForBatch / totalInclusion : 0;
  
  const totalIngredientCostPerTon = costPerKgOfMix * 1000;

  const enzymeCostPerTon = activeEnzymes.reduce((acc, enzyme) => {
    // dosage is in g/ton of feed. Price is in $/ton of enzyme.
    const dosageInTons = enzyme.dosage_g_per_ton / 1_000_000; // Convert g/ton to ton/ton
    return acc + (dosageInTons * (enzyme.Price_USD_per_ton || 0));
  }, 0);

  const totalCostPerTon = totalIngredientCostPerTon + enzymeCostPerTon;

  return {
    totalInclusion,
    totalCostPerTon,
    totalCostPer100kg: totalCostPerTon / 10,
    nutrients: results
  };
};