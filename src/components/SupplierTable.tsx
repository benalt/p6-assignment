import { BaseSyntheticEvent } from 'react'
import { Supplier } from '../types'
const SupplierTable = ( props:{ 
  suppliers:Array<Supplier>, 
  onDeleteRequest(supplier:Supplier):void 
  onInspectRequest(supplier:Supplier):void
}) => {
  const { suppliers, onDeleteRequest, onInspectRequest } = props
  
  return (<>
  <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Category</th>
        <th>Delete</th>    
      </tr>
    </thead>
    <tbody>
      { (suppliers.length === 0 ) 
        ? <tr><td colSpan={3}>You haven not created any suppliers yet</td></tr>
        : <>
          {suppliers.map((supplier, idx) => (
            <tr key={idx}>
              <td><button onClick={()=>{ onInspectRequest(supplier) }}>{supplier.name}</button></td>
              <td>{supplier.category}</td>
              <td><button onClick={()=>{ onDeleteRequest(supplier) }}>Delete</button></td>
            </tr>
          ))}
        </>
      }
    </tbody>
  </table>
</>)}

export default SupplierTable
