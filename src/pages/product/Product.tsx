import { DataGrid, GridColDef } from '@mui/x-data-grid';
import ProductsServicesAPI from '@/services/ProductsServicesAPI';
import { Link } from 'react-router-dom';
import { Button, Typography } from '@mui/material';


export default function Product() {

  const { data, isSuccess, error } = ProductsServicesAPI.useList()


  const columns: GridColDef[] = [
    {
      field: "title", headerName: 'Tên sản phẩm', width: 500, renderCell: (params) => {
        return <Link to={params.row.slug}><Typography variant="body2" >{params.value}</Typography></Link>
      }
    },
    { field: 'category', headerName: 'Nhóm sản phẩm', width: 200 },
    { field: 'vendor', headerName: 'Nhà cung cấp', width: 200 },

  ];

  if (!isSuccess) {
    return <p>{error?.message}</p>
  }

  const rows = data.products.map(product => ({
    ...product,
    id: product.id,
    title: product.title,
    vendor: product.vendor,
    category: product.category?.title,
    slug: product.slug,
  }))

  return (
    <div className=' py-2'>
      <div className=' flex justify-between mb-2'>
        <Typography variant="h1">Danh sách sản phẩm</Typography>
        <div className=' flex'>
          <Link to={'add'}>
            <Button variant="contained">Thêm sản phẩm</Button>
          </Link>
        </div>
      </div>
      <div style={{ height: 600, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
  
          checkboxSelection
        />
      </div>
    </div>
  )
}

