'use client';
import { useState } from 'react';
import toast from 'react-hot-toast';
import {
    XMarkIcon,
    PencilIcon,
} from '../../Components/ui/icons/SvgIcons';
import { PageContent, PageLayout } from '../../Layout/PageLayOut';
import { IMAGE } from '../../assets/index.image';

interface Plan {
    id: string;
    name: string;
    displayName: string;
    price: string;
    period: 'year';
    previousPrice: string;
    discountPrice: string;
}

export default function SubscriptionManagement() {
    const [plan, setPlan] = useState<Plan>({
        id: 'annual_access',
        name: 'annual_access',
        displayName: 'Club Join Fee',
        price: '250',
        period: 'year',
        previousPrice: '499',
        discountPrice: '249',
    });

    const [isPriceModalOpen, setIsPriceModalOpen] = useState(false);

    const [tempPrice, setTempPrice] = useState('');

    const openPriceModal = () => {
        setTempPrice(plan.price);
        setIsPriceModalOpen(true);
    };

    const savePrice = () => {
        if (Number(tempPrice) < 0) {
            toast.error('Price cannot be negative.');
            return;
        }

        const updatedPlan = { ...plan, price: tempPrice };
        setPlan(updatedPlan);
        setIsPriceModalOpen(false);
        console.log('✅ Updated price:', updatedPlan);
    };




    return (
        <PageLayout
            title='pricing Management'
        >
            <PageContent>
                <div className="container mx-auto w-full">
                    <div
                        style={{
                            backgroundImage: `url(${IMAGE.subs})`,
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat',
                            backgroundSize: "cover"
                        }}
                        className="border border-gray-200 p-2 rounded-xl shadow-sm bg-white">
                        {/* Header */}
                        <div className="p-6 border border-[#FFDAD9] rounded-md flex justify-between items-center">
                            <div>
                                <h2 className="text-2xl font-bold">{plan.displayName}</h2>
                                <p className="text-gray-500 text-sm">
                                    {`Join for ${plan.price}/${plan.period}`}
                                </p>
                            </div>
                            <div className="mb-4 flex items-end justify-center flex-col">
                                <div>
                                    <span className="text-black text-4xl font-bold">
                                        ${plan.price}
                                    </span>
                                    <span className="text-black ml-1 line-through">{`$${plan.previousPrice}/${plan.period}`}</span>
                                </div>
                                <span className='text-gray-500 text-sm'>Service launch discount ${plan.discountPrice}/${plan.period}</span>
                            </div>
                        </div>

                        <div className="p-6">
                            <button
                                onClick={openPriceModal}
                                className="flex items-center gap-2 mt-3 bg-[var(--bg-red-high)] hover:bg-[var(--bg-red-high)] text-white px-4 py-2 rounded-md cursor-pointer"
                            >
                                <PencilIcon className="h-4 w-4" />
                                Update Price
                            </button>
                        </div>

                    </div>

                    {/* 🧾 Price Modal */}
                    {isPriceModalOpen && (
                        <ModalContainer onClose={() => setIsPriceModalOpen(false)}>
                            <h2 className="text-xl font-bold mb-2">Update Subscription Price</h2>
                            <p className="text-gray-500 text-sm mb-4">
                                Update the price and billing period for {plan.displayName}.
                            </p>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">
                                        Price ($)
                                    </label>
                                    <input
                                        type="number"
                                        value={tempPrice}
                                        step="0.01"
                                        onChange={(e) => setTempPrice(e.target.value)}
                                        className="w-full border rounded-md p-2"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3 mt-6">
                                <button
                                    onClick={() => setIsPriceModalOpen(false)}
                                    className="bg-[var(--bg-red-high)] hover:bg-[var(--bg-red-high)] text-white py-2 rounded-md cursor-pointer"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={savePrice}
                                    className="bg-[var(--bg-red-high)] hover:bg-[var(--bg-red-high)] text-white py-2 rounded-md cursor-pointer"
                                >
                                    Save
                                </button>
                            </div>
                        </ModalContainer>
                    )}

                </div>
            </PageContent>
        </PageLayout>
    );
}

interface ModalContainerProps {
    children: React.ReactNode;
    onClose: () => void;
}

function ModalContainer({ children, onClose }: ModalContainerProps) {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center px-3">
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
}
