import { withAuthRedirect } from "./middleware/authMiddleware"
import RegisterView from "@/app/components/views/Authentication/Register/index"

const RegisterPage = () => {
  return(
    <RegisterView/>
  )
}

export default withAuthRedirect(RegisterPage)
