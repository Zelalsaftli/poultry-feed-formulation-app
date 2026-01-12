
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white mt-8 py-6 border-t">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-700">
        
        <h3 className="text-lg font-bold text-gray-800 mb-2">تقديم الطلاب</h3>
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-6">
          <p className="font-semibold text-teal-600">منار محمد علي سالم</p>
          <p className="font-semibold text-indigo-600">رؤى فراس الدبيات</p>
          <p className="font-semibold text-rose-600">لجين مصعب شاهين</p>
        </div>

        <h3 className="text-lg font-bold text-gray-800 mb-2">إشراف</h3>
        <div>
          <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-2">
            <p className="font-semibold text-amber-700">الدكتور ظلال الصافتلي</p>
            <span className="text-gray-400 font-sans">&</span>
            <p className="font-semibold text-cyan-700">المهندسة بتول المير سليمان</p>
          </div>
          <p className="text-sm text-gray-600 mt-1">قسم الإنتاج الحيواني - كلية الهندسة الزراعية - جامعة حماه</p>
        </div>

        <div className="mt-8 pt-4 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            &copy; 2026 - جميع الحقوق محفوظة
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;