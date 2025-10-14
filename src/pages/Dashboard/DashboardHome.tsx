import { IMAGE } from '../../assets/index.image';
import DonationsGrowth from '../../Components/ui/chart/DonationsGrowth';
import RecentlyDonations from './RecentlyDonations';


function DashboardHome() {

    const cardData = [
        {
            title: 'Total Nominations',
            value: 0,
            icon: <img src={IMAGE.nominations} alt="Nominations" />,
        },
        {
            title: 'Total Clubs',
            value: 0,
            icon: <img src={IMAGE.club} alt="Clubs" />,
        },
        {
            title: 'Total Donations',
            value: 0,
            icon: <img src={IMAGE.donation} alt="Donations" />,
        },
    ];

    return (
        <div>
            <div className="flex border border-gray-300 shadow-xl items-center  justify-between bg-gradient-to-tr from-[#F6F6F6] via-white to-[var(--bg-blue-high)]/70 p-12 rounded-xl">
                {cardData.map((card, index) => (
                    <div key={index}>
                        <div
                            className={`flex ${index !== 2 ? 'border-r border-gray-200' : ''
                                } px-12 items-center justify-center gap-3`}
                        >
                            <div className="w-28 h-28 flex items-center justify-center">
                                {card.icon}
                            </div>
                            <div className="flex items-start flex-col justify-center ">
                                <h1 className="text-3xl !font-semibold leadingflex items-center justify-center -4">
                                    {card.title}
                                </h1>
                                <h1 className="text-3xl mt-3 !font-semibold leading-4 text-[var(--bg-blue-high)]">
                                    {card.value}
                                </h1>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="w-full mt-4 h-full">
                <DonationsGrowth />
            </div>
            <div className="mt-4">
                <RecentlyDonations />
            </div>
        </div>
    );
}

export default DashboardHome;
