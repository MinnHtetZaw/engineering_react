import React, { useEffect, useState } from 'react'
import Nav from '../../components/Sidebar/Nav';
import { api } from '../../utilities/api/apiResource';
import RequestListManager from '../../components/RequestMaterial/RequestListManager';
import { useSelector } from 'react-redux';
import RequestListWarehouse from '../../components/RequestMaterial/RequestListWarehouse';

const RequestMaterialList = () => {

    const [materials,setMaterials] =useState([])
    const role = useSelector(state=>state.user.user?.role?.role)

    const getMaterialList = async()=>{
        const res= await api.get('requestProductList')

        setMaterials(res.data.data)
    }

    useEffect(()=>{

        getMaterialList()
    },[])
  return (
    <div>
        <Nav/>
        {role == 'Project Manager' &&     <RequestListManager materials={materials}/> }

        {role == 'Warehouse Supervisor' && <RequestListWarehouse materials={materials}/>}

        
    </div>
  )
}

export default RequestMaterialList