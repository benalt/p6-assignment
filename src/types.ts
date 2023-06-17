export type CategoryOptions = {
  "key": string,
  "label": string
}

export type Supplier = {
  id: number
  name: string
  emailAddress: string
  category: string
  description? :string
}

const supplier:Supplier = {id: 0, name:'', emailAddress: '', category: '', description:'' }
export type SupplierKeyType = keyof typeof supplier; //  "name" | "age"