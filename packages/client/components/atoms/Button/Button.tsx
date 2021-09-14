import React, { memo } from 'react';

type Button = {
  readonly type?: 'submit' | 'reset' | 'button';
  readonly onClick?: () => void;
  readonly children: React.ReactNode;
};

export const Button = memo<Button>(({ type, onClick, children }) => {
  return (
    <button
      className="w-full py-3 mt-6 font-medium tracking-widest text-white uppercase bg-black shadow-lg focus:outline-none hover:bg-gray-900 hover:shadow-none"
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
});
