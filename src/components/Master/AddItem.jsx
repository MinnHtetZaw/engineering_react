import React, { useState, useEffect } from "react";
import Nav from "../Sidebar/Nav";
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';
import { api } from "../../api/apiResource";

const formtitle = {
  textAlign: "center",
  backgroundColor: "#5a8dee",
  padding: "1rem",
  color: "#ffffff",
};

const AddProduct = () => {

  const {id} = useParams();
  

  const [showDifWare, setshowDifWare] = useState(false);
  const [showWarehouse, setShowWarehouse] = useState(false);

  const navigate = useNavigate();
  
  const [type2, setType2] = useState(false);
  const [type3, setType3] = useState(false);
 

  const [getcurrency, setCurrency] = useState([]);
  const [getregwarehouse, setGetRegwarehouse] = useState([]);
  const [serialNo, setSerialNo] = useState("");
  const [model, setModel]= useState("");
  const [size, setSize]= useState("");
  const [color, setColor]= useState("");
  const [dimension, setDimension]= useState("");
  const [hsCode, setHsCode]= useState("");
  const [oSpec, setOSpec]= useState("");
  const [condRemark, setCondRemark]= useState("");
  const [damageRemark, setDamageRemark]= useState("");
  const [purPrice, setPurPrice]= useState("");
  const [sellPrice, setSellPrice]= useState("");
  const [curId, setCurId]= useState("");
  const [purDate, setPurDate]= useState("");
  const [delDate, setDelDate]= useState("");
  const [regDate, setRegDate]= useState("");
  const [stockQty, setStockQty]= useState("");
  const [itemLocat, setItemLocat]= useState("");
  const [warehouse, setWareHouse]= useState("");
  const [regWhId, setRegWhId] = useState("");
  const [site_, setSite_]= useState("");
  const [whType, setWhType]= useState("");
  const [conT, setConT] = useState("");
  const [levels,setLevel]=useState([]);
  const [shelves,setShelf]=useState([]);
  const [zones,setZone]=useState([]);
  const [zoneID,setZoneID]=useState("");
  const [shelfID,setShelfID]=useState("");
  const [levelID,setLevelID]=useState("");

  const getCategories=async()=>{
    const res = await api.get('currency')
    setCurrency(res.data.currency)
  }
  const getZone =async()=>{
    const res = await api.get('zone')
    setZone(res.data.zone)
  }

  const getRegwarehouse=async()=>{
    const res = await api.get('regional_warehouse')
    setGetRegwarehouse(res.data.regwarehouses)
    
  }
  
  const getShelf=async()=>{
    const res = await api.get('shelf')
    setShelf(res.data.shelf)
    
  }

  const getLevel=async()=>{
    const res = await api.get('level')

    setLevel(res.data.level)
  }

  useEffect(() => {
  
    getLevel()
    getShelf()
    getRegwarehouse()
    getZone()
    getCategories()
  }, []);

    const condtype = (val) => {
  
      if(val === "2"){
        setType2(true);
        setType3(false);
      }else if(val === "3"){

        setType2(false);
        setType3(true);
        
      } else {
        setType2(false);
        setType3(false);
      }
      setConT(val);
    }

  const data = {
    product_id: parseInt(id),
    warehouse_type: whType,
    warehouse_id:  parseInt(regWhId),
    site: parseInt(site_),
    serial_no: serialNo,
    model: model,
    size: size,
    color: color,
    dimension: dimension,
    hs_code: hsCode,
    other_specification: oSpec,
    reserved_flag: 0,
    in_transit_flag: 0,
    in_stock_flag: 1,
    delivered_flag: 0,
    active_flag: 0,
    site_direct_flag: 0,
    condition_type: parseInt(conT),
    condition_remark: condRemark,
    damage_remark: damageRemark,
    unit_purchase_price:parseInt(purPrice),
    unit_selling_price: parseInt(sellPrice),
    currency_type_id: parseInt(curId),
    supplier_id: null,
    purchase_date: purDate,
    delivered_date: delDate,
    registered_date: regDate,
    item_location: itemLocat,
    stock_qty: parseInt(stockQty),
    level_id : parseInt(levelID),
    grn_flag: 0,

  };
const wareHouse = (e) =>{
    setshowDifWare(true);
    setWareHouse(e.target.value);
    setSite_(0);
    setRegWhId(0);
  }

  const site = (e) => {
    setshowDifWare(false);
    setSite_(e.target.value);
    setWhType(0);
    setShowWarehouse(false);
  }

  const regWareh = (e) => {
    setWhType(e.target.value);
   
    if(e.target.value === "2"){
      setShowWarehouse(true);
    }else{
      setShowWarehouse(false);
    }
    
  }

  const addItem = async (e) => {
    e.preventDefault();
    try {
      await api
        .post("item", data)
        // .then(alert("success"));
      } catch (err) {}
    navigate('/products')
  };



  return (
    <div>
     
      <Nav />
      <div className="row m-2">
        <div className="col-12 ma-auto">
          <div className="card border-0 p-3 shadow-sm rounded-lg">
            <h5 className="text-center mt-2" style={formtitle}>
              Add New Item
            </h5>
            <form>
              <div className="row my-3">
                <div className="col-6">
                  <label for="exampleFormControlInput1" className="form-label">
                    Serial No
                  </label>
                  <input
                    value={serialNo}
                    onChange={(e) => setSerialNo(e.target.value)}
                    type="text"
                    className="form-control"
                    name="contact_team"
                    placeholder=""
                  />
                </div>
                <div className="col-6">
                  <label for="exampleFormControlInput1" className="form-label">
                    Model
                  </label>
                  <input
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                    type="text"
                    className="form-control"
                    name="contact_team"
                    placeholder=""
                  />
                </div>
              </div>
              <div className="row my-3">
                <div className="col-6">
                  <label for="exampleFormControlInput1" className="form-label">
                    Size
                  </label>
                  <input
                    value={size}
                    onChange={(e) => setSize(e.target.value)}
                    type="text"
                    className="form-control"
                    name="contact_team"
                    placeholder=""
                  />
                </div>
                <div className="col-6">
                  <label for="exampleFormControlInput1" className="form-label">
                    Color
                  </label>
                  <input
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
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
                    Dimensions
                  </label>
                  <input
                    value={dimension}
                    onChange={(e) => setDimension(e.target.value)}
                    type="text"
                    className="form-control"
                    name="email"
                    placeholder=""
                  />
                </div>
                <div className="col-6">
                  <label for="exampleFormControlInput1" className="form-label">
                    HS Code
                  </label>
                  <input
                    value={hsCode}
                    onChange={(e) => setHsCode(e.target.value)}
                    type="text"
                    className="form-control"
                    name="email"
                    placeholder=""
                  />
                </div>
              </div>
              <div className="row my-3">
                <div className="col-12">
                  <label for="exampleFormControlTextarea1" className="form-label">
                    Other Specification
                  </label>
                  <textarea
                    value={oSpec}
                    onChange={(e) => setOSpec(e.target.value)}
                    className="form-control"
                    name=""
                    rows="4"
                  />
                </div>
              </div>
              <div className="row my-3">
                <div className="col-6">
                  <label for="exampleFormControlInput1" className="form-label">
                    Condition Type
                  </label>
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    
                    onChange={(e) => condtype(e.target.value)}
                    name=""
                  >
                    
                    <option hidden>Choose Type</option>
                    <option value="1">Good</option>
                    <option value="2">Bad</option>
                    <option value="3">Damage</option>
                  </select>
                </div>
                {
                  type2 ? <div className="col-6">
                  <label for="exampleFormControlTextarea1" className="form-label">
                    Condition Remark
                  </label>
                  <textarea
                    value={condRemark}
                    onChange={(e) => setCondRemark(e.target.value)}
                    className="form-control"
                    name=""
                    rows="4"
                  />
                </div> : ''
                }
                {
                  type3 ? <div className="col-6">
                  <label for="exampleFormControlTextarea1" className="form-label">
                    Damage Remark
                  </label>
                  <textarea
                    value={damageRemark}
                    onChange={(e) => setDamageRemark(e.target.value)}
                    className="form-control"
                    name=""
                    rows="4"
                  />
                </div> : ''
                }
              </div>
              <div className="row my-3">
                <div className="col-6">
                  <label for="exampleFormControlInput1" className="form-label">
                    Unit Purchase Price
                  </label>
                  <input
                    value={purPrice}
                    onChange={(e) => setPurPrice(e.target.value)}
                    type="text"
                    className="form-control"
                    name=""
                    placeholder=""
                  />
                </div>
                <div className="col-6">
                  <label for="exampleFormControlInput1" className="form-label">
                    Unit Selling Price
                  </label>
                  <input
                    value={sellPrice}
                    onChange={(e) => setSellPrice(e.target.value)}
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
                    Currency
                  </label>
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    value={curId}
                    onChange={(e) => setCurId(e.target.value)}
                    name=""
                  >
                    <option hidden>Choose Currency</option>
                    {getcurrency.map((currency) => (
                      <option value={currency.id}>{currency.name}</option>
                    ))}
                  </select>
                </div>
                <div className="col-6">
                  <label for="exampleFormControlInput1" className="form-label">
                    Purchased Date
                  </label>
                  <input
                    value={purDate}
                    onChange={(e) => setPurDate(e.target.value)}
                    type="date"
                    className="form-control"
                    placeholder=""
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-6">
                  <label for="exampleFormControlTextarea1" className="form-label">
                    Delivered Date
                  </label>
                  <input
                    value={delDate}
                    onChange={(e) => setDelDate(e.target.value)}
                    type="date"
                    className="form-control"
                    placeholder=""
                  />
                </div>
                <div className="col-6">
                  <label for="exampleFormControlTextarea1" className="form-label">
                    Registered Date
                  </label>
                  <input
                    value={regDate}
                    onChange={(e) => setRegDate(e.target.value)}
                    type="date"
                    className="form-control"
                    placeholder=""
                  />
                </div>
              </div>
              <div className="row my-3">
                <div className="col-6">
                  <label for="exampleFormControlTextarea1" className="form-label">
                    Stock Quantity
                  </label>
                  <input
                    value={stockQty}
                    onChange={(e) => setStockQty(e.target.value)}
                    type="text"
                    className="form-control"
                    placeholder=""
                  />
                </div>
                <div className="col-2">
                  <label for="exampleFormControlInput1" className="form-label">
                    Zone
                  </label>
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    value={zoneID}
                    onChange={(e) => setZoneID(e.target.value)}
                    name=""
                  >
                    <option hidden>Choose Zone</option>
                    {zones.map((zone) => (
                      <option value={zone.id}>{zone.name}</option>
                    ))}
                  </select>
                </div>
                <div className="col-2">
                  <label for="exampleFormControlInput1" className="form-label">
                    Shelf
                  </label>
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    value={shelfID}
                    onChange={(e) => setShelfID(e.target.value)}
                    name=""
                  >
                    <option hidden>Choose Shelf</option>
                    {shelves.map((shelf) => (
                      shelf.zone_id == zoneID ?
                      <option value={shelf.id}>{shelf.shelf_name}</option> 
                      : ''
                    ))}
                  </select>
                </div>
                <div className="col-2">
                  <label for="exampleFormControlInput1" className="form-label">
                    Level
                  </label>
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    value={levelID}
                    onChange={(e) => setLevelID(e.target.value)}
                    name=""
                  >
                    <option hidden>Choose Level</option>
                    {levels.map((level) => (
                      level.zone_id == zoneID && level.shelf_id == shelfID ?
                      <option value={level.id}>{level.level_name}</option>
                      : ""
                    ))}
                  </select>
                </div>
              </div>
              <div className="row  my-3">
                <div className="col-6 mt-4">
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      value="1"
                      onChange={wareHouse}
                      name="wareh_site"
                      id="wh"
                    />
                    <label className="form-check-label" for="wh">
                      Warehouse
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      value="2"
                      onChange={site}
                      name="wareh_site"
                      id="si"
                    />
                    <label className="form-check-label" for="si">
                      Site
                    </label>
                  </div>
                </div>
              </div>
              {
                showDifWare ? <div className="row  my-3">
                <div className="col-6 mt-4">
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      value="1"
                      onChange={regWareh}
                      name="ware_house_type"
                      id="mwh"
                    />
                    <label className="form-check-label" for="mwh">  
                      Main Warehouse
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      value="2"
                      onChange={regWareh}
                      name="ware_house_type"
                      id="rwh"
                    />
                    <label className="form-check-label" for="rwh">
                      Regional Warehouse
                    </label>
                  </div>
                </div>
              </div> : ''
              }
              {
                showWarehouse ? <div className="col-6">
                <label for="exampleFormControlInput1" className="form-label">
                  Regional Warehouses
                </label>
                <select
                  className="form-select"
                  aria-label="Default select example"
                  value={regWhId}
                  onChange={(e) => setRegWhId(e.target.value)}
                  name=""
                >
                  <option hidden>Choose Regional Warehouses</option>
                  {getregwarehouse.map((regwh) => (
                    <option value={regwh.id}>{regwh.warehouse_name}</option>
                  ))}
                </select>
              </div> : ''
              }

              <div className="text-center mt-4">
                <button className="btn btn-m btn-primary px-3" onClick={addItem}>
                  Create Item
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    // phyo
  );
};

export default AddProduct;
