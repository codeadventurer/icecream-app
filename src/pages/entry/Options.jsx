import { useEffect, useState } from 'react'
import axios from 'axios'
import { Row } from 'react-bootstrap'

import { pricePerItem } from '../../constants'
import { useOrderDetails } from '../../contexts/OrderDetails'
import ScoopOption from './ScoopOption'
import ToppingOption from './ToppingOption'
import AlertBanner from '../common/AlertBanner'

export default function Options({ optionType }) {
  const [items, setItems] = useState([])
  const [error, setError] = useState(false)
  const [orderDetails, updateItemCount] = useOrderDetails()

  useEffect(() => {
    // optionType is 'scoops' or 'toppings'
    axios
      .get(`http://localhost:3030/${optionType}`)
      .then((response) => setItems(response.data))
      .catch(() => {
        setError(true)
      })
  }, [optionType])

  const ItemComponent = optionType === 'scoops' ? ScoopOption : ToppingOption
  const title = `${optionType[0].toUpperCase()}${optionType
    .slice(1)
    .toLowerCase()}`

  if (error) return <AlertBanner />

  const optionItems = items.map((item) => (
    <ItemComponent
      key={item.name}
      name={item.name}
      imagePath={item.OptionsimagePath}
      updateItemCount={(itemName, newItemCount) => {
        updateItemCount(itemName, newItemCount, optionType)
      }}
    />
  ))
  return (
    <>
      <h2>{title}</h2>
      <p>${pricePerItem[optionType]} each</p>
      <p>
        {title} total: {orderDetails.totals[optionType]}
      </p>
      <Row>{optionItems}</Row>
    </>
  )
}
