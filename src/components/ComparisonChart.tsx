import React, { useRef, useEffect } from 'react';
import Chart from 'chart.js/auto';
import type { MixAnalysisResult, RecommendationProfile } from '../types';
import { ANALYSIS_RESULTS_AR } from '../constants';

interface ComparisonChartProps {
  results: MixAnalysisResult;
  recommendations: RecommendationProfile;
}

const ComparisonChart: React.FC<ComparisonChartProps> = ({ results, recommendations }) => {
    const chartRef = useRef<HTMLCanvasElement>(null);
    const chartInstance = useRef<Chart | null>(null);

    useEffect(() => {
        if (!chartRef.current || !results || !recommendations) return;
        
        const chartKeys = [
            'nutrients.ME_kcal_per_kg',
            'nutrients.Ca_pct',
            'nutrients.avP_pct',
            'nutrients.Lys_pct',
            'nutrients.TSAA_pct',
            'nutrients.Thr_pct',
            'nutrients.Arg_pct',
            'nutrients.Val_pct',
            'nutrients.Ile_pct',
        ].filter(key => recommendations[key]); // Only include keys with recommendations

        const labels = chartKeys.map(key => 
            ANALYSIS_RESULTS_AR[key]?.replace(/%/g, '').replace(/\(.*\)/, '').trim()
        );

        const getNutrientValue = (key: string): number => {
            const parts = key.split('.');
            if (parts.length === 2 && parts[0] === 'nutrients') {
                return results.nutrients[parts[1]] ?? 0;
            }
            return (results[key] as number) ?? 0;
        }

        const data = chartKeys.map(key => {
            const rec = recommendations[key];
            const actual = getNutrientValue(key);

            let target = (rec.min + rec.max) / 2;
            if (rec.max === Infinity || rec.max === 0) { // If no upper limit, target is the minimum
                target = rec.min;
            }
            if(target === 0) target = 1; // Avoid division by zero for nutrients with 0 target

            const actualNormalized = (actual / target) * 100;
            const minNormalized = (rec.min / target) * 100;
            let maxNormalized = (rec.max / target) * 100;

            if (rec.max === Infinity) {
                // For min-only recs, show a wider acceptable range visually
                maxNormalized = Math.max(minNormalized * 1.5, actualNormalized * 1.1); 
            }

            return {
                actualNormalized,
                rangeNormalized: [minNormalized, maxNormalized],
                raw: {
                    actual: actual,
                    min: rec.min,
                    max: rec.max,
                    unit: rec.unit
                }
            };
        });

        // Destroy previous chart instance
        if (chartInstance.current) {
            chartInstance.current.destroy();
        }

        const ctx = chartRef.current.getContext('2d');
        if (!ctx) return;

        chartInstance.current = new Chart(ctx, {
            type: 'bar',
            data: {
                labels,
                datasets: [
                    {
                        label: 'النطاق الموصى به',
                        data: data.map(d => d.rangeNormalized),
                        backgroundColor: 'rgba(229, 231, 235, 0.8)', // gray-200
                        borderColor: 'rgba(209, 213, 219, 1)', // gray-300
                        borderWidth: 1,
                        barPercentage: 1.0,
                        categoryPercentage: 0.7,
                        order: 2,
                    },
                    {
                        label: 'قيمة الخلطة',
                        data: data.map(d => d.actualNormalized),
                        backgroundColor: (context) => {
                            const value = context.dataset.data[context.dataIndex] as number;
                            const [min, max] = data[context.dataIndex].rangeNormalized;
                            if (value >= min && value <= max) {
                                return 'rgba(20, 184, 166, 0.8)'; // teal-500
                            }
                            return 'rgba(239, 68, 68, 0.8)'; // red-500
                        },
                        borderColor: (context) => {
                            const value = context.dataset.data[context.dataIndex] as number;
                            const [min, max] = data[context.dataIndex].rangeNormalized;
                            if (value >= min && value <= max) {
                                return 'rgba(13, 148, 136, 1)'; // teal-600
                            }
                            return 'rgba(220, 38, 38, 1)'; // red-600
                        },
                        borderWidth: 1,
                        barPercentage: 0.5,
                        categoryPercentage: 0.6,
                        order: 1,
                    },
                ]
            },
            options: {
                indexAxis: 'y',
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: 'مقارنة مرئية للعناصر الغذائية الرئيسية',
                        font: { size: 18, family: 'Tajawal' },
                        color: '#374151',
                        padding: { bottom: 20 }
                    },
                    legend: {
                        position: 'bottom',
                        labels: {
                            font: { family: 'Tajawal' }
                        }
                    },
                    tooltip: {
                        bodyFont: { family: 'Tajawal' },
                        titleFont: { family: 'Tajawal' },
                        callbacks: {
                            label: function(context) {
                                const i = context.dataIndex;
                                const raw = data[i].raw;
                                const dsLabel = context.dataset.label || '';
                                const unit = raw.unit || '';
                                
                                if (dsLabel.includes('الخلطة')) {
                                   return `الخلطة: ${raw.actual.toFixed(3)} ${unit}`;
                                }
                                if (dsLabel.includes('النطاق')) {
                                   const maxStr = raw.max === Infinity ? '∞' : raw.max.toFixed(3);
                                   return `التوصية: ${raw.min.toFixed(3)} - ${maxStr} ${unit}`;
                                }
                                return '';
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'النسبة من متوسط التوصية (%)',
                            font: { size: 14, family: 'Tajawal' },
                            color: '#4B5563'
                        },
                        grid: {
                            color: (context) => (context.tick.value === 100 ? 'rgba(13, 148, 136, 0.6)' : Chart.defaults.borderColor) as string,
                            lineWidth: (context) => (context.tick.value === 100 ? 2 : 1),
                        },
                        ticks: {
                            callback: value => value + '%'
                        }
                    },
                    y: {
                        ticks: {
                            font: {
                                size: 13,
                                family: 'Tajawal'
                            }
                        }
                    }
                }
            }
        });

        return () => {
            chartInstance.current?.destroy();
        };
    }, [results, recommendations]);

    return <canvas ref={chartRef} />;
};

export default ComparisonChart;
