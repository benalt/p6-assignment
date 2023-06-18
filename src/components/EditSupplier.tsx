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
<div className="max-w-[400px] mx-auto">
    <h2 className="text-xs font-bold border-b-2 border-ui p-[.5rem]">{ supplier.id ? "Update" : "Create" } Supplier</h2>
    <ul className="mt-[2rem]">
      <li className={`formRow ${errorMsg.name ? "formErrorRow" : ""}`}>
        <label className="formLabel">Name</label>
        <input className="textInput" type="text" name="name" defaultValue={supplier.name} onChange={handleDataChange} />
        <span className="formError">{errorMsg.name}</span>
      </li>
      <li className={`formRow ${errorMsg.emailAddress ? "formErrorRow" : ""}`}>
        <label className="formLabel">Email</label>
        <input className="textInput" type="text" name="emailAddress" defaultValue={supplier.emailAddress} onChange={handleDataChange} />
        <span className="formError">{errorMsg.emailAddress}</span>
      </li>
      <li className={`formRow ${errorMsg.category ? "formErrorRow" : ""}`}>
        <label className="formLabel">Category</label>
        <select className="selectInput" name="category" defaultValue={ supplier.category } onChange={handleDataChange}>
          <option value="" disabled selected>Select Category</option>
          {Object.entries(CategoryOptions).map(([key, label]) => (
            <option value={key} key={`category-${key}`}>{label}</option>
          ))}
        </select>
        <span className="formError">{errorMsg.category}</span>
      </li>
      <li className="formRow">
        <label className="formLabel"><span>Description</span> <span  className="formLabelNote">Optional</span></label>
        <textarea className="textInput" name="description" defaultValue={supplier.description} onChange={handleDataChange} rows={4} cols={50} />   
      </li>
    </ul>
    <div className="flex mt-[1rem] justify-end gap-[.5rem] ">
      <button className="btn" onClick={handleCancel}>Cancel</button>
      <button className="btn" onClick={handleSubmit}>Save Supplier</button>
    </div>
</div>
)}

export default EditSupplier