import React, { useState, useEffect } from "react";
import Nav from "../Sidebar/Nav";
import ProductSupplier from "./ProductSupplier";
import SecondarySupplier from "./SecondarySupplier";
import { useNavigate } from "react-router-dom";
import { MultiSelect } from "react-multi-select-component";
import { api } from './../../api/apiResource';


const formtitle = {
  textAlign: "center",
  backgroundColor: "#5a8dee",
  padding: "1rem",
  color: "#ffffff",
};
 
const AddProduct = () => {
  const [create, setCreate] = useState(false);
  const [createSecondary, setCreateSecondary] = useState(false);

  const [categories, setCategories] = useState([]);
  const [subcategories, setSubCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  // const options = [
  //   { label: "Grapes", value: "grapes" },
  //   { label: "Mango", value: "mango" },
  //   { label: "Strawberry ", value: "strawberry" },
  // ];

  const navigate = useNavigate();

  const [department, setDepartment] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [subCategoryId, setSubCategoryId] = useState("");
  const [brandId, setBrandId] = useState("");
  const [productName, setProductName] = useState("");
  const [partNumber, setPartNumber] = useState("");
  const [measuringUnit, setMeasuringUnit] = useState("");
  const [registerDate, setRegisterDate] = useState("");
  const [description, setDescription] = useState("");
  const [instockOrderType, setInstockOrder] = useState("");
  const [minOrderQuantity, setMinOrderQuantity] = useState("");
  const [moqPrice, setMoqPrice] = useState("");
  const [instockQuantity, setInstockQuantity] = useState("");
  const [reorderQuantity, setReorderQuantity] = useState("");
  const [primarySupplier, setPrimarySupplier] = useState("");
  const [departments,setDepartmentList]=useState([]);
  const [productImg, setProductImg] = useState(null);
  const [selected, setSelectedSecondary] = useState([]);
  const [selectedSecondary,setSelectedSecondaryId]=useState("");

  const onChangeFile = (e) => {
    setProductImg(e.target.files[0])
  }

  const product_supplier = (val) => {
    setPrimarySupplier(val);
    setCreate(true);
    
  }

  const setSelected = (val) => {
   const secondarySupplierValue= val[val.length-1];
    setSelectedSecondaryId(secondarySupplierValue);
    setSelectedSecondary(val);
    setCreateSecondary(true)
  }

  const data = {
    department_id: parseInt(department),
    category_id: categoryId,
    subcategory_id: subCategoryId,
    brand_id: brandId,
    product_name: productName,
    part_number: partNumber,
    measuring_unit: measuringUnit,
    register_date: registerDate,
    description: description,
    instock_order_type: instockOrderType,
    min_order_quantity: minOrderQuantity,
    moq_price: moqPrice,
    instock_quantity: instockQuantity,
    reorder_quantity: reorderQuantity,
    primary_supplier_id: primarySupplier,
    second_supplier_id: JSON.stringify(selected),
    product_img: productImg
  }

  const addPro = async (e) => {
    e.preventDefault();
    try {

     await api
        .post("storeProductData", data
        ,{
          headers: {
            "Content-Type": "multipart/form-data",
          },}
          )  
        // .then(alert("success"));
        navigate('/products')
    } catch (err) {
      alert(err)
    }
  };

  useEffect(() => {
    api.get("supplier").then((res) => {
      setSuppliers(res.data.suppliers);
    })
    api.get('category').then((res)=>{
      setCategories(res.data.categories);
    })
    api.get('sub_category').then((res)=>{
      setSubCategories(res.data.subcategories);
    })
    api.get('brand').then((res)=>{
      setBrands(res.data.brands);
    })
    api.get("department").then((res)=>{
      setDepartmentList(res.data);
    })
  }, []);

  return (
    <div>
      <Nav />
    
      <div className="row m-2">
        <div className="col-12 ma-auto">
          <div className="card border-0 p-3 shadow-sm rounded-lg">
           
            <h5 className="text-center mt-2" style={formtitle}>
              Add New Product
            </h5>
            <form>
              <div className="row  my-3">
                <div className="col-6">
                  <label for="exampleFormControlInput1" className="form-label">
                    Department
                  </label>
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    name=""
                  >
                    <option hidden>Choose Department</option>
                   {
                    departments.map((departmentData)=>(
                      <option value={departmentData.id}>{departmentData.name}</option>
                    ))
                   }
                  </select>
                </div>
                <div className="col-6 mt-4">
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      value="1"
                      onChange={(e) => setInstockOrder(e.target.value)}
                      name="instock_order"
                      id="instock"
                    />
                    <label className="form-check-label" for="instock">
                      Instock
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      value="2"
                      onChange={(e) => setInstockOrder(e.target.value)}
                      name="instock_order"
                      id="order"
                    />
                    <label className="form-check-label" for="order">
                      Order
                    </label>
                  </div>
                </div>
              </div>
              <div className="row my-3">
                <div className="col-6">
                  <label for="exampleFormControlInput1" className="form-label">
                    Category
                  </label>
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                    name=""
                  >
                    <option hidden>Choose Category</option>
                    {categories.map((category) => (
                      <option value={category.id}>
                        {category.category_name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-6">
                  <label for="exampleFormControlInput1" className="form-label">
                    Min Order Quantity
                  </label>
                  <input
                    value={minOrderQuantity}
                    onChange={(e) => setMinOrderQuantity(e.target.value)}
                    type="text"
                    className="form-control"
                    name="contact_team"
                    placeholder=""
                  />
                </div>
              </div>
              <div className="row  my-3">
                <div className="col-6">
                  <label for="exampleFormControlInput1" className="form-label">
                    Sub Category
                  </label>
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    value={subCategoryId}
                    onChange={(e) => setSubCategoryId(e.target.value)}
                    name=""
                  >
                    <option hidden>Choose Sub Category</option>
                    {subcategories.map((subcategory) => (
                      <option value={subcategory.id}>
                        {subcategory.subcategory_name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-6">
                  <label for="exampleFormControlInput1" className="form-label">
                    Min Order Quantity Price
                  </label>
                  <input
                    value={moqPrice}
                    onChange={(e) => setMoqPrice(e.target.value)}
                    type="text"
                    className="form-control"
                    name="email"
                    placeholder=""
                  />
                </div>
              </div>
              <div className="row my-3">
                <div className="col-6">
                  <label for="exampleFormControlInput1" className="form-label">
                    Brand
                  </label>
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    value={brandId}
                    onChange={(e) => setBrandId(e.target.value)}
                    name="location"
                  >
                    <option hidden>Choose Brand</option>
                    {brands.map((brand) => (
                      <option value={brand.id}>{brand.brand_name}</option>
                    ))}
                  </select>
                </div>
                <div className="col-6">
                  <label for="exampleFormControlInput1" className="form-label">
                    Instock Quantity
                  </label>
                  <input
                    value={instockQuantity}
                    onChange={(e) => setInstockQuantity(e.target.value)}
                    type="text"
                    className="form-control"
                    name="pro_value"
                    placeholder=""
                  />
                </div>
              </div>
              <div className="row my-3">
                <div className="col-6">
                  <label for="exampleFormControlInput1" className="form-label">
                    Product Name
                  </label>
                  <input
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    type="text"
                    className="form-control"
                    name=""
                    placeholder=""
                  />
                </div>
                <div className="col-6">
                  <label for="exampleFormControlInput1" className="form-label">
                    Reorder Quantity
                  </label>
                  <input
                    value={reorderQuantity}
                    onChange={(e) => setReorderQuantity(e.target.value)}
                    type="text"
                    className="form-control"
                    name=""
                    placeholder=""
                  />
                </div>
              </div>
              <div className="row my-3">
                <div className="col-6">
                  <label for="exampleFormControlInput1" className="form-label">
                    Part Number
                  </label>
                  <input
                    value={partNumber}
                    onChange={(e) => setPartNumber(e.target.value)}
                    type="text"
                    className="form-control"
                    placeholder=""
                  />
                </div>
                <div className="col-6">
                  <label for="exampleFormControlInput1" className="form-label">
                    Primary Supplier
                  </label>
                  {/* <Multiselect options={prisuppliersoptions} displayValue="SuName"/> */}
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    value={primarySupplier}
                    // onClick={create_PrimarySupplier_Detail}
                    // onClick={product_supplier}
                    // onChange={(e) => setPrimarySupplier(e.target.value)}
                    onChange={(e)=> product_supplier(e.target.value)}
                    name=""
                  >
                    
                    <option hidden>Choose Primary Supplier</option>
                    {suppliers.map((supplier) => (
                      <option value={supplier.id}>{supplier.name}</option>
                    ))}
                  </select>
                </div>
              </div>
              {/* PHyo */}
              <div className="row">
                <div className="col-6">
                  <label for="exampleFormControlTextarea1" className="form-label">
                    Measuring Unit
                  </label>
                  <input
                    value={measuringUnit}
                    onChange={(e) => setMeasuringUnit(e.target.value)}
                    type="text"
                    className="form-control"
                    placeholder=""
                  />
                </div>
                <div className="col-6">
                  <label for="exampleFormControlInput1" className="form-label">
                    Secondary Supplier
                  </label>
               
                 <MultiSelect
        options= {suppliers.map((supplier) => (
          { label: supplier.name, value: supplier.id }
        ))} 
      
        value={selected}
        onChange={setSelected}
        labelledBy="Select"
      />
                </div>
              </div>
              <div className="row my-3">
                <div className="col-6">
                  <label for="exampleFormControlTextarea1" className="form-label">
                    Register Date
                  </label>
                  <input
                    value={registerDate}
                    onChange={(e) => setRegisterDate(e.target.value)}
                    type="date"
                    className="form-control"
                    placeholder=""
                  />
                </div>
                <div className="col-6">
                  <label for="exampleFormControlTextarea1" className="form-label">
                    Product Image
                  </label>
                  <input
                    type="file"
                    onChange={onChangeFile}
                    className="form-control"
                  />
                </div>
              </div>
              <div className="row my-3">
                <div className="col-6">
                  <label for="exampleFormControlTextarea1" className="form-label">
                    Description
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="form-control"
                    name=""
                    rows="4"
                  />
                </div>
                <div className="col-6">{/* Blank */}</div>
              </div>
              <div className="text-center">
                <button className="btn btn-m btn-primary px-3" onClick={addPro}>
                  Create Product
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
   
      <ProductSupplier open={create} close={() => setCreate(false)} supplier={primarySupplier} />
      <SecondarySupplier openSecondary={createSecondary} closeSecondary={() => setCreateSecondary(false)} supplier={selectedSecondary} />
      {/* < open={create} close={()=>setCreate(false)}/> */}
    </div>
    // phyo
  );
};

export default AddProduct;

//maymyat