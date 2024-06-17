import InputController from "@/components/InputControl";
import SelectController from "@/components/SelectControl";
import SpecificationsProductsServicesAPI from "@/services/SpecificationsProductsServicesAPI";
import { ProductSpecificationsCreateInput } from "@/types/productSpecifications";
import { Button, Typography } from "@mui/material";
import { useForm } from "react-hook-form";



function FormAddSpe() {
  const { handleSubmit, control, reset } = useForm<ProductSpecificationsCreateInput>({
    mode: "onSubmit",
  });
  const { data: specifications, isSuccess } = SpecificationsProductsServicesAPI.useListType({}, { placeholderData: [] })
  const { mutateAsync } = SpecificationsProductsServicesAPI.useAdd()

  async function onSubmit(data: ProductSpecificationsCreateInput) {
    await mutateAsync(data)
    reset()
  }

  if (!isSuccess) return <></>

  return (

    <>
    <Typography >Thêm thông số</Typography>
     <form
    onSubmit={handleSubmit(onSubmit)}

  >
    <div className=' flex gap-2'>
      <InputController

        label="name"
        control={control}
        name="name"
        type="text"
        className="my-3"
        labelClassName="text-[#272727]"
      />
      <InputController

        label="value"
        control={control}
        name="value"
        type="text"
        className="my-3"
        labelClassName="text-[#272727]"
      />
    </div>
    <div className=' flex gap-2'>
      <InputController

        label="description"
        control={control}
        name="description"
        type="text"
        className="my-3"
        labelClassName="text-[#272727]"
      />
      <SelectController name="type.connect.id" control={control} options={specifications?.map(cate => ({ label: cate.name, value: cate.id }))} />

    </div>
    <Button type="submit">Lưu</Button>

  </form>
    </>
  )
  
 
}

export default FormAddSpe