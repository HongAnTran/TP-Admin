import InputController from '@/components/InputControl';
import ProductsImageServicesAPI from '@/services/ProductsImageServicesAPI';
import { ProductImage, ProductImageUpdate } from '@/types/product';
import { Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

export default function FormEditImage({ image }: { image: ProductImage }) {
  const { mutateAsync } = ProductsImageServicesAPI.useUpdate()


  const { handleSubmit, control } = useForm<ProductImageUpdate>({
    mode: "onSubmit",
    defaultValues: image
  });

  async function onSubmit(data: ProductImageUpdate) {
    try {

      await mutateAsync({
        id: image.id,
        data: {
          ...data,
          position: data.position ? +data.position : undefined
        }
      })
      toast.success("Cập nhập thành công")
    } catch (error) {
      toast.error("Cập nhập thất bại")

    }
  }

  return (

    <form onSubmit={handleSubmit(onSubmit)}>
      <div className=' flex gap-2'>
        <InputController
          rules={{
            required: "vui lòng nhập"
          }}
          label="Đường dẫn"
          control={control}
          name="url"
          type="text"
          className="my-3"
          labelClassName="text-[#272727]"
        />
        <InputController

          label="Mô tả (atl)"
          control={control}
          name="alt_text"
          type="text"
          className="my-3"
          labelClassName="text-[#272727]"
        />
      </div>
      <div className=' flex gap-2'>
        <InputController
          label="Vị trị"
          control={control}
          name="position"
          type="text"
          className="my-3"
          labelClassName="text-[#272727]"
        />
        <InputController
          label="ảnh đại diện"
          control={control}
          name="is_featured"
          type="checkbox"
          className="my-3"
          labelClassName="text-[#272727]"
        />
      </div>
      <Button variant="contained" type="submit">Lưu</Button>
    </form>
  )
}
