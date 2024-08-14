import InputController from '@/components/InputControl';
import ProductsVariantServicesAPI from '@/services/ProductsVariantServicesAPI';
import { Product, ProductImage, ProductUpdateInput, ProductVariant, ProductVariantUpdateInput } from '@/types/product';
import cn from '@/utils/cn';
import { Button, Dialog, DialogContent } from '@mui/material';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

export default function FormEditVariant({ product, productDetail, onUpdatePrice, images }:
  {
    product: ProductVariant, 
    productDetail: Product,
    onUpdatePrice: (data: Pick<ProductUpdateInput, "price" | "price_max" | "price_min" | "compare_at_price">) => Promise<void>,
    images: ProductImage[]
  }) {
  const { mutateAsync } = ProductsVariantServicesAPI.useUpdate()
  const [openEdit, setOpenEdit] = useState(false)


  const { handleSubmit, control, setValue, watch } = useForm<ProductVariantUpdateInput>({
    mode: "onSubmit",
    defaultValues: {
      title: product.title,
      barcode: product.barcode,
      compare_at_price: product.compare_at_price,
      inventory_quantity: product.inventory_quantity,
      price: product.price,
      sku: product.sku,
      position: product.position,
      image: { connect: { id: product.image_id || undefined } },
    }
  });

  const idImage = watch("image.connect.id")
  async function onSubmit(data: ProductVariantUpdateInput) {
    try {
      const priceUpdate = typeof data.price !== "undefined" ? +data.price : undefined
      const compare_at_price_update = typeof data.compare_at_price !== "undefined" ? +data.compare_at_price : undefined
      const inven = typeof data.inventory_quantity !== "undefined" ? +data.inventory_quantity : undefined

      const position = data.position ? +data.position : undefined
      const res = await mutateAsync({
        id: product.id,
        data: {
          ...data,
          position: position,
          price: priceUpdate,
          compare_at_price: compare_at_price_update,
          inventory_quantity: inven
        }
      })

      const variants = productDetail.variants.filter(pro => pro.id !== product.id)
      variants.push({ ...res })
      let price = 0
      let compare_at_price = 0
      let price_min = 0
      let price_max = 0

      const variantsSortPosition = variants.slice().sort((a, b) => a.position - b.position)
      const variantsSortPrice = variants.slice().sort((a, b) => a.price - b.price)

      const variantDefault = variantsSortPosition[0]
      const variantMinPrice = variantsSortPrice[0]


      price = variantDefault.price
      compare_at_price = variantDefault.compare_at_price


      if (variants.length > 1) {
        const variantMaxPrice = variantsSortPrice[variants.length - 1]
        price_max = variantMaxPrice.price
        price_min = variantMinPrice.price
      }

      await onUpdatePrice({
        price,
        price_max,
        price_min,
        compare_at_price
      })
      toast.success("Cập nhập thành công")
    } catch (error) {
      toast.error("Cập nhập thất bại")

    }
  }



  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className=' flex gap-2'>
          <InputController
            rules={{
              required: "Nhập tên sản phẩm"
            }}
            label="Tên sản phẩm"
            control={control}
            name="title"

            type="text"
            className="my-3"
            labelClassName="text-[#272727]"
          />
          <InputController

            label="barcode"
            control={control}
            name="barcode"
            type="text"
            className="my-3"
            labelClassName="text-[#272727]"
          />
        </div>
        <div className=' flex gap-2'>
          <InputController
            rules={{
              required: "Nhập giá"
            }}
            label="Giá"
            control={control}
            name="price"
            type="text"
            className="my-3"
            labelClassName="text-[#272727]"
          />
          <InputController

            label="Giá so sánh"
            control={control}
            name="compare_at_price"
            type="text"
            className="my-3"
            labelClassName="text-[#272727]"
          />
        </div>
        <div className=' flex gap-2'>
          <InputController
            rules={{
              required: "Nhập giá"
            }}
            label="Tồn kho"
            control={control}
            name="inventory_quantity"
            type="text"
            className="my-3"
            labelClassName="text-[#272727]"
          />
          <InputController

            label="sku"
            control={control}
            name="sku"
            type="text"
            className="my-3"
            labelClassName="text-[#272727]"
          />
        </div>
        <div className=' flex gap-2'>
          <InputController
            rules={{
              required: "nhap"
            }}
            label="Vị trí"
            control={control}
            name="position"
            type="text"
            className="my-3"
            labelClassName="text-[#272727]"
          />
        <Button variant="contained" type="button" onClick={()=>setOpenEdit(true)}>Cập nhập hình ảnh</Button>

        </div>
        <Button variant="contained" type="submit">Lưu</Button>



      </form>

      <Dialog open={openEdit} onClose={() => { setOpenEdit(false) }} >
        <DialogContent>
          <div className=' grid grid-cols-2 gap-2'>
            {images.map((image) => (
              <div className=' flex flex-col gap-2  justify-center items-center'>
                {image ? <div className={cn(' border-2 border-dashed p-1 rounded', {
                  "border-green-600": idImage === image.id
                })}>
                  <img src={image.url} className=' w-[150px] h-[150px] cursor-pointer' onClick={() => setValue("image.connect.id", image.id)} />
                </div> : null}
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </>

  )
}
