import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import { Button, Typography } from '@mui/material';
import CateProductsServicesAPI from '@/services/CateProductsServicesAPI';


export default function Category() {

  const { data, isSuccess, error } = CateProductsServicesAPI.useList()


  const columns: GridColDef[] = [
    { field: 'id', headerName: 'id', width:70 },

    {
      field: "title", headerName: 'Tên Danh mục', width: 500, renderCell: (params) => {
        return <Link to={params.row.slug}><Typography variant="body2" >{params.value}</Typography></Link>
      }
    },
    // { field: 'vendor', headerName: 'Nhà cung cấp', width: 200 },

  ];

  if (!isSuccess) {
    return <p>{error?.message}</p>
  }

  const rows = data.map(cate => ({
    ...cate,
    id: cate.id,
    title: cate.title,
    slug: cate.slug,

  }))

  return (
    <div className=' py-2'>
      <div className=' flex justify-between mb-2'>
        <Typography variant="h1">Danh sách Danh mục</Typography>
        <div className=' flex'>
          <Link to={'add'}>
            <Button variant="contained">Thêm Danh mục</Button>
          </Link>
        </div>
      </div>
      <div style={{ height: 600, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
        />
      </div>
    </div>
  )
}

