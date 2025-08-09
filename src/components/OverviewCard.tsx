import React from 'react';
import { Building2, TrendingUp, Users, DollarSign } from 'lucide-react';

const OverviewCard: React.FC = () => {
  return (
    <div className="bg-neutral-900/70 rounded-2xl shadow-2xl text-white p-8 mb-8 border border-neutral-800">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-bold mb-2">Organization Overview</h2>
          <p className="text-neutral-400 text-lg">Strategic Business Performance</p>
        </div>
        <div className="bg-neutral-900/70 p-4 rounded-xl backdrop-blur-sm border border-neutral-800">
          <Building2 className="w-10 h-10 text-neutral-300" />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-neutral-900/70 rounded-xl p-4 backdrop-blur-sm border border-neutral-800">
          <div className="flex items-center space-x-3 mb-2">
            <DollarSign className="w-6 h-6 text-emerald-300" />
            <span className="text-sm font-medium text-neutral-300">Total Value</span>
          </div>
          <div className="text-2xl font-bold">₹500 Cr</div>
          <div className="text-sm text-neutral-500">Organization Wide</div>
        </div>
        
        <div className="bg-neutral-900/70 rounded-xl p-4 backdrop-blur-sm border border-neutral-800">
          <div className="flex items-center space-x-3 mb-2">
            <TrendingUp className="w-6 h-6 text-neutral-300" />
            <span className="text-sm font-medium text-neutral-300">Growth Rate</span>
          </div>
          <div className="text-2xl font-bold">15.2%</div>
          <div className="text-sm text-neutral-500">Year over Year</div>
        </div>
        
        <div className="bg-neutral-900/70 rounded-xl p-4 backdrop-blur-sm border border-neutral-800">
          <div className="flex items-center space-x-3 mb-2">
            <Users className="w-6 h-6 text-neutral-300" />
            <span className="text-sm font-medium text-neutral-300">Team Size</span>
          </div>
          <div className="text-2xl font-bold">20K+</div>
          <div className="text-sm text-neutral-500">Human Capital</div>
        </div>
        
        <div className="bg-neutral-900/70 rounded-xl p-4 backdrop-blur-sm border border-neutral-800">
          <div className="flex items-center space-x-3 mb-2">
            <TrendingUp className="w-6 h-6 text-neutral-300" />
            <span className="text-sm font-medium text-neutral-300">EBITDA</span>
          </div>
          <div className="text-2xl font-bold">50%</div>
          <div className="text-sm text-neutral-500">Target Margin</div>
        </div>
      </div>
    </div>
  );
};

export default OverviewCard;