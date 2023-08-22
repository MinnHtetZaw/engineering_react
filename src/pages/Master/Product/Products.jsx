import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Nav from "../../../components/Sidebar/Nav";
import styled from "styled-components";
import React from "react";
import { DeleteIcon, EditIcon, AddIcon, DetailIcon, EyeIcon } from "../../../components/Icons";
import ShowItem from "../../../components/Master/Item/ShowItem";
import { api } from '../../../utilities/api/apiResource';
import { url } from "../../../utilities/api/urlResource";

import { Loading } from "../../../components/Loading";


const ButtonB = styled.button`
  margin-right: 10px;
  font-size: 15px;
  background-color: #5a8dee;
  display: inline-block;
`;
const ButtonW = styled.button`
  margin-right: 10px;
  font-size: 15px;
  background-color: orange;
  display: inline-block;
`;
const ButtonR = styled.button`
  margin-right: 10px;
  font-size: 15px;
  background-color: rgb(226, 44, 44);
`;
const ButtonG = styled.a`
  margin-right: 10px;
  font-size: 15px;
  background-color: rgb(0, 128, 0);
`;
const Td = styled.td`
  width: 180px;
  max-width: 180px;
`;

const Products = () => {
  const [products, setProducts] = useState([]);
  const [items, setItems] = useState([]);
  const [itemDetail,getItemDetail] =useState([]);
  const [create,setShow]=useState(false);


  const showItemDetail=(id)=>{
  
    setShow(true)
    
      api.get("item_detail/"+id)
         .then((res)=>
         getItemDetail(res.data)
   )

    
  }

  useEffect(() => {
    const getPro = () => {

       api.get("product")

          .then((res) => {
            setProducts(res.data.productData);
          });
     
    }
    const getItem=()=>{
      api.get("item")
      .then((res) => {
        setItems(res.data.items);
      });
  
    }
    getItem()
    getPro()
  }, []);



  const showCollapse = (e, id) => {
    e.preventDefault();
    if (
      document.getElementById("show_item" + id).getAttribute("value") == "0"
    ) {
      document.getElementById("show" + id).hidden = false;
      document.getElementById("show_item" + id).setAttribute("value", "1");
    } else {
      document.getElementById("show" + id).hidden = true;
      document.getElementById("show_item" + id).setAttribute("value", "0");
    }
    
  };

  return (
 
    <div>
      <Nav />
      <div className="flex">
        <h5 className="col-10 fw-normal text-secondary fb">Products List</h5>
        <ButtonB className="col-2 btn btn-primary border-0">
          <Link to="/add_product" className="text-white text-decoration-none">
            <AddIcon /> Product
          </Link>
        </ButtonB>
      </div>

      <div className="row m-1">
        <div className="col-12 ma-auto">
          <div className="my-2">
            <div className="card shadow p-3 mb-5 bg-white rounded">
              <div className="tab-content" id="pills-tabContent">
                <div
                  className="tab-pane fade show active"
                  id="rfq"
                  role="tabpanel"
                  aria-labelledby="rfq-tab"
                >
                  <table className="table table-striped">
                    <thead className="bg-soft text-light">
                      <tr>
                        <th scope="col" className="p-2 text-center bod-li">
                          No
                        </th>
                        <th scope="col" className="p-2 text-center bod-li">
                          Product Image
                        </th>
                        <th scope="col" className="p-2 text-center bod-li">
                          Product Name
                        </th>
                        <th scope="col" className="p-2 text-center bod-li">
                          Selling Price
                        </th>
                        <th scope="col" className="p-2 text-center bod-li">
                          Item Qty
                        </th>
                        <th scope="col" className="p-2 text-center bod-li">
                          Description
                        </th>
                        <th scope="col" className="p-2 text-center bod-li">
                          Register Date
                        </th>
                        <th scope="col" className="p-2 text-center bod-li">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {JSON.stringify(products) === '[]' && 
                      <Loading/>
                      }
                      {products.map((product,index) => (
                        <>
                       
                          <tr key={index}>
                            <td className="p-2 text-center ff bod-li">
                              {product.id}
                            </td>
                            <td className="p-2 text-center ff bod-li">
                              <img
                                className="img"
                                src={url+`images/${product.product_img}`}  style={{width:"70px",height:"70px"}}
                                alt="Product Image"
                              />
                            </td>
                            <td className="p-2 text-center ff bod-li">
                              {" "}
                              {product.product_name}{" "}
                            </td>
                            <td className="p-2 text-center ff bod-li">
                              {" "}
                              {product.moq_price}{" "}
                            </td>
                            <td className="p-2 text-center ff bod-li">
                              {" "}
                              {product.items_count}{" "}
                            </td>
                            <td className="p-2 text-center ff bod-li">
                              {" "}
                              {product.description}{" "}
                            </td>
                            <td className="p-2 text-center ff bod-li">
                              {" "}
                              {product.register_date}{" "}
                            </td>
                            <Td className="p-2 text-right ff bod-li">
                              <ButtonB
                                className="btn btn-primary btn-sm border-0"
                                type="submit"
                              >
                                <Link
                                  to={"/product_detail/" + product.id}
                                  product_id={product.id}
                                  className="text-white"
                                >
                                  <DetailIcon />
                                </Link>
                              </ButtonB>
                              <ButtonB
                                className="btn btn-primary btn-sm border-0"
                                type="submit"
                              >
                                <EditIcon />
                              </ButtonB>
                              <Link to={"/products/add_item/" + product.id}>
                                <ButtonW
                                  className="btn btn-warning btn-sm border-0"
                                  type="submit"
                                >
                                  <AddIcon />
                                </ButtonW>
                              </Link>
                              <ButtonG
                                className="btn btn-success btn-sm border-0 mt-1"
                                href="#"
                                onClick={(e) => showCollapse(e, product.id)}
                                id={"show_item" + product.id}
                                value="0"
                              >
                                <EyeIcon />
                              </ButtonG>
                              <ButtonR
                                className="btn btn-danger btn-sm border-0 mt-1"
                                type="submit"
                              >
                                <DeleteIcon />
                              </ButtonR>
                            </Td>
                          </tr>
                          <tr id={"show" + product.id} hidden>
                            <td colspan="10">
                              <div>
                                <table className="table bg-light">
                                  <thead className="bg-soft text-light">
                                    <tr className="text-center">
                                      <th className="bod-li">S/N</th>
                                      <th className="bod-li">Size</th>
                                      <th className="bod-li">Color</th>
                                      <th className="bod-li">Dimension</th>
                                      <th className="bod-li">Purchase Price</th>
                                      <th className="bod-li">Action</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {items.map((item, i) =>
                                      item.product_id == product.id ? (
                                        <tr className="text-center">
                                          <td className="bod-li">{item.serial_no}</td>
                                          <td className="bod-li">{item.size}</td>
                                          <td className="bod-li">{item.color}</td>
                                          <td className="bod-li">{item.dimension}</td>
                                          <td className="bod-li">{item.unit_purchase_price}</td>
                                          <td>  <ButtonG
                                className="btn btn-success btn-sm border-0 mt-1"
                                href="#"
                                onClick={(e)=>showItemDetail(item.id)}
                                value="0"
                              >
                                <DetailIcon />
                              </ButtonG></td>
                                        </tr>
                                      ) : (
                                        ""
                                      )  
                                    )}
                                  </tbody>
                                </table>
                              </div>
                            </td>
                          </tr>
                        </>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ShowItem open={create} close={()=>setShow(false)} item={itemDetail}/>
    </div>

  );
}

export default Products;
