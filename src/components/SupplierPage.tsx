import { CategoryOptions, Supplier } from '@/types'
import SupplierTable from '@/components/SupplierTable'
import { useEffect, useState } from 'react'
import EditSupplier from './EditSupplier';
import { isValidSupplier } from '@/lib/supplier.validator';
import FlashMessage from './FlashMessage';

const SupplierPage = () => {

  const [supplierList, setSuppliersList] : [Array<Supplier>|undefined, Function] = useState();
  const [dirtySupplier, setDirtySupplier]: [Partial<Supplier>|undefined, Function] = useState();
  const [activeSupplier, setActiveSupplier]: [Partial<Supplier>|undefined, Function] = useState();
  const [flashMessage, setFlashMessage]: [string, Function] = useState('')

  useEffect(()=>{
    async function fetchData() {
      const res = await fetch('http://localhost:8080/api/suppliers')
      if (!res.ok) {
        throw new Error('Failed to fetch data')
      }
      const responsedData = await res.json();
      setSuppliersList(responsedData)
    }
    //setTimeout(fetchData, 3000)
    fetchData()
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

    async function createOrUpdateSupplier() {
      const res = await fetch(fetchUrl, 
        { 
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          method:fetchMethod,
          body: JSON.stringify(dirtySupplier)
        })
      
      if (!res.ok) {
        throw new Error('Failed to fetch data')
      }

      const responsedData = await res.json();
      if (responsedData.message) {
        setFlashMessage( `${responsedData.message}`)
        return 
      }
      // create a clone so that a state change won't act weird
      //let newSuppliersList = [ ...supplierList || [] ]
      let updateIdx:number = -1;
      if (supplierList) {
        updateIdx = supplierList.findIndex( supplier => ( supplier.id === responsedData.id ))
        if ( updateIdx >= 0 ) {
          supplierList.splice(updateIdx, 1, responsedData)
        } else {
          supplierList.push(responsedData)
        }
      }
      
      setSuppliersList( [ ... supplierList || [responsedData] ])
      setFlashMessage( `Supplier ${responsedData.name} has been ${ updateIdx? 'updated' : 'saved'}.`)
      setDirtySupplier(null); 
      setActiveSupplier(null); 
    }
    createOrUpdateSupplier()

  }, [dirtySupplier])
  

  function handleSupplierChange(payload:Partial<Supplier>) {
    if (isValidSupplier(payload)) {
      setDirtySupplier(payload); 
    }
  }

  function handleAddNew() {
    setActiveSupplier({})
  }

  function handleCancelEdit(){
    setActiveSupplier(null)
  }

  function handleInsepctRequest(supplier:Supplier){
    setActiveSupplier(supplier)
  }

  function handleSupplierDeleteRequest(supplier:Supplier){
    async function deleteSupplier() {
      const res = await fetch(`http://localhost:8080/api/suppliers/${supplier.id}`, 
        { 
          method: "DELETE"
        })
      if (!res.ok) {
        throw new Error('Failed to delete data')
      }

      if (supplierList) {
        const itemIdx: number = supplierList.indexOf(supplier);
        supplierList.splice(itemIdx, 1)
        setSuppliersList([...supplierList])
      }
      
      setFlashMessage( `Supplier ${supplier.name} has been deleted.`)

    }
    deleteSupplier()
  }

  return (
<>
<div>
  <h1>Supliers </h1>
  <button onClick={handleAddNew}>Add Supplier</button>
  { !supplierList 
  ?  <>Fetching Supplier List</>
    : <SupplierTable suppliers={supplierList} onDeleteRequest={handleSupplierDeleteRequest} onInspectRequest={handleInsepctRequest} />
  }

  { activeSupplier
    ? <EditSupplier supplier={ activeSupplier || {} } onChange={handleSupplierChange} onCancel={handleCancelEdit} />
    : <></>
  }
  {
   flashMessage
   ? <FlashMessage message={flashMessage} />
   : <></>
  }
  
</div>

</>)}

export default SupplierPage

