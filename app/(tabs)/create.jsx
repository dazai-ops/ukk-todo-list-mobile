import CreateTaskView from "../components/views/Create"
import { withoutAuthRedirect } from "../middleware/authMiddleware"

const CreateTaskPage = () => {
  return(
      <CreateTaskView />  
  )
}

export default withoutAuthRedirect(CreateTaskPage)