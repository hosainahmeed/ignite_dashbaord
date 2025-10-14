import TransactionTable from "../../Components/ui/tables/TransactionTable";
import { PageContent, PageLayout } from "../../Layout/PageLayOut";
function TransactionManage() {
    return (
        <PageLayout
            title="Earnings"
        >
            <PageContent>
                <TransactionTable />
            </PageContent>
        </PageLayout>
    );
}

export default TransactionManage;
