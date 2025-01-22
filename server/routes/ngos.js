import express from 'express';
import { auth, authorize } from '../middleware/auth.js';
import NGO from '../models/NGO.js';

const router = express.Router();

// Get all active NGOs
router.get('/', async (req, res) => {
  try {
    const ngos = await NGO.find({ status: 'active' });
    res.json(ngos);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Create NGO (admin only)
router.post('/', auth, authorize(['admin']), async (req, res) => {
  try {
    const ngo = new NGO(req.body);
    await ngo.save();
    res.status(201).json(ngo);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update NGO (admin only)
router.patch('/:id', auth, authorize(['admin']), async (req, res) => {
  try {
    const ngo = await NGO.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(ngo);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete NGO (admin only)
router.delete('/:id', auth, authorize(['admin']), async (req, res) => {
  try {
    await NGO.findByIdAndUpdate(req.params.id, { status: 'inactive' });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;