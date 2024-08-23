import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import { Box, Button, Typography, useTheme } from '@mui/material';
import { useState } from 'react';
import InputController from '@/components/InputControl';
import { useForm } from 'react-hook-form';
import OrdersServicesAPI from '@/services/OrdersServicesAPI';
import { OrderStatus } from '@/types/order';
import {  format } from "date-fns";
import { convetNumberToPriceVND } from '@/utils';
const limit = 10

export default function Orders() {
  const [page, setPage] = useState(0)
  const theme = useTheme()


  const { data, isSuccess, error, isLoading } = OrdersServicesAPI.useList({ limit, page: page + 1, sortBy: "id", sortType: "desc" , notStatus : OrderStatus.DRAFT })


  const { control, handleSubmit } = useForm({
    defaultValues: { code: "" }
  })



  const columns: GridColDef[] = [
    {
      field: "code", headerName: 'Mã đơn hàng', width: 300, renderCell: (params) => {
        return <Link className=' h-full flex items-center' to={params.row.slug}><Typography variant="body2" className=' text-blue-400' >{params.value}</Typography></Link>
      }
    },
    {
      field: "created_at", headerName: 'Ngày tạo', width: 200, renderCell: (params) => {
        return <p>{format(params.value , "dd-MM HH:mm:ss")}</p>
      }
    },
    {
      field: 'status', headerName: 'Trạng thái', width: 200, renderCell: (params) => {
        return <p>{OrderStatus[params.value]}</p>
      }
    },
    {
      field: 'payment', headerName: 'Thanh toán', width: 200, renderCell: (params) => {
        return <p>{params.value.status}</p>
      }
    },
    {
      field: 'shipping', headerName: 'Giao hàng', width: 200, renderCell: (params) => {
        return <p>{params.value.status}</p>
      }
    },
    {
      field: 'total_price', headerName: 'Tổng tiền', width: 200, renderCell: (params) => {
        return <p>{convetNumberToPriceVND(params.value)}</p>
      }
    },
 
  ];

  if (!isSuccess) {
    return <p>{error?.message}</p>
  }

  const rows = data.datas

  return (
    <>
      <div className=' py-2'>
        <div className=' flex justify-between mb-2'>
          <Typography variant="h2">Danh sách Đơn hàng ({data.total})</Typography>
          <div className=' flex'>
            <Link to={'add'}>
              <Button variant="contained">Thêm Đơn hàng</Button>
            </Link>
          </div>
        </div>
        <div>
          <form onSubmit={handleSubmit((data) => {
            console.log(data)
          })}
            className=' flex gap-4 items-center mb-6'
          >
            <InputController control={control} placeholder='Tìm kiếm Đơn hàng' name="code" className=' max-w-[500px]' />
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

