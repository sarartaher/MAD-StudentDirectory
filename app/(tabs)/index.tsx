
import { useState } from "react";
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import StudentItem from "@/components/student-item";
import SearchBar from "@/components/search-bar";
import StudentDetail from "@/components/student-detail";
import AddStudentForm from "@/components/add-student-form";
import { Student, STUDENTS } from "@/data/students";

export default function HomeScreen() {
  const [query, setQuery] = useState<string>("");

  // Keep the student list in state so new students can be added
  const [students, setStudents] = useState<Student[]>(STUDENTS);

  const [selectedStudent, setSelectedStudent] =
    useState<Student | null>(null);

  const [showForm, setShowForm] = useState(false);

  // Select or deselect a student
  const handleSelect = (student: Student) => {
    setSelectedStudent((previous) =>
      previous?.id === student.id ? null : student
    );
  };

  // Receive a new student from AddStudentForm
  const handleNewStudent = (newStudent: Student) => {
    setStudents((previous) => [newStudent, ...previous]);
    setSelectedStudent(null);
    setQuery("");
    setShowForm(false);
  };

  // Show the Add Student form
  if (showForm) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.formTitleBar}>
          <Pressable onPress={() => setShowForm(false)}>
            <Text style={styles.backButton}>‹ Back</Text>
          </Pressable>

          <Text style={styles.title}>Add Student</Text>

          <View style={styles.headerSpacer} />
        </View>

        <AddStudentForm onSubmitSuccess={handleNewStudent} />
      </SafeAreaView>
    );
  }

  // Filter the current student state
  const searchText = query.toLowerCase().trim();

  const filtered = students.filter((student) => {
    return (
      student.name.toLowerCase().includes(searchText) ||
      student.department.toLowerCase().includes(searchText) ||
      student.studentId.toLowerCase().includes(searchText)
    );
  });

  return (
    <SafeAreaView style={styles.container}>
      {/* Directory title bar */}
      <View style={styles.titleBar}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Student Directory</Text>
          <Text style={styles.count}>
            {students.length} students
          </Text>
        </View>

        <Pressable
          style={styles.addButton}
          onPress={() => {
            setSelectedStudent(null);
            setShowForm(true);
          }}
        >
          <Text style={styles.addButtonText}>+ Add</Text>
        </Pressable>
      </View>

      {/* Search */}
      <SearchBar value={query} onChangeText={setQuery} />

      {/* Student list */}
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <StudentItem
            student={item}
            onPress={() => handleSelect(item)}
            isSelected={selectedStudent?.id === item.id}
          />
        )}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyText}>
              No students match "{query}"
            </Text>
          </View>
        }
      />

      {/* Details for the selected student */}
      {selectedStudent && (
        <StudentDetail student={selectedStudent} />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F4F8",
  },
  titleContainer: {
    flex: 1,
  },
  titleBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: "#0D1F4E",
  },
  formTitleBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: "#0D1F4E",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  count: {
    fontSize: 12,
    color: "#CCFBF1",
    marginTop: 3,
  },
  addButton: {
    backgroundColor: "#0D9488",
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 8,
  },
  addButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
  },
  backButton: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "600",
  },
  headerSpacer: {
    width: 48,
  },
  listContent: {
    paddingBottom: 20,
    flexGrow: 1,
  },
  empty: {
    padding: 40,
    alignItems: "center",
  },
  emptyText: {
    fontSize: 14,
    color: "#94A3B8",
  },
});
