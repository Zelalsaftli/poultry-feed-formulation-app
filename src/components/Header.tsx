import React from 'react';
import { Page } from '../types';

interface HeaderProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

const Header: React.FC<HeaderProps> = ({
  currentPage,
  onNavigate,
}) => {

  return (
    <header className="bg-white shadow-md w-full">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-teal-600">تطبيق خلطات الدواجن</h1>
          </div>
          <nav className="hidden md:flex items-center space-x-6 space-x-reverse no-print">
            <button
              onClick={() => onNavigate(Page.SELECTION)}
              className={`px-3 py-2 rounded-md text-sm font-medium ${currentPage === Page.SELECTION ? 'bg-teal-100 text-teal-700' : 'text-gray-500 hover:bg-gray-100'}`}
            >
              1. اختيار المكونات
            </button>
            <button
              onClick={() => onNavigate(Page.INPUT)}
              className={`px-3 py-2 rounded-md text-sm font-medium ${currentPage === Page.INPUT ? 'bg-teal-100 text-teal-700' : 'text-gray-500 hover:bg-gray-100'}`}
            >
              2. تركيب الخلطة
            </button>
            <button
              onClick={() => onNavigate(Page.ANALYSIS)}
              className={`px-3 py-2 rounded-md text-sm font-medium ${currentPage === Page.ANALYSIS ? 'bg-teal-100 text-teal-700' : 'text-gray-500 hover:bg-gray-100'}`}
            >
              3. التحليل والتقرير
            </button>
          </nav>
          <div className="flex items-center space-x-2 space-x-reverse no-print">
            <button
              onClick={() => window.print()}
              className="flex items-center gap-2 bg-teal-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-teal-700 transition-colors"
              title="طباعة الصفحة"
            >
              <span>طباعة</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5 4v3H4a2 2 0 00-2 2v6a2 2 0 002 2h12a2 2 0 002-2V9a2 2 0 00-2-2h-1V4a2 2 0 00-2-2H7a2 2 0 00-2 2zm8 0H7v3h6V4zm0 8H7v4h6v-4z" clipRule="evenodd" />
              </svg>
            </button>
            <button
              onClick={() => window.close()}
              className="flex items-center gap-2 bg-red-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-red-700 transition-colors"
              title="خروج من التطبيق"
            >
              <span>خروج</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" style={{ transform: 'scaleX(-1)' }}>
                <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;