import UserTable from '../../Components/ui/tables/DonationTable';
import { PageContent, PageLayout } from '../../Layout/PageLayOut';

function UserPageForAll() {
    return (
        <div>
            <PageLayout
                title='User Management'
            >
                <PageContent>
                    <UserTable recentUser={false} />
                </PageContent>
            </PageLayout>
        </div>
    );
}

export default UserPageForAll;
