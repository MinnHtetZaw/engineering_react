import React, { useState, useEffect } from "react";
import Nav from "../Sidebar/Nav";
import { useNavigate } from "react-router-dom";
import { api } from "../../api/apiResource";

const formtitle = {
  textAlign: "center",
  backgroundColor: "#5a8dee",
  padding: "1rem",
  color: "#ffffff",
};

const AddRegWarehouse = () => {

  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api.get("project").then((res) => {
      setProjects(res.data.project);
    });
  }, []);

  console.log(projects)

  const navigate = useNavigate();
  
  const[wareHouse, setWareHouse] = useState("");
  const[warehouseImg, setWarehouseImg] = useState(null);
  const[region, setRegion] = useState("");
  const[country, setCountry] = useState("");
  const[locationAddress, setLocationAddress] = useState("");
  const[area, setArea] = useState("");
  const[capacity, setCapacity] = useState("");
  const[projectId, setProjectId] = useState("");
  const[email, setEmail] = useState("");
  const[password, setPassword] = useState("");

  const onChangeFile = (e) => {
    setWarehouseImg(e.target.files[0])
  }

  const data = {
    warehouse_name: wareHouse,
    warehouse_photo: warehouseImg,
    region: region,
    country: country,
    location_address: locationAddress,
    area: area,
    capacity: capacity,
    project_id: projectId,
    email: email,
    password: password,
  };

  const addRegWh = async (e) => {
    e.preventDefault();
    try {
      await api
        .post("regional_warehouse", data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(alert("success"));
        navigate('/regional_warehouse')
      } catch (err) {}
  };

  return (
    <div>
      <Nav />
      <div className="row m-2">
        <div className="col-12 ma-auto">
          <div className="card border-0 p-3 shadow-sm rounded-lg">
            <h5 className="text-center mt-2" style={formtitle}>
              Add New Regional Warehouse
            </h5>
            <form>
              <div className="row  my-3">
                <div className="col-6">
                  <label for="exampleFormControlInput1" className="form-label">
                    Warehouse Name
                  </label>
                  <input
                    value={wareHouse}
                    onChange={(e) => setWareHouse(e.target.value)}
                    type="text"
                    className="form-control"
                    name="contact_team"
                    placeholder=""
                  />
                </div>
                <div className="col-6">
                  <label for="exampleFormControlTextarea1" className="form-label">
                    Warehouse Photo
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
                  <label for="exampleFormControlInput1" className="form-label">
                    Region
                  </label>
                  <input
                    value={region}
                    onChange={(e) => setRegion(e.target.value)}
                    type="text"
                    className="form-control"
                    name="contact_team"
                    placeholder=""
                  />
                </div>
                <div className="col-6">
                  <label for="exampleFormControlInput1" className="form-label">
                    Country
                  </label>
                  <input
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
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
                    Location Address
                  </label>
                  <input
                    value={locationAddress}
                    onChange={(e) => setLocationAddress(e.target.value)}
                    type="text"
                    className="form-control"
                    name="contact_team"
                    placeholder=""
                  />
                </div>
                <div className="col-6">
                  <label for="exampleFormControlInput1" className="form-label">
                    Area
                  </label>
                  <input
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
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
                    Capacity
                  </label>
                  <input
                    value={capacity}
                    onChange={(e) => setCapacity(e.target.value)}
                    type="text"
                    className="form-control"
                    name="contact_team"
                    placeholder=""
                  />
                </div>
                <div className="col-6">
                  <label for="exampleFormControlInput1" className="form-label">
                    Project
                  </label>
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    value={projectId}
                    onChange={(e) => setProjectId(e.target.value)}
                    name=""
                  >
                    <option hidden>Choose Project</option>
                    {projects.map((project) => (
                      <option value={project.id}>
                        {project.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="row my-3">
                <div className="col-6">
                  <label for="exampleFormControlInput1" className="form-label">
                    Email
                  </label>
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    className="form-control"
                    name="contact_team"
                    placeholder=""
                  />
                </div>
                <div className="col-6">
                  <label for="exampleFormControlInput1" className="form-label">
                    Password
                  </label>
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    className="form-control"
                    name="contact_team"
                    placeholder=""
                  />
                </div>
              </div>
              <div className="text-center">
                <button className="btn btn-m btn-primary px-3" onClick={addRegWh}>
                  Create Regional Warehouse
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddRegWarehouse;
