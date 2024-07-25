import { useEffect, useState } from 'react'
import ProductsServicesAPI from '@/services/ProductsServicesAPI';
import { ProductCreateInput, ProductOption, ProductVariantCreateInput } from '@/types/product';
import MainCard from '@/ui-component/cards/MainCard'
import { Button, Chip, Grid, Input, OutlinedInput, Typography } from '@mui/material'
import { useForm } from 'react-hook-form';
import InputController from '@/components/InputControl';
import Editor from '@/components/Editor';
import SelectCategory from './components/add/SelectCategory';
import { createSlug, fillArray, generateVariants } from '@/utils/addProduct';
import SelectSpecifications from './components/add/SelectSpecifications';
import OptionsForm from './components/add/OptionsForm';
import { toast } from 'react-toastify';
import SelectBrand from './components/add/SelectBrand';
import SelectCategorySub from './components/add/SelectCategorySub';




export default function ProductAdd() {
  const { mutateAsync } = ProductsServicesAPI.useAdd()



  const [options, setOptions] = useState<ProductOption[]>([])
  const [variants, setVariants] = useState<ProductVariantCreateInput[]>([])
  const [images, setImages] = useState<string[]>(fillArray(4))

  const { handleSubmit, control, reset, setValue, watch } = useForm<ProductCreateInput>({
    mode: "onSubmit",
    defaultValues: {
      specifications: {
        connect: []
      },
      sub_categories: {
        create: []
      }
    }
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

        price_max,
        price_min,
        status: 1,

        images: {
          createMany: {
            data: images.filter(img => img).map((img, index) => {
              return { position: index + 1, url: img, is_featured: index === 0 }
            })
          }
        },
        options: {
          createMany: {
            data: options.map((option, index) => ({ position: index + 1, name: option.name, values: option.values }))
          }
        },
        variants: {
          createMany: {
            data: variants
          }
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
    reset()
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
      const variants = generateVariants(options, title || "")
      setVariants(variants)
    }
  }, [options, title])


  return (
    <div className=' py-2 '>
      <div className=' flex justify-between mb-2'>
        <Typography variant="h1">Thêm sản phẩm mới</Typography>

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
                    labelClassName="text-[#272727]"
                  />


                </div>

                <div className=' flex gap-2'>
                  <SelectCategory
                    value={watch("category.connect.id")?.toString() || ""} onChange={(id) => {
                      setValue("category.connect.id", id)
                    }}
                  />
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
                <div>
                  <InputController

                    label="Mô tả ngắn"
                    control={control}
                    name="short_description"
                    type="text"
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
                <Button className=' fixed bottom-10  right-20 ' variant="contained" type="submit">Lưu</Button>
              </form>
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
            </MainCard>
            <MainCard title="Biến thể">
              <OptionsForm onSubmit={(op) => setOptions(op)} />
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
        <Grid sm={3} >
          {/* <MainCard title="Danh mục" >
            <SelectCategory
              value={watch("category.connect.id")?.toString() || ""} onChange={(id) => {
                setValue("category.connect.id", id)
              }}
            />
          </MainCard> */}
          <MainCard title="Danh mục phụ" >
            <div className=' h-[500px]'>
              <SelectCategorySub
                name="sub_categories.create"
                control={control}
              />
            </div>
          </MainCard>
        </Grid>
      </Grid>
    </div>
  )
}
