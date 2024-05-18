import Link from 'next/link';

import { cn } from '@/lib/utils';
import { Button } from './ui/button';

interface NavButtonProps {
  href: string;
  label: string;
  isActive: boolean;
}

const NavButton = ({ href, isActive, label }: NavButtonProps) => {
  return (
    <Button
      asChild
      size="sm"
      variant="outline"
      className={cn(
        'w-full lg:w-auto justify-between font-normal hover:bg-white/20 hover:text-white border-none focus-visible:ring-offset-0 focus-visible:ring-transparent outline-none text-white focus:bg-white/30 transition',
        isActive ? 'bg-white/10 text-white' : 'bg-transparent'
      )}
    >
      <Link href={href}>{label}</Link>
    </Button>
  );
};

export { NavButton };
