import { Product, ProductAttribute } from '@/types/product'
import { Button, Chip, Select, Typography } from '@mui/material'
import React, { useState } from 'react'


export default function FormEditAttributes({ product }: {
  product: Product,
}) {
  const attributes = product.attributes
  return (
    <ul className=' flex flex-col gap-3 px-10'>
      {attributes.map(attribute => {
        return (
          <EditAttributesItem attribute={attribute} key={attribute.id} />
        )
      })}
    </ul>
  )
}


function EditAttributesItem({ attribute }: { attribute: ProductAttribute }) {
  const [isEdit, setIsEdit] = useState(false)

  return <li className=' border border-gray-300 p-2 rounded-md flex items-center gap-6' >
    <Chip label={attribute.position} />
    <Typography variant="body1" fontWeight="600" >
      {attribute.attribute.name}
    </Typography>
    <div className=' flex-1 justify-end flex gap-1 items-center'>
      {isEdit ? <Select /> : <>
        {attribute.values.map(item => {
          return <Chip variant="filled" label={item.value} key={item.id} />
        })}</>}

    </div>
    <Button onClick={() => setIsEdit(true)}>Chỉnh sửa</Button>
  </li>
}