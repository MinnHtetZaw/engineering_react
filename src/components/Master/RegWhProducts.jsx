import { useState, useEffect } from "react";
import { Link} from "react-router-dom";
import Nav from "../Sidebar/Nav";
import styled from "styled-components";
import React from "react";
import "../../App.css";
import { useParams } from 'react-router-dom';
import { DeleteIcon, EditIcon, DetailIcon, EyeIcon } from "../Icons";
import { api } from './../../api/apiResource';

const ButtonB = styled.button`
  margin-right: 10px;
  font-size: 15px;
  background-color: #5a8dee;
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

const RegWhProducts = () => {

  const {id} = useParams();

  const [products, setProducts] = useState([]);
  const [items, setItems] = useState([]);

  useEffect(() => {
    const getPro = async () => {
      try {
        const res = await api
          .get("regional_warehouse_products/"+id)
           setItems(res.data.items);
           setProducts(res.data.products)
         
      } catch (err) {}
    }
    getPro();
    
  }, [id]);

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
      {console.log(products)}
      <Nav />
      <div className="flex">
        <h5 className="col-10 fw-normal text-secondary fb">Regional Warehouse Products List</h5>
       
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
                          Stock Quantity
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
                      {products.map((product) => (
                        <>
                          <tr key={product.id}>
                            <td className="p-2 text-center ff bod-li">
                              {product.id}
                            </td>
                            <td className="p-2 text-center ff bod-li">
                              <img
                                className="img"
                                src={`http://localhost:8000/images/${product.product_img}`}
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
                              {product.instock_quantity}{" "}
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
    </div>
  );
};

export default RegWhProducts;
