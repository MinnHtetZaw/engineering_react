import Nav from "../Sidebar/Nav"
import ProjectList from "../../pages/ProjectManager/Projects/projectlist"

const Item = (props) => {
  const { page } = props;
 
  if (page === "homepage") {
    return (
    <div>
      <Nav/>
      <div id="page">{page}</div>
    </div>
    
    );
  } else if(page === "projects"){
    return (
      <div>
        <Nav/>
        <div id="page">        
          <ProjectList/>
        </div>
      </div>
      
    );
  } 
  else{
    return (
      <div>
        <Nav/>
        <div id="page">        
        {page}
        </div>
      </div>
      
    );
  }
};

export default Item;