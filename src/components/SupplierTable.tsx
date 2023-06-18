import { BaseSyntheticEvent } from 'react'
import { CategoryOptions, Supplier } from '../types'
const SupplierTable = ( props:{ 
  suppliers:Array<Supplier>, 
  onDeleteRequest(supplier:Supplier):void 
  onInspectRequest(supplier:Supplier):void
}) => {
  const { suppliers, onDeleteRequest, onInspectRequest } = props

  return (<>
  <table className="data-table w-full">
    <thead>
      <tr>
        <th>Name</th>
        <th className="w-3/12">Category</th>
        <th className="w-2/12">Delete</th>    
      </tr>
    </thead>
    <tbody>
      { (suppliers.length === 0 ) 
        ? <tr><td colSpan={3} className="text-center italic">You have not created any suppliers yet</td></tr>
        : <>
          {suppliers.map((supplier, idx) => (
            <tr key={`supplier-table-${idx}`}>
              <td><button className="text-link" onClick={()=>{ onInspectRequest(supplier) }}>{supplier.name}</button></td>
              <td>{CategoryOptions[supplier.category]}</td>
              <td><button className="btn font-xxs" onClick={()=>{ onDeleteRequest(supplier) }}>Delete</button></td>
            </tr>
          ))}
        </>
      }
    </tbody>
  </table>
</>)}

export default SupplierTable
