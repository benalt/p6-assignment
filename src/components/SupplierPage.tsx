import { CategoryOptions, Supplier } from '@/types'
import SupplierTable from '@/components/SupplierTable'
import { useEffect, useState } from 'react'
import EditSupplier from './EditSupplier';
import { isInvalidSupplier } from '@/lib/supplier.validator';

const SupplierPage = () => {

  const [supplierList, setSuppliersList] : [Array<Supplier>|undefined, Function] = useState();
  const [dirtySupplier, setDirtySupplier]: [Partial<Supplier>|undefined, Function] = useState();
  const [categoriesList, setCategoriesList]: [Array<CategoryOptions>|undefined, Function] = useState();
  
  useEffect(()=>{
    async function fetchData() {
      const res = await fetch('http://localhost:8080/api/suppliers')
      if (!res.ok) {
        throw new Error('Failed to fetch data')
      }
      const responsedData = await res.json();
      setSuppliersList(responsedData)
    }

    async function fetchCatagories() {
      const res = await fetch('http://localhost:8080/api/categories')
      if (!res.ok) {
        throw new Error('Failed to fetch data')
      }
      const responsedData = await res.json();
      setCategoriesList(responsedData)
    }
    //setTimeout(fetchData, 3000)
    fetchData()
    fetchCatagories()
  }, [])

  useEffect(()=>{
    if (!dirtySupplier) { return }

    let fetchUrl = 'http://localhost:8080/api/suppliers'
    let fetchMethod = 'POST'

    if (dirtySupplier.id) {
      // this one already exists and we need to update
      fetchMethod = 'PUT'
      fetchUrl = `http://localhost:8080/api/suppliers/${dirtySupplier.id}`
    } 

    async function createOrUpdateCatagory() {
      const res = await fetch(fetchUrl, 
        { 
          method:fetchMethod,
          body: JSON.stringify(dirtySupplier)
        })
      if (!res.ok) {
        throw new Error('Failed to fetch data')
      }
      const responsedData = await res.json();
      
      // create a clone so that a state change won't act weird
      let newSuppliersList = [ ...supplierList || [] ]

      // determine if we need to upate or add 
      let update = newSuppliersList.find( supplier => supplier.id === responsedData.id )
      if ( update ) {
        update = { ...update, ...responsedData }
      } else {
        newSuppliersList.push(responsedData)
      }
      setDirtySupplier(null); 
      setSuppliersList( [
        ... responsedData
      ])
    }
    createOrUpdateCatagory()

  }, [dirtySupplier])
  

  function handleSupplierChange(payload:Partial<Supplier>) {
    if (!isInvalidSupplier(payload)) {
      setDirtySupplier(payload); 
    }
  }

  function handleCancelEdit(){}

  return (
<>
<div>
  <h1>Supliers </h1>
  <button>Add Supplier</button>
  { !supplierList 
  ?  <>Fetching Supplier List</>
    : <SupplierTable suppliers={supplierList}/>
  }
  { !supplierList || !categoriesList
    ? <>Fetching Suppliers and Categories</>
    : <EditSupplier supplier={ supplierList[0] || null } categories={categoriesList} onChange={handleSupplierChange} onCancel={handleCancelEdit()} />
  }
  
</div>

</>)}

export default SupplierPage

