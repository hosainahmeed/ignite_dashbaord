import EventsManagementTable from "../../Components/ui/tables/EventsManagementTable"
import { PageContent, PageLayout } from "../../Layout/PageLayOut"

function EventsManagement() {
  return (
    <PageLayout
      title="Events Management"
    >
      <PageContent>
        <EventsManagementTable />
      </PageContent>
    </PageLayout>
  )
}

export default EventsManagement