import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import { Button, Switch, Typography } from '@mui/material';
import BlogServicesAPI from '@/services/BlogServicesAPI';
import { Article, ArticleStatus } from '@/types/article';
import { toast } from 'react-toastify';
import DeleteIcon from '@mui/icons-material/Delete';


export default function Blog() {

  const { data, isSuccess, error, refetch } = BlogServicesAPI.useList()

  const { mutateAsync } = BlogServicesAPI.useDelete()
  const { mutateAsync: updateProduct } = BlogServicesAPI.useUpdate()

  async function deleteProduct(id: Article["id"]) {

    await mutateAsync(id)
    refetch()
    toast.success(`Xóa thành công`)
  }


  async function updateStatusProduct(id: Article["id"], status: boolean) {

    await updateProduct({ id, data: { status: status ? ArticleStatus.SHOW : ArticleStatus.DRAFT } })
    refetch()
    toast.success(`Cập nhập trạng thái thành công`)
  }

  const columns: GridColDef[] = [
    {
      field: "title", headerName: 'Tiêu đề', width: 500, renderCell: (params) => {
        return <Link to={params.row.id}><Typography variant="body2" >{params.value}</Typography></Link>
      }
    },
    {
      field: 'category', headerName: 'Nhóm bài viết', width: 200,
      renderCell: (params) => {
        return <Typography variant="body2" >{params?.value?.title}</Typography>
      }
    },

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
        />
      </div>
    </div>
  )
}

