import { useState } from 'react'
import ProductsServicesAPI from '@/services/ProductsServicesAPI';
import { Product, ProductImage, ProductUpdateInput, ProductVariant } from '@/types/product';
import MainCard from '@/ui-component/cards/MainCard'
import { Button, Chip, Dialog, DialogContent, Grid, Input, Typography } from '@mui/material'
import { useForm } from 'react-hook-form';
import InputController from '@/components/InputControl';
import Editor from '@/components/Editor';
import SelectCategory from './components/add/SelectCategory';
import { useParams } from 'react-router-dom';
import { createSlug, fillArrayToLength } from '@/utils/addProduct';
import { toast } from 'react-toastify';
import { convetNumberToPriceVND } from '@/utils';
import SelectBrand from './components/add/SelectBrand';
import FormEditVariant from './components/edit/FormEditVariant';
import FormEditImage from './components/edit/FormEditImage';
import AddIcon from '@mui/icons-material/Add';
import FormAddImage from './components/edit/FormAddImage';


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
              {/* <OptionsForm defaultValue={options} onSubmit={(op) => setOptions(op)} /> */}



            </MainCard>
            <MainCard title="Danh sách biến thể">
              <ul className=' mt-3 flex flex-col gap-2'>
                {product.variants.map(variant => (
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
                        placeholder="Giá so sánh"
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
        <Grid sm={3} className=' sticky'>
          <MainCard title="Hiển thị" >
          </MainCard>
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

