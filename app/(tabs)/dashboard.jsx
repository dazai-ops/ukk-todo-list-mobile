import DashboardView from "../components/views/Dashboard/index"
import { withoutAuthRedirect } from "../middleware/authMiddleware"

const DashboardPage = () => {
  return(
    <DashboardView/>
  )
}

export default withoutAuthRedirect(DashboardPage)