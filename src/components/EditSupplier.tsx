import { Supplier, CategoryOptions } from "@/types";
import { useState, useEffect, BaseSyntheticEvent } from "react";

const EditSupplier = (props:{ supplier:Partial<Supplier>, categories:Array<CategoryOptions>, onChange(payload:Partial<Supplier>):void, onCancel():void }) => {
  const { onChange, onCancel } = props
  const [categories] = useState(props.categories)
  const [supplier, setSupplier] = useState(props.supplier)
  const errorMsg: { [key:string]: string} = {}
  
  function handleSubmit(evt:BaseSyntheticEvent) {
    //validate whole model
    onChange(supplier)
  }

  function handleCancel(evt:BaseSyntheticEvent) {
    onCancel()
  }

  function handleDataChange(evt:BaseSyntheticEvent){
    const field = evt.target.name
    const value = evt.target.value
    // validate feild
  }
  

  if (!categories) {
    return (<>Loading Categories for edit</>)
  }
  return (
<div>
    <label>Name <span>{errorMsg.name}</span></label>
    <input type="text"  name="name" defaultValue={supplier.name} onChange={handleDataChange} />
    
    <label>Email <span></span></label>
    <input type="text" name="email" defaultValue={supplier.emailAddress} onChange={handleDataChange} />
    
    <label>Category <span>{errorMsg.category}</span></label>
    <select name="category" onChange={handleDataChange}>
      {(categories).map((category) => (
        <option selected={category.key === supplier.category} defaultValue={category.key} key={`category-${category.key}`}>{category.label}</option>
      ))}
    </select>

    <label>Description <span>{errorMsg.description}</span></label>
    <textarea name="description" defaultValue={supplier.description} onChange={handleDataChange} rows={4} cols={50} />
    <button onClick={handleCancel}>Cancel</button>
    <button onClick={handleSubmit}>Save Supplier</button>
</div>
)}

export default EditSupplier