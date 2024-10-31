
import MainCard from '@/ui-component/cards/MainCard'
import { Button, Grid, Typography } from '@mui/material'
import { useForm } from 'react-hook-form';
import Editor from '@/components/editor/Editor';
import SelectCategory from './components/add/SelectCategory';
import { toast } from 'react-toastify';
import BlogServicesAPI from '@/services/BlogServicesAPI';
import { Article, ArticleUpdateInput } from '@/types/article';
import { FormInputText } from '@/components/FormInputText';
import { useParams } from 'react-router-dom';



export default function BlogEdit() {
  const { id } = useParams()
  const { data, isSuccess } = BlogServicesAPI.useDetail(Number(id) || 0)


  if (!isSuccess) return <p>Lỗi</p>
  return (
    <FormEdit data={data} />
  )
}



function FormEdit({ data }: { data: Article }) {

  const { mutateAsync } = BlogServicesAPI.useUpdate()

  const { handleSubmit, control, setValue, watch } = useForm<ArticleUpdateInput>({
    mode: "onSubmit",
    defaultValues: {
      content: data.content || undefined,
      slug: data.slug,
      status: data.status,
      title: data.title,
      thumnal_url: data.thumnal_url,
      meta_data: data.meta_data,
      description: data.description
    }
  });

  async function onSubmit(value: ArticleUpdateInput) {

    try {
      const res = await mutateAsync({
        data: value,
        id: data.id
      })
      toast.error(`sửa danh mục ${res.title} thành công`)
    } catch (error) {
      toast.error(JSON.stringify(error))
    }
  }
  return <div className=' py-2'>
    <div className=' flex justify-between mb-2'>
      <Typography variant="h1">Sửa Bài viết</Typography>
    </div>
    <Grid container gap={3} wrap="nowrap">
      <Grid sm={12}>
        <div className=' flex flex-col gap-2'>

          <MainCard title="Thông tin cơ bản" contentSX={{ height: "auto" }}>
            <form
              className="w-full  h-full flex flex-col gap-[25px] "
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className=' flex gap-2'>
                <FormInputText
                  fullWidth
                  label="Tên Bài viết"
                  control={control}
                  name="title"
                  type="text"
                  className="my-3"
                />

              </div>
              <div className=' flex gap-2'>
                <FormInputText
                  fullWidth

                  label="Ảnh đại diện"
                  control={control}
                  name="thumnal_url"
                  type="text"
                  className="my-3"
                />
                <SelectCategory value={watch("category.connect.id")?.toString() || ""} onChange={(id) => {
                  setValue("category.connect.id", id)
                }} />
              </div>


              <FormInputText
                label="Mô tả ngắn"
                control={control}
                name="description"
                type="text"
                className="my-3"
              />

              <div>
                <Editor
                  onChange={(value) => { setValue("content", value) }}
                  value={watch("content") || ""}
                />
              </div>
              <div className=' flex gap-2'>
                <FormInputText
                  fullWidth
                  label="meta_title"
                  control={control}
                  name="meta_data.meta_title"
                  type="text"
                  className="my-3"
                />
                <FormInputText
                  fullWidth

                  label="meta_description"
                  control={control}
                  name="meta_data.meta_description"
                  type="text"
                  className="my-3"
                />

              </div>

              <Button className=' fixed bottom-10  right-10 ' variant="contained" type="submit">Lưu</Button>
            </form>
          </MainCard>


        </div>

      </Grid>


    </Grid>
  </div>
}