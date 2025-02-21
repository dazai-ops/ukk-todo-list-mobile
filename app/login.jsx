import { withAuthRedirect } from "./middleware/authMiddleware"
import LoginView from "./components/views/Authentication/Login"

const LoginPage = () => {
  return(
    <LoginView/>
  )
}

export default withAuthRedirect(LoginPage)