
import MainCard from '@/ui-component/cards/MainCard'
import { Button, Grid, Typography } from '@mui/material'
import { useForm } from 'react-hook-form';
import InputController from '@/components/InputControl';
import { toast } from 'react-toastify';
import SettingsServicesAPI from '@/services/SettingsServicesAPI';
import { SettingCreateInput, } from '@/types/Settings.type';
import { TextAreaControl } from '@/components/TextAreaControl';
import ReactJson from 'react-json-view';


function parserValue (value:any){

  try {
    return JSON.parse(value)
  } catch (error) {
    console.log(error)
  }
}
export default function SettingsPageAdd() {
  const { mutateAsync } = SettingsServicesAPI.useAdd()

  const defaultValue = {
    active: true,
    description: "",
    key: "",
    value: ""
  }


  const { handleSubmit, control, reset, watch } = useForm<SettingCreateInput>({
    defaultValues: defaultValue,
    mode: "onSubmit",
  });
  const value = watch("value")

  const valueParser = value ? parserValue(value) : value
  const isObj = typeof valueParser === "object"

  async function onSubmit(data: SettingCreateInput) {
    const value =parserValue(data.value)
    try {
      const res = await mutateAsync({
        ...data,
        value: value
      })
      toast.error(`Thêm ${res.key} thành công`)
      reset(defaultValue)
    } catch (error) {
      toast.error(JSON.stringify(error))
    }
  }


  return (
    <div className=' py-2'>
      <div className=' flex justify-between mb-2'>
        <Typography variant="h1">Thêm cấu hình mới</Typography>

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
                  <InputController

                    label="Key"
                    control={control}
                    name="key"
                    type="text"
                    className="my-3"
                  />
                  <InputController

                    label="Mô tả"
                    control={control}
                    name="description"
                    type="text"
                    className="my-3"
                  />
                  <InputController

                    label="trạng thái"
                    control={control}
                    name="active"
                    type="checkbox"
                    className="my-3"
                  />
                </div>
                <div className=' grid grid-cols-5 gap-3'>
                  <div className='  col-span-2'>
                    <Typography variant="body1">Giá trị</Typography>
                    <TextAreaControl

                      minRows={4}
                      control={control}
                      name="value"
                      className="my-3 w-full"
                    />
                  </div>

                <div className='  col-span-3'>
                <Typography variant="body1">Xem Giá trị</Typography>

                {isObj && <ReactJson src={valueParser}
                    theme="monokai"
                    style={{ textAlign: 'left' }}
                  />}
                  {!isObj && <div className=' h-full border border-gray-200 rounded-md'>{valueParser}</div>}
                </div>
                </div>


                <div>

                </div>


                <Button className=' fixed bottom-10  right-10 ' variant="contained" type="submit">Lưu</Button>
              </form>
            </MainCard>


          </div>

        </Grid>


      </Grid>
    </div>
  )
}
