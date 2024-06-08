'use client';

import { Edit, MoreHorizontal, Trash } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { openModal } from '@/redux/features/category-edit-modal-slice';
import { openDeleteModal } from '@/redux/features/category-delete-modal-slice';
import { useAppDispatch } from '@/redux/store';

interface ActionsProps {
  data: any;
}

const Actions = ({ data }: ActionsProps) => {
  const dispatch = useAppDispatch();

  const openModalHandler = (data: any) => {
    dispatch(openModal(data));
  };

  const openDeleteModalHandler = (data: any) => {
    dispatch(openDeleteModal(data));
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
        <DropdownMenuItem
          className="cursor-pointer"
          disabled={false}
          onClick={() => openDeleteModalHandler(data)}
        >
          <Trash className="size-4" />
          <DropdownMenuLabel>Delete</DropdownMenuLabel>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export { Actions };
