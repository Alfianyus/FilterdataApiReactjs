import React, {useState, useEffect}  from "react";

const FComp=()=>{

    const [number, setNumber ]= useState(0);
    const[products, setProducts ]= useState([]);
    const[search, setSearch]= useState("");
    const[loading, setLoading]= useState(false);
     

    const counterNumber = (counter)=>{
        if(counter === "+") return setNumber((state) => state + 1);
        return setNumber((state) => (state - 1=== -1 ? 0: state -1));

    };

  


      const getProduct =async(val) => {
         const params=val?`/search?q=${val}` :"";
         setLoading(true) 
         const response= await fetch(`https://dummyjson.com/products${params}`);
         const respJson = await response.json();
         setProducts(respJson.products);
         setLoading(false)
        //  console.log({respJson: respJson.products});
      }; 



      const handleChangeSearch=(e)=>{
        const {target}=e;
        setSearch(target.value); 

     };

     const handleSubmitSearch=()=>{
        getProduct(search)
     }

    useEffect(() =>{
      getProduct();
    }, [])


    const getListProduct=()=>{
        if(loading)return<p>Loading....</p>

        if(!loading && products.length === 0) return <p>Produk Tidak Ditemukan</p>
        return products.map((val, i) =>{
            return( 
            <div 
            id={i.toString()} 
            style={{ 
              border: "1px solid black", 
              marginButtom:"10px", 
              padding:"10px" ,  
              }}> 
              <p>Title:{val.title}</p>
              <p>Description: {val.description}</p>
              <p>Price:{val.price}</p>
              <p>Brand: {val.brand}</p>
              <p>Category: {val.category}</p>
              </div>
              
              );
          } );
          
          
    };

      
    
     
    return(
    <>
    <h1>Functional Component</h1>;
    <div style={{display:"flex",  alignItems:"center"}}>
    <button 
    type="button" 
    onClick={()=>counterNumber("+")}
    style={{ marginRight:"15px" }}>
        +
        </button>
    <h2 style={{ padding: 0, margin:0 }}>{number}</h2>
    <button 
    type="button"
     onClick={()=>counterNumber("-")}
     style={{ marginLeft:"15px" }}>
        -
        </button>
    </div>
    <br/>
    <br/>
    <br/>
    <br/>
    <div style={{ width:"500px", margin:"0 auto" }}>
        <div style={{ marginButtom:"10px" }}>
         <input onChange={handleChangeSearch}/> 
         <button type="button" onClick ={handleSubmitSearch}>Search</button>
         </div>
         {getListProduct()}
        {/* {loading 
        ?"loading...."
         : products.map((val, i) =>{
          return( 
          <div 
          id={i.toString()} 
          style={{ 
            border: "1px solid black", 
            marginButtom:"10px", 
            padding:"10px" ,  
            }}> 
            <p>Title:{val.title}</p>
            <p>Description: {val.description}</p>
            <p>Price:{val.price}</p>
            <p>Brand: {val.brand}</p>
            <p>Category: {val.category}</p>
            </div>
            
            );
        } )
        }
        
        
         
        
         */}
    </div>
    </>
    );
};

export default FComp;
