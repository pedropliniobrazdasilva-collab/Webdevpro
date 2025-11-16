import React from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  colorClass: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, colorClass }) => {
  return (
    <div className="relative bg-slate-800 p-6 rounded-lg shadow-lg overflow-hidden group">
      <div className={`absolute top-0 left-0 h-1 w-full bg-gradient-to-r ${colorClass}`}></div>
      <div className="flex justify-between items-center">
        <div>
          <p className="text-sm font-medium text-slate-400 uppercase tracking-wider">{title}</p>
          <p className="text-3xl font-bold text-white mt-1">{value}</p>
        </div>
        <div className="text-slate-500">
          {icon}
        </div>
      </div>
    </div>
  );
};

export default StatCard;
