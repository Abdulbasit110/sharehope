export interface User {
  id: string;
  email: string;
  name: string;
  role: 'user' | 'admin' | 'ngo';
  points: number;
  createdAt: string;
}

export interface NGO {
  id: string;
  name: string;
  email: string;
  address: string;
  phone: string;
  description: string;
  latitude: number;
  longitude: number;
  status: 'active' | 'inactive';
}

export interface Brand {
  id: string;
  name: string;
  logo: string;
  description: string;
  vouchers: Voucher[];
}

export interface Voucher {
  id: string;
  brandId: string;
  code: string;
  discount: number;
  pointsRequired: number;
  expiryDate: string;
  status: 'active' | 'claimed' | 'expired';
}

export interface Donation {
  id: string;
  userId: string;
  ngoId: string;
  items: DonationItem[];
  status: 'pending' | 'accepted' | 'picked_up' | 'delivered';
  pickupDate: string;
  pickupAddress: string;
  createdAt: string;
}

export interface DonationItem {
  type: string;
  quantity: number;
  condition: 'new' | 'good' | 'fair';
  description: string;
}

export interface Disposal {
  id: string;
  userId: string;
  items: DisposalItem[];
  status: 'pending' | 'picked_up' | 'disposed';
  pickupDate: string;
  pickupAddress: string;
  createdAt: string;
}

export interface DisposalItem {
  type: string;
  quantity: number;
  reason: string;
}