import { Suspense } from "react";
import { useRoutes, Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/home";
import routes from "tempo-routes";
import StudentDashboard from "./components/dashboard/StudentDashboard";
import TeacherDashboard from "./components/dashboard/TeacherDashboard";
import ParentDashboard from "./components/dashboard/ParentDashboard";
import AdminDashboard from "./components/dashboard/AdminDashboard";
import SchoolCalendar from "./components/calendar/SchoolCalendar";
import MessagingSystem from "./components/communication/MessagingSystem";
import ScheduleView from "./components/schedule/ScheduleView";
import GradeManager from "./components/grades/GradeManager";
import StudentRecordsManager from "./components/admin/StudentRecordsManager";
import ScheduleBuilder from "./components/admin/ScheduleBuilder";
import AttendanceTracker from "./components/attendance/AttendanceTracker";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Suspense fallback={<p>Loading...</p>}>
        <>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Home />} />

            {/* Dashboard routes - protected */}
            <Route
              path="/dashboard"
              element={<Navigate to="/dashboard/student" replace />}
            />
            <Route
              path="/dashboard/student"
              element={
                <ProtectedRoute allowedRoles={["student"]}>
                  <StudentDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/teacher"
              element={
                <ProtectedRoute allowedRoles={["teacher"]}>
                  <TeacherDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/parent"
              element={
                <ProtectedRoute allowedRoles={["parent"]}>
                  <ParentDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/admin"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />

            {/* Feature routes - protected */}
            <Route
              path="/calendar"
              element={
                <ProtectedRoute>
                  <SchoolCalendar />
                </ProtectedRoute>
              }
            />
            <Route
              path="/messages"
              element={
                <ProtectedRoute>
                  <MessagingSystem />
                </ProtectedRoute>
              }
            />
            <Route
              path="/schedule"
              element={
                <ProtectedRoute>
                  <ScheduleView />
                </ProtectedRoute>
              }
            />
            <Route
              path="/grades"
              element={
                <ProtectedRoute>
                  <GradeManager />
                </ProtectedRoute>
              }
            />
            <Route
              path="/attendance"
              element={
                <ProtectedRoute allowedRoles={["teacher", "admin"]}>
                  <AttendanceTracker />
                </ProtectedRoute>
              }
            />

            {/* Admin routes - protected */}
            <Route
              path="/students"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <StudentRecordsManager />
                </ProtectedRoute>
              }
            />
            <Route
              path="/schedule-builder"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <ScheduleBuilder />
                </ProtectedRoute>
              }
            />
            <Route
              path="/teachers"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <StudentRecordsManager />
                </ProtectedRoute>
              }
            />
            <Route
              path="/reports"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />

            {/* Other routes - protected */}
            <Route
              path="/courses"
              element={
                <ProtectedRoute allowedRoles={["student"]}>
                  <ScheduleView />
                </ProtectedRoute>
              }
            />
            <Route
              path="/classes"
              element={
                <ProtectedRoute allowedRoles={["teacher"]}>
                  <ScheduleView />
                </ProtectedRoute>
              }
            />
            <Route
              path="/children"
              element={
                <ProtectedRoute allowedRoles={["parent"]}>
                  <ParentDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/notifications"
              element={
                <ProtectedRoute>
                  <MessagingSystem />
                </ProtectedRoute>
              }
            />
            <Route
              path="/settings"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />

            {/* Catch-all route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
        </>
      </Suspense>
    </AuthProvider>
  );
}

export default App;
