import React from 'react';
import { cn } from 'src/lib/utils';
const Heading = ({ title = '', description = '', Icon, iconColor }) => {
  return (
    <div className="flex items-center px-4 w-full gap-4">
      {Icon && <Icon className={cn('w-10 h-10', iconColor)} />}
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold">{title}</h1>
        <h2 className="text-sm text-muted-foreground">{description}</h2>
      </div>
    </div>
  );
};

export default Heading;
