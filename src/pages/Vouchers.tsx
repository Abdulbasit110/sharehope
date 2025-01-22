import { useQuery, useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { format } from 'date-fns';
import { Tag, Gift, Clock } from 'lucide-react';
import type { Voucher } from '@/types';
import { useAuthStore } from '../store/auth';
import image from '../assets/images/clothing-donation.jpg';

const voucherData = [
  {
    id: "voucher-1",
    brandId: {
      id: "brand-1",
      name: "Green Earth Store",
      logo: image, // Placeholder logo URL
    },
    discount: 20, // 20% off
    pointsRequired: 100,
    expiryDate: "2025-02-15T23:59:59Z", // Expiry date in ISO format
    createdAt: "2025-01-15T10:30:00Z", // Creation date in ISO format
  }]

export default function Vouchers() {
  const { user } = useAuthStore();

  const { data: vouchers } = useQuery({
    queryKey: ['vouchers'],
    queryFn: async () => {
      const { data } = await axios.get<Voucher[]>('/api/vouchers');
      return data;
    },
  });

  const claimVoucher = useMutation({
    mutationFn: async (voucherId: string) => {
      const { data } = await axios.post(`/api/vouchers/${voucherId}/claim`);
      return data;
    },
    onSuccess: () => {
      // Refresh vouchers and user data
      queryClient.invalidateQueries({ queryKey: ['vouchers'] });
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });

  return (
    <div className="space-y-8 mt-14">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-green-600">Available Vouchers</h1>
        <div className="flex items-center space-x-2">
          <Gift className="h-5 w-5 text-green-600" />
          <span className="font-medium">Your Points: {user?.points}</span>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {voucherData?.map((voucher) => (
          <div
            key={voucher.id}
            className="bg-white p-6 rounded-lg shadow-md space-y-4"
          >
            <div className="flex items-center space-x-4">
              <img
                src={voucher.brandId.logo}
                alt={voucher.brandId.name}
                className="w-12 h-12 object-contain rounded-md"
              />
              <div>
                <h3 className="text-lg font-semibold">{voucher.brandId.name}</h3>
                <p className="text-gray-500">{voucher.discount}% Off</p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-gray-600">
                <Tag className="h-5 w-5" />
                <span>{voucher.pointsRequired} points required</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <Clock className="h-5 w-5" />
                <span>Expires: {format(new Date(voucher.expiryDate), 'PPP')}</span>
              </div>
            </div>

            <button
              onClick={() => claimVoucher.mutate(voucher.id)}
              disabled={user?.points < voucher.pointsRequired || claimVoucher.isPending}
              className={`
                w-full px-4 py-2 rounded-md text-white font-medium
                ${
                  user?.points >= voucher.pointsRequired
                    ? 'bg-green-600 hover:bg-green-700'
                    : 'bg-gray-400 cursor-not-allowed'
                }
              `}
            >
              {claimVoucher.isPending
                ? 'Claiming...'
                : user?.points >= voucher.pointsRequired
                ? 'Claim Voucher'
                : `Need ${voucher.pointsRequired - (user?.points || 0)} more points`}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}