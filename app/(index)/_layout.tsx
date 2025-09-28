
import React from "react";
import { useNetworkState } from "expo-network";
import { Stack } from "expo-router";
import { WidgetProvider } from "@/contexts/WidgetContext";

export default function AppIndexLayout() {
  const networkState = useNetworkState();

  return (
    <WidgetProvider>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: '#FFFFFF',
          },
          headerTintColor: '#333333',
          headerTitleStyle: {
            fontWeight: '600',
          },
          headerShadowVisible: true,
        }}
      >
        <Stack.Screen 
          name="index" 
          options={{
            title: "Dashboard",
          }}
        />
      </Stack>
    </WidgetProvider>
  );
}
