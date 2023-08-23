import React, { useState } from 'react'

const ShowProject = ({projects,project_id,setProjectID,setPhaseID}) => {

    const [phases,setPhases]= useState([])

    const handleChange=(val)=>{
        setProjectID(val)
        projects.map(el=>el.id == val &&
            setPhases(el.phases))
    }

  return (
    <div className="row">
           
    <div className="col-6">
    <label htmlFor="exampleFormControlInput1" className="form-label">
            Projects
    </label>
    <select
      className="form-select"
      aria-label="Default select example"
        onChange={(e)=>handleChange(e.target.value)}
    >
      <option hidden>Choose Project</option>
        {
            projects.map((project,index)=>(
                <option value={project.id} key={index}>{project.name} </option>
            ))
        }
    </select>
   </div>

   <div className="col-6">
    <label htmlFor="exampleFormControlInput1" className="form-label">
        Phases
    </label>
    <select
      className="form-select"
      aria-label="Default select example"
        onChange={(e)=>setPhaseID(e.target.value)}
    >
              <option hidden>Choose Phase</option>
        {
                phases.map((phase,index)=>(
                <option value={phase.id} key={index}>{phase.phase_name} </option>
                ))
        }
   
    </select>
   </div>

   </div>
  )
}

export default ShowProject