'use client';

import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface SafeLinkProps {
  href: string;
  className?: string;
  children: React.ReactNode;
  prefetch?: boolean;
  replace?: boolean;
  scroll?: boolean;
  shallow?: boolean;
  onClick?: (e: React.MouseEvent) => void;
}

const SafeLink = forwardRef<HTMLAnchorElement, SafeLinkProps>(
  ({ href, className, children, onClick, ...props }, ref) => {
    return (
      <a
        ref={ref}
        href={href}
        className={cn(className)}
        suppressHydrationWarning={true}
        onClick={onClick}
        {...props}
      >
        {children}
      </a>
    );
  }
);

SafeLink.displayName = 'SafeLink';

export default SafeLink;