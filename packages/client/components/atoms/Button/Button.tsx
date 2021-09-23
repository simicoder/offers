import React, { memo } from 'react';

type Button = {
  readonly type?: 'submit' | 'reset' | 'button';
  readonly onClick?: () => void;
  readonly children: React.ReactNode;
};

export const Button = memo<Button>(({ type, onClick, children }) => {
  return (
    <button
      className="md:w-96 p-3 m-6 font-medium tracking-widest rounded-md text-white uppercase bg-main shadow-lg focus:outline-none hover:bg-hover hover:shadow-none"
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
});
