// This file would normally contain API calls to your backend
// For now, we'll use mock data

// Types
export interface Student {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  grade: string;
  status: "active" | "inactive" | "pending";
  enrollmentDate: string;
  parentName: string;
  parentEmail: string;
  parentPhone: string;
  address: string;
}

export interface ClassSession {
  id: string;
  subject: string;
  teacher: string;
  room: string;
  startTime: string;
  endTime: string;
  day: number; // 0-6 for Sunday-Saturday
  color: string;
  notes?: string;
}

export interface AttendanceRecord {
  id: string;
  date: string;
  class: string;
  students: {
    id: string;
    name: string;
    grade: string;
    status?: "present" | "absent" | "late" | "excused";
    notes?: string;
  }[];
  submitted: boolean;
}

export interface Course {
  id: string;
  name: string;
  teacher: string;
  progress: number;
  nextAssignment?: string;
  nextAssignmentDue?: string;
}

export interface GradeEntry {
  id: string;
  studentId: string;
  courseId: string;
  assignmentId: string;
  score: number;
  maxScore: number;
  feedback?: string;
  date: string;
}

export interface Assessment {
  id: string;
  title: string;
  type: string;
  dueDate: string;
  totalPoints: number;
  status: "draft" | "published" | "closed";
}

// Mock data functions
export const fetchStudents = async (): Promise<Student[]> => {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 500));

  return [
    {
      id: "1001",
      firstName: "Emma",
      lastName: "Johnson",
      email: "emma.j@example.com",
      grade: "10th",
      status: "active",
      enrollmentDate: "2023-09-01",
      parentName: "Michael Johnson",
      parentEmail: "michael.j@example.com",
      parentPhone: "(555) 123-4567",
      address: "123 Main St, Anytown, AN 12345",
    },
    {
      id: "1002",
      firstName: "Noah",
      lastName: "Williams",
      email: "noah.w@example.com",
      grade: "9th",
      status: "active",
      enrollmentDate: "2023-09-01",
      parentName: "Sarah Williams",
      parentEmail: "sarah.w@example.com",
      parentPhone: "(555) 234-5678",
      address: "456 Oak Ave, Anytown, AN 12345",
    },
    {
      id: "1003",
      firstName: "Olivia",
      lastName: "Brown",
      email: "olivia.b@example.com",
      grade: "11th",
      status: "inactive",
      enrollmentDate: "2022-09-01",
      parentName: "David Brown",
      parentEmail: "david.b@example.com",
      parentPhone: "(555) 345-6789",
      address: "789 Pine Rd, Anytown, AN 12345",
    },
    {
      id: "1004",
      firstName: "Liam",
      lastName: "Davis",
      email: "liam.d@example.com",
      grade: "12th",
      status: "active",
      enrollmentDate: "2020-09-01",
      parentName: "Jennifer Davis",
      parentEmail: "jennifer.d@example.com",
      parentPhone: "(555) 456-7890",
      address: "101 Maple Dr, Anytown, AN 12345",
    },
    {
      id: "1005",
      firstName: "Ava",
      lastName: "Miller",
      email: "ava.m@example.com",
      grade: "10th",
      status: "pending",
      enrollmentDate: "2023-08-15",
      parentName: "Robert Miller",
      parentEmail: "robert.m@example.com",
      parentPhone: "(555) 567-8901",
      address: "202 Cedar Ln, Anytown, AN 12345",
    },
  ];
};

export const fetchSchedule = async (): Promise<ClassSession[]> => {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 500));

  return [
    {
      id: "1",
      subject: "Mathematics",
      teacher: "Prof. Johnson",
      room: "Room 101",
      startTime: "08:00",
      endTime: "09:30",
      day: 1, // Monday
      color: "bg-blue-100 border-blue-300",
    },
    {
      id: "2",
      subject: "Physics",
      teacher: "Dr. Smith",
      room: "Lab 3",
      startTime: "10:00",
      endTime: "11:30",
      day: 1, // Monday
      color: "bg-green-100 border-green-300",
    },
    {
      id: "3",
      subject: "Literature",
      teacher: "Mrs. Davis",
      room: "Room 205",
      startTime: "13:00",
      endTime: "14:30",
      day: 2, // Tuesday
      color: "bg-purple-100 border-purple-300",
    },
    {
      id: "4",
      subject: "History",
      teacher: "Mr. Wilson",
      room: "Room 108",
      startTime: "09:00",
      endTime: "10:30",
      day: 3, // Wednesday
      color: "bg-yellow-100 border-yellow-300",
    },
    {
      id: "5",
      subject: "Chemistry",
      teacher: "Dr. Martinez",
      room: "Lab 2",
      startTime: "14:00",
      endTime: "15:30",
      day: 4, // Thursday
      color: "bg-red-100 border-red-300",
      notes: "Bring lab coat and safety goggles",
    },
    {
      id: "6",
      subject: "Physical Education",
      teacher: "Coach Brown",
      room: "Gymnasium",
      startTime: "15:00",
      endTime: "16:30",
      day: 5, // Friday
      color: "bg-orange-100 border-orange-300",
    },
  ];
};

export const fetchAttendanceRecords = async (): Promise<AttendanceRecord[]> => {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 500));

  return [
    {
      id: "1",
      date: "2023-11-10",
      class: "Mathematics - 10A",
      students: [
        { id: "1", name: "Emma Thompson", grade: "10A", status: "present" },
        {
          id: "2",
          name: "Noah Williams",
          grade: "10A",
          status: "absent",
          notes: "Doctor's appointment",
        },
        { id: "3", name: "Olivia Martinez", grade: "10A", status: "present" },
        {
          id: "4",
          name: "Liam Johnson",
          grade: "10A",
          status: "late",
          notes: "15 minutes late",
        },
        { id: "5", name: "Ava Brown", grade: "10A", status: "present" },
      ],
      submitted: true,
    },
    {
      id: "2",
      date: "2023-11-09",
      class: "Physics - 10A",
      students: [
        { id: "1", name: "Emma Thompson", grade: "10A", status: "present" },
        { id: "2", name: "Noah Williams", grade: "10A", status: "present" },
        {
          id: "3",
          name: "Olivia Martinez",
          grade: "10A",
          status: "excused",
          notes: "Family emergency",
        },
        { id: "4", name: "Liam Johnson", grade: "10A", status: "present" },
        { id: "5", name: "Ava Brown", grade: "10A", status: "present" },
      ],
      submitted: true,
    },
  ];
};

export const fetchCourses = async (): Promise<Course[]> => {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 500));

  return [
    {
      id: "1",
      name: "Mathematics",
      teacher: "Prof. Johnson",
      progress: 75,
      nextAssignment: "Algebra Quiz",
      nextAssignmentDue: "Tomorrow",
    },
    {
      id: "2",
      name: "Physics",
      teacher: "Dr. Smith",
      progress: 60,
      nextAssignment: "Lab Report",
      nextAssignmentDue: "Friday",
    },
    {
      id: "3",
      name: "Literature",
      teacher: "Mrs. Davis",
      progress: 90,
      nextAssignment: "Essay Submission",
      nextAssignmentDue: "Next Monday",
    },
    {
      id: "4",
      name: "History",
      teacher: "Mr. Wilson",
      progress: 45,
      nextAssignment: "Research Paper",
      nextAssignmentDue: "In 2 weeks",
    },
  ];
};

export const fetchAssessments = async (): Promise<Assessment[]> => {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 500));

  return [
    {
      id: "1",
      title: "Midterm Exam",
      type: "Exam",
      dueDate: "2023-10-15",
      totalPoints: 100,
      status: "closed",
    },
    {
      id: "2",
      title: "Research Paper",
      type: "Assignment",
      dueDate: "2023-11-05",
      totalPoints: 50,
      status: "published",
    },
    {
      id: "3",
      title: "Group Project",
      type: "Project",
      dueDate: "2023-11-20",
      totalPoints: 75,
      status: "published",
    },
    {
      id: "4",
      title: "Final Exam",
      type: "Exam",
      dueDate: "2023-12-10",
      totalPoints: 100,
      status: "draft",
    },
    {
      id: "5",
      title: "Weekly Quiz 5",
      type: "Quiz",
      dueDate: "2023-10-28",
      totalPoints: 20,
      status: "published",
    },
  ];
};

// API functions for creating/updating data
export const submitAttendance = async (
  classId: string,
  attendance: any,
): Promise<boolean> => {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 500));
  console.log("Submitting attendance:", { classId, attendance });
  return true;
};

export const submitGrade = async (
  studentId: string,
  assignmentId: string,
  grade: number,
  feedback?: string,
): Promise<boolean> => {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 500));
  console.log("Submitting grade:", {
    studentId,
    assignmentId,
    grade,
    feedback,
  });
  return true;
};

export const createAssessment = async (
  assessment: Omit<Assessment, "id">,
): Promise<Assessment> => {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 500));
  console.log("Creating assessment:", assessment);
  return {
    ...assessment,
    id: `new-${Date.now()}`,
  };
};
