import { cn } from '@/lib/utils';
import { ScrollArea } from '../ui/scroll-area';

interface BasicScrollAreaProps {
  children: React.ReactNode;
  className?: string;
}

export const BasicScrollArea = ({ children, className }: BasicScrollAreaProps) => {
  return (
    <ScrollArea className={cn('w-full !max-h-[calc(100vh-28vh)]', className)}>
      {children}
    </ScrollArea>
  );
};
