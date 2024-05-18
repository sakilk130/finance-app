'use client';

import { LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { RootState } from '@/redux/reducers';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { Avatar, AvatarFallback } from './ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { clearUser } from '@/redux/features/auth-slice';

const UserMenu = () => {
  const dispatch = useAppDispatch();
  const navigate = useRouter();

  const user = useAppSelector((state: RootState) => state.auth.user);
  const name = user?.name.split('').splice(0, 2).join('').toUpperCase();

  const handleLogout = () => {
    dispatch(clearUser());
    navigate.push('/sign-in');
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer">
          <AvatarFallback className="bg-gray-200 text-gray-500">
            <span>{name}</span>
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-60">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Avatar className="mr-2">
              <AvatarFallback className="bg-gray-200 text-gray-500">
                <span>{name}</span>
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col justify-center">
              <span className="font-semibold text-gray-800">{user?.name}</span>
              <span className="text-gray-500 text-sm">{user?.email}</span>
            </div>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer" onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export { UserMenu };
