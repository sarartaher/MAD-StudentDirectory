import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
} from "react-native";
import { router } from "expo-router";
import { useStudents } from "../context/students-context";

import FormField from "./form-field";
import { Student } from "../data/students";

interface FormData {
  name: string;
  studentId: string;
  department: string;
  bio: string;
  skillsText: string;
}

interface FormErrors {
  name?: string;
  studentId?: string;
  department?: string;
  bio?: string;
}

// Validate form data
function validateForm(data: FormData): FormErrors {
  const newErrors: FormErrors = {};

  if (!data.name.trim()) {
    newErrors.name = "Full name is required.";
  }

  if (!data.studentId.trim()) {
    newErrors.studentId = "Student ID is required.";
  }

  if (!data.department.trim()) {
    newErrors.department = "Department is required.";
  }

  if (!data.bio.trim()) {
    newErrors.bio = "Bio is required.";
  }

  return newErrors;
}

export default function AddStudentForm() {
  const { dispatch } = useStudents();
  // Form state
  const [formData, setFormData] = useState<FormData>({
    name: "",
    studentId: "",
    department: "",
    bio: "",
    skillsText: "",
  });

  // Validation state
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [submitAttempted, setSubmitAttempted] = useState(false);

  // Submission state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitTrigger, setSubmitTrigger] = useState(false);

  // Update a field
  const updateField = (field: keyof FormData, value: string) => {
    setFormData((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  // Mark a field as touched
  const markTouched = (field: string) => {
    setTouched((previous) => ({
      ...previous,
      [field]: true,
    }));
  };

  // Show errors after blur or a submit attempt
  const getFieldError = (field: keyof FormErrors) => {
    return touched[field] || submitAttempted ? errors[field] : undefined;
  };

  // Validate whenever form data changes
  useEffect(() => {
    setErrors(validateForm(formData));
  }, [formData]);

  // Check whether all required fields are valid
  const isFormValid =
    formData.name.trim().length > 0 &&
    formData.studentId.trim().length > 0 &&
    formData.department.trim().length > 0 &&
    formData.bio.trim().length > 0 &&
    Object.keys(errors).length === 0;

  // Handle Submit button press
  const handleSubmitPress = () => {
    setSubmitAttempted(true);

    const validationErrors = validateForm(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);
    setSubmitTrigger(true);
  };

  // Submit effect: simulate a network request
  useEffect(() => {
    if (!submitTrigger) return;

    const timeoutId = setTimeout(() => {
      const newStudent: Student = {
        id: Date.now().toString(),
        name: formData.name.trim(),
        studentId: formData.studentId.trim(),
        department: formData.department.trim(),
        bio: formData.bio.trim(),
        skills: formData.skillsText
          .split(",")
          .map((skill) => skill.trim())
          .filter((skill) => skill.length > 0),
        avatarUrl: "https://i.pravatar.cc/150?u=" + Date.now(),
      };

      setIsSubmitting(false);
      setSubmitTrigger(false);

      dispatch({ type: "ADD_STUDENT", payload: newStudent });
      router.back();

      // Reset form after successful submission
      setFormData({
        name: "",
        studentId: "",
        department: "",
        bio: "",
        skillsText: "",
      });

      setErrors({});
      setTouched({});
      setSubmitAttempted(false);
    }, 1500);

    // Clean up the timeout if the component unmounts
    return () => {
      clearTimeout(timeoutId);
    };
  }, [submitTrigger]);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.heading}>Add New Student</Text>

      <Text style={styles.description}>
        Enter the student's information to add them to the directory.
      </Text>

      <FormField
        label="Full Name"
        value={formData.name}
        onChangeText={(text) => updateField("name", text)}
        onBlur={() => markTouched("name")}
        placeholder="Enter full name"
        error={getFieldError("name")}
      />

      <FormField
        label="Student ID"
        value={formData.studentId}
        onChangeText={(text) => updateField("studentId", text)}
        onBlur={() => markTouched("studentId")}
        placeholder="Enter student ID"
        autoCapitalize="characters"
        error={getFieldError("studentId")}
      />

      <FormField
        label="Department"
        value={formData.department}
        onChangeText={(text) => updateField("department", text)}
        onBlur={() => markTouched("department")}
        placeholder="e.g. Computer Science"
        error={getFieldError("department")}
      />

      <FormField
        label="Bio"
        value={formData.bio}
        onChangeText={(text) => updateField("bio", text)}
        onBlur={() => markTouched("bio")}
        placeholder="Write a short bio"
        multiline
        error={getFieldError("bio")}
      />

      <FormField
        label="Skills (optional)"
        value={formData.skillsText}
        onChangeText={(text) => updateField("skillsText", text)}
        onBlur={() => markTouched("skillsText")}
        placeholder="e.g. React Native, JavaScript, Python"
      />

      <Text style={styles.helperText}>Separate skills with commas.</Text>

      {/* Submit Button */}
      <Pressable
        style={[styles.button, !isFormValid && styles.buttonDisabled]}
        onPress={handleSubmitPress}
        disabled={!isFormValid || isSubmitting}
      >
        {isSubmitting ? (
          <ActivityIndicator color="#FFFFFF" />
        ) : (
          <Text style={styles.buttonText}>Join Directory</Text>
        )}
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
    paddingBottom: 32,
  },
  heading: {
    fontSize: 22,
    fontWeight: "700",
    color: "#0F172A",
    marginBottom: 6,
  },
  description: {
    fontSize: 13,
    color: "#64748B",
    marginBottom: 24,
    lineHeight: 19,
  },
  helperText: {
    fontSize: 11,
    color: "#64748B",
    marginTop: -10,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#0D9488",
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 8,
    marginBottom: 32,
  },
  buttonDisabled: {
    backgroundColor: "#CBD5E1",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
  },
});
