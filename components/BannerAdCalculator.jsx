"use client"

import React, { useState } from 'react';

const BannerAdCalculator = () => {
  const [days, setDays] = useState(7);
  const [selectedSize, setSelectedSize] = useState(null);
  
  // Standard IAB banner ad sizes with descriptions and base rates
  const adSizes = [
    { name: 'Medium Rectangle', dimensions: '300×250', baseRate: 12, description: 'High-performing ad size that works well embedded within text content' },
    { name: 'Leaderboard', dimensions: '728×90', baseRate: 15, description: 'Horizontal banner typically placed at the top of a webpage' },
    { name: 'Mobile Banner', dimensions: '320×50', baseRate: 8, description: 'Small horizontal banner optimized for mobile devices' },
    { name: 'Large Rectangle', dimensions: '336×280', baseRate: 14, description: 'Slightly larger than medium rectangle, often used in-content' },
    { name: 'Wide Skyscraper', dimensions: '160×600', baseRate: 10, description: 'Tall, narrow ad that appears on the side of webpages' },
    { name: 'Half Page', dimensions: '300×600', baseRate: 18, description: 'Large format ad with high visibility and engagement' },
    { name: 'Billboard', dimensions: '970×250', baseRate: 20, description: 'Large horizontal format for premium placement' },
  ];
  
  // Calculate rate with volume discount
  const calculateRate = (baseRate, days) => {
    let discount = 0;
    
    if (days >= 30) {
      discount = 0.25; // 25% discount for 30+ days
    } else if (days >= 14) {
      discount = 0.15; // 15% discount for 14-29 days
    } else if (days >= 7) {
      discount = 0.05; // 5% discount for 7-13 days
    }
    
    const dailyRate = baseRate * (1 - discount);
    return {
      dailyRate: dailyRate.toFixed(2),
      totalRate: (dailyRate * days).toFixed(2),
      discount: (discount * 100).toFixed(0)
    };
  };
  
  // Handle size selection
  const handleSizeClick = (size) => {
    setSelectedSize(selectedSize === size ? null : size);
  };
  
  // Handle days input change
  const handleDaysChange = (e) => {
    const value = parseInt(e.target.value) || 1;
    setDays(Math.max(1, Math.min(365, value))); // Limit between 1-365 days
  };
  
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md text-black">
      <h1 className="text-2xl font-bold mb-6 text-center text-black">Our Time Press Banner Ad Rate Calculator</h1>
      
      {/* Days input */}
      <div className="mb-8 bg-gray-50 p-4 rounded-lg">
        <label className="block text-lg font-medium mb-2 text-black">Campaign Duration</label>
        <div className="flex items-center">
          <input
            type="number"
            value={days}
            onChange={handleDaysChange}
            min="1"
            max="365"
            className="w-24 p-2 border rounded-md mr-3 text-black"
          />
          <span className="text-black font-medium">days</span>
          
          <div className="ml-8 text-sm">
            <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full font-medium">
              {days >= 30 ? '25% discount' : days >= 14 ? '15% discount' : days >= 7 ? '5% discount' : 'No discount'}
            </span>
          </div>
        </div>
      </div>
      
      {/* Ad Size Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {adSizes.map((size) => {
          const rates = calculateRate(size.baseRate, days);
          const isSelected = selectedSize === size;
          
          return (
            <div
              key={size.name}
              className={`border rounded-lg p-4 cursor-pointer transition-all ${
                isSelected ? 'ring-2 ring-blue-500 bg-blue-50' : 'hover:bg-gray-50'
              }`}
              onClick={() => handleSizeClick(size)}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-lg text-black">{size.name}</h3>
                  <p className="text-black text-sm">{size.dimensions} pixels</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-lg text-black">${rates.dailyRate}/day</p>
                  <p className="text-sm text-black">
                    ${size.baseRate} base {rates.discount !== "0" && `(${rates.discount}% off)`}
                  </p>
                </div>
              </div>
              
              <p className="text-black text-sm mt-2">{size.description}</p>
              
              {isSelected && (
                <div className="mt-4 pt-4 border-t">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-black">Total for {days} days:</span>
                    <span className="font-bold text-xl text-black">${rates.totalRate}</span>
                  </div>
                  
                  <div className="mt-4 flex justify-between text-sm text-black">
                    <div>
                      <div className="inline-block w-12 h-8 border border-dashed border-gray-400 flex items-center justify-center mr-2 text-black">Ad</div>
                      Actual size will vary
                    </div>
                    <button className="px-4 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                      Select
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
      
      {/* Visual preview section */}
      {selectedSize && (
        <div className="mt-8 p-4 bg-gray-50 rounded-lg">
          <h2 className="text-lg font-bold mb-4 text-black">Visual Size Preview</h2>
          <div className="flex flex-wrap justify-center text-black">
            {selectedSize.dimensions.split('×').map((dim, i) => parseInt(dim)).join('×')}
            <div 
              className="border-2 border-dashed border-gray-400 bg-gray-100 flex items-center justify-center text-black"
              style={{
                width: `${Math.min(parseInt(selectedSize.dimensions.split('×')[0]), 600)}px`,
                height: `${Math.min(parseInt(selectedSize.dimensions.split('×')[1]), 280)}px`,
              }}
            >
              {selectedSize.name} Ad Space
            </div>
          </div>
        </div>
      )}
      
      <div className="mt-8 text-center text-sm text-black font-medium">
        Note: Rates are example values. Contact our sales team for custom quotes.
      </div>
    </div>
  );
};

export default BannerAdCalculator;