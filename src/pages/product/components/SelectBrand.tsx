


import FormSelect, { FormInputSelectProps } from '@/components/FormSelect';
import BrandServicesAPI from '@/services/BrandServicesAPI';
import {  FieldValues } from 'react-hook-form';


export default function SelectBrand<
  TFieldValues extends FieldValues,
>(props:Omit< FormInputSelectProps<TFieldValues> , "options">) {
  const { data: cates, isSuccess } = BrandServicesAPI.useList()
  if (!isSuccess) {
    return null
  }

  const options = cates.map(cate => ({ label: cate.name, value: cate.id }))
  return (
    <FormSelect   {...props}  options={options} />

  )
}
