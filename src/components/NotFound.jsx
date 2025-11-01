import React, { useMemo } from "react";
import text from "../languages/en.json";
import { Link } from "react-router-dom";
import { routes } from "../Routes";

export default function NotFound() {
  const categories = useMemo(
    () => [
      text.categoriesinnotfoundpage.women,
      text.categoriesinnotfoundpage.men,
      text.categoriesinnotfoundpage.accessories,
      text.categoriesinnotfoundpage.newarrivals,
      text.categoriesinnotfoundpage.sale,
    ],
    []
  );

  return (
    <div className="min-h-screen bg-white flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <div className="h-0.5 w-12 bg-gray-800" />
                <span className="text-sm tracking-wider text-gray-600 uppercase">
                  {text.page404}
                </span>
              </div>
              <h1 className="text-6xl md:text-7xl font-serif text-gray-900">
                {text.pagenot}
                <br />
                {text.found}
              </h1>
            </div>

            <p className="text-gray-600 text-lg leading-relaxed max-w-md">
              {text.notfoundpagedescription}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link
                to={routes.home}
                className="inline-flex items-center justify-center space-x-2 bg-gray-900 text-white px-8 py-4 hover:bg-gray-800 transition-colors group"
              >
                <svg
                  className="w-5 h-5 group-hover:-translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
                <span className="tracking-wide">{text.gobackhome}</span>
              </Link>
              <Link
                to={routes.collection}
                className="inline-flex items-center justify-center space-x-2 border-2 border-gray-900 text-gray-900 px-8 py-4 hover:bg-gray-900 hover:text-white transition-colors group"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>

                <span className="tracking-wide">{text.browsecollections}</span>
              </Link>
            </div>

            {/* Quick Links */}
            <div className="pt-8 border-t border-gray-200 mt-8">
              <p className="text-sm text-gray-500 mb-4 tracking-wide uppercase">
                {text.popularcategories}
              </p>
              <div className="flex flex-wrap gap-3">
                {categories.map((category) => (
                  <div
                    key={category}
                    className="text-sm text-gray-700 cursor-default transition-colors border-b border-transparent"
                  >
                    {category}
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* Right Image Area */}
          <div className="relative">
            <div className="bg-linear-to-br from-pink-100 to-pink-200 rounded-lg overflow-hidden aspect-square flex items-center justify-center">
              <div className="text-center space-y-6 p-8">
                <div className="relative">
                  <span className="text-[200px] font-serif text-white/30 leading-none">404</span>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center shadow-lg">
                      <svg className="w-16 h-16 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                  </div>
                </div>
                
                {/* Decorative elements */}
                <div className="flex justify-center space-x-2">
                  <div className="w-2 h-2 bg-pink-500 rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-pink-400 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                  <div className="w-2 h-2 bg-pink-300 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
                </div>
              </div>
            </div>
            
            {/* Floating decoration */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-gray-900 rounded-full opacity-10"></div>
            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-pink-500 rounded-full opacity-20"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
