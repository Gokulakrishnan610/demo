import React from 'react';
import { BarChart3, TrendingUp } from 'lucide-react';

const ProgressChart: React.FC = () => {
  const metrics = [
    { name: 'Revenue', current: 320, target: 400, color: 'bg-blue-500' },
    { name: 'Collection', current: 350, target: 400, color: 'bg-green-500' },
    { name: 'New Business', current: 280, target: 400, color: 'bg-purple-500' },
    { name: 'Human Capital', current: 18, target: 20, color: 'bg-orange-500', unit: 'K' },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">Performance Analytics</h3>
          <p className="text-gray-600">Current vs Target Comparison</p>
        </div>
        <div className="bg-blue-50 p-3 rounded-xl">
          <BarChart3 className="w-6 h-6 text-blue-600" />
        </div>
      </div>
      
      <div className="space-y-6">
        {metrics.map((metric, index) => {
          const percentage = (metric.current / metric.target) * 100;
          const unit = metric.unit || 'Cr';
          
          return (
            <div key={index} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-gray-800">{metric.name}</span>
                <div className="text-right">
                  <span className="text-lg font-bold text-gray-800">
                    ₹{metric.current}{unit} / ₹{metric.target}{unit}
                  </span>
                  <div className="text-sm text-gray-500">
                    {percentage.toFixed(1)}% achieved
                  </div>
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className={`h-3 rounded-full transition-all duration-700 ${metric.color}`}
                  style={{ width: `${Math.min(percentage, 100)}%` }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl">
        <div className="flex items-center space-x-2 text-blue-700">
          <TrendingUp className="w-5 h-5" />
          <span className="font-semibold">Overall Progress: 82.5%</span>
        </div>
        <p className="text-sm text-blue-600 mt-1">
          Strong performance across all key metrics with room for growth in new business acquisition.
        </p>
      </div>
    </div>
  );
};

export default ProgressChart;