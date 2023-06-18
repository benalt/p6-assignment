import { useState } from "react"

const FlashMessage = (props:{ message: string }) => {
  
  return (
<div className={ props.message ? "active" : "inactive"}>
  {  props.message }
</div>)}

export default FlashMessage