import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import { Button, Typography } from '@mui/material';
import BlogServicesAPI from '@/services/BlogServicesAPI';


export default function Blog() {

  const { data, isSuccess, error } = BlogServicesAPI.useList()


  const columns: GridColDef[] = [
    {
      field: "title", headerName: 'Tiêu đề', width: 500, renderCell: (params) => {
        return <Link to={params.row.id}><Typography variant="body2" >{params.value}</Typography></Link>
      }
    },
    { field: 'category', headerName: 'Nhóm bài viết', width: 200 },

  ];

  if (!isSuccess) {
    return <p>{error?.message}</p>
  }

  const rows = data.datas.map(product => ({
    ...product,
    id: product.id,
    title: product.title,
    slug: product.slug,
  }))

  return (
    <div className=' py-2'>
      <div className=' flex justify-between mb-2'>
        <Typography variant="h1">Danh sách bài viết</Typography>
        <div className=' flex'>
          <Link to={'add'}>
            <Button variant="contained">Thêm bài viết</Button>
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

