import { Supplier, SupplierKeyType } from "@/types";

function validates(key:string, value:any):boolean {
  if ( key === 'name' && !value) { return false }
  if ( key === 'emailAddress' && !value && !value?.match(/[\w-]+@([\w-]+\.)+[\w-]+/)) { return false }
  if ( key === 'category' && !["services", "subcontractors", "manufacturers", "distributors", "importers"].includes(value)) { return false }
  return true
}

export function isValidSupplier(supplier:Partial<Supplier>): [boolean , { [key: string] : string }] {
  const inValidMessages:{ [key: string] : string  } = {}
  let isValid = true;
  
  ['name', 'emailAddress', 'category'].forEach(key => {
    const val = supplier[key as SupplierKeyType]
    if (!validates(key, val)) {
      isValid = false
      inValidMessages[key] = `${key} is not valid`
    }
  })
  
  return [isValid, inValidMessages]
}