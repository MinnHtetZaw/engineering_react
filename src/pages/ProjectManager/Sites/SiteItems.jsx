import React, { useState, useEffect } from 'react';
import '../../../App.css';
import { api } from '../../../utilities/api/apiResource';
import { Loading } from '../../../components/Loading';
import Products from '../../../components/ProjectManager/Sites/Products';
import Nav from '../../../components/Sidebar/Nav';
import FilterProject from '../../../components/ProjectManager/Sites/FilterProject';

const SiteItems = () => {

    const [sitems, setSItems] = useState([]);
    const [projects,setProjects]=useState([])
    const [phase_id,setPhaseID]=useState(null)


    useEffect(() => {
        const getSItem = async () => {
            try{
                const res = await api.get("site_items") 
            
                    setSItems(res.data.data);
                
            }catch(err){}
        }

        const getProjects= async()=>{
          const res = await api.get('project')
          setProjects(res.data.project)
        }
        getProjects()
        getSItem();
    }, []);
 
    const handleSearch = async()=>{
       const res=  await api.get('site_items/phase/'+phase_id)

       setSItems(res.data.data)
    }
    return (
        <>
        <Nav/>

        <FilterProject projects={projects} setPhaseID={setPhaseID} handleSearch={handleSearch}/>
       
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
                          Brand
                        </th>
                        <th scope="col" className="p-2 text-center bod-li">
                         Category
                        </th>
                        <th scope="col" className="p-2 text-center bod-li">
                            SubCategory
                        </th>
                        <th scope="col" className="p-2 text-center bod-li">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {JSON.stringify(sitems) === '[]' && 
                      <Loading/>
                      }

                      {sitems.map((product,index) => (

                        <Products product={product} index={index}/>

                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      </>
  )
}

export default SiteItems;