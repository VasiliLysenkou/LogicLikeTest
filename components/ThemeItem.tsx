import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

interface ThemeItemProps {
  theme: string;
  isSelected: boolean;
  onSelect: (theme: string | null) => void;
}

export const ThemeItem: React.FC<ThemeItemProps> = ({
  theme,
  isSelected,
  onSelect,
}) => {
  const isAllThemes = theme === "Все темы";

  return (
    <TouchableOpacity
      style={[styles.themeItem, isSelected ? styles.selectedTheme : null]}
      onPress={() => onSelect(isAllThemes ? null : theme)}
    >
      <Text
        style={[styles.themeText, isSelected ? styles.selectedThemeText : null]}
      >
        {theme}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  themeItem: {
    paddingVertical: 9,
    paddingHorizontal: 20,
    marginBottom: 8,
    borderRadius: 12,
    borderColor: "#C5D0E6",
    borderWidth: 2,
    width: "100%",
  },
  selectedTheme: {
    backgroundColor: "#4CAF50",
  },
  themeText: {
    fontSize: 16,
    textAlign: "left",
    fontWeight: "600",
  },
  selectedThemeText: {
    color: "white",
    fontWeight: "600",
  },
});
