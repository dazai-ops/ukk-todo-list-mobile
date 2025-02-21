import IntroView from "./components/views/Intro"
import { withAuthRedirect } from "./middleware/authMiddleware"

const IntroPage = () => {
  return(
    <IntroView/>
  )
}

export default withAuthRedirect(IntroPage)