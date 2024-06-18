
const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const db = require('../db');
const app = express();
// const mongoose = require('mongoose');

router.post('/create-project', async (req, res) => {
  try {
    const project = new Project(req.body);
    await project.save();
    res.status(201).json({ message: 'Project created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});


router.get('/projects', async (req, res) => {
  try {
    const { page = 1, limit = 7, search = '', sortBy = 'projectName', order = 'asc' } = req.query;
    
    const searchQuery = search ? { projectName: { $regex: search, $options: 'i' } } : {};
    const sortQuery = { [sortBy]: order === 'asc' ? 1 : -1 };
    
    const projects = await Project.find(searchQuery)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort(sortQuery)
      .exec();

    const count = await Project.countDocuments(searchQuery);

    res.json({
      projects,
      totalPages: Math.ceil(count / limit),
      currentPage: page
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

router.get('/department-stats', async (req, res) => {
  try {
    const departments = ['STR', 'FIN', 'QLT', 'MAN', 'STO', 'HR'];
    const departmentStats = await Promise.all(departments.map(async department => {
      // Fetch total projects for the department
      const total = await Project.countDocuments({ department });

      // Fetch closed projects for the department
      const closed = await Project.countDocuments({ department, status: 'Closed' });

      return { department, total, closed };
    }));

    res.json(departmentStats);
  } catch (error) {
    console.error('Error fetching department stats', error);
    res.status(500).send('Internal Server Error');
  }
});



router.get('/project-stats', async (req, res) => {
  try {
    const totalProjects = await Project.countDocuments();
    const closedProjects = await Project.countDocuments({ status: 'Closed' });
    const runningProjects = await Project.countDocuments({ status: 'Started' });
    const cancelledProjects = await Project.countDocuments({ status: 'Canceled' });

    res.json({
      total: totalProjects,
      closed: closedProjects,
      running: runningProjects,
      cancelled: cancelledProjects
    });
  } catch (error) {
    console.error('Error fetching project stats', error);
    res.status(500).send('Internal Server Error');
  }
});




router.put('/projects/:id', async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
    res.json(project);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

module.exports = router;
