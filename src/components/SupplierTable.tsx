import { Supplier } from '../types'
const SupplierTable = (props:{ suppliers:Array<Supplier> }) => {
  const { suppliers } = props

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
        ? <tr><td colSpan={3}>You haven’t created any suppliers yet</td></tr>
        : <>
          {suppliers.map((supplier, idx) => (
            <tr key={idx}>
              <td>{supplier.name}</td>
              <td>{supplier.category}</td>
              <td><button>Delete</button></td>
            </tr>
          ))}
        </>
      }
    </tbody>
  </table>
</>)}

export default SupplierTable
