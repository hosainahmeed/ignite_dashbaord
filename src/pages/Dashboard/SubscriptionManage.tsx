'use client';
import { useState, useEffect, useMemo } from 'react';
import toast from 'react-hot-toast';
import {
    XMarkIcon,
    PencilIcon,
} from '../../Components/ui/icons/SvgIcons';
import { PageContent, PageLayout } from '../../Layout/PageLayOut';
import { IMAGE } from '../../assets/index.image';
import {
    useClubJoinFeeQuery,
    useCreateClubJoinFeeMutation,
} from '../../redux/services/clubApis';

export default function SubscriptionManagement() {
    const { data: clubJoinFeeData, isLoading, refetch } = useClubJoinFeeQuery({});
    const [updateClubJoinFee, { isLoading: isUpdating }] = useCreateClubJoinFeeMutation();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [tempFee, setTempFee] = useState('');
    const [tempDiscount, setTempDiscount] = useState('');
    const [isDiscountActive, setIsDiscountActive] = useState(true);
    
    const plan = useMemo(() => {
        const data = clubJoinFeeData?.data;
        if (!data) return null;

        return {
            name: 'Club Join Fee',
            price: data.fee.toString(),
            discount: data.discountAmount.toString(),
            isDiscountActive: data.isDiscountActive,
            previousPrice: (data.fee + data.discountAmount).toString(),
        };
    }, [clubJoinFeeData]);

    useEffect(() => {
        if (plan) {
            setTempFee(plan.price);
            setTempDiscount(plan.discount);
            setIsDiscountActive(plan.isDiscountActive);
        }
    }, [plan]);

    const handleSave = async () => {
        const fee = Number(tempFee);
        const discount = Number(tempDiscount);
        if (fee < 0 || discount < 0) {
            toast.error('Values cannot be negative.');
            return;
        }

        try {
            const payload = { fee, discountAmount: discount, isDiscountActive };
            await updateClubJoinFee(payload).unwrap();
            toast.success('Club join fee updated successfully!');
            setIsModalOpen(false);
            refetch();
        } catch (err: any) {
            toast.error(err?.data?.message || 'Failed to update fee.');
        }
    };

    if (isLoading || !plan) return <p className="p-6">Loading...</p>;

    return (
        <PageLayout title="Pricing Management">
            <PageContent>
                <div className="container mx-auto w-full">
                    <div
                        style={{
                            backgroundImage: `url(${IMAGE.subs})`,
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat',
                            backgroundSize: 'cover',
                        }}
                        className="border border-gray-200 p-2 rounded-xl shadow-sm bg-white"
                    >
                        {/* Header */}
                        <div className="p-6 border border-[#FFDAD9] rounded-md flex justify-between items-center">
                            <div>
                                <h2 className="text-2xl font-bold">{plan.name}</h2>
                                <p className="text-gray-500 text-sm">
                                    {`Join for $${plan.price}/year`}
                                </p>
                            </div>

                            <div className="mb-4 flex flex-col items-end">
                                <div>
                                    <span className="text-black text-4xl font-bold">${plan.price}</span>
                                    {plan.isDiscountActive && (
                                        <span className="text-black ml-1 line-through">
                                            ${plan.previousPrice}/year
                                        </span>
                                    )}
                                </div>
                                {plan.isDiscountActive && (
                                    <span className="text-gray-500 text-sm">
                                        Discount ${plan.discount}/year
                                    </span>
                                )}
                            </div>
                        </div>

                        <div className="p-6">
                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="flex items-center gap-2 mt-3 bg-[var(--bg-red-high)] text-white px-4 py-2 rounded-md cursor-pointer"
                            >
                                <PencilIcon className="h-4 w-4" />
                                Update Price
                            </button>
                        </div>
                    </div>

                    {/* Modal */}
                    {isModalOpen && (
                        <Modal onClose={() => setIsModalOpen(false)}>
                            <h2 className="text-xl font-bold mb-2">Update Subscription Price</h2>
                            <p className="text-gray-500 text-sm mb-4">
                                Update the fee, discount, and active status for {plan.name}.
                            </p>

                            <div className="space-y-4">
                                <InputField
                                    label="Fee ($)"
                                    value={tempFee}
                                    onChange={setTempFee}
                                />
                                <InputField
                                    label="Discount ($)"
                                    value={tempDiscount}
                                    onChange={setTempDiscount}
                                />

                                <label className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        checked={isDiscountActive}
                                        onChange={() => setIsDiscountActive(!isDiscountActive)}
                                    />
                                    <span className="text-sm text-gray-700">Discount Active</span>
                                </label>
                            </div>

                            <div className="grid grid-cols-2 gap-3 mt-6">
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="bg-gray-200 hover:bg-gray-300 text-black py-2 rounded-md"
                                >
                                    Cancel
                                </button>
                                <button
                                    disabled={isUpdating}
                                    onClick={handleSave}
                                    className="bg-[var(--bg-red-high)] text-white py-2 rounded-md"
                                >
                                    {isUpdating ? 'Saving...' : 'Save'}
                                </button>
                            </div>
                        </Modal>
                    )}
                </div>
            </PageContent>
        </PageLayout>
    );
}

/* ✅ Reusable Modal Component */
const Modal = ({
    children,
    onClose,
}: {
    children: React.ReactNode;
    onClose: () => void;
}) => (
    <div className="fixed inset-0 bg-black/10 backdrop-blur-md z-50 flex items-center justify-center px-3">
        <div className="bg-white rounded-lg max-w-md w-full p-6 relative animate-fade-in">
            <button
                onClick={onClose}
                className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
            >
                <XMarkIcon className="h-5 w-5" />
            </button>
            {children}
        </div>
    </div>
);

const InputField = ({
    label,
    value,
    onChange,
}: {
    label: string;
    value: string;
    onChange: (v: string) => void;
}) => (
    <div>
        <label className="block text-sm font-medium mb-1">{label}</label>
        <input
            type="number"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full border rounded-md p-2"
        />
    </div>
);
