import { DataGrid, GridColDef } from '@mui/x-data-grid';
import ProductsServicesAPI from '@/services/ProductsServicesAPI';
import { Link } from 'react-router-dom';
import { Box, Button, Switch, Typography, useTheme } from '@mui/material';
import { ProductStatus, Product as ProductType } from '@/types/product';
import { toast } from 'react-toastify';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from 'react';
import InputController from '@/components/InputControl';
import { useForm } from 'react-hook-form';

const limit = 10

export default function Product() {
  const [page, setPage] = useState(0)
  const theme = useTheme()

  const [key, setKey] = useState("")

  const { data, isSuccess, error, isLoading, refetch } = ProductsServicesAPI.useList({ limit, page: page + 1, keyword: key, sortBy: "id", sortType: "desc" })

  const { mutateAsync } = ProductsServicesAPI.useDelete()
  const { mutateAsync: updateProduct } = ProductsServicesAPI.useUpdate()

  const { control, handleSubmit } = useForm({
    defaultValues: { key: "" }
  })

  async function deleteProduct(id: ProductType["id"]) {

    await mutateAsync(id)
    refetch()
    toast.success(`Xóa thành công`)
  }


  async function updateStatusProduct(id: ProductType["id"], status: boolean) {

    await updateProduct({ id, data: { status: status ? ProductStatus.SHOW : ProductStatus.DRAFT } })
    refetch()
    toast.success(`Cập nhập trạng thái thành công`)
  }
  const columns: GridColDef[] = [
    {
      field: "id", headerName: 'id', width:80,
    },
    {
      field: "title", headerName: 'Tên sản phẩm', flex: 1, renderCell: (params) => {
        return <Link className=' h-full flex items-center' to={params.row.slug}><Typography variant="body2" className=' text-blue-400' >{params.value}</Typography></Link>
      }
    },
    { field: 'category', headerName: 'Nhóm sản phẩm', width: 200 },
    { field: 'brand', headerName: 'Nhà cung cấp', width: 200 },

    {
      field: 'status', headerName: 'Trạng thái', width: 100, renderCell: (params) => {
        return <Switch onChange={(e) => {
          updateStatusProduct(params.row.id, e.target.checked)
        }}
          checked={!!params.value} />
      }
    },

    {
      field: 'delete', headerName: '', width: 200, renderCell: (params) => {
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
          <Typography variant="h2">Danh sách sản phẩm ({data.total})</Typography>
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
        <Box style={{ height: 600, width: '100%', backgroundColor: theme.palette.background.default }} >
          <DataGrid
            loading={isLoading}
            rows={rows}
            columns={columns}
            pagination
            rowSelection={false}
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
        </Box>
      </div>


    </>
  )
}

