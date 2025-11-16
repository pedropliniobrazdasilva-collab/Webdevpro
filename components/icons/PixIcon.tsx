import React from 'react';

export const PixIcon: React.FC<{ className?: string }> = ({ className = "h-6 w-6" }) => (
  <svg className={className} viewBox="0 0 512 512" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <g clipPath="url(#clip0_4_2)">
      <path d="M251.68 2.92L131.32 123.28L251.68 243.64L372.04 123.28L251.68 2.92Z" />
      <path d="M409.52 144.12L289.16 264.48L409.52 384.84L512 264.48L409.52 144.12Z" />
      <path d="M123.28 144.12L0 264.48L123.28 384.84L243.64 264.48L123.28 144.12Z" />
      <path d="M251.68 285.32L131.32 405.68H372.04L251.68 285.32Z" />
    </g>
    <defs>
      <clipPath id="clip0_4_2">
        <rect width="512" height="512" fill="white"/>
      </clipPath>
    </defs>
  </svg>
);
