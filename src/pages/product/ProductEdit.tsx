import { useState } from 'react'
import ProductsServicesAPI from '@/services/ProductsServicesAPI';
import { Product, ProductUpdateInput, ProductVariant, ProductVariantUpdateInput } from '@/types/product';
import MainCard from '@/ui-component/cards/MainCard'
import { Button, Chip, Dialog, DialogContent, Grid, Input, OutlinedInput, Typography } from '@mui/material'
import { useForm } from 'react-hook-form';
import InputController from '@/components/InputControl';
import Editor from '@/components/Editor';
import SelectCategory from './components/add/SelectCategory';

import { useParams } from 'react-router-dom';
import { createSlug, fillArrayToLength } from '@/utils/addProduct';
import ProductsVariantServicesAPI from '@/services/ProductsVariantServicesAPI';
import { toast } from 'react-toastify';
import { convetNumberToPriceVND } from '@/utils';



export default function ProductEdit() {

  const { productId } = useParams();
  const { data, isSuccess } = ProductsServicesAPI.useDetail(productId || "")

  if (!isSuccess) return <></>

  return (
    <ProductEditForm product={data} />
  )
}


function ProductEditForm({ product }: { product: Product }) {

  const { mutateAsync } = ProductsServicesAPI.useUpdate()
  // const [options, setOptions] = useState<ProductOption[]>(product.options)
  const [variants, setVariants] = useState<ProductVariant[]>(product.variants.sort((a, b) => a.position - b.position))
  const [images, setImages] = useState<string[]>(fillArrayToLength(product.images, 4, ""))

  const [variantEdit, setVariantEdit] = useState<ProductVariant>(product.variants[0])
  const [openEdit, setOpenEdit] = useState(false)

  const { handleSubmit, control, setValue, watch } = useForm<ProductUpdateInput>({
    mode: "onSubmit",
    defaultValues: {
      title: product.title,
      vendor: product.vendor,
      barcode: product.barcode,
      description_html: product.description_html,
      featured_image: product.featured_image,
      short_description: product.short_description,
      meta_description: product.meta_description,
      meta_title: product.meta_title,
      category_id: product.category_id,
      images: product.images
    }
  });
  async function onSubmit(data: ProductUpdateInput) {
    try {
      await mutateAsync({
        id: product.id,
        data: {
          ...data,
          slug: createSlug(data.title),
          images: images.filter(img => img),
        }
      })
      toast.success("Cập nhập thành công")

    } catch (error) {
      toast.error("Cập nhập thất bại")

    }
  }

  async function updatePrice(data: Pick<ProductUpdateInput, "price" | "price_max" | "price_min">) {
    try {
      await mutateAsync({
        id: product.id,
        data: {
          ...data,
        }
      })
      toast.success("Cập nhập thành công")

    } catch (error) {
      toast.error("Cập nhập thất bại")

    }
  }
  const handleInputChange = (index: number, value: string) => {
    const newImages = [...images];
    newImages[index] = value;
    setImages(newImages);
  };
  function onEditVariant(variant: ProductVariant) {
    setVariantEdit(variant)
    setOpenEdit(true)
  }

  return (
    <div className=' py-2 '>
      <div className=' flex justify-between mb-2'>
        <Typography variant="h1">Sửa {product.title}</Typography>

      </div>
      <Grid container gap={3} wrap="nowrap" className=' relative'>
        <Grid sm={9}>
          <div className=' flex flex-col gap-2'>

            <MainCard title="Thông tin cơ bản" contentSX={{ height: "auto" }}>
              <form
                className="w-full  h-full flex flex-col gap-[25px] "
                onSubmit={handleSubmit(onSubmit)}
              >
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

                    label="Nhà cung cấp"
                    control={control}
                    name="vendor"
                    type="text"
                    className="my-3"
                    labelClassName="text-[#272727]"
                  />
                </div>
                <div className=' flex gap-2'>
                  <InputController

                    label="barcode"
                    control={control}
                    name="barcode"
                    type="text"
                    className="my-3"
                    labelClassName="text-[#272727]"
                  />
                  <InputController

                    label="Mô tả ngắn"
                    control={control}
                    name="short_description"
                    type="text"
                    className="my-3"
                    labelClassName="text-[#272727]"
                  />
                </div>


                <div>
                  <Editor
                    onChange={(value) => { setValue("description_html", value) }}
                    value={watch("description_html") || ""}
                  />
                </div>
                <div className=' flex gap-2'>
                  <InputController

                    label="Tiêu đề meta"
                    control={control}
                    name="meta_title"
                    type="text"
                    className="my-3"
                    labelClassName="text-[#272727]"
                  />
                  <InputController

                    label="Mô tả meta"
                    control={control}
                    name="meta_description"
                    type="text"
                    className="my-3"
                    labelClassName="text-[#272727]"
                  />

                </div>
                <MainCard title="Hình ảnh sản phẩm">
                  <div className=' grid grid-cols-2 gap-2'>
                    {images.map((image, index) => (
                      <OutlinedInput
                        key={index}
                        fullWidth
                        type="text"
                        value={image}
                        onChange={(e) => handleInputChange(index, e.target.value)}
                        placeholder={`Link hỉnh ảnh ${index + 1}`}
                      />
                    ))}
                  </div>
                </MainCard>
                <Button variant="contained" type="submit">Lưu</Button>
              </form>
            </MainCard>

            {/* <MainCard title="Biến thể">
              <OptionsForm defaultValue={options} onSubmit={(op) => setOptions(op)} />



            </MainCard> */}
            <MainCard title="Danh sách biến thể">
              <ul className=' mt-3 flex flex-col gap-2'>
                {variants.map(variant => (
                  <li key={variant.sku} className='  grid grid-cols-3 gap-4'>
                    <Chip color="primary" label={variant.title} />
                    <div className=' flex items-center  gap-2'>
                      <span>Giá</span>
                      <Input
                        className=' font-bold text-base'


                        value={convetNumberToPriceVND(variant.price)}

                        placeholder="Price"
                        disabled
                      />
                    </div>
                    <div className=' flex items-center  gap-2'>
                      <span>Giá so sánh</span>

                      <Input
                        disabled
                        className=' font-bold text-base'
                        value={convetNumberToPriceVND(variant.compare_at_price)}


                        placeholder="Compare at Price"
                      />
                    </div>
                    <Button onClick={() => {
                      onEditVariant(variant)
                    }}>Sửa</Button>
                  </li>
                ))}
              </ul>
            </MainCard>
            {/* <MainCard title="Thông số kỷ thuật">
            <SelectSpecifications value={watch("specifications.connect").map(spe => spe.id)} onChange={(ids) => {
              setValue("specifications.connect", ids.map(id => ({ id })))
            }} />
          </MainCard> */}
          </div>

        </Grid>
        <Grid sm={3} className=' sticky'>
          <MainCard title="Danh mục" >
            <SelectCategory value={watch("category_id")?.toString() || ""} onChange={(id) => {
              setValue("category_id", id)
            }} />
          </MainCard>
        </Grid>
      </Grid>

      <Dialog open={openEdit} onClose={() => { setOpenEdit(false) }} >
        <DialogContent>
          <FormEditVariant product={variantEdit} productDetail={product} onUpdatePrice={updatePrice} />
        </DialogContent>
      </Dialog>
    </div>
  )
}


function FormEditVariant({ product, productDetail, onUpdatePrice }: { product: ProductVariant, productDetail: Product, onUpdatePrice: (data: Pick<ProductUpdateInput, "price" | "price_max" | "price_min">) => Promise<void> }) {
  const { mutateAsync } = ProductsVariantServicesAPI.useUpdate()


  const { handleSubmit, control } = useForm<ProductVariantUpdateInput>({
    mode: "onSubmit",
    defaultValues: {
      title: product.title,
      barcode: product.barcode,
      compare_at_price: product.compare_at_price,
      inventory_quantity: product.inventory_quantity,
      price: product.price,
      sku: product.sku
    }
  });

  async function onSubmit(data: ProductVariantUpdateInput) {
    try {
      const priceUpdate = data.price ? +data.price : undefined
      const compare_at_price_update = data.compare_at_price ? +data.compare_at_price : undefined
      const res = await mutateAsync({
        id: product.id,
        data: {
          ...data,
          price: priceUpdate,
          compare_at_price: compare_at_price_update
        }
      })

      const variants = productDetail.variants.filter(pro => pro.id !== product.id)
      variants.push({ ...product, price: res.price, compare_at_price: res.compare_at_price })
      let price = 0
      let price_min = 0
      let price_max = 0

      const variantsSort = variants.sort((a, b) => a.price - b.price)
      const variantPricemin = variantsSort[0]
      price = variantPricemin.price
      if (variants.length > 1) {
        const variantPriceMax = variantsSort[variants.length - 1]
        price_max = variantPriceMax.price
        price_min = variantPricemin.price
      }

      await onUpdatePrice({
        price,
        price_max,
        price_min
      })
      toast.success("Cập nhập thành công")
    } catch (error) {
      toast.error("Cập nhập thất bại")

    }
  }

  return <form
    onSubmit={handleSubmit(onSubmit)}

  >
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
    <Button variant="contained" type="submit">Lưu</Button>

  </form>
}