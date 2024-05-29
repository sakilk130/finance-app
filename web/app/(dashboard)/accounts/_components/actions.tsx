'use client';

import { Edit, MoreHorizontal } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { openModal } from '@/redux/features/account-edit-modal-slice';
import { useAppDispatch } from '@/redux/store';

interface ActionsProps {
  data: any;
}

const Actions = ({ data }: ActionsProps) => {
  const dispatch = useAppDispatch();

  const openModalHandler = (data: any) => {
    dispatch(openModal(data));
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="size-8 p-0">
          <MoreHorizontal className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          className="cursor-pointer"
          disabled={false}
          onClick={() => openModalHandler(data)}
        >
          <Edit className="size-4" />
          <DropdownMenuLabel>Edit</DropdownMenuLabel>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export { Actions };
