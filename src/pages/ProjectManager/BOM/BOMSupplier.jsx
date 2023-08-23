import React, { useState, useEffect } from 'react'
import Nav from "../../../components/Sidebar/Nav"
import { Link } from "react-router-dom";
import AddIcon from '@mui/icons-material/Add';
import { useLocation } from 'react-router-dom';
import BomSupQuoDialog from '../../../components/ProjectManager/BOM/BomSupQuoDialog';
import ShowBomSupQuoDialog from '../../../components/ProjectManager/BOM/ShowBomSupQuoDialog';
import BomSupInvDialog from '../../../components/ProjectManager/BOM/BomSupInvDialog';
import ShowBomSupInvDialog from '../../../components/ProjectManager/BOM/ShowBomSupInvDialog';
import { api } from '../../../utilities/api/apiResource';


const BOMSupplier = () => {
  const [boms, setBoms] = useState([]);
  const [bomsupquos, setBomSupQuos] = useState('');
  const [bomsupquosname, setBomSupQuosName] = useState('');
  const [bomsupquosdescription, setBomSupQuosDescription] = useState('');
  const [bomsupinvs, setBomSupInvs] = useState('');
  const [bomsupinvsname, setBomSupInvsName] = useState('');
  const [bomsupinvsdescription, setBomSupInvsDescription] = useState('');
  const [bomsupid, setBomSupId] = useState('');
  const [bomreqno, setBomReqNo] = useState('');
  const [create, setCreate] = useState(false);
  const [create1, setCreate1] = useState(false);
  const [create2, setCreate2] = useState(false);
  const [create3, setCreate3] = useState(false);
 
  const location = useLocation();
  const bom_id = location.pathname.split('/')[2];
  const bom_no = location.pathname.split('/')[3];
  const bgcolor = {
    backgroundColor: '#5a8dee'
  };

  useEffect(() => {
    const getBomSuppliers = async () => {
      try {
        const res = await api.get("bomsupplierfil/"+bom_id);
        setBoms(res.data.bomsupplier);
      } catch (err) { }
    }
   
    getBomSuppliers();
  }, []);

  const showQuotation = (id,no) => {   
      setBomSupId(id);
      setBomReqNo(no)
      setCreate(true);
  }
  const showInvoice = (id,no) => {   
    setBomSupId(id);
    setBomReqNo(no)
    setCreate2(true);
  }


  const showFile = (id,no) =>{
      setBomSupId(id);
      setBomReqNo(no);
       api.post('bomsupplierquotationfile',{
        id :  id,
        }).then(function(response){
          setBomSupQuos(response.data.bomsupquo);
          setBomSupQuosName(response.data.bomsupquoname);
          setBomSupQuosDescription(response.data.bomsupquodescription);
        })
      setCreate1(true);
  }
  const showFile1 = (id,no) =>{
    setBomSupId(id);
    setBomReqNo(no);
   api.post('bomsupplierinvoicefile',{
      id :  id,
      }).then(function(response){
        setBomSupInvs(response.data.bomsupinv);
        setBomSupInvsName(response.data.bomsupinvname);
        setBomSupInvsDescription(response.data.bomsupinvdescription);
      })
    setCreate3(true);
}

  return (
    <div>
      <Nav/>
      <div className='row m-3'>
        <h5 className="col-10 fw-normal text-secondary">BOM Supplier List</h5>
        <Link to={"/bom_request_register/" + bom_id + '/' + bom_no} className="col-2 btn btn-sm btn-primary">
          <AddIcon />Creat New Request
        </Link>
      </div>

      <div className='row m-2'>
        <div className='col-12 ma-auto'>
          <div className='card border-0 p-2 shadow-sm rounded-lg'>
            <div className='card-body'>
              <h6 className='text-center mb-2'>{bom_no}</h6>
              <table className="table table-hover table-borderless">
                <thead style={bgcolor}>
                  <tr scope="col" className="fw-normal text-white text-center" style={{ 'fontSize': '14px' }}>
                    <th >No</th>
                    <th>Request No</th>
                    <th>Req Quotation Date</th>
                    <th>Replied Date</th>
                    <th>PO Sent Date</th>
                    <th>GRN Date</th>
                    <th>Invoice Receive Date</th>
                    <th>Import Start Date</th>
                    <th>Email Status</th>
                    <th>Option</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {boms.map((bom, index) => (
                    <tr scope="col" className="fw-normal text-center" style={{ 'fontSize': '14px' }} key={index}>
                      <td >{++index}</td>
                      <td>{bom.request_no}</td>
                      <td>{bom.request_quotation_date}</td>
                      <td>{bom.quotation_reply_date != null ? bom.quotation_reply_date : <span className='bg-danger text-white rounded px-2'>Not Yet</span>}</td>
                      <td>{bom.po_sent_date != null ? bom.po_sent_date : <span className='bg-danger text-white rounded px-2'>Not Yet</span>}</td>
                      <td>{bom.GRN_date != null ? bom.GRN_date : <span className='bg-danger text-white rounded px-2'>Not Yet</span>}</td>
                      <td>{bom.invoice_received_date != null ? bom.invoice_received_date : <span className='bg-danger text-white rounded px-2'>Not Yet</span>}</td>
                      <td><span className='bg-danger text-white rounded px-2'>Not Yet</span></td>
                      <td>Not Sent Email</td>
                      <td>
                        <div className="btn-group d-flex">
                          <button type="button" className="btn btn-sm btn-primary text-white dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                            Select
                          </button>
                          <ul className="dropdown-menu">
                          {bom.quotation_reply_date != null ?
                            <li><button className="dropdown-item" onClick={()=>showFile(bom.id,bom.request_no)}>View Quotation File</button></li> :
                            <li><button className="dropdown-item" onClick={() => showQuotation(bom.id,bom.request_no)}>Quotation</button></li>
                          }
                          {bom.po_sent_date == null ?
                            <li>
                            <Link to={"/bom_supplier_purchase_order/" + bom.id + '/' + bom.request_no} className="dropdown-item">
                            Purchase Order
                            </Link>
                            </li> :
                            <li>
                            <Link to={"/bom_supplier_purchase_order/view/" + bom.id + '/' + bom.request_no} className="dropdown-item">
                            View Purchase Order
                            </Link>
                            </li>
                          }
                           <li>
                          <Link to={"/bom_supplier_GRN/" + bom.id + '/' + bom.request_no} className="dropdown-item">
                          Goods Received Note
                          </Link>
                          </li>
                          {/* {
                          bom.GRN_date == null ?
                            <li>
                            <Link to={"/bom_supplier_GRN/" + bom.id + '/' + bom.request_no} className="dropdown-item">
                            Goods Received Note
                            </Link>
                            </li> :
                            <li>
                            <Link to={"/bom_supplier_GRN/view/" + bom.id + '/' + bom.request_no} className="dropdown-item">
                            View Goods Received Note
                            </Link>
                            </li>

                          } */}
                          {bom.invoice_received_date != null ?
                            <li><a className="dropdown-item" onClick={()=>showFile1(bom.id,bom.request_no)}>View Invoice File</a></li> :
                            <li><a className="dropdown-item" onClick={() => showInvoice(bom.id,bom.request_no)}>Invoice</a></li>
                          }
                             
                          
                            <li><a className="dropdown-item">Import Process</a></li>
                          </ul>
                        </div>
                      </td>
                      <td>
                        <div className='d-flex'>
                          <button className='btn btn-sm btn-info text-white'>Price</button>
                          &nbsp;&nbsp;
                          <button className='btn btn-sm btn-danger text-white'>Attach</button>

                        </div>
                      </td>
                    </tr>
                  ))}

                </tbody>
              </table>
            </div>

          </div>
        </div>
        <BomSupQuoDialog open={create} close={()=>setCreate(false)} id={bomsupid} no={bomreqno}/>
        <ShowBomSupQuoDialog open={create1} close={()=>setCreate1(false)} bid={bomsupid} bno={bomreqno} quo={bomsupquos} quoname={bomsupquosname} quodes={bomsupquosdescription}/>
        <BomSupInvDialog open={create2} close={()=>setCreate2(false)} id={bomsupid} no={bomreqno}/>
        <ShowBomSupInvDialog open={create3} close={()=>setCreate3(false)} bid={bomsupid} bno={bomreqno} inv={bomsupinvs} invname={bomsupinvsname} invdes={bomsupinvsdescription}/>
       
      </div>
    </div>
  )
}

export default BOMSupplier