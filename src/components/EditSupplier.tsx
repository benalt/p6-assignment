import { isValidSupplier } from "@/lib/supplier.validator";
import { Supplier, CategoryOptions, SupplierKeyType } from "@/types";
import { useState, useEffect, BaseSyntheticEvent } from "react";

const EditSupplier = (props:{ 
  supplier:Partial<Supplier>, 
  onChange(payload:Partial<Supplier>):void, 
  onCancel():void 
}) => {

  const { onChange, onCancel, supplier } = props
  const [supplierUpdate, setSupplierUpdate]:[Partial<Supplier>, Function ] = useState({id:supplier.id })
  const [errorMsg, setErrorMsg]: [{[key:string]: string}, Function] = useState({})
  
  function handleSubmit(evt:BaseSyntheticEvent) {
    const [isValid, invalidMessages] = isValidSupplier({...supplier, ...supplierUpdate});
    setErrorMsg(invalidMessages || {})
    if (isValid) {
      onChange(supplierUpdate)
    }
  }

  function handleCancel(evt:BaseSyntheticEvent) {
    onCancel()
  }

  function handleDataChange(evt:BaseSyntheticEvent){
    const field = evt.target.name as SupplierKeyType
    const value = evt.target.value
    const newVals:Partial<Supplier> = {}
    newVals[field as SupplierKeyType] = value;
    setSupplierUpdate({...supplierUpdate, ...newVals})
  }

  return (
<div>
    <label>Name <span>{errorMsg.name}</span></label>
    <input type="text"  name="name" defaultValue={supplier.name} onChange={handleDataChange} />
    <br />
    <label>Email <span>{errorMsg.emailAddress}</span></label>
    <input type="text" name="emailAddress" defaultValue={supplier.emailAddress} onChange={handleDataChange} />
    <br />
    <label>Category <span>{errorMsg.category}</span></label>
    <select name="category" defaultValue={ supplier.category } onChange={handleDataChange}>
      <option value="" disabled selected>Select your Category</option>
      {Object.entries(CategoryOptions).map(([key, label]) => (
        <option value={key} key={`category-${key}`}>{label}</option>
      ))}
    </select>
    <br />
    <label>Description <span>{errorMsg.description}</span></label>
    <textarea name="description" defaultValue={supplier.description} onChange={handleDataChange} rows={4} cols={50} />
    <br />
    <button onClick={handleCancel}>Cancel</button>
    <button onClick={handleSubmit}>Save Supplier</button>
</div>
)}

export default EditSupplier