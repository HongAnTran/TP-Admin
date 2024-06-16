import { useState } from 'react'
import ProductsServicesAPI from '@/services/ProductsServicesAPI';
import { Product, ProductCreateInput, ProductOption, ProductUpdateInput, ProductVariant } from '@/types/product';
import MainCard from '@/ui-component/cards/MainCard'
import { Button, Grid, Input, Typography } from '@mui/material'
import { useForm } from 'react-hook-form';
import InputController from '@/components/InputControl';
import Editor from '@/components/Editor';
import SelectCategory from './components/add/SelectCategory';
import SelectSpecifications from './components/add/SelectSpecifications';
import OptionsForm from './components/add/OptionsForm';
import { useParams } from 'react-router-dom';
import { createSlug } from '@/utils/addProduct';



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


  const [options, setOptions] = useState<ProductOption[]>(product.options)
  const [variants, setVariants] = useState<ProductVariant[]>(product.variants)
  const [images, setImages] = useState<string[]>(product.images)

  const { handleSubmit, control, reset, setValue, watch } = useForm<ProductUpdateInput>({
    mode: "onSubmit",
    defaultValues: {
      specifications: {
        connect: product.specifications.map(spe => ({ id: spe.id }))
      },
      title: product.title,
      category: { update: { id: product.category_id } },
      vendor: product.vendor,
      barcode: product.barcode,
      description_html: product.description_html,
      featured_image: product.featured_image,
      short_description: product.short_description,
      meta_description: product.meta_description,
      meta_title: product.meta_title,

    }
  });

  async function onSubmit(data: ProductUpdateInput) {
    try {

      // let price = data.price
      // let price_min = data.price_min
      // let price_max = data.price_max

      // const variantsSort = variants.sort((a, b) => a.price - b.price)
      // const variantPricemin = variantsSort[0]
      // price = variantPricemin.price
      // if (variants.length > 1) {
      //   const variantPriceMax = variantsSort[0]
      //   price_max = variantPriceMax.price
      //   price_min = variantPricemin.price
      // }
      await mutateAsync({
        id : product.id,
        data : {
          ...data,
          slug: createSlug(data.title),
          // price,
          // price_max,
          // price_min,
          status: 1,
          images: images.filter(img => img),
        }
      })
      resetValue()
    } catch (error) { /* empty */ }
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



  return (
    <div className=' py-2'>
      <div className=' flex justify-between mb-2'>
        <Typography variant="h1">Chỉnh sửa sản phẩm {product.title}</Typography>

      </div>
      <Grid container gap={3} wrap="nowrap">
        <Grid sm={9}>
          <div className=' flex flex-col gap-2'>

            <MainCard title="Thông tin cơ bản" contentSX={{ height: "auto" }}>
              <form
                className="w-full  h-full flex flex-col gap-[25px] "
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className=' flex gap-2'>
                  <InputController

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

                    label="Ảnh đại diện"
                    control={control}
                    name="featured_image"
                    type="text"
                    className="my-3"
                    labelClassName="text-[#272727]"
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

                <div>
                  <Editor
                    onChange={(value) => { setValue("description_html", value) }}
                    value={watch("description_html") || ""}
                  />
                </div>
                <div className=' flex gap-2'>
                  <InputController

                    label="meta_description"
                    control={control}
                    name="meta_description"
                    type="text"
                    className="my-3"
                    labelClassName="text-[#272727]"
                  />
                  <InputController

                    label="meta_title"
                    control={control}
                    name="meta_title"
                    type="text"
                    className="my-3"
                    labelClassName="text-[#272727]"
                  />
                </div>

                <Button className=' fixed bottom-10  right-10 ' variant="contained" type="submit">Lưu</Button>
              </form>
            </MainCard>
            <MainCard title="Hình ảnh sản phẩm">
              <div className=' flex flex-col gap-1'>
                {images.map((image, index) => (
                  <div key={index}>
                    <Input
                      type="text"
                      value={image}
                      onChange={(e) => handleInputChange(index, e.target.value)}
                      placeholder={`Image URL ${index + 1}`}

                    />
                  </div>
                ))}
              </div>
            </MainCard>
            {/* <MainCard title="Biến thể">
              <OptionsForm onSubmit={(op) => setOptions(op)} defaultValue={product.options} />

              <ul>
                {variants.map(variant => (
                  <li key={variant.sku}>
                    <span>{variant.title}</span>
                    <Input
                      type="number"
                      value={variant.price}
                      onChange={(e) => handlePriceChange(variant.sku, parseFloat(e.target.value))}
                      placeholder="Price"
                    />
                    <Input
                      type="number"
                      value={variant.compare_at_price}
                      onChange={(e) => handleComparePriceChange(variant.sku, parseFloat(e.target.value))}
                      placeholder="Compare at Price"
                    />
                  </li>
                ))}
              </ul>

            </MainCard>
            <MainCard title="Thông số kỉ thuật">
              <SelectSpecifications value={watch("specifications.connect").map(spe => spe.id)} onChange={(ids) => {
                setValue("specifications.connect", ids.map(id => ({ id })))
              }} />


            </MainCard> */}
          </div>

        </Grid>
        <Grid sm={3}>
          <MainCard title="Danh mục">
            <SelectCategory value={watch("category.update.id")?.toString() || ""} onChange={(id) => {
              setValue("category.update.id", id)
            }} />
          </MainCard>
        </Grid>

      </Grid>
    </div>
  )
}