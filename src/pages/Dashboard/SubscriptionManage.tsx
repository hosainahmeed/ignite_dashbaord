'use client';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { CiWarning } from 'react-icons/ci';
import {
    CheckIcon,
    PlusIcon,
    XMarkIcon,
    PencilIcon,
} from '../../Components/ui/icons/SvgIcons';
import { PageContent, PageLayout } from '../../Layout/PageLayOut';
import { IMAGE } from '../../assets/index.image';

interface Feature {
    id: number;
    text: string;
}

interface Plan {
    id: string;
    name: string;
    displayName: string;
    price: string;
    period: 'year';
    features: Feature[];
}

export default function SubscriptionManagement() {
    const [plan, setPlan] = useState<Plan>({
        id: 'annual_access',
        name: 'annual_access',
        displayName: 'Annual Access',
        price: '9.99',
        period: 'year',
        features: [
            { id: 1, text: 'Search all youth sports events' },
            { id: 2, text: 'View full event details' },
            { id: 3, text: 'Click external links to register' },
            { id: 4, text: 'Save events to your list' },
        ],
    });

    const [isPriceModalOpen, setIsPriceModalOpen] = useState(false);
    const [isFeatureModalOpen, setIsFeatureModalOpen] = useState(false);

    const [tempPrice, setTempPrice] = useState('');

    const [newFeature, setNewFeature] = useState('');
    const [tempFeatures, setTempFeatures] = useState<Feature[]>([]);

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

    const openFeatureModal = () => {
        setTempFeatures([...plan.features]);
        setIsFeatureModalOpen(true);
    };

    const addFeature = () => {
        const trimmed = newFeature.trim();
        if (!trimmed) return toast.error('Please enter a valid feature.');
        if (tempFeatures.length >= 6)
            return toast.error('You can add up to 6 features only.');

        const newId = tempFeatures.length
            ? Math.max(...tempFeatures.map((f) => f.id)) + 1
            : 1;

        const updatedFeatures = [...tempFeatures, { id: newId, text: trimmed }];
        setTempFeatures(updatedFeatures);
        setNewFeature('');
    };

    const removeFeature = (id: number) => {
        setTempFeatures(tempFeatures.filter((f) => f.id !== id));
    };

    const saveFeatures = () => {
        const updatedPlan = { ...plan, features: [...tempFeatures] };
        setPlan(updatedPlan);
        setIsFeatureModalOpen(false);

        console.log('✅ Updated features:', updatedPlan.features);
    };

    return (
        <PageLayout
            title='pricing Management'
        >
            <PageContent>
                <div className="container mx-auto max-w-3xl p-6">
                    <div
                        style={{
                            backgroundImage: `url(${IMAGE.subs})`,
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat',
                            backgroundSize: "cover"
                        }}
                        className="border border-gray-200 rounded-xl shadow-sm p-2 bg-white">
                        {/* Header */}
                        <div className="p-6 border border-gray-200 rounded-md flex justify-between items-center">
                            <div>
                                <h2 className="text-2xl font-bold">{plan.displayName}</h2>
                                <p className="text-gray-500 text-sm">
                                    Manage subscription details and features
                                </p>
                            </div>
                            <div className="mb-4">
                                <span className="text-[#0C469D] text-4xl font-bold">
                                    ${plan.price}
                                </span>
                                <span className="text-gray-500 ml-1">/{plan.period}</span>
                            </div>
                        </div>

                        <div className="p-6">
                            {/* Features */}
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-xl font-semibold">What’s Included</h3>
                                <button
                                    onClick={openFeatureModal}
                                    className="border border-[#0C469D] text-[#0C469D] hover:bg-[#0C469D] hover:text-white px-4 py-2 rounded-md flex items-center gap-2 cursor-pointer"
                                >
                                    <PencilIcon className="h-4 w-4" />
                                    Manage Features
                                </button>
                            </div>

                            <ul className="space-y-3">
                                {plan.features.map((f) => (
                                    <li key={f.id} className="flex items-center gap-2">
                                        <CheckIcon className="h-5 w-5 text-[#0C469D]" />
                                        <span>{f.text}</span>
                                    </li>
                                ))}
                            </ul>
                            <button
                                onClick={openPriceModal}
                                className="flex items-center gap-2 mt-3 bg-[#0C469D] hover:bg-[#0B3C8A] text-white px-4 py-2 rounded-md cursor-pointer"
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
                                    className="bg-red-50 text-red-500 hover:bg-red-100 py-2 rounded-md cursor-pointer"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={savePrice}
                                    className="bg-[#0C469D] hover:bg-[#0B3C8A] text-white py-2 rounded-md cursor-pointer"
                                >
                                    Save
                                </button>
                            </div>
                        </ModalContainer>
                    )}

                    {/* 🧩 Feature Modal */}
                    {isFeatureModalOpen && (
                        <ModalContainer onClose={() => setIsFeatureModalOpen(false)}>
                            <h2 className="text-xl font-bold mb-2">Manage Features</h2>
                            <p className="text-gray-500 text-sm mb-2">
                                Add or remove features for {plan.displayName}.
                            </p>
                            <div className="flex items-center text-xs bg-yellow-100 p-2 rounded-md mb-3">
                                <CiWarning className="mr-1" size={18} /> Remember to save after
                                adding features.
                            </div>

                            <div className="flex gap-2 mb-4">
                                <input
                                    value={newFeature}
                                    onChange={(e) => setNewFeature(e.target.value)}
                                    placeholder="Add a new feature..."
                                    className="flex-1 border rounded-md p-2"
                                />
                                <button
                                    onClick={addFeature}
                                    className="bg-[#0C469D] hover:bg-[#0B3C8A] text-white p-2 rounded-md cursor-pointer"
                                >
                                    <PlusIcon className="h-4 w-4" />
                                </button>
                            </div>

                            <div className="space-y-3 max-h-[250px] overflow-y-auto">
                                {tempFeatures.map((f) => (
                                    <div
                                        key={f.id}
                                        className="flex justify-between items-center border rounded-md p-2 hover:bg-gray-50"
                                    >
                                        <span>{f.text}</span>
                                        <button
                                            onClick={() => removeFeature(f.id)}
                                            className="text-red-500 hover:text-red-700 cursor-pointer"
                                        >
                                            <XMarkIcon className="h-4 w-4" />
                                        </button>
                                    </div>
                                ))}

                                {tempFeatures.length === 0 && (
                                    <p className="text-center text-gray-500 text-sm py-4">
                                        No features added yet.
                                    </p>
                                )}
                            </div>

                            <div className="grid grid-cols-2 gap-3 mt-6">
                                <button
                                    onClick={() => setIsFeatureModalOpen(false)}
                                    className="bg-red-50 text-red-500 hover:bg-red-100 py-2 rounded-md cursor-pointer"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={saveFeatures}
                                    className="bg-[#0C469D] hover:bg-[#0B3C8A] text-white py-2 rounded-md cursor-pointer"
                                >
                                    Save Features
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
