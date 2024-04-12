// real.ts
import express from 'express';
import axios from 'axios';

const router = express.Router();

router.get('/students', async (req, res) => {
    try {
        const { house, page, limit } = req.query;
        const response = await axios.get('https://harry-potter-api-3a23c827ee69.herokuapp.com/api/characters');
        let students = response.data;

        // Filtrer les étudiants par maison si le paramètre de requête house est défini
        if (typeof house === 'string') {
            students = students.filter((student: any) => student.house.toLowerCase() === house.toLowerCase());
        }

        const startIndex = (Number(page) - 1) * Number(limit);
        const endIndex = Number(page) * Number(limit);
        const paginatedStudents = students.slice(startIndex, endIndex);


        res.json(students);
    } catch (error) {
        res.status(500).json({ message: (error as any).message || 'An error occurred' });
    }
  });



  router.get('/randomstudent', async (req, res) => {
    try {
      const response = await axios.get('https://harry-potter-api-3a23c827ee69.herokuapp.com/api/characters');
      const students = response.data;
      const randomStudent = students[Math.floor(Math.random() * students.length)];
      res.json(randomStudent);
    } catch (error) {
      res.status(500).json({ message: (error as any).message || 'An error occurred' });
    }
  });
export default router;