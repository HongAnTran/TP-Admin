import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import { Button, Typography } from '@mui/material';
import SettingsServicesAPI from '@/services/SettingsServicesAPI';
import { format } from 'date-fns';


export default function SettingsPage() {

  const { data, isSuccess, error } = SettingsServicesAPI.useList()


  const columns: GridColDef[] = [
    {
      field: "id", headerName: 'id', width: 100
    },
    {
      field: 'key', headerName: 'key', flex: 1, renderCell: (params) => {
        return <Link className=' h-full flex items-center' to={params.row.key}><Typography variant="body2" className=' text-blue-400' >{params.value}</Typography></Link>
      }
    },
    {
      field: 'updatedAt', headerName: 'Ngày cập nhập', width: 200,
      renderCell: (params) => {
        return <p>{format(params.value, "dd-MM HH:mm:ss")}</p>
      }
    },
    {
      field: 'createdAt', headerName: 'Ngày tạo', width: 200, renderCell: (params) => {
        return <p>{format(params.value, "dd-MM HH:mm:ss")}</p>
      }
    },

  ];

  if (!isSuccess) {
    return <p>{error?.message}</p>
  }

  const rows = data.datas

  return (
    <div className=' py-2'>
      <div className=' flex justify-between mb-2'>
        <Typography variant="h1">Danh sách Cấu hình</Typography>
        <div className=' flex'>
          <Link to={'add'}>
            <Button variant="contained">Thêm cấu hình</Button>
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

