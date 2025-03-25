"use client"

import React, { useState } from 'react';

const BannerAdCalculator = () => {
  const [days, setDays] = useState(30);
  const [selectedSize, setSelectedSize] = useState(null);
  
  // Standard IAB banner ad sizes with descriptions and base rates
  const adSizes = [
    { name: 'Medium Rectangle', dimensions: '300×250', baseRate: 12, adType: 'display', description: 'High-performing ad size that works well embedded within text content' },
    { name: 'Leaderboard', dimensions: '728×90', baseRate: 15, adType: 'display', description: 'Horizontal banner typically placed at the top of a webpage' },
    { name: 'Mobile Banner', dimensions: '320×50', baseRate: 8, adType: 'display', description: 'Small horizontal banner optimized for mobile devices' },
    { name: 'Large Rectangle', dimensions: '336×280', baseRate: 14, adType: 'display', description: 'Slightly larger than medium rectangle, often used in-content' },
    { name: 'Wide Skyscraper', dimensions: '160×600', baseRate: 10, adType: 'display', description: 'Tall, narrow ad that appears on the side of webpages' },
    { name: 'Half Page', dimensions: '300×600', baseRate: 18, adType: 'display', description: 'Large format ad with high visibility and engagement' },
    { name: 'Billboard', dimensions: '970×250', baseRate: 20, adType: 'display', description: 'Large horizontal format for premium placement' },
    { name: 'In-Stream Video', dimensions: 'Various', baseRate: 35, adType: 'video', description: 'Video ad that plays before, during, or after video content' },
    { name: 'Outstream Video', dimensions: 'Various', baseRate: 30, adType: 'video', description: 'Video ad that appears within content, often auto-playing on scroll' },
    { name: 'Full-Site Takeover', dimensions: 'Multiple', baseRate: 75, adType: 'takeover', description: 'Premium package with multiple ad units across the entire site' },
    { name: 'Homepage Takeover', dimensions: 'Multiple', baseRate: 60, adType: 'takeover', description: 'Premium visibility with multiple ad units on the homepage' }
  ];
  
  // Calculate rate with volume discount
  const calculateRate = (baseRate, days) => {
    let discount = 0;
    
    if (days >= 365) {
      discount = 0.20; // 20% discount for 1 year or longer
    } else if (days >= 150) {
      discount = 0.15; // 15% discount for more than 5 months
    } else if (days <= 30) {
      discount = 0.10; // 10% discount for up to 1 month
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
    setDays(Math.max(1, Math.min(365 * 2, value))); // Limit between 1-730 days (2 years)
  };

  // Get background color based on ad type
  const getAdTypeColor = (adType) => {
    switch (adType) {
      case 'video':
        return 'bg-purple-50 hover:bg-purple-100';
      case 'takeover':
        return 'bg-amber-50 hover:bg-amber-100';
      default:
        return 'bg-white hover:bg-gray-50';
    }
  };
  
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md text-black">
      <h1 className="text-2xl font-bold mb-6 text-center text-black">Banner Ad Rate Calculator</h1>
      
      {/* Days input */}
      <div className="mb-8 bg-gray-50 p-4 rounded-lg">
        <label className="block text-lg font-medium mb-2 text-black">Campaign Duration</label>
        <div className="flex items-center">
          <input
            type="number"
            value={days}
            onChange={handleDaysChange}
            min="1"
            max="730"
            className="w-24 p-2 border rounded-md mr-3 text-black"
          />
          <span className="text-black font-medium">days</span>
          
          <div className="ml-8 text-sm">
            <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full font-medium">
              {days >= 365 ? '20% discount' : days >= 150 ? '15% discount' : days <= 30 ? '10% discount' : 'No discount'}
            </span>
          </div>
        </div>
      </div>

      {/* Ad Type Filter */}
      <div className="mb-6 flex flex-wrap gap-2">
        <span className="text-black font-medium">Ad Types:</span>
        <div className="flex gap-2">
          <span className="px-3 py-1 bg-white border rounded-md text-sm">Display</span>
          <span className="px-3 py-1 bg-purple-50 border rounded-md text-sm">Video</span>
          <span className="px-3 py-1 bg-amber-50 border rounded-md text-sm">Takeover</span>
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
                isSelected ? 'ring-2 ring-blue-500' : ''
              } ${getAdTypeColor(size.adType)}`}
              onClick={() => handleSizeClick(size)}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-lg text-black">{size.name}</h3>
                  <p className="text-black text-sm">{size.dimensions}</p>
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
                      {size.adType === 'display' && (
                        <div className="inline-block w-12 h-8 border border-dashed border-gray-400 flex items-center justify-center mr-2 text-black">Ad</div>
                      )}
                      {size.adType === 'video' && (
                        <div className="inline-block w-12 h-8 border border-dashed border-gray-400 flex items-center justify-center mr-2 text-black bg-purple-50">▶</div>
                      )}
                      {size.adType === 'takeover' && (
                        <div className="inline-block w-12 h-8 border border-dashed border-gray-400 flex items-center justify-center mr-2 text-black bg-amber-50">⭐</div>
                      )}
                      {size.adType === 'takeover' ? 'Premium placement' : 'Standard placement'}
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
      {selectedSize && selectedSize.adType === 'display' && (
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

      {/* Video ad preview */}
      {selectedSize && selectedSize.adType === 'video' && (
        <div className="mt-8 p-4 bg-purple-50 rounded-lg">
          <h2 className="text-lg font-bold mb-4 text-black">Video Ad Format</h2>
          <div className="flex flex-col items-center text-black">
            <div className="w-full max-w-md aspect-video bg-gray-100 border-2 border-dashed border-purple-300 flex items-center justify-center">
              <div className="text-center">
                <div className="text-4xl mb-2">▶</div>
                <div>{selectedSize.name}</div>
              </div>
            </div>
            <p className="mt-4 text-sm">Video ads offer higher engagement and brand recall rates.</p>
          </div>
        </div>
      )}

      {/* Takeover ad preview */}
      {selectedSize && selectedSize.adType === 'takeover' && (
        <div className="mt-8 p-4 bg-amber-50 rounded-lg">
          <h2 className="text-lg font-bold mb-4 text-black">Takeover Format</h2>
          <div className="flex flex-col items-center text-black">
            <div className="w-full max-w-md aspect-[4/3] bg-gray-100 border-2 border-dashed border-amber-300 flex items-center justify-center">
              <div className="relative w-full h-full">
                <div className="absolute top-0 w-full h-12 bg-amber-100 flex items-center justify-center border border-dashed border-amber-300">Header Banner</div>
                <div className="absolute top-16 left-4 w-32 h-64 bg-amber-100 flex items-center justify-center border border-dashed border-amber-300">Sidebar</div>
                <div className="absolute top-16 right-4 w-32 h-64 bg-amber-100 flex items-center justify-center border border-dashed border-amber-300">Sidebar</div>
                <div className="absolute bottom-4 w-full h-12 bg-amber-100 flex items-center justify-center border border-dashed border-amber-300">Footer</div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-4 bg-amber-100 rounded-full border border-dashed border-amber-300 text-xl font-bold">⭐</div>
              </div>
            </div>
            <p className="mt-4 text-sm">Takeover ads command premium rates with maximum visibility across multiple placements.</p>
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