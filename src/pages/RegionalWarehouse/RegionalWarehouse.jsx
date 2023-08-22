import { useState, useEffect } from "react";
import { Link,  } from "react-router-dom";
import Nav from "../../components/Sidebar/Nav";
import styled from "styled-components";
import React from "react";
import "../../App.css";
import { AddIcon, EyeIcon } from "../../components/Icons";
import { api } from "../../utilities/api/apiResource";
import { url } from "../../utilities/api/urlResource";

const ButtonB = styled.button`
  margin-right: 10px;
  font-size: 15px;
  background-color: #5a8dee;
  display: inline-block;
`;

const Flex = styled.div`
  display: flex;
  align-item: start;
  justify-content: space-around;
  flex-direction: row;
  flex-wrap: wrap;
`;
const ImgBox = styled.div`
  width: 50%;
  height: 100%;
`;
  const Img = styled.img`
  width: 100%;
  height: auto;
  min-height: 178px;
`;

const RegionalWare = () => {
  
  const [regWarehouses, setRegWarehouses] = useState([]);

    useEffect(() => {
        const getRegWh = async () => {
            try{
                const res = await api.get("regional_warehouse")
              
                setRegWarehouses(res.data.regionalwarehouses);
                
            }catch(err){}
        }
        getRegWh();
    }, []);

  return (
    <div>
      <Nav />
      <div className="flex">
        <h5 className="col-10 fw-normal text-secondary fb">Regional Warehouses</h5>
        <ButtonB className="col-2 btn btn-primary border-0">
          <Link to="/add_regwarehouse" className="text-white text-decoration-none">
            <AddIcon /> Warehouse
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
                  
                <Flex>
                  {
                    regWarehouses.map((regwarehouse) =>(
                      <div className="card mb-3" style={{maxWidth: '500px'}} key={regwarehouse.id}>
                      <Flex className="row g-0">
                        <ImgBox className="w-50">
                          <Img src={url+`warehouse_img/${regwarehouse.warehouse_photo}`} className="" alt=""/>
                        </ImgBox>
                        <div className="w-50">
                          <div className="card-body">
                            <h5 className="card-title"><b>{regwarehouse.warehouse_name}</b></h5>
                            <span className=""><b>{regwarehouse.region}, {regwarehouse.country}</b></span><br />
                            <span className="">Location: <b>{regwarehouse.location_address}</b></span><br />
                            {/* <span className="">Area: <b>{regwarehouse.area}</b></span><br /> */}
                            <span className="">Capacity: <b>{regwarehouse.capacity}</b></span><br/>
                            <Link to={"/regional_warehouse_products/"+regwarehouse.id}><button className="btn btn-sm btn-primary mt-1"><EyeIcon/> Inventory</button></Link>
                          </div>
                        </div>
                      </Flex>
                    </div>
                    ))
                  }
                </Flex>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegionalWare;
