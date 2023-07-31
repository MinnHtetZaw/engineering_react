import React from 'react'

const FilterProject = () => {
  return (
    <div className='row mt-3 mx-5'>
        <div className="col-6">
            <select className='form-control'>
                <option hidden>Choose Projects</option>
            </select>
        </div>

        <div className="col-6">
            <select className='form-control'>
                <option hidden>Choose Phase</option>
            </select>
        </div>
    </div>
  )
}

export default FilterProject