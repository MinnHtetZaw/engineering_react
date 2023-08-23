/* eslint-disable react-hooks/exhaustive-deps */
import { Routes, Route, } from "react-router-dom";
import { DynamicItem, Sidebar, dummyData,} from "./components";
import ProjectRegister from "./pages/ProjectManager/Projects/Projectregister";
import PhaseList from "./pages/ProjectManager/Projects/PhaseList";
import TaskList from "./pages/ProjectManager/Projects/TaskList";
import AccountList from "./pages/ProjectManager/Accounts/AccountList";
import BOMList from "./pages/ProjectManager/BOM/BOMList";
import BOMRegister from "./pages/ProjectManager/BOM/BOMRegister";
import BOMSupplier from "./pages/ProjectManager/BOM/BOMSupplier";
import BOMRequestRegister from "./pages/ProjectManager/BOM/BOMRequestRegister";
import BOMSupplierPurchaseOrder from "./pages/ProjectManager/BOM/BOMSupplierPurchaseOrder";
import BOMSupplierPurchaseOrderView from "./pages/ProjectManager/BOM/BOMSupplierPurchaseOrderView";
import "./App.css";
import Categories from "./pages/Warehouse/Master/Category/Categories";
import SubCategories from "./pages/Warehouse/Master/SubCategory/SubCategories";
import Brands from "./pages/Warehouse/Master/Brand/Brands";
import Products from "./pages/Warehouse/Master/Product/Products";
import Customers from "./pages/ProjectManager/CostCenter/Customers";
import CostCenter from "./pages/ProjectManager/CostCenter/CostCenter";
import ProductDetail from "./pages/Warehouse/Master/Product/ProductDetail";
import AddProduct from "./pages/Warehouse/Master/Product/AddProduct";
import Suppliers from "./pages/Warehouse/Master/Supplier/Suppliers";
import AddSupplier from "./pages/Warehouse/Master/Supplier/AddSupplier";
import Comparison from "./pages/Warehouse/Master/Product/Comparison";
import AddItem from "./pages/Warehouse/Master/Item/AddItem";
import Currency from "./pages/ProjectManager/CostCenter/Currency";
import RegionalWarehouse from "./pages/RegionalWarehouse/RegionalWarehouse";
import AddRegWarehouse from "./pages/RegionalWarehouse/AddRegWarehouse";
import RegWhProducts from "./pages/RegionalWarehouse/RegWhProducts";
import Zones from "./pages/Warehouse/Master/Zone/Zones";
import GRN from "./pages/ProjectManager/BOM/GRN"
import AddGRNItem from './pages/ProjectManager/BOM/AddGRNItem';
import Asset from './pages/Warehouse/Master/Asset/Asset';
import CreateAsset from "./pages/Warehouse/Master/Asset/CreateAsset";
import AssetDetail from "./pages/Warehouse/Master/Asset/AssetDetail";
import Building from "./pages/ProjectManager/Building/BuildingList"
import RequestMaintenance from "./pages/ProjectManager/Request/RequestMaintenance";
import AddRequest from "./pages/ProjectManager/Request/AddRequest";
import ShowRequestDetail from "./pages/ProjectManager/Request/ShowRequestDetail";
import RequestMaterialList from "./pages/RequestMaterial/RequestMaterialList";
import SalesOrderList from "./pages/SalesOrder/SalesOrderList";
import AddSalesOrder from "./pages/SalesOrder/AddSalesOrder";
import Login from "./pages/Login/Login";
import PurchaseRequest from "./pages/Purchase/PurchaseRequest";
import CreateWarehouseTransfer from "./pages/Warehouse/WarehouseTransfer/CreateWarehouseTransfer";
import RegionalWarehouseTransferList from "./pages/RegionalWarehouse/WarehouseTransfer/RegioinalWarehouseTransferList";
import DOList from "./pages/RegionalWarehouse/DeliveryOrder/DOList";
import GoodReceiveNotesList from "./pages/RegionalWarehouse/GoodReceiveNotes/GoodReceiveNotesList";
import RegionalInventory from "./pages/RegionalWarehouse/Inventory/RegionalInventory";
import ProtectedRoutes from "./ProtectedRoutes";
import { NotFound } from "./pages/NotFound/NotFound";
import ApproveDeliveryOrderList from './pages/ProjectManager/DeliveryOrderApprove/ApproveDeliveryOrderList';
import WarehouseTransferList from './pages/Warehouse/WarehouseTransfer/WarehouseTransferList';
import WarehouseTransferMonitor from './pages/ProjectManager/Monitor/WarehouseTransferMonitor';
import MaterialIssueList from './pages/Warehouse/MaterialIssue/MaterialIssueList';
import AddBuilding from './components/ProjectManager/Building/AddBuilding';
import SiteItems from './pages/ProjectManager/Sites/SiteItems';

function App() {

  return (

    <div id="main">
   
      <Sidebar>
       <Routes>
       
       <Route path="/login" element={<Login/>} />
       <Route path="*" element={<NotFound/>}/>
       
       <Route element={<ProtectedRoutes/>}>
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

       <Route path="/warehouse_purchase_request/:id" element={<PurchaseRequest/>}/>
       <Route path="/material_issue_list" element={<MaterialIssueList/>} />
      
      {/*Transfer Monitor */}
      <Route path="/check_warehouse_transfer" element={<WarehouseTransferMonitor/>} />
      <Route path="/warehouse_transfer/list" element={<WarehouseTransferList/>} />
      <Route path="/warehouse_transfer/create" element={<CreateWarehouseTransfer/>} />

      <Route path="/regional_warehouse_transfer/list" element={<RegionalWarehouseTransferList/>} />
      <Route path="/delivery_order/list" element={<DOList/>}/>
      <Route path="/manager/delivery_order/list"  element={<ApproveDeliveryOrderList/>} />

      <Route path="/regional/good_receive_notes" element={<GoodReceiveNotesList/>} />
      <Route path="/regional/inventory" element={<RegionalInventory/>} />

       {dummyData &&
         dummyData.map((item, index) => (
           <Route
             key={index}
             path={item.path}
             element={<DynamicItem page={item.name} />}
           />
         ))}
      </Route>
     </Routes>
     </Sidebar>
</div>
   
    )
  
}

export default App;