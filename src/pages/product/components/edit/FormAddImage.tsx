import InputController from '@/components/InputControl';
import ProductsImageServicesAPI from '@/services/ProductsImageServicesAPI';
import { ProductImageCreate } from '@/types/product';
import { Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

export default function FormAddImage({ product_id }: { product_id: number }) {
  const { mutateAsync } = ProductsImageServicesAPI.useAdd()


  const { handleSubmit, control } = useForm<ProductImageCreate>({
    mode: "onSubmit",
    defaultValues: {
      alt_text: "",
      is_featured: false,
      position: 0,
      url: "",
      product: { connect: { id: product_id } }
    }
  });

  async function onSubmit(data: ProductImageCreate) {
    try {

      await mutateAsync({
        ...data,
        position: data.position ? +data.position : undefined

      })
      toast.success("Thêm thành công")
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
