import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { DynamicItem, Sidebar, dummyData,} from "./components";
import ProjectRegister from "./components/Projects/Projectregister";
import PhaseList from "./components/Projects/PhaseList";
import TaskList from "./components/Projects/TaskList";
import AccountList from "./components/Accounts/AccountList";
import BOMList from "./components/BOM/BOMList";
import BOMRegister from "./components/BOM/BOMRegister";
import BOMSupplier from "./components/BOM/BOMSupplier";
import BOMRequestRegister from "./components/BOM/BOMRequestRegister";
import BOMSupplierPurchaseOrder from "./components/BOM/BOMSupplierPurchaseOrder";
import BOMSupplierPurchaseOrderView from "./components/BOM/BOMSupplierPurchaseOrderView";
import "./App.css";
import Categories from "./components/Master/Categories";
import SubCategories from "./components/Master/SubCategories";
import Brands from "./components/Master/Brands";
import Products from "./components/Master/Products";
import Customers from "./components/Pages/Customers";
import CostCenter from "./components/Pages/CostCenter";
import ProductDetail from "./components/Master/ProductDetail";
import AddProduct from "./components/Master/AddProduct";
import Suppliers from "./components/Master/Suppliers";
import AddSupplier from "./components/Master/AddSupplier";
import Comparison from "./components/Master/Comparison";
import AddItem from "./components/Master/AddItem";
import Currency from "./components/Pages/Currency";
import RegionalWarehouse from "./components/Master/RegionalWarehouse";
import AddRegWarehouse from "./components/Master/AddRegWarehouse";
import RegWhProducts from "./components/Master/RegWhProducts";
import SiteItems from "./components/Master/Sites/SiteItems";
import Zones from "./components/Master/Zones";
import GRN from "./components/BOM/GRN"
import AddGRNItem from './components/BOM/AddGRNItem';
import Asset from './components/Master/Asset';
import CreateAsset from "./components/Master/CreateAsset";
import AssetDetail from "./components/Master/AssetDetail";
import AddBuilding from "./components/Building/AddBuilding"
import Building from "./components/Building/BuildingList"
import RequestMaintenance from "./components/Request/RequestMaintenance";
import AddRequest from "./components/Request/AddRequest";
import ShowRequestDetail from "./components/Request/ShowRequestDetail";
import RequestMaterialList from "./components/RequestMaterial/RequestMaterialList";
import SalesOrderList from "./components/SalesOrder/SalesOrderList";
import AddSalesOrder from "./components/SalesOrder/AddSalesOrder";
import Login from "./components/Login/Login";
import PurchaseRequest from "./components/Purchase/PurchaseRequest";
import { useSelector } from "react-redux";
import { useEffect } from "react";

function App() {
  
  const isLogin =useSelector(state=>state.user.isLogin)
  const location = useLocation()
  const nav = useNavigate()
  
  useEffect(()=>{

    isLogin === false && 
    nav('/login')
  },[location.pathname])

  return (

    <div id="main">
   
      <Sidebar>
       <Routes>
       
       <Route path="/login" element={<Login/>} />
       <Route path="/" element={<DynamicItem page="homepage" />} />

       <Route path="/project_register" element={<ProjectRegister/>}/>
       <Route path="/phase/:id" element={<PhaseList/>}/>
       <Route path="/task/:id" element={<TaskList/>}/>
       <Route path="/accounts" element={<AccountList/>}/>

       <Route path="/categories" element={<Categories/>}/>
       <Route path="/sub_categories" element={<SubCategories/>}/>
       <Route path="/brands" element={<Brands/>}/>
       <Route path="/products" element={<Products/>}/>
       <Route path="/product_detail/:id" element={<ProductDetail/>}/>
       <Route path="/suppliers" element={<Suppliers/>}/>
       <Route path="/customers" element={<Customers/>}/>
       <Route path="/currency" element={<Currency/>}/>
       <Route path="/site" element={<SiteItems/>}/>
       <Route path="/zone" element={<Zones/>}/>
       <Route path="/asset" element={<Asset/>}/>
       <Route path="/createAsset" element={<CreateAsset/>} />
       <Route path="/asset_detail/:id" element={<AssetDetail/>}/>
       <Route path="/cost_center" element={<CostCenter/>}/>
       <Route path="/add_product" element={<AddProduct/>}/>
       <Route path="/products/add_item/:id" element={<AddItem/>}/>
       <Route path="/add_supplier" element={<AddSupplier/>}/>
       <Route path="/comparison/:id" element={<Comparison/>}/>

       <Route path="/add_item" element={<AddItem/>}/>
       <Route path="/regional_warehouse" element={<RegionalWarehouse/>}/>
       <Route path="/add_regwarehouse" element={<AddRegWarehouse/>}/>
       <Route path="/regional_warehouse_products/:id" element={<RegWhProducts/>}/>

       <Route path="/bom" element={<BOMList/>}/>
       <Route path="/bom_register" element={<BOMRegister/>}/>
       <Route path="/bom_supplier/:id/:name" element={<BOMSupplier/>}/>
       <Route path="/bom_request_register/:id/:name" element={<BOMRequestRegister/>}/>
       <Route path="/bom_supplier_purchase_order/:id/:name" element={<BOMSupplierPurchaseOrder/>}/>
       <Route path="/bom_supplier_purchase_order/view/:id/:name" element={<BOMSupplierPurchaseOrderView/>}/>
       <Route path="/bom_supplier_GRN/:id/:name" element={<GRN/>}/>

       <Route path="/bom_supplier_GRN_item/:grnID/:productID" element={<AddGRNItem/>}/>

       {/* Building */}
        <Route path="/building" element={ <Building/>} />
       <Route path="/add_building" element={ <AddBuilding/>} />

       <Route path="/request_maintenance" element={<RequestMaintenance />} />
       <Route path="/add_request" element={<AddRequest />} />
       <Route path="/request_detail/:id" element={<ShowRequestDetail/>}/>

       {/*Request Material */}
       <Route path="/request_material_list" element={<RequestMaterialList/>} />
       <Route path="/sales_order_list" element={<SalesOrderList/>} />
       <Route path="/add_sales_order" element={<AddSalesOrder/>}/>

       <Route path="/purchase_request" element={<PurchaseRequest/>}/>
      
       {dummyData &&
         dummyData.map((item, index) => (
           <Route
             key={index}
             path={item.path}
             element={<DynamicItem page={item.name} />}
           />
         ))}
         
     </Routes>
     </Sidebar>
</div>
   
    )
  
}

export default App;