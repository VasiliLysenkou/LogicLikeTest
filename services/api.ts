// API service for fetching courses data
export interface Course {
  name: string;
  id: string;
  image: string;
  bgColor: string;
  tags: string[];
}

const API_URL = "https://logiclike.com/docs/courses.json";

export const fetchCourses = async (): Promise<Course[]> => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data: Course[] = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching courses:", error);
    return [];
  }
};

// Extract unique tags from courses
export const extractUniqueTags = (courses: Course[]): string[] => {
  const tagsSet = new Set<string>();

  courses.forEach((course) => {
    course.tags.forEach((tag) => tagsSet.add(tag));
  });

  return Array.from(tagsSet).sort();
};

// Filter courses by tag
export const filterCoursesByTag = (
  courses: Course[],
  tag: string | null
): Course[] => {
  if (!tag) return courses;
  return courses.filter((course) => course.tags.includes(tag));
};
