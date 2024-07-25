import { DataGrid, GridColDef } from '@mui/x-data-grid';
import ProductsServicesAPI from '@/services/ProductsServicesAPI';
import { Link } from 'react-router-dom';
import { Button, Typography } from '@mui/material';
import { Product as ProductType } from '@/types/product';
import { toast } from 'react-toastify';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from 'react';
import InputController from '@/components/InputControl';
import { useForm } from 'react-hook-form';

const limit = 10

export default function Product() {
  const [page, setPage] = useState(0)


  const [key, setKey] = useState("")

  const { data, isSuccess, error, isLoading } = ProductsServicesAPI.useList({ limit, page: page + 1, keyword: key })

  const { mutateAsync } = ProductsServicesAPI.useDelete()

  const { control, handleSubmit } = useForm({
    defaultValues: { key: "" }
  })

  async function deleteProduct(id: ProductType["id"]) {

    await mutateAsync(id)
    toast.success(`Xóa thành công`)
  }
  const columns: GridColDef[] = [
    {
      field: "id", headerName: 'id', width: 100,
    },
    {
      field: "title", headerName: 'Tên sản phẩm', width: 500, renderCell: (params) => {
        return <Link to={params.row.slug}><Typography variant="body2" >{params.value}</Typography></Link>
      }
    },
    { field: 'category', headerName: 'Nhóm sản phẩm', width: 200 },
    { field: 'brand', headerName: 'Nhà cung cấp', width: 200 },
    {
      field: 'delete', headerName: 'hành động', width: 200, renderCell: (params) => {
        return <Button onClick={() => { deleteProduct(params.row.id) }}><DeleteIcon /></Button>
      }
    },

  ];

  if (!isSuccess) {
    return <p>{error?.message}</p>
  }

  const rows = data.datas.map(product => ({
    ...product,
    brand: product.brand?.name,
    category: product.category?.title,
  }))

  return (
    <>
      <div className=' py-2'>
        <div className=' flex justify-between mb-2'>
          <Typography variant="h1">Danh sách sản phẩm ({data.total})</Typography>
          <div className=' flex'>
            <Link to={'add'}>
              <Button variant="contained">Thêm sản phẩm</Button>
            </Link>
          </div>
        </div>
        <div>
          <form onSubmit={handleSubmit((data) => {
            setKey(data.key)
          })}
            className=' flex gap-4 items-center mb-6'
          >
            <InputController control={control} placeholder='Tìm kiếm sản phẩm' name="key" className=' max-w-[500px]' />
            <Button type="submit" variant="contained" >Tìm</Button>
          </form>
        </div>
        <div style={{ height: 600, width: '100%' }}>
          <DataGrid
            loading={isLoading}
            rows={rows}
            columns={columns}
            pagination
            paginationMode="server"
            rowCount={data.total}
            onPaginationModelChange={(mode => {
              setPage(mode.page)
            })}
            initialState={{
              pagination: {
                paginationModel: { page: page, pageSize: limit },

              },

            }}
          />
        </div>
      </div>


    </>
  )
}

