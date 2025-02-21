import { useRouter } from "expo-router";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";

const checkAuth = async () => {
  const storage = Platform.OS === "web" ? window.localStorage : AsyncStorage;
  const user = await storage.getItem("user");
  return !!user;
};

const withAuthRedirect = (WrappedComponent) => {
  const ComponentWithAuthRedirect = (props) => {
    const router = useRouter();

    useEffect(() => {
      const redirectIfLoggedIn = async () => {
        if (await checkAuth()) {
          router.replace("/dashboard");
        }
      };

      redirectIfLoggedIn();
    }, []);

    return <WrappedComponent {...props} />;
  };

  return ComponentWithAuthRedirect;
};

const withoutAuthRedirect = (WrappedComponent) => {
  const ComponentWithoutAuthRedirect = (props) => {
    const router = useRouter();

    useEffect(() => {
      const redirectIfNotLoggedIn = async () => {
        if (!(await checkAuth())) {
          router.replace("/login");
        }
      };

      redirectIfNotLoggedIn();
    }, []);

    return <WrappedComponent {...props} />;
  };

  return ComponentWithoutAuthRedirect;
};

export { withAuthRedirect, withoutAuthRedirect };
