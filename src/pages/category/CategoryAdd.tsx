
import MainCard from '@/ui-component/cards/MainCard'
import { Button, Grid, Typography } from '@mui/material'
import { useForm } from 'react-hook-form';
import InputController from '@/components/InputControl';
import Editor from '@/components/Editor';
import { createSlug } from '@/utils/addProduct';
import { CategoryCreateInput } from '@/types/categoryProduct';
import CateProductsServicesAPI from '@/services/CateProductsServicesAPI';
import SelectCategory from '../product/components/add/SelectCategory';
import { toast } from 'react-toastify';



export default function CategoryAdd() {
  const { mutateAsync } = CateProductsServicesAPI.useAdd()


  const { handleSubmit, control, reset, setValue, watch } = useForm<CategoryCreateInput>({
    mode: "onSubmit",
  });

  async function onSubmit(data: CategoryCreateInput) {

    try {
      const res = await mutateAsync({
        ...data,
        slug: createSlug(data.title),
        status: "SHOW"
      })
      toast.error(`Thêm danh mục ${res.title} thành công`)
      reset({
        title: "",
        slug: "",
        parent_id: null,
        description: "",
        image: "",
        status: "SHOW"
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

                    label="Tên Danh mục"
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
                    name="image"
                    type="text"
                    className="my-3"
                    labelClassName="text-[#272727]"
                  />
                </div>


                <div>
                  <Editor
                    onChange={(value) => { setValue("description", value) }}
                    value={watch("description") || ""}
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
          <MainCard title="Danh mục cha">
            <SelectCategory value={watch("parent_id")?.toString() || ""} onChange={(id) => {
              setValue("parent_id", id)
            }} />
          </MainCard>
        </Grid>

      </Grid>
    </div>
  )
}