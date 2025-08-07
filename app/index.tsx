import { useFocusEffect } from "@react-navigation/native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { useSafeAreaInsets } from "react-native-safe-area-context";

import { CourseCard } from "@/components/CourseCard";
import { ThemeButton } from "@/components/ThemeButton";
import {
  Course,
  extractUniqueTags,
  fetchCourses,
  filterCoursesByTag,
} from "@/services/api";

export default function CoursesScreen() {
  const insets = useSafeAreaInsets();

  const router = useRouter();
  const { selectedTheme: selectedThemeParam } = useLocalSearchParams();

  const [courses, setCourses] = useState<Course[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [themes, setThemes] = useState<string[]>([]);
  const [selectedTheme, setSelectedTheme] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load courses data
  const loadCourses = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const coursesData = await fetchCourses();
      if (coursesData.length === 0) {
        setError("No courses found");
        return;
      }

      setCourses(coursesData);
      setFilteredCourses(coursesData);

      // Extract unique themes/tags
      const uniqueTags = extractUniqueTags(coursesData);
      setThemes(uniqueTags);
    } catch (err) {
      setError("Failed to load courses");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Load courses on initial render
  useFocusEffect(
    useCallback(() => {
      loadCourses();
    }, [loadCourses])
  );

  // Update selected theme from URL params
  useEffect(() => {
    if (selectedThemeParam) {
      setSelectedTheme(selectedThemeParam as string);
    }
  }, [selectedThemeParam]);

  // Filter courses when theme changes - using useMemo to avoid unnecessary filtering
  useMemo(() => {
    if (courses.length > 0) {
      const filtered = filterCoursesByTag(courses, selectedTheme);
      setFilteredCourses(filtered);
    }
  }, [selectedTheme, courses]);

  // Navigate to theme selector screen - memoized to prevent recreation on re-renders
  const navigateToThemeSelector = useCallback(() => {
    router.push({
      pathname: "/theme-selector",
      params: {
        themes: encodeURIComponent(JSON.stringify(themes)),
        selectedTheme: selectedTheme || undefined,
      },
    });
  }, [router, themes, selectedTheme]);

  // Memoized keyExtractor to prevent recreation on each render
  const keyExtractor = useCallback((item: Course) => item.id, []);

  // Memoized renderItem function to prevent recreation on each render
  const renderItem = useCallback(
    ({ item }: { item: Course }) => <CourseCard course={item} />,
    []
  );

  // Memoized container style with insets
  const containerStyle = useMemo(
    () => [styles.container, { paddingTop: insets.top }],
    [insets.top]
  );

  // Memoized center container style with insets
  const centerContainerStyle = useMemo(
    () => [styles.centerContainer, { paddingTop: insets.top }],
    [insets.top]
  );

  if (loading) {
    return (
      <View style={centerContainerStyle}>
        <ActivityIndicator size="large" color="#6200ee" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={centerContainerStyle}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={loadCourses}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={containerStyle}>
      <StatusBar style="auto" />

      {/* Theme selector button */}
      <ThemeButton
        selectedTheme={selectedTheme}
        onPress={navigateToThemeSelector}
      />

      {/* Courses list */}
      <FlatList
        data={filteredCourses}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.coursesList}
        removeClippedSubviews={true}
        maxToRenderPerBatch={10}
        windowSize={5}
        initialNumToRender={5}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#6a3de8",
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#6a3de8",
  },
  coursesList: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  errorText: {
    color: "white",
    fontSize: 16,
    marginBottom: 16,
  },
  retryButton: {
    backgroundColor: "white",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  retryButtonText: {
    color: "#6a3de8",
    fontWeight: "600",
  },
});
