import React, { useState, useEffect } from 'react';
import styles from "./styles.module.css";
import back from '../assets/back arrow.svg';
import dashboard from '../assets/Dashboard-active.svg';
import createProject from '../assets/create-project.svg';
import logout from '../assets/Logout.svg';
import projectList from '../assets/Project-list.svg';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Chart from 'chart.js/auto';

const Dashboard = () => {
  const navigate = useNavigate();

  const [projectStats, setProjectStats] = useState({
    total: 0,
    closed: 0,
    running: 0,
    closureDelay: 0,
    cancelled: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/projects/project-stats');
        setProjectStats(response.data);
      } catch (error) {
        console.error('Error fetching project stats', error);
      }
    };

    fetchData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  useEffect(() => {
    const ctx = document.getElementById('projectChart');
    let chartInstance = null;

    if (ctx) {
      if (chartInstance) {
        chartInstance.destroy(); // Destroy the existing chart if it exists
      }

      chartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Total Projects', 'Closed Projects'],
          datasets: [{
            label: 'Projects',
            data: [projectStats.total, projectStats.closed],
            backgroundColor: [
              'rgba(75, 192, 192, 0.2)',
              'rgba(255, 99, 132, 0.2)'
            ],
            borderColor: [
              'rgba(75, 192, 192, 1)',
              'rgba(255, 99, 132, 1)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }

    // Cleanup function to destroy the chart instance
    return () => {
      if (chartInstance) {
        chartInstance.destroy();
      }
    };
  }, [projectStats]); // Re-run effect when projectStats changes

  return (
    <div className={styles.main_container}>
      <div className={styles.sideBar}>
        <div className={styles.icon} onClick={() => navigate('/')}>
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
        <p style={{color :"#26282c" }}>Dashboard</p>
        
      </div>

      <div className={styles.ProjectInfoContainer}>
        <div className={styles.infoDivs}>
          <div className={styles.infoElements}>
            Total Projects
            <p>{projectStats.total}</p>
          </div>
          <div className={styles.infoElements}>
            Closed
            <p>{projectStats.closed}</p>
          </div>
          <div className={styles.infoElements}>
            Running
            <p>{projectStats.running}</p>
          </div>
          <div className={styles.infoElements}>
            Closure Delay
            <p>0</p>
          </div>
          <div className={styles.infoElements}>
            Cancelled
            <p>{projectStats.cancelled}</p>
          </div>
        </div>
      </div>

      <div className={styles.dashboardContainer}>
        <p>Total vs Closed</p>
        <div className={styles.mainDashBoard}>
          <canvas id="projectChart"></canvas>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
