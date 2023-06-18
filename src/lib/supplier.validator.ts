import { CategoryOptions, Supplier, SupplierKeyType } from "@/types";

function validates(key:string, value:any):boolean {
  if ( key === 'name'         && !value) { return false }
  if ( key === 'emailAddress' && (!value || !value.match(/[\w-]+@([\w-]+\.)+[\w-]+/))) { return false }
  if ( key === 'category'     && !Object.keys(CategoryOptions).includes(value)) { return false }
  return true
}

export function isValidSupplier(supplier:Partial<Supplier>): [boolean , { [key: string] : string }] {
  const inValidMessages:{ [key: string] : string  } = {}
  let isValid = true;
  
  ['name', 'emailAddress', 'category'].forEach(key => {
    const val = supplier[key as SupplierKeyType]
    console.log(`validating ${key}, ${val}, ${validates(key, val)}` )
    if (!validates(key, val)) {
      isValid = false
      inValidMessages[key] = `${key} is not valid`
    }
  })
  
  return [isValid, inValidMessages]
}