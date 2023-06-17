import { Supplier } from "@/types";

export function isInvalidSupplier(supplier:Partial<Supplier>): false|Array<{ "key": string, "message": string }> {
  return false
}