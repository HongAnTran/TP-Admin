import { AttributeValue } from '@/types/attribute'
import { Product, ProductAttribute } from '@/types/product'
import { Button, Chip, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'


export default function FormEditAttributes({ product, onDelete, attributesDetele }: {
  product: Product,
  onDelete: (value: AttributeValue) => void
  attributesDetele: AttributeValue[]
}) {
  const attributes = product.attributes
  return (
    <ul className=' flex flex-col gap-3 px-10'>
      {attributes.map(attribute => {
        return (
          <EditAttributesItem attribute={attribute} key={attribute.id} onDelete={onDelete} attributesDetele={attributesDetele} />
        )
      })}
    </ul>
  )
}


function EditAttributesItem({ attribute, attributesDetele, onDelete }: {
  attribute: ProductAttribute, onDelete: (value: AttributeValue) => void,
  attributesDetele: AttributeValue[]
}) {
  const [isEdit, setIsEdit] = useState(false)
  const [isAccepct  , setIsAccepct] = useState(true)

  const values = attribute.values.filter(item=>!attributesDetele.find(attr=>attr.id === item.id))


  useEffect(()=>{
    if(values.length ===1){
      setIsAccepct(false)
    }else{
      setIsAccepct(true)

    }
  },[values.length])

  return <li className=' border border-gray-300 p-2 rounded-md flex items-center gap-6' >
    <Chip label={attribute.position} />
    <Typography variant="body1" fontWeight="600" >
      {attribute.attribute.name}
    </Typography>
    <div className=' flex-1 justify-end flex gap-1 items-center'>
      {values.map(item => {
        return <Chip onDelete={isEdit && isAccepct ? () => { onDelete(item) } : undefined} variant="filled" label={item.value} key={item.id} />
      })}
    </div>

    {isEdit  && <Button variant="contained">Thêm</Button>}

    {isEdit && isAccepct ?  <Button onClick={() => setIsEdit(false)}>Xong</Button> : <Button  onClick={() => setIsEdit(true)}>Chỉnh sửa</Button>}

  </li>
}