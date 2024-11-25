
import MainCard from '@/ui-component/cards/MainCard'
import { Button, Grid, IconButton, Typography } from '@mui/material'
import { useForm } from 'react-hook-form';
import Editor from '@/components/editor/Editor';
import { createSlug } from '@/utils/addProduct';
import SelectCategory from '../blog/components/add/SelectCategory';
import { toast } from 'react-toastify';
import BlogServicesAPI from '@/services/BlogServicesAPI';
import { ArticleCreateInput, ArticleStatus } from '@/types/article';
import { FormInputText } from '@/components/FormInputText';
import SingleImageUpload from '@/components/SingleImageUpload';
import FileManager from '@/components/static/FilesManager';
import CloseIcon from '@mui/icons-material/Close';

export default function BlogAdd() {
  const { mutateAsync } = BlogServicesAPI.useAdd()


  const { handleSubmit, control, reset, setValue, watch } = useForm<ArticleCreateInput>({
    mode: "onSubmit",
  });

  const thumUrl = watch("thumnal_url")

  async function onSubmit(data: ArticleCreateInput) {

    try {
      const res = await mutateAsync({
        ...data,
        slug: createSlug(data.title),
        status: ArticleStatus.SHOW
      })
      toast.error(`Thêm danh mục ${res.title} thành công`)
      reset({
        title: "",
        slug: "",
        description: "",
        status: ArticleStatus.SHOW,
        meta_data: null

      })
    } catch (error) {
      toast.error(JSON.stringify(error))
    }
  }

  return (
    <div className=' py-2'>
      <div className=' flex justify-between mb-2'>
        <Typography variant="h1">Thêm Bài viết</Typography>

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
                  <FormInputText
                    fullWidth
                    label="Tên Bài viết"
                    control={control}
                    name="title"
                    type="text"
                    className="my-3"
                  />

                </div>
                <div className=' grid grid-cols-2 gap-2'>
                  <div>
                    {thumUrl ? <div className=' relative'>

                      <IconButton onClick={() => { setValue("thumnal_url", "") }}>
                        <CloseIcon />
                      </IconButton>
                      <img src={thumUrl} className=' w-[300px] h-[300px]' />
                    </div> :
                      <FileManager onFileSelect={(file) => { setValue("thumnal_url", file.url) }} />

                    }
                  </div>
                  {/* <FormInputText
                    fullWidth

                    label="Ảnh đại diện"
                    control={control}
                    name="thumnal_url"
                    type="text"
                    className="my-3"
                  /> */}

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

                    label="meta_keywords"
                    control={control}
                    name="meta_data.meta_keywords"
                    type="text"
                    className="my-3"
                  />
                </div>
                <div>
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
        <Grid sm={3}>
          <MainCard title="Danh mục" contentSX={{ height: "auto" }}>
            <div>
              <p>Danh mục</p>
              <SelectCategory value={watch("category.connect.id")?.toString() || ""} onChange={(id) => {
                setValue("category.connect.id", id)
              }} />
            </div>
          </MainCard >

        </Grid>

      </Grid>
    </div>
  )
}
