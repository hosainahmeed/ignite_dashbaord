import { Button } from 'antd';
import { Link } from 'react-router-dom';
import DonationTable from '../../Components/ui/tables/DonationTable';

function RecentlyDonations() {
    return (
        <div>
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-black">
                    Recently Donations
                </h1>
                <Link to={'/donations-management'}>
                    <Button className='!bg-[var(--bg-red-high)] !text-[var(--color-white)]'>View All</Button>
                </Link>
            </div>
            <DonationTable recentUser={true} />
        </div>
    );
}

export default RecentlyDonations;
