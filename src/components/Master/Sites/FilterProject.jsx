import React, { useState } from 'react'

const FilterProject = ({projects}) => {
    
    const [phases,setPhases] = useState([])

    const handleChange =(e)=>{

        const filtered = projects.filter(el=>el.id == e.target.value)
        setPhases(filtered[0].phases) 
    }
  return (
    <div className='row mt-3 mx-5'>
        <div className="col-5">
            <select className='form-control' onChange={handleChange}>
                <option hidden>Choose Projects</option>
                {
                    projects.map((project,index)=>{
                        return (
                            <option value={project.id} key={index}>{project.name} </option>
                        )
                    })
                }
            </select>
        </div>

        <div className="col-5">
            <select className='form-control'>
                <option hidden>Choose Phase</option>

                {
                    phases && (
                        phases.map((phase,index)=>(
                            <option value={phase.id} key={index}>{phase.phase_name} </option>
                        ))
                    )
                }
            </select>
        </div>
        <div className="col-2 text-end">
            <button className='btn btn-primary'>Search </button>
        </div>
    </div>
  )
}

export default FilterProject