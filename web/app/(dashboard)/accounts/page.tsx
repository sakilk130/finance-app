'use client';

import { Loader2, Plus } from 'lucide-react';

import { DataTable } from '@/components/data-table';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { openModal } from '@/redux/features/account-create-modal-slice';
import { useAppDispatch } from '@/redux/store';
import { columns } from './_components/columns';
import { useFetch } from '@/hooks/use-api';
import { getAccountsService } from '@/services/account';
import { QUERY_KEY } from '@/constants';

const AccountsPage = () => {
  const dispatch = useAppDispatch();

  const openModalHandler = () => {
    dispatch(openModal());
  };

  const { data, isLoading } = useFetch(
    [QUERY_KEY.ACCOUNTS],
    getAccountsService
  );

  if (isLoading)
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
            <div className="flex justify-center items-center h-96 w-full">
              <Loader2 className="text-slate-300 animate-spin size-6" />
            </div>
          </CardContent>
        </Card>
      </div>
    );

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
            data={data?.data ?? []}
            filterKey="name"
            onDeleted={() => {}}
            disabled={false}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default AccountsPage;
