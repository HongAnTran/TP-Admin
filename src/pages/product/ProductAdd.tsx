import { useEffect, useState } from 'react'
import ProductsServicesAPI from '@/services/ProductsServicesAPI';
import { ProductCreateInput, ProductStatus, ProductVariantCreateInput } from '@/types/product';
import MainCard from '@/ui-component/cards/MainCard'
import { Button, Chip, Grid, Input, OutlinedInput, Typography } from '@mui/material'
import { useForm } from 'react-hook-form';
import Editor from '@/components/editor/Editor';
import SelectCategory from './components/SelectCategory';
import { createSlug, fillArray, generateVariants } from '@/utils/addProduct';
import SelectSpecifications from './components/SelectSpecifications';
import OptionsForm from './components/OptionsForm';
import { toast } from 'react-toastify';
import SelectBrand from './components/SelectBrand';
import SelectCategorySub from './components/SelectCategorySub';
import { AttributeValue, ProductAttributeCreateInput } from '@/types/attribute';
import AttributeServicesAPI from '@/services/AttributeServicesAPI';
import SaveIcon from '@mui/icons-material/Save';
import { FormInputText } from '@/components/FormInputText';
import FileUpload from '@/components/UploadImage';



export default function ProductAdd() {
  const { mutateAsync } = ProductsServicesAPI.useAdd()
  const { data: attributes, isSuccess } = AttributeServicesAPI.useList()
  const { data: attributesValue, isSuccess: suc } = AttributeServicesAPI.useListValue()



  const [options, setOptions] = useState<ProductAttributeCreateInput[]>([])
  const [variants, setVariants] = useState<ProductVariantCreateInput[]>([])
  const [images, setImages] = useState<string[]>(fillArray(4))

  const initValue: ProductCreateInput = {
    title: "",
    slug: "",
    meta_data: {},
    available: true,
    barcode: "",
    compare_at_price: 0,
    price: 0,
    description_html: "",
    price_max: 0,
    price_min: 0,
    short_description: "",
    status: ProductStatus.SHOW,
    specifications: {
      connect: []
    },
    sub_categories: {
      create: []
    },
  }

  const { handleSubmit, control, reset, setValue, watch } = useForm<ProductCreateInput>({
    mode: "onSubmit",
    defaultValues: initValue
  });

  const title = watch("title")

  async function onSubmit(data: ProductCreateInput) {
    try {
      let price = 0
      let compare_at_price = 0
      let price_min = 0
      let price_max = 0
      const variantsSortPosition = variants.slice().sort((a, b) => a.position - b.position)
      const variantsSortPrice = variants.slice().sort((a, b) => a.price - b.price)



      const variantPricemin = variantsSortPrice[0]
      const variantDefault = variantsSortPosition[0]


      price = variantDefault.price
      compare_at_price = variantDefault.compare_at_price




      if (variants.length > 1) {
        const variantPriceMax = variantsSortPrice[variants.length - 1]
        price_max = variantPriceMax.price
        price_min = variantPricemin.price
      }

      const subIds = data.sub_categories?.create as unknown as number[]

      await mutateAsync({
        ...data,
        slug: createSlug(data.title),
        price,
        compare_at_price,
        barcode: null,
        price_max,
        price_min,
        status: 1,
        brand : data.brand?.connect.id ? {connect :  data.brand?.connect} :undefined ,
        images: {
          createMany: {
            data: images.filter(img => img).map((img, index) => {
              return { position: index + 1, url: img, is_featured: index === 0 }
            })
          }
        },
        attributes: {
          create: options.map((op, index) => ({ ...op, position: index + 1 }))
        },
        variants: {
          create: variants
        },
        specifications: {
          connect: data.specifications?.connect || []
        },
        sub_categories: {
          create: subIds.map((id: number) => ({
            category: { connect: { id: id } }
          })) || []
        }
      })
      toast.success(`Thêm thành công`)

      resetValue()
    } catch (error) {
      toast.error(`Thêm thất bại`)

    }
  }
  function resetValue() {
    reset(initValue)
    setVariants([])
    setOptions([])
    setImages(["", "", "", ""])
  }

  const handlePriceChange = (id: string, price: number) => {
    setVariants(prevList =>
      prevList.map(variant =>
        variant.sku === id ? { ...variant, price } : variant
      )
    );
  };
  const handleComparePriceChange = (id: string, compareAtPrice: number) => {
    setVariants(prevList =>
      prevList.map(variant =>
        variant.sku === id ? { ...variant, compare_at_price: compareAtPrice } : variant
      )
    );
  };
  const handleInputChange = (index: number, value: string) => {
    const newImages = [...images];
    newImages[index] = value;
    setImages(newImages);
  };
  useEffect(() => {
    if (title) {
      const optionsNew: Pick<AttributeValue, "id" | "value">[][] = options.map(option => {
        return option.values.connect.map(op => ({ id: op.id, value: attributesValue?.find(attr => attr.id === op.id)?.value || "" }))
      })

      const variants = generateVariants(optionsNew, title || "")
      setVariants(variants)
    }
  }, [attributes, attributesValue, options, title])

  return (
    <div className=' py-2 '>

      <form
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className=' flex justify-between mb-2'>
          <Typography variant="h3">Thêm sản phẩm mới</Typography>
          <div className=' flex gap-4 mb-4'>
            <Button startIcon={<SaveIcon />} color="secondary" variant="outlined" >Lưu nháp</Button>
            <Button startIcon={<SaveIcon />} variant="contained" color="secondary" type="submit">Lưu</Button>
          </div>
        </div>
        <Grid container gap={3} wrap="nowrap" className=' relative'>

          <Grid sm={9}>
            <div className=' flex flex-col gap-8'>
              <MainCard title="Thông tin cơ bản" contentSX={{ height: "auto" }}>
                <div className=' flex flex-col gap-8'>
                  <FormInputText
                    rules={{
                      required: "Nhập tên sản phẩm"
                    }}
                    label="Tên sản phẩm"
                    control={control}
                    name="title"
                    type="text"
                    fullWidth
                  />


                  <div >
                    <Typography variant="h4" className=' mb-4'>Mô tả sản phẩm</Typography>
                    <Editor
                      onChange={(value) => { setValue("description_html", value) }}
                      value={watch("description_html") || ""}
                    />
                  </div>
                  <div>
                    {/* <InputController
                      label="Mô tả ngắn"
                      control={control}
                      name="short_description"
                      type="text"
                      labelClassName="text-[#272727]"
                    /> */}

                  </div>

                </div>



              </MainCard>
              <MainCard title="Hình ảnh sản phẩm">
                <div className=' flex flex-col gap-4'>
                  {images.map((image, index) => (
                    <div className=' flex flex-col gap-2  justify-center items-center'>
                      {image ? <img src={image} className=' w-[150px] h-[150px]' /> : null}

                      <OutlinedInput
                        key={index}
                        fullWidth
                        type="text"
                        value={image}
                        onChange={(e) => handleInputChange(index, e.target.value)}
                        placeholder={`Link hỉnh ảnh ${index + 1}`}
                      />

                    </div>

                  ))}
                </div>
                {/* <FileUpload /> */}
              </MainCard>

              <MainCard title="Phần dành cho SEO">
                <div className=' grid grid-cols-2 gap-2'>
                  <FormInputText
                    label="Đường dẫn"
                    control={control}
                    name="slug"
                    type="text"
                    className="my-3"
                  />
                  <FormInputText

                    label="Tiêu đề"
                    control={control}
                    name="meta_data.meta_title"
                    type="text"
                    className="my-3"
                  />

                  <FormInputText
                    label="Mô tả"
                    control={control}
                    name="meta_data.meta_description"
                    type="text"
                    className="my-3"
                  />
                  <FormInputText

                    label="Từ khóa"
                    control={control}
                    name="meta_data.meta_keywords"
                    type="text"
                    className="my-3"
                  />
                </div>
              </MainCard>
              <MainCard title="Biến thể">
                {isSuccess && suc ? <OptionsForm attributes={attributes} attributesValue={attributesValue} onSubmit={(op) => {
                  setOptions(op)
                }} /> : null}
              </MainCard>
              <MainCard title="Danh sách biến thể">
                <ul className=' mt-3 flex flex-col gap-2'>
                  {variants.map(variant => (
                    <li key={variant.sku} className='  grid grid-cols-3 gap-4'>
                      <Chip color="primary" label={variant.title} />
                      <div className=' flex items-center  gap-2'>
                        <span>Giá</span>
                        <Input
                          type="number"
                          value={variant.price}
                          onChange={(e) => handlePriceChange(variant.sku, parseFloat(e.target.value))}
                          placeholder="Price"

                        />
                      </div>
                      <div className=' flex items-center  gap-2'>
                        <span>Giá so sánh</span>

                        <Input
                          type="number"
                          value={variant.compare_at_price}
                          onChange={(e) => handleComparePriceChange(variant.sku, parseFloat(e.target.value))}
                          placeholder="Compare at Price"
                        />
                      </div>
                    </li>
                  ))}
                </ul>
              </MainCard>
              <MainCard title="Thông số kỷ thuật">
                <SelectSpecifications value={watch("specifications.connect").map(spe => spe.id)} onChange={(ids) => {
                  setValue("specifications.connect", ids.map(id => ({ id })))
                }} />
              </MainCard>
            </div>

          </Grid>


          <Grid sm={3}>

            <div className=' flex flex-col gap-4'>

              <MainCard title="Danh mục & Thương hiệu">

                <div className=' grid  grid-cols-1 gap-4'>
                  <SelectCategory
                    label='Danh mục'
                    control={control}
                    name="category.connect.id"
                  />


                  <SelectCategorySub
                    label='Danh mục phụ'

                    name="sub_categories.create"
                    control={control}
                  />
                  <SelectBrand
                    label='Thương hiệu'

                    control={control}
                    name="brand.connect.id"
                  />
                </div>
              </MainCard>
              <MainCard title="Nhãn dán">

              </MainCard>
            </div>
          </Grid>

        </Grid>
      </form>
    </div>
  )
}
