
import MainCard from '@/ui-component/cards/MainCard'
import { Button, Grid, Typography } from '@mui/material'
import { useForm } from 'react-hook-form';
import InputController from '@/components/InputControl';
import Editor from '@/components/editor/Editor';
import { createSlug } from '@/utils/addProduct';
import SelectCategory from '../blog/components/add/SelectCategory';
import { toast } from 'react-toastify';
import BlogServicesAPI from '@/services/BlogServicesAPI';
import { ArticleCreateInput, ArticleStatus } from '@/types/article';



export default function CategoryAdd() {
  const { mutateAsync } = BlogServicesAPI.useAdd()


  const { handleSubmit, control, reset, setValue, watch } = useForm<ArticleCreateInput>({
    mode: "onSubmit",
  });

  async function onSubmit(data: ArticleCreateInput) {

    try {
      const res = await mutateAsync({
        ...data,
        slug: createSlug(data.title),
      status : ArticleStatus.SHOW
      })
      toast.error(`Thêm danh mục ${res.title} thành công`)
      reset({
        title: "",
        slug: "",
        description: "",
        status : ArticleStatus.SHOW

      })
    } catch (error) {
      toast.error(JSON.stringify(error))
    }
  }

  return (
    <div className=' py-2'>
      <div className=' flex justify-between mb-2'>
        <Typography variant="h1">Thêm Danh mục mới</Typography>

      </div>
      <Grid container gap={3} wrap="nowrap">
        <Grid sm={9}>
          <div className=' flex flex-col gap-2'>

            <MainCard title="Thông tin cơ bản" contentSX={{ height: "auto" }}>
              <form
                className="w-full  h-full flex flex-col gap-[25px] "
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className=' flex gap-2'>
                  <InputController

                    label="Tên Bài viết"
                    control={control}
                    name="title"
                    type="text"
                    className="my-3"
                    labelClassName="text-[#272727]"
                  />

                </div>
                <div className=' flex gap-2'>
                  <InputController

                    label="Ảnh đại diện"
                    control={control}
                    name="thumnal_url"
                    type="text"
                    className="my-3"
                    labelClassName="text-[#272727]"
                  />
                  <InputController

                    label="Mô tả ngắn"
                    control={control}
                    name="description"
                    type="text"
                    className="my-3"
                    labelClassName="text-[#272727]"
                  />
                </div>


                <div>
                  <Editor
                    onChange={(value) => { setValue("content", value) }}
                    value={watch("content") || ""}
                  />
                </div>
                {/* <div className=' flex gap-2'>
                  <InputController

                    label="meta_description"
                    control={control}
                    name="meta_description"
                    type="text"
                    className="my-3"
                    labelClassName="text-[#272727]"
                  />
                  <InputController

                    label="meta_title"
                    control={control}
                    name="meta_title"
                    type="text"
                    className="my-3"
                    labelClassName="text-[#272727]"
                  />
                </div> */}

                <Button className=' fixed bottom-10  right-10 ' variant="contained" type="submit">Lưu</Button>
              </form>
            </MainCard>


          </div>

        </Grid>
        <Grid sm={3}>
          <MainCard title="Chọn">
            <SelectCategory value={watch("category.connect.id")?.toString() || ""} onChange={(id) => {
              setValue("category.connect.id", id)
            }} />
          </MainCard>
        </Grid>

      </Grid>
    </div>
  )
}
