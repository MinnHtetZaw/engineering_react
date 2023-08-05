import React, { useState } from 'react'

const ShowDestination = ({regwarehouses,setWhType,setRegWhId,filteredproject,filterphase}) => {
    const [showDifWare, setshowDifWare] = useState(false);
    const [showWarehouse, setShowWarehouse] = useState(false);
    const [showSite, setShowSite] = useState(false)
    const wareHouse = (e) =>{
        setShowSite(false)
        
        setshowDifWare(true);
        setRegWhId(0);
      }
      const site = (e) => {
        setShowSite(true)
        setWhType(null)
        setshowDifWare(false);
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
  return (
    <>
    <div className="row  my-3">
    <div className="col-6 mt-4 d-flex justify-content-center align-items-center">
      <div className="form-check form-check-inline">
        <input
          className="form-check-input"
          type="radio"
          value="1"
          onChange={wareHouse}
          name="wareh_site"
          id="wh"
        />
        <label className="form-check-label" htmlFor="wh">
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
        <label className="form-check-label" htmlFor="si">
          Site
        </label>
      </div>
    </div>
    { showSite &&
   <>
    <div className="form-group col-3 my-4">
          <label className='my-1'>Project</label>
          <select className="form-control" disabled>
            {
              filteredproject && <option value={filteredproject[0]?.id}>
                {filteredproject[0]?.name}
              </option>
            }

          </select>
      </div>
      <div className="form-group col-3 my-4">
          <label className='my-1'>Phase</label>
          <select className="form-control" disabled>
          {
              filterphase && <option value={filterphase[0]?.id}>
                {filterphase[0]?.phase_name}
              </option>
            }
          </select>
      </div>
    </>
  }
   {
    showDifWare && (
    <>
    <div className="col-6 mt-4 d-flex justify-content-evenly">
      <div className="form-check form-check-inline " >
        <input
          className="form-check-input"
          type="radio"
          value="1"
          onChange={regWareh}
          name="ware_house_type"
          id="mwh"
        />
        <label className="form-check-label" htmlFor="mwh">  
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
        <label className="form-check-label" htmlFor="rwh">
          Regional Warehouse
        </label>
      </div>
    </div>
    {
    showWarehouse && (
        <div className="offset-7 mt-5" style={{width:"40%"}}>
        <label htmlFor="exampleFormControlInput1" className="form-label">
          Regional Warehouses
        </label>
        <select
          className="form-select"
          aria-label="Default select example"
          onChange={(e) => setRegWhId(e.target.value)}
          name=""
        >
          <option hidden>Choose Regional Warehouses</option>
          {regwarehouses.map((regwh) => (
            <option value={regwh.id} key={regwh.id}>{regwh.warehouse_name}</option>
          ))}
        </select>
      </div>
    )
    
  }
  </> )
  }
  </div>
    </>

  )
}

export default ShowDestination