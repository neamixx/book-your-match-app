import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Link, Tabs } from "expo-router";
import { Pressable, View } from "react-native";

import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";
import { useClientOnlyValue } from "@/components/useClientOnlyValue";

function TabBarIcon({
  name,
  color,
}: {
  name: React.ComponentProps<typeof Ionicons>["name"];
  color: string;
}) {
  return (
    <View
      style={{ alignItems: "center", justifyContent: "center", paddingTop: 5 }}
    >
      <Ionicons
        size={30}
        style={{ marginBottom: -3 }}
        name={name}
        color={color}
      />
    </View>
  );
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          height: 70,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          backgroundColor: "#fff",
          shadowColor: "#000",
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.05,
          shadowRadius: 10,
          elevation: 10,
        },
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        tabBarInactiveTintColor: "#ccc",
        headerShown: useClientOnlyValue(false, true),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "",
          tabBarIcon: ({ color }) => <TabBarIcon name="person" color={color} />,
          headerRight: () => (
            <Link href="/modal" asChild>
              <Pressable style={{ marginRight: 15 }}>
                {({ pressed }) => (
                  <Ionicons
                    name="information-circle"
                    size={24}
                    color={Colors[colorScheme ?? "light"].text}
                    style={{ opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
      <Tabs.Screen
        name="swap"
        options={{
          title: "",
          tabBarIcon: ({ color }) => <TabBarIcon name="search" color={color} />,
        }}
      />
      <Tabs.Screen
        name="groups"
        options={{
          title: "",
          tabBarIcon: ({ color }) => <TabBarIcon name="people" color={color} />,
        }}
      />
    </Tabs>
  );
}
