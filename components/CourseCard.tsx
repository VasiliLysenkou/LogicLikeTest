import { Course } from "@/services/api";
import { Image } from "expo-image";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface CourseCardProps {
  course: Course;
}

const CARD_WIDTH = 210;
const CARD_HEIGHT = 220;

export const CourseCard: React.FC<CourseCardProps> = React.memo(({ course }) => {
  return (
    <View style={[styles.container, { backgroundColor: course.bgColor }]}>
      <Image
        source={{ uri: course.image }}
        style={styles.image}
        contentFit="contain"
      />
      <View style={styles.nameContainer}>
        <Text style={styles.name}>{course.name}</Text>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: 16,
    marginRight: 16,
    overflow: "hidden",
    justifyContent: "space-between",
  },
  image: {
    width: "100%",
    height: 150,
    alignSelf: "center",
  },
  nameContainer: {
    backgroundColor: "white",
    padding: 12,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
});
