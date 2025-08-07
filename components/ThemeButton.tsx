import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { IconSymbol } from "./ui/IconSymbol";

interface ThemeButtonProps {
  selectedTheme: string | null;
  onPress: () => void;
}

export const ThemeButton: React.FC<ThemeButtonProps> = ({
  selectedTheme,
  onPress,
}) => {
  return (
    <TouchableOpacity style={styles.themeButton} onPress={onPress}>
      <Text style={styles.themeButtonText}>{selectedTheme || "Все темы"}</Text>
      <View style={styles.themeButtonIconWrapper}>
        <IconSymbol name="chevron.down" color="white" size={16} weight="bold" />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  themeButton: {
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    padding: 8,
    paddingLeft: 12,
    paddingVertical: 8,
    gap: 6,
    borderRadius: 20,
    alignSelf: "center",
    marginVertical: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  themeButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  themeButtonIconWrapper: {
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    borderRadius: 20,
    padding: 4,
  },
});
