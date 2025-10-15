import Clubtable from "../../Components/ui/tables/Clubtable"
import { PageContent, PageLayout } from "../../Layout/PageLayOut"

function ClubManagement() {
  return (
    <PageLayout
      title="Clubs Management"
    >
      <PageContent>
        <Clubtable />
      </PageContent>
    </PageLayout>
  )
}

export default ClubManagement