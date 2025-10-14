import Organizerstable from "../../Components/ui/tables/Organizerstable"
import { PageContent, PageLayout } from "../../Layout/PageLayOut"

function OrganizersManagement() {
  return (
    <PageLayout
      title="Organizers Management"
    >
      <PageContent>
        <Organizerstable />
      </PageContent>
    </PageLayout>
  )
}

export default OrganizersManagement