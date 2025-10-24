import React, { useState } from 'react'

function Form(props) {

    const [product,setProduct]=useState(props.data);
    const[submitted,setSubmitted]=useState(false)

    let changeFormData =(event)=>{

    
           const {name,value}=  event.target;

           setProduct({...product,[name]:value})
    }
  return (
    <div className='form-overlay'>
        <form>
            <div className='form-group'>
                <label>Name:</label>
                <input className='form-control mt-2' value={product.name} type='text' name='name' placeholder='Enter - Name'onChange={changeFormData} />
                {
                    submitted && product.name.length <5   && <span className='text-danger'>Product Name Required</span>
                }
            </div>
            <div className='form-group'>
                <label>Price:</label>
                <input className='form-control mt-2' value={product.price} type='number' name='price' placeholder='Enter - Price' onChange={changeFormData} />
                {
                    submitted && product.price ==="" && <span className='text-danger'>Product Price Required</span>
                }
            </div>
            <div className='form-group'>
                <label>Category</label>
                <select className='form-control mt-2' value={product.category} onChange={changeFormData} name='category'>
                    <option value='-1'></option>
                    <option value={'mobiles'}>mobiles</option>
                    <option value={'laptops'}>laptops</option>
                    <option value={'tv'}>Tv's</option>
                </select>
                {
                    submitted && product.category ==="" && <span className='text-danger'>Product category Required</span>
                }
            </div>

            <button className='btn btn-primary float-end'
             onClick={(e)=>{
                setSubmitted(true)
                    e.preventDefault();
                    if(!!product.name && !!product.price && !!product.category){
                        props.add(product)
                    }

            }}  >Send</button>
            <button className='btn btn-danger float-end' onClick={(e)=>{
                e.preventDefault();
                props.closeForm();
            }}>Cancel</button>
        </form>
      
    </div>
  )
}

export default Form
