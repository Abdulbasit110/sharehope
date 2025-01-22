import express from 'express';
import { auth, authorize } from '../middleware/auth.js';
import Disposal from '../models/Disposal.js';
import User from '../models/User.js';

const router = express.Router();

// Get all disposals (admin only)
router.get('/', auth, authorize(['admin']), async (req, res) => {
  try {
    const disposals = await Disposal.find()
      .populate('userId', 'name email');
    res.json(disposals);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user's disposals
router.get('/my-disposals', auth, async (req, res) => {
  try {
    const disposals = await Disposal.find({ userId: req.user.id });
    res.json(disposals);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Create disposal
router.post('/', auth, async (req, res) => {
  try {
    const disposal = new Disposal({
      ...req.body,
      userId: req.user.id,
    });
    await disposal.save();

    // Award points to user (5 points per item)
    const totalItems = disposal.items.reduce((sum, item) => sum + item.quantity, 0);
    await User.findByIdAndUpdate(req.user.id, {
      $inc: { points: totalItems * 5 }
    });

    res.status(201).json(disposal);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update disposal status
router.patch('/:id/status', auth, authorize(['admin']), async (req, res) => {
  try {
    const { status } = req.body;
    const disposal = await Disposal.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    res.json(disposal);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;