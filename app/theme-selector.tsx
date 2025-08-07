import { ThemeItem } from "@/components/ThemeItem";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function ThemeSelectorScreen() {
  const router = useRouter();
  const { themes: themesParam, selectedTheme: selectedThemeParam } =
    useLocalSearchParams();

  // Parse themes from URL params
  const themes = themesParam
    ? (JSON.parse(decodeURIComponent(themesParam as string)) as string[])
    : [];
  const selectedTheme = selectedThemeParam as string | undefined;

  const handleSelectTheme = (theme: string | null) => {
    // Navigate back to index with the selected theme
    if (theme) {
      router.replace({
        pathname: "/",
        params: { selectedTheme: theme },
      });
    } else {
      router.replace("/");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Выбор темы</Text>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.closeButton}
        >
          <IconSymbol name="xmark" size={22} color="#A3B3D0" weight="bold" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={["Все темы", ...themes]}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <ThemeItem
            theme={item}
            isSelected={
              (item === "Все темы" && !selectedTheme) || item === selectedTheme
            }
            onSelect={handleSelectTheme}
          />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
    padding: 24,
    paddingBottom: 0,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  closeButton: {
    position: "absolute",
    right: 24,
    top: 24,
  },
  listContent: {
    paddingBottom: 20,
    marginHorizontal: 20,
  },
});
