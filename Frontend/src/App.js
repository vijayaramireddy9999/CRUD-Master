import React, { useEffect, useState } from 'react'
import Table from './Table'
import Form from './Form'

import { getData, postData, putData } from './api'
import { deleteData } from './api'



function App() {

 const [products,setProducts] =  useState([])
 const [openForm ,setOpenForm] = useState(false)
 const [edit,setEdit]=useState(false)
 const [initialForm,setForm]=useState({
  name:'',price:'',category:''
 })

  useEffect(()=>{

    getProducts();
    
  },[])

  let getProducts = async ()=>{
    let res = await getData();
    setProducts(res.data);
    console.log(res);
  }

  let deleteProducts = async (id)=>{
    await deleteData(id);
    getProducts();
    
  }

  let addProduct =async (product)=>{

    let data={

      name:product.name,
      price:product.price,
      category:product.category

    }

    if(edit)
      await putData(product.id,data);
    else
      await postData(data);
    getProducts();
    setOpenForm(false);
  }

   let editProduct =async (data)=>{
    setForm(data)
    setOpenForm(true)
    setEdit(true)
  }

  let showForm = ()=>{
    setOpenForm(true)
    setForm({
      name:'' , price:'',category:''
    });
    setEdit(false);
  }

  let closeForm = ()=>{
    setOpenForm(false)
  }

  return (
    <div className='wrapper m-5 w-50'>
      <h1 className='text-primary'>CRUD OPERATIONS</h1>
      <button className='btn btn-primary' onClick={()=>
            showForm()
      }>Add Products</button>
      <Table products={products} delete={deleteProducts} edit={editProduct}></Table>
      {
        openForm && (
        <Form closeForm={closeForm} data={initialForm} add={addProduct}></Form>)
      }
    </div>
  )
}

export default App
