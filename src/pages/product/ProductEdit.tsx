import { useEffect, useState } from 'react'
import ProductsServicesAPI from '@/services/ProductsServicesAPI';
import { Product, ProductImage, ProductUpdateInput, ProductVariant, ProductVariantUpdateInput } from '@/types/product';
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
import SelectBrand from './components/add/SelectBrand';
import SelectCategorySub from './components/add/SelectCategorySub';



export default function ProductEdit() {

  const { productId } = useParams();
  const { data, isSuccess, refetch } = ProductsServicesAPI.useDetail(productId || "")

  if (!isSuccess) return <></>

  return (
    <ProductEditForm product={data} refetch={refetch} />
  )
}


function ProductEditForm({ product, refetch }: { product: Product, refetch: () => void }) {

  const { mutateAsync } = ProductsServicesAPI.useUpdate()
  // const [options, setOptions] = useState<ProductOption[]>(product.options)
  const [variants, setVariants] = useState<ProductVariant[]>(product.variants)
  const [images, setImages] = useState<ProductImage[]>(fillArrayToLength(product.images, 4, ""))

  const [variantEdit, setVariantEdit] = useState<ProductVariant>(product.variants[0])
  const [openEdit, setOpenEdit] = useState(false)
  const { brand_id, category_id, compare_at_price, description_html, meta_data, slug, status, short_description, title } = product

  const { handleSubmit, control, setValue, watch } = useForm<ProductUpdateInput>({
    mode: "onSubmit",
    defaultValues: {
      title,
      brand: { connect: { id: brand_id } },
      category: { connect: { id: category_id } },
      compare_at_price,
      description_html,
      meta_data,
      slug,
      status,
      short_description,

    }
  });
  async function onSubmit(data: ProductUpdateInput) {
    try {
      await mutateAsync({
        id: product.id,
        data: {
          ...data,
          slug: createSlug(data.title ||""),
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
      refetch()
    } catch (error) {
      toast.error("Cập nhập thất bại")
    }
  }
  const handleInputChange = (index: number, value: string) => {
    // const newImages = [...images];
    // newImages[index] = value;
    // setImages(newImages);
  };
  function onEditVariant(variant: ProductVariant) {
    setVariantEdit(variant)
    setOpenEdit(true)
  }

  return (
    <div className=' py-2 '>
      <div className=' flex justify-between mb-2'>
        <Typography variant="h2">{product.title}</Typography>

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

                </div>
                <div className=' flex gap-2'>
                  <SelectCategory value={watch("category.connect.id")?.toString() || ""} onChange={(id) => {
                    setValue("category.connect.id", id)
                  }} />
                  <SelectBrand
                    value={watch("brand.connect.id")?.toString() || ""} onChange={(id) => {
                      setValue("brand.connect.id", id)
                    }}
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
                    label="Mô tả ngắn"
                    control={control}
                    name="short_description"
                    type="text"
                    className="my-3"
                    labelClassName="text-[#272727]"
                  />
                </div>
                <div className=' flex gap-2'>
                  <InputController

                    label="Tiêu đề meta"
                    control={control}
                    name="meta_data.meta_title"
                    type="text"
                    className="my-3"
                    labelClassName="text-[#272727]"
                  />
                  <InputController

                    label="Mô tả meta"
                    control={control}
                    name="meta_data.meta_description"
                    type="text"
                    className="my-3"
                    labelClassName="text-[#272727]"
                  />

                </div>
             
                <Button variant="contained" type="submit">Lưu</Button>
              </form>
            </MainCard>
            <MainCard title="Hình ảnh sản phẩm">
                  <div className=' grid grid-cols-2 gap-2'>
                    {images.map((image, index) => (
                      <div className=' flex flex-col gap-2  justify-center items-center'>
                        {image ? <img src={image.url} className=' w-[150px] h-[150px]' /> : null}
                        <OutlinedInput
                          key={index}
                          fullWidth
                          type="text"
                          value={image.url}
                          onChange={(e) => handleInputChange(index, e.target.value)}
                          placeholder={`Link hỉnh ảnh ${index + 1}`}
                        />

                      </div>
                    ))}
                  </div>
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
          <MainCard title="Hiển thị" >
        
          </MainCard>
          <MainCard title="Danh mục phụ" >
            <div className=' h-[500px]'>
              {/* <SelectCategorySub
                name="sub_categories.create"
                control={control}
              /> */}
            </div>
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


function FormEditVariant({ product, productDetail, onUpdatePrice }: { product: ProductVariant, productDetail: Product, onUpdatePrice: (data: Pick<ProductUpdateInput, "price" | "price_max" | "price_min" | "compare_at_price">) => Promise<void> }) {
  const { mutateAsync } = ProductsVariantServicesAPI.useUpdate()


  const { handleSubmit, control } = useForm<ProductVariantUpdateInput>({
    mode: "onSubmit",
    defaultValues: {
      title: product.title,
      barcode: product.barcode,
      compare_at_price: product.compare_at_price,
      inventory_quantity: product.inventory_quantity,
      price: product.price,
      sku: product.sku,
      position: product.position
    }
  });

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

    </div>
    <Button variant="contained" type="submit">Lưu</Button>

  </form>
}