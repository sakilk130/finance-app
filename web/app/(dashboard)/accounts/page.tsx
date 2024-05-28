'use client';

import { Plus } from 'lucide-react';

import { DataTable } from '@/components/data-table';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { openModal } from '@/redux/features/account-create-modal-slice';
import { useAppDispatch } from '@/redux/store';
import { Payment, columns } from './_components/columns';

const AccountsPage = () => {
  const dispatch = useAppDispatch();

  const openModalHandler = () => {
    dispatch(openModal());
  };

  const data: Payment[] = [
    {
      id: '728ed52f',
      amount: 100,
      status: 'pending',
      email: 'm@example.com',
    },
    {
      id: '728ed52f',
      amount: 100,
      status: 'processing',
      email: 'test@t.com',
    },
  ];

  return (
    <div className="max-w-screen-2xl mx-auto w-full -mt-24 pb-10">
      <Card className="border-none drop-shadow-sm">
        <CardHeader className="lg:flex lg:flex-row lg:justify-between lg:items-center">
          <CardTitle className="mb-5 lg:mb-0">Accounts Page</CardTitle>
          <Button type="button" onClick={openModalHandler}>
            <Plus size={16} />
            Add New
          </Button>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={data}
            filterKey="email"
            onDeleted={() => {}}
            disabled={false}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default AccountsPage;
