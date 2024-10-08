import { ReactNode, useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from './dropdown-menu';
import { EllipsisVertical } from 'lucide-react';

export const EllipsisButton = ({ children }: { children: ReactNode }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
      <DropdownMenuTrigger
        onClick={(e) => e.stopPropagation()}
        aria-label="Board options"
        className="cursor-pointer"
        asChild
      >
        <EllipsisVertical className=" text-gray-600" />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="space-y-1 bg-white dark:bg-gray-800 dark:text-gray-200 border dark:border-gray-700 rounded-md shadow-lg p-2 w-32"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
