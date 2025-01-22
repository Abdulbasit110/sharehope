import express from 'express';
import { auth, authorize } from '../middleware/auth.js';
import Donation from '../models/Donation.js';
import User from '../models/User.js';

const router = express.Router();

// Get all donations (admin only)
router.get('/', auth, authorize(['admin']), async (req, res) => {
  try {
    const donations = await Donation.find()
      .populate('userId', 'name email')
      .populate('ngoId', 'name');
    res.json(donations);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user's donations
router.get('/my-donations', auth, async (req, res) => {
  try {
    const donations = await Donation.find({ userId: req.user.id })
      .populate('ngoId', 'name address');
    res.json(donations);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Create donation
router.post('/', auth, async (req, res) => {
  try {
    const donation = new Donation({
      ...req.body,
      userId: req.user.id,
    });
    await donation.save();

    // Award points to user (10 points per item)
    const totalItems = donation.items.reduce((sum, item) => sum + item.quantity, 0);
    await User.findByIdAndUpdate(req.user.id, {
      $inc: { points: totalItems * 10 }
    });

    res.status(201).json(donation);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update donation status
router.patch('/:id/status', auth, authorize(['admin', 'ngo']), async (req, res) => {
  try {
    const { status } = req.body;
    const donation = await Donation.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    res.json(donation);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;