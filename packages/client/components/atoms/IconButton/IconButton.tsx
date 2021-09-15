import React, { memo } from 'react';

type Button = {
  readonly type?: 'submit' | 'reset' | 'button';
  readonly onClick?: () => void;
  readonly children: React.ReactNode;
};

export const IconButton = memo<Button>(({ type, onClick, children }) => {
  return (
    <button className="h-6 w-6 my-auto m-2" type={type} onClick={onClick}>
      {children}
    </button>
  );
});
