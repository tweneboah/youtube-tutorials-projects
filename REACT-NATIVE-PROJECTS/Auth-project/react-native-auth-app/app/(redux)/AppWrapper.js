import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import { Stack } from "expo-router/stack";
import { loadUser } from "./authSlice";

function AppWrapper() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ title: "Home", headerShown: false }}
      />
      <Stack.Screen name="profile" options={{ title: "Profile" }} />
      <Stack.Screen name="auth/login" options={{ title: "Login" }} />
    </Stack>
  );
}

export default AppWrapper;
