import React, { useEffect, useRef ,useState } from 'react';

import styles from "./styles.module.css";
import back from '../assets/back arrow.svg';
import dashboard from '../assets/Dashboard.svg';
import createProject from '../assets/create-project.svg';
import logout from '../assets/Logout.svg';
import projectList from '../assets/list-active.svg';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';





const List = () => {

  const paddingLeft = {
    
    paddingLeft: '10px' ,
    
    
  };

  const color = {
    
   fontWeight : "bold" ,
    color: "rgb(39, 38, 38)" ,
    
  };
  const updateProjectStatus = async (projectId, status) => {
    try {
      await axios.put(`http://localhost:8080/api/projects/projects/${projectId}`, { status });
      fetchProjects(); 
    } catch (error) {
      console.error('Error updating project status:', error);
    }
  };

  const handleStart = (projectId) => {
    updateProjectStatus(projectId, 'Started');
  };

  const handleClose = (projectId) => {
    updateProjectStatus(projectId, 'Closed');
  };

  const handleCancel = (projectId) => {
    updateProjectStatus(projectId, 'Canceled');
  };



  const [projects, setProjects] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('projectName');
  const [order, setOrder] = useState('asc');

  useEffect(() => {
    fetchProjects();
  }, [currentPage, search, sortBy, order]);

  const navigate = useNavigate();

  useEffect(() => {
    fetchProjects();
  }, [currentPage]);

  const fetchProjects = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/projects/projects`, {
        params: {
          page: currentPage,
          search,
          sortBy,
          order,
        },
      });
      setProjects(response.data.projects);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href='./login';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
  };

  

  

  return (
    <div className={styles.main_container}>
      <div className={styles.sideBar}>
        <div className={styles.icon} onClick={() => navigate('/Dashboard')}>
          <img src={dashboard} alt="Dashboard" />
        </div>
        
        <div className={styles.icon} onClick={() => navigate('/project-list')}>
          <img src={projectList} alt="Project List" />
        </div>
        
        
        <div className={styles.icon}>
          <hr />
        </div>
       
        <div className={styles.icon} onClick={() => navigate('/create-project')}>
          <img src={createProject} alt="Create Project" />
        </div>
        
        
        <div className={styles.logouticon}>
          <img src={logout} alt="Logout" onClick={handleLogout} />
        </div>
      </div>

      <div className={styles.header}>
        <div></div>
        <div className={styles.goBack}>
          <img src={back} alt="Go Back" height="16px" width="16px" />
        </div>
        <p style={{color :"#26282c" }}> Project Listing</p>
       
      </div>

      <div className={styles.ProjectInfoContainer}>

        <div className={styles.firstSection}>
            <input placeholder='Search' type="search" className={styles.search} value={search} onChange={(e) => setSearch(e.target.value)}/>
            <div className={styles.sortDiv}>
                <label htmlFor="sort"> Sort By : </label>
                <select name="sortSelection" id="sort" className={styles.sort} value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                    <option value="priority"> Priority</option>
                    <option value="projectName">Project Name</option>
                     <option value="status">Status</option>
                </select>
                <button onClick={() => setOrder(order === 'asc' ? 'desc' : 'asc')} className={styles.ascDsc}>
              {order === 'asc' ? 'Ascending' : 'Descending'}
            </button>
            </div>

        </div>

        
        <div className={styles.mainSection}>
        <div className={styles.headings}>

          <p className={styles.headingsText } >Project Name</p>
          <p className={styles.headingsText} > Reason </p>
          <p className={styles.headingsText} style={paddingLeft} > Type </p>
          <p className={styles.headingsText} > Division </p>
          <p className={styles.headingsText} >Category </p>
          <p className={styles.headingsText} >Priority </p>
          <p className={styles.headingsText} > Dept.</p>
          <p className={styles.headingsText} > Location</p>
          <p className={styles.headingsText} >Status</p>
          
          

</div>
      
      <table>
        <thead>
         
        </thead>
        <tbody>
        {projects.map(project => (
          
            <tr key={project._id}>
            <td className={styles.tableElements}style={color}>{project.projectTheme}</td>
                  <td className={styles.tableElements} style={paddingLeft}>{project.reason}</td>
                  <td className={styles.tableElements}>{project.type}</td>
                  <td className={styles.tableElements}>{project.division}</td>
                  <td className={styles.tableElements} style={paddingLeft}>{project.category}</td>
                  <td className={styles.tableElements} style={paddingLeft}>{project.priority}</td>
                  <td className={styles.tableElements} style={paddingLeft}>{project.department}</td>
                  <td className={styles.tableElements} style={paddingLeft}>{project.location}</td>
                  <td className={styles.tableElements}>{project.status}</td>
           
              <td>
              <button className={styles.blue_btn} onClick={() => handleStart(project._id)}>
                   Start
                </button>
              </td>

                <td>
                <button className={styles.white_btn} onClick={() => handleClose(project._id)}>
                   Close
                </button>
                </td>
              
             <td>
                
             <button type='button' className={styles.white_btn} onClick={() => handleCancel(project._id)}>
                   Cancel
                </button>
             </td>
                
                
              
            </tr>
        ))}
        <tr>
        <div className={styles.paginationMain}>
       
       {Array.from({ length: totalPages }, (_, index) => (
         <button key={index} onClick={() => setCurrentPage(index + 1)} className={styles.pagination}>
           {index + 1}
         </button>
       ))}
     </div>
        </tr>
        </tbody>
      </table> </div>
              </div>

             
    </div>
  );
};

export default List;
