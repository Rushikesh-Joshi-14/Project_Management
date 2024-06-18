import React, { useEffect, useRef, useState } from 'react'; 
import styles from "./styles.module.css";
import back from '../assets/back arrow.svg';
import dashboard from '../assets/Dashboard.svg';
import createProject from '../assets/create-project-active.svg';
import logout from '../assets/Logout.svg';
import projectList from '../assets/Project-list.svg';
import dtPicker from "../assets/dtPicker.png";
import { useNavigate } from 'react-router-dom';

const Main = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = './login';
  };

  const [formData, setFormData] = useState({ 
    projectTheme: '',
    reason: 'For Business',
    type: 'Internal',
    division: 'Filters',
    category: 'Quality A',
    priority: 'High',
    department: 'Strategy',
    startDate: '',
    endDate: '',
    location: 'Pune',
    status: 'Registered'
  });
  const [projectAdded, setProjectAdded] = useState(false); 
  const handleChange = (e) => { 
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => { 
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/api/projects/create-project', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
     
      if (response.ok) {
        setProjectAdded(true); 
        console.log(data.message);
        
         
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const startDateRef = useRef(null);
  const endDateRef = useRef(null);

  useEffect(() => {
    const startDate = startDateRef.current;
    const endDate = endDateRef.current;

    if (startDate && endDate) {
      const handleFocus = (input) => {
        input.type = 'date';
      };

      const handleBlur = (input) => {
        input.type = 'text';
      };

      startDate.addEventListener('focus', () => handleFocus(startDate));
      startDate.addEventListener('blur', () => handleBlur(startDate));

      endDate.addEventListener('focus', () => handleFocus(endDate));
      endDate.addEventListener('blur', () => handleBlur(endDate));

      return () => {
        startDate.removeEventListener('focus', () => handleFocus(startDate));
        startDate.removeEventListener('blur', () => handleBlur(startDate));

        endDate.removeEventListener('focus', () => handleFocus(endDate));
        endDate.removeEventListener('blur', () => handleBlur(endDate));
      };
    }
  }, []);

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
        <div className={styles.icon}>
          <img src={createProject} alt="Create Project" onClick={() => navigate('/create-project')} />
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
        <p style={{color :"#26282c" }}> Create Project</p>
        
      </div>

      <div className={styles.ProjectInfoContainer}>
        <form className={styles.Project_form_container} onSubmit={handleSubmit}>
          <input
            type="text"
            name="projectTheme"
            placeholder="Enter Project Theme"
            className={styles.pName}
            value={formData.projectTheme} 
            onChange={handleChange}
          />
          <button type="submit" className={styles.blue_btn}>Save Project</button>
          <br /><br />

          <div className={styles.project_Inputs}>
            <div>
              <label htmlFor="reason">Reason</label>
              <select name="reason" className={styles.project_input} value={formData.reason} onChange={handleChange}> 
                <option value="Business"> Business</option>
                <option value="Dealership">Dealership</option>
                <option value="Transport">Transport</option>
                
              </select>
            </div>

            <div>
              <label htmlFor="type">Type</label>
              <select name="type" className={styles.project_input} value={formData.type} onChange={handleChange}> 
                <option value="Internal">Internal</option>
                <option value="External">External</option>
                <option value="Vendor">Vendor</option>
              </select>
            </div>

            <div>
              <label htmlFor="division">Division</label>
              <select name="division" className={styles.project_input} value={formData.division} onChange={handleChange}> 
                <option value="Filters">Filters</option>
                <option value="Pumps">Pumps</option>
                <option value="Glass">Glass</option>
                <option value="Water Heater">Water Heater</option>
                <option value="Compressor">Compressor</option>
              </select>
            </div>

            <div>
              <label htmlFor="category">Category</label>
              <select name="category" className={styles.project_input} value={formData.category} onChange={handleChange}> 
                <option value="Quality A">Quality A</option>
                <option value="Quality B">Quality B</option>
                <option value="Quality C">Quality C</option>
                <option value="Quality D">Quality D</option>
              </select>
            </div>

            <div>
              <label htmlFor="priority">Priority</label>
              <select name="priority" className={styles.project_input} value={formData.priority} onChange={handleChange}> 
                <option value="High">High</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
              </select>
            </div>

            <div>
              <label htmlFor="department">Department</label>
              <select name="department" className={styles.project_input} value={formData.department} onChange={handleChange}> 
                <option value="Strategy">Strategy</option>
                <option value="Finanance">Finanance</option>
                <option value="Maintainace">Maintainace</option>
                <option value="Stores">Stores</option>
                <option value="Quality">Quality</option>
                <option value="HR">HR</option>
              </select>
            </div>

            <div className={styles.dt}>
              <label htmlFor="startDate">Start Date as per Project Plan</label>
              <input
                id="startDate"
                type="text"
                name="startDate"
                placeholder="D Month, Yr"
                className={styles.project_input}
                ref={startDateRef}
                value={formData.startDate} 
                onChange={handleChange}
              />
              
            </div>

            <div className={styles.dt}>
              <label htmlFor="endDate">End Date as per Project Plan</label>
              <input
                id="endDate"
                type="text"
                name="endDate"
                placeholder="D Month, Yr"
                className={styles.project_input}
                ref={endDateRef}
                value={formData.endDate} 
                onChange={handleChange}
              />
            </div>
          </div>

          <div >
          <label htmlFor="location" className={styles.location}>Location</label>
            <select name="location"  className={styles.project_location} value={formData.location} onChange={handleChange}> 
              <option value="Pune">Pune</option>
              <option value="Delhi">Delhi</option>
              <option value="Mumbai">Mumbai</option>
            </select>
            <p className={styles.status}>
              Status: <b>Registered</b>

            </p>

            
          </div>
        </form>

        {projectAdded && (
          <div className={styles.aknowledgement}>Project Added SuccessFully !</div>
        )}
      </div>
    </div>
    
  );
};

export default Main;
