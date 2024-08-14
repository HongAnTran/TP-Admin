import { useState } from 'react'
import ProductsServicesAPI from '@/services/ProductsServicesAPI';
import { Product, ProductImage, ProductUpdateInput, ProductVariant } from '@/types/product';
import MainCard from '@/ui-component/cards/MainCard'
import { Button,  Dialog, DialogContent, Grid, Input, Typography } from '@mui/material'
import { useForm } from 'react-hook-form';
import InputController from '@/components/InputControl';
import Editor from '@/components/editor/Editor';
import SelectCategory from './components/SelectCategory';
// import SelectCategorySub from './components/SelectCategorySub';
import { useParams } from 'react-router-dom';
import { createSlug, fillArrayToLength } from '@/utils/addProduct';
import { toast } from 'react-toastify';
import { convetNumberToPriceVND } from '@/utils';
import SelectBrand from './components/SelectBrand';
import FormEditVariant from './components/edit/FormEditVariant';
import FormEditImage from './components/edit/FormEditImage';
import AddIcon from '@mui/icons-material/Add';
import FormAddImage from './components/edit/FormAddImage';
import FormEditAttributes from './components/edit/FormEditAttributes';


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
  const images = fillArrayToLength(product.images, 4, "")
  const [variantEdit, setVariantEdit] = useState<ProductVariant>(product.variants[0])


  const [openEdit, setOpenEdit] = useState(false)
  const [openEditImage, setOpenEditImage] = useState(false)
  const [openAddImage, setOpenAddImage] = useState(false)
  const [imageEdit, setImageEdit] = useState<ProductImage | null>(null)

  const { brand_id, category_id, description_html, meta_data, slug, status, short_description, title } = product

  const { handleSubmit, control, setValue, watch } = useForm<ProductUpdateInput>({
    mode: "onSubmit",
    defaultValues: {
      title,
      brand: { connect: { id: brand_id } },
      category: { connect: { id: category_id } },
      // sub_categories: { set: sub_categories.map(item => item.category.id) },
      description_html,
      meta_data: meta_data ? meta_data : undefined,
      slug,
      status,
      short_description,
    }
  });
  async function onSubmit(data: ProductUpdateInput) {
    try {
      // const subIds = data.sub_categories?.set as unknown as number[]

      await mutateAsync({
        id: product.id,
        data: {
          ...data,
          // sub_categories: { set: subIds.map((id: number) => ({ category_id: id })) || [] },
          slug: createSlug(data.title || ""),
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
  function onEditVariant(variant: ProductVariant) {
    setVariantEdit(variant)
    setOpenEdit(true)
  }

  function onEditImage(image: ProductImage) {
    setImageEdit(image)
    setOpenEditImage(true)
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
                <div className='  grid grid-cols-3 gap-2'>
                  <SelectCategory
                    label='Danh mục'
                    control={control}
                    name="category.connect.id"
                  />

                  <SelectBrand
                    label='Thương hiệu'

                    control={control}
                    name="brand.connect.id"
                  />
                  {/* <SelectCategorySub
                    label='Danh mục phụ'
                    name="sub_categories.set"
                    control={control} /> */}

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
                {images.map((image) => (
                  <div className=' flex flex-col gap-2  justify-center items-center'>
                    <div className=' relative'>
                      {image ? <img src={image.url} className=' w-[150px] h-[150px] cursor-pointer' onClick={() => onEditImage(image)} /> :
                        <div
                          onClick={() => setOpenAddImage(true)}
                          className=' w-[150px] h-[150px] cursor-pointer border-dashed  rounded-md border-2 flex justify-center items-center'>
                          <AddIcon />
                        </div>
                      }

                    </div>
                    <p>{image.position}</p>
                  </div>
                ))}
              </div>
            </MainCard>
            <MainCard title="Biến thể">
              <FormEditAttributes product={product} />
            </MainCard>
            <MainCard title="Danh sách biến thể">
              <ul className=' mt-3 flex flex-col gap-2'>
                {product.variants.map(variant => (
                  <li key={variant.sku} className='  grid grid-cols-3 gap-4'>
                    <div>
                      <Typography variant="body2"  color="blueviolet" fontWeight="600" >{variant.title}</Typography>
                      <Typography variant="body1" >sku: {variant.sku}</Typography>
                    </div>
                    <div className=' flex items-center  gap-2'>
                      <span>Giá</span>
                      <Input
                        className=' font-bold text-base'
                        value={convetNumberToPriceVND(variant.price)}

                        placeholder="Price"
                        disabled
                      />
                    </div>
                    <Button onClick={() => {
                      onEditVariant(variant)
                    }}>Sửa</Button>
                  </li>
                ))}
              </ul>
            </MainCard>
          </div>

        </Grid>
        <Grid sm={3}>
        </Grid>
      </Grid>


      <Dialog open={openEdit} onClose={() => { setOpenEdit(false) }} >
        <DialogContent>
          <FormEditVariant images={product.images} product={variantEdit} productDetail={product} onUpdatePrice={updatePrice} />
        </DialogContent>
      </Dialog>

      <Dialog open={openEditImage} onClose={() => { setOpenEditImage(false) }} >
        <DialogContent>
          {imageEdit &&
            <FormEditImage image={imageEdit} />
          }
        </DialogContent>
      </Dialog>
      <Dialog open={openAddImage} onClose={() => { setOpenAddImage(false) }} >
        <DialogContent>
          <FormAddImage product_id={product.id} />
        </DialogContent>
      </Dialog>
    </div>
  )
}

