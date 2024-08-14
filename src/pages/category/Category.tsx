import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import { Button, Checkbox, Typography } from '@mui/material';
import CateProductsServicesAPI from '@/services/CateProductsServicesAPI';


export default function Category() {

  const { data, isSuccess, error } = CateProductsServicesAPI.useList({ sortBy: "id", sortType: "desc" })


  const columns: GridColDef[] = [
    { field: 'id', headerName: 'id', width: 70 },

    {
      field: "title", headerName: 'Tên Danh mục', width: 500, renderCell: (params) => {
        return <Link to={params.row.slug} >
          <Typography variant="body2" >{params.value}</Typography>
        </Link>
      }
    },
    {
      field: "slug", headerName: 'slug', width: 200, renderCell: (params) => {
        return <Link to={params.row.slug}><Typography variant="body2" >{params.value}</Typography></Link>
      }
    },
    {
      field: "published", headerName: 'Trạng thái', width: 100, renderCell: (params) => {
        return <Checkbox checked={!!params.value} />
      }
    },
    // {
    //   field: "", headerName: 'Hành động', width: 100, renderCell: (params) => {
    //     return <TrashIcon />
    //   }
    // },

  ];

  if (!isSuccess) {
    return <p>{error?.message}</p>
  }

  const rows = data.datas


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
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          pageSizeOptions={[10, 10]}
        />
      </div>
    </div>
  )
}

