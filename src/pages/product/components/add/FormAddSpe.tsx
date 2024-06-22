import InputController from "@/components/InputControl";
import SelectController from "@/components/SelectControl";
import SpecificationsProductsServicesAPI from "@/services/SpecificationsProductsServicesAPI";
// import { ProductSpecificationsCreateInput } from "@/types/productSpecifications";
import { Button, Typography } from "@mui/material";
import { useForm } from "react-hook-form";



function FormAddSpe() {
  const { handleSubmit, control, reset } = useForm({
    mode: "onSubmit",
  });
  const { data: specifications, isSuccess } = SpecificationsProductsServicesAPI.useListType({}, { placeholderData: [] })
  const { mutateAsync } = SpecificationsProductsServicesAPI.useAdd()

  async function onSubmit(data: any) {
    const values = data.value.split(",")
    await mutateAsync({
      ...data,
      value: values
    })
    reset()
  }

  if (!isSuccess) return <></>

  return (

    <div className=" min-h-[400px]">
      <Typography >Thêm thông số</Typography>
      <form
        onSubmit={handleSubmit(onSubmit)}

      >
        <div className=' flex gap-2'>
          <InputController

            label="Tên"
            control={control}
            name="name"
            type="text"
            className="my-3"
            labelClassName="text-[#272727]"
          />
          <InputController

            label="giá trị"
            control={control}
            name="value"
            type="text"
            className="my-3"
            labelClassName="text-[#272727]"
          />
        </div>
        <div className=' flex gap-2 items-center'>
          <SelectController label="Loại thông số" name="type.connect.id" control={control} options={specifications?.map(cate => ({ label: cate.name, value: cate.id }))} />

          <InputController

            label="Mô tả"
            control={control}
            name="description"
            type="text"
            className="my-3"
            labelClassName="text-[#272727]"
          />

        </div>
        <Button variant="contained" type="submit">Lưu</Button>

      </form>
    </div>
  )


}

export default FormAddSpe