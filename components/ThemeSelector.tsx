import React from "react";
import {
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface ThemeSelectorProps {
  visible: boolean;
  onClose: () => void;
  themes: string[];
  selectedTheme: string | null;
  onSelectTheme: (theme: string | null) => void;
}

export const ThemeSelector: React.FC<ThemeSelectorProps> = ({
  visible,
  onClose,
  themes,
  selectedTheme,
  onSelectTheme,
}) => {
  const handleSelectTheme = (theme: string | null) => {
    onSelectTheme(theme);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Выбор темы</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>
          </View>

          <FlatList
            data={["Все темы", ...themes]}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.themeItem,
                  (item === "Все темы" && selectedTheme === null) ||
                  item === selectedTheme
                    ? styles.selectedTheme
                    : null,
                ]}
                onPress={() =>
                  handleSelectTheme(item === "Все темы" ? null : item)
                }
              >
                <Text
                  style={[
                    styles.themeText,
                    (item === "Все темы" && selectedTheme === null) ||
                    item === selectedTheme
                      ? styles.selectedThemeText
                      : null,
                  ]}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            )}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    maxHeight: "80%",
    backgroundColor: "white",
    borderRadius: 16,
    padding: 16,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  closeButton: {
    padding: 8,
  },
  closeButtonText: {
    fontSize: 16,
    fontWeight: "600",
  },
  themeItem: {
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginBottom: 8,
    backgroundColor: "#f5f5f5",
  },
  selectedTheme: {
    backgroundColor: "#4CAF50",
  },
  themeText: {
    fontSize: 16,
    textAlign: "center",
  },
  selectedThemeText: {
    color: "white",
    fontWeight: "600",
  },
});
