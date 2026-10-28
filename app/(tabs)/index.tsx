import { router } from "expo-router";
import { useState } from "react";
import {
  FlatList,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import SearchBar from "../../components/search-bar";
import StudentDetail from "../../components/student-detail";
import StudentItem from "../../components/student-item";
import { useStudents } from "../../context/students-context";
import { Student } from "../../data/students";

export default function Index() {
  // Read students directly from the global context
  const { students } = useStudents();

  // These stay as local state — they belong to this screen only
  const [query, setQuery] = useState("");
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  const filtered = students.filter(
    (s) =>
      s.name.toLowerCase().includes(query.toLowerCase()) ||
      s.department.toLowerCase().includes(query.toLowerCase()),
  );

  const handleSelect = (student: Student) => {
    setSelectedStudent((prev) => (prev?.id === student.id ? null : student));
  };

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.titleBar}>
        <Text style={styles.title}>
          Student Directory
          <br />
          Student Count: {students.length}
        </Text>
        {/* Navigate to the AddStudent screen — no prop passing needed */}
        <Pressable
          style={styles.addButton}
          onPress={() => router.push("/(tabs)/add-student")}
        >
          <Text style={styles.addButtonText}>+ Add</Text>
        </Pressable>
      </View>

      <SearchBar value={query} onChangeText={setQuery} />

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <StudentItem
            student={item}
            onPress={handleSelect}
            isSelected={selectedStudent?.id === item.id}
          />
        )}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyText}>No students match "{query}"</Text>
          </View>
        }
      />

      {selectedStudent && <StudentDetail student={selectedStudent} />}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#F0F4F8" },
  titleBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: "#0D1F4E",
  },
  title: { fontSize: 20, fontWeight: "bold", color: "#FFFFFF" },
  addButton: {
    backgroundColor: "#0D9488",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 8,
  },
  addButtonText: { color: "#FFFFFF", fontWeight: "700", fontSize: 13 },
  empty: { padding: 40, alignItems: "center" },
  emptyText: { fontSize: 14, color: "#94A3B8" },
});
