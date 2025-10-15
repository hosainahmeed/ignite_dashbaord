import { FaFileCsv } from 'react-icons/fa';
import NominationsTable from '../../Components/ui/tables/NominationsTable';
import { PageContent, PageLayout } from '../../Layout/PageLayOut';

function NominationsManagement() {
    
    return (
        <div>
            <PageLayout
                title='Nominations Management'
                isButton={
                    {
                        buttonText: "Export CSV",
                        icon: <FaFileCsv />,
                        type: "action",
                        onClick: () => console.log("Export CSV")
                    }
                }
            >
                <PageContent>
                    <NominationsTable />
                </PageContent>
            </PageLayout>
        </div >
    );
}

export default NominationsManagement;
