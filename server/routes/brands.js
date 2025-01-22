import express from 'express';
import { auth, authorize } from '../middleware/auth.js';
import Brand from '../models/Brand.js';

const router = express.Router();

// Get all brands
router.get('/', async (req, res) => {
  try {
    const brands = await Brand.find();
    res.json(brands);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Create brand (admin only)
router.post('/', auth, authorize(['admin']), async (req, res) => {
  try {
    const brand = new Brand(req.body);
    await brand.save();
    res.status(201).json(brand);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update brand (admin only)
router.patch('/:id', auth, authorize(['admin']), async (req, res) => {
  try {
    const brand = await Brand.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(brand);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete brand (admin only)
router.delete('/:id', auth, authorize(['admin']), async (req, res) => {
  try {
    await Brand.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;