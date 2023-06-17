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