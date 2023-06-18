export const CategoryOptions: {
  services: string, 
  subcontractors: string, 
  manufacturers: string, 
  distributors: string, 
  importers: string, 
} = {
  services: "Services",
  subcontractors: "Sub-contractors",
  manufacturers: "Manufacturers",
  distributors: "Distributors",
  importers: "Importers",
}
export type CategoryOptionsKeyType = keyof typeof CategoryOptions

export type Supplier = {
  id: number
  name: string
  emailAddress: string
  category: CategoryOptionsKeyType
  description? :string
}


const supplier:Supplier = {id: 0, name:'', emailAddress: '', category: 'services', description:'' }
export type SupplierKeyType = keyof typeof supplier;