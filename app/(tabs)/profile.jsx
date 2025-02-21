import ProfileView from "../components/views/Profile"
import { withoutAuthRedirect } from "../middleware/authMiddleware"

const ProfilePage = () => {
  return (
    <ProfileView />
  )
}

export default withoutAuthRedirect(ProfilePage)