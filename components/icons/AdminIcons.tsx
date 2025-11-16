import React from 'react';

const iconProps = {
  className: "h-8 w-8",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  strokeWidth: "1.5",
};

export const TotalOrdersIcon: React.FC = () => (
  <svg {...iconProps}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
  </svg>
);

export const PendingOrdersIcon: React.FC = () => (
    <svg {...iconProps}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

export const CompletedOrdersIcon: React.FC = () => (
    <svg {...iconProps}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

export const TotalRevenueIcon: React.FC = () => (
  <svg {...iconProps}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.75A.75.75 0 013 4.5h.75m0 0h.75A.75.75 0 015.25 6v.75m0 0v-.75A.75.75 0 015.25 4.5h-.75m0 0H3.75m9 12l-3-3m0 0l-3 3m3-3v12.75m0-12.75a.75.75 0 01.75-.75h.75a.75.75 0 01.75.75v.75m0 0h-.75a.75.75 0 01-.75-.75v-.75m0 0a.75.75 0 01.75-.75h.75a.75.75 0 01.75.75v.75m0 0h-.75a.75.75 0 01-.75-.75V15m-4.5 0a.75.75 0 01.75-.75h.75a.75.75 0 01.75.75v.75m0 0h-.75a.75.75 0 01-.75-.75V15" />
  </svg>
);

export const RefreshIcon: React.FC = () => (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0011.667 0l3.182-3.182m0-11.667a8.25 8.25 0 00-11.667 0L2.985 7.985" />
    </svg>
);