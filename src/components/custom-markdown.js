import React from 'react';
import ReactMarkdown from 'react-markdown';
import { cn } from 'src/lib/utils';

const CustomMarkdown = ({ content = '', className = '' }) => {
  return (
    <ReactMarkdown
      components={{
        pre: ({ ...props }) => (
          <div className="overflow-auto w-full my-2 rounded-lg p-2 bg-black/10">
            <pre {...props} />
          </div>
        ),
        code: ({ ...props }) => (
          <code
            className="bg-black/10 rounded-lg p-1"
            //   inline={inline ? 'true' : 'false'}
            {...props}
          />
        ),
      }}
      className={cn('text-sm leading-7 overflow-hidden', className)}
    >
      {content || ' '}
    </ReactMarkdown>
  );
};

export default CustomMarkdown;
