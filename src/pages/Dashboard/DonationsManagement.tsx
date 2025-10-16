import DonationTable from "../../Components/ui/tables/DonationTable"
import { PageContent, PageLayout } from "../../Layout/PageLayOut"

function DonationsManagement () {
  return (
    <PageLayout
      title="Donations Management"
    >
      <PageContent>
        <DonationTable />
      </PageContent>
    </PageLayout>
  )
}

export default DonationsManagement 