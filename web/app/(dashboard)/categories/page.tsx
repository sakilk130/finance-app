'use client';

import { Loader2, Plus } from 'lucide-react';
import toast from 'react-hot-toast';

import { DataTable } from '@/components/data-table';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { openModal } from '@/redux/features/category-create-modal-slice';
import { useAppDispatch } from '@/redux/store';
import { columns } from './_components/columns';
import { useFetch, usePost } from '@/hooks/use-api';
import { QUERY_KEY } from '@/constants';
import { errorResponseHandler } from '@/utils';
import { bulkDeleteCategoriesService, getCategoriesService } from '@/services';

const CategoriesPage = () => {
  const dispatch = useAppDispatch();
  const bulkDeleteCategories = usePost(bulkDeleteCategoriesService);

  const openModalHandler = () => {
    dispatch(openModal());
  };

  const { data, isLoading, refetch } = useFetch(
    [QUERY_KEY.CATEGORIES],
    getCategoriesService
  );

  const handleDelete = async (ids: any) => {
    bulkDeleteCategories.mutate(ids, {
      onSuccess: (data) => {
        toast.success(data?.message || 'Categories deleted successfully.');
        refetch();
      },
      onError: (error) => {
        errorResponseHandler(error, 'An error occurred while logging in.');
      },
    });
  };

  if (isLoading)
    return (
      <div className="max-w-screen-2xl mx-auto w-full -mt-24 pb-10">
        <Card className="border-none drop-shadow-sm">
          <CardHeader className="lg:flex lg:flex-row lg:justify-between lg:items-center">
            <CardTitle className="mb-5 lg:mb-0">Categories Page</CardTitle>
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
          <CardTitle className="mb-5 lg:mb-0">Categories Page</CardTitle>
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
            onDeleted={(row) => {
              const ids = row.map((r: any) => Number(r.original.id));
              handleDelete(ids);
            }}
            disabled={bulkDeleteCategories.isPending || isLoading}
            title="category"
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default CategoriesPage;
