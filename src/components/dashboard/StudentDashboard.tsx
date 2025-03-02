import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Bell, BookOpen, Calendar, FileText, BarChart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DashboardSidebar from "./DashboardSidebar";
import DashboardHeader from "./DashboardHeader";
import ScheduleView from "../schedule/ScheduleView";

interface Course {
  id: string;
  name: string;
  teacher: string;
  progress: number;
  nextAssignment?: string;
  nextAssignmentDue?: string;
}

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
}

interface StudentDashboardProps {
  studentName?: string;
  studentAvatar?: string;
  courses?: Course[];
  notifications?: Notification[];
  upcomingAssignments?: {
    title: string;
    course: string;
    dueDate: string;
  }[];
}

const StudentDashboard: React.FC<StudentDashboardProps> = ({
  studentName = "Alex Johnson",
  studentAvatar = "",
  courses = [
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
  ],
  notifications = [
    {
      id: "1",
      title: "New Grade Posted",
      message: "Your Physics quiz has been graded.",
      time: "10 minutes ago",
      read: false,
    },
    {
      id: "2",
      title: "Assignment Reminder",
      message: "Literature essay due tomorrow.",
      time: "1 hour ago",
      read: false,
    },
    {
      id: "3",
      title: "School Announcement",
      message: "Parent-teacher meetings scheduled for next week.",
      time: "Yesterday",
      read: true,
    },
  ],
  upcomingAssignments = [
    {
      title: "Algebra Quiz",
      course: "Mathematics",
      dueDate: "Tomorrow",
    },
    {
      title: "Lab Report",
      course: "Physics",
      dueDate: "Friday",
    },
    {
      title: "Essay Submission",
      course: "Literature",
      dueDate: "Next Monday",
    },
    {
      title: "Research Paper",
      course: "History",
      dueDate: "In 2 weeks",
    },
  ],
}) => {
  const [activeTab, setActiveTab] = useState("overview");
  const unreadNotifications = notifications.filter((n) => !n.read).length;

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <DashboardSidebar
        userType="student"
        userName={studentName}
        userAvatar={studentAvatar}
        activePath="/dashboard"
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b h-16 flex items-center justify-between px-6">
          <h1 className="text-2xl font-bold">Student Dashboard</h1>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                {unreadNotifications > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {unreadNotifications}
                  </span>
                )}
              </Button>
            </div>
            <div className="flex items-center space-x-2">
              <Avatar>
                <AvatarImage src={studentAvatar} alt={studentName} />
                <AvatarFallback>
                  {studentName
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <span className="font-medium">{studentName}</span>
            </div>
          </div>
        </header>

        {/* Main Dashboard Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <Tabs
            defaultValue="overview"
            value={activeTab}
            onValueChange={setActiveTab}
            className="space-y-4"
          >
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="schedule">Schedule</TabsTrigger>
              <TabsTrigger value="courses">Courses</TabsTrigger>
              <TabsTrigger value="grades">Grades</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              {/* Welcome Card */}
              <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-2">
                    Welcome back, {studentName.split(" ")[0]}!
                  </h2>
                  <p className="opacity-90">
                    You have {upcomingAssignments.length} upcoming assignments
                    and {unreadNotifications} new notifications.
                  </p>
                </CardContent>
              </Card>

              {/* Dashboard Widgets */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Upcoming Assignments */}
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-medium flex items-center">
                        <FileText className="h-5 w-5 mr-2 text-blue-500" />
                        Upcoming Assignments
                      </h3>
                      <Link to="/assignments">
                        <Button variant="ghost" size="sm">
                          View All
                        </Button>
                      </Link>
                    </div>
                    <div className="space-y-3">
                      {upcomingAssignments.slice(0, 3).map((assignment, i) => (
                        <div
                          key={i}
                          className="flex justify-between items-center p-3 bg-gray-50 rounded-md"
                        >
                          <div>
                            <p className="font-medium truncate">
                              {assignment.title}
                            </p>
                            <p className="text-sm text-gray-500">
                              {assignment.course}
                            </p>
                          </div>
                          <Badge
                            variant={i === 0 ? "destructive" : "secondary"}
                          >
                            {assignment.dueDate}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Course Progress */}
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-medium flex items-center">
                        <BookOpen className="h-5 w-5 mr-2 text-green-500" />
                        Course Progress
                      </h3>
                      <Link to="/courses">
                        <Button variant="ghost" size="sm">
                          View All
                        </Button>
                      </Link>
                    </div>
                    <div className="space-y-4">
                      {courses.slice(0, 3).map((course) => (
                        <div key={course.id} className="space-y-1">
                          <div className="flex justify-between">
                            <span className="font-medium truncate">
                              {course.name}
                            </span>
                            <span className="text-sm">{course.progress}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-green-500 h-2 rounded-full"
                              style={{ width: `${course.progress}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Notifications */}
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-medium flex items-center">
                        <Bell className="h-5 w-5 mr-2 text-amber-500" />
                        Notifications
                      </h3>
                      <Link to="/notifications">
                        <Button variant="ghost" size="sm">
                          View All
                        </Button>
                      </Link>
                    </div>
                    <div className="space-y-3">
                      {notifications.slice(0, 3).map((notification) => (
                        <div
                          key={notification.id}
                          className={`p-3 rounded-md ${notification.read ? "bg-gray-50" : "bg-blue-50 border-l-4 border-blue-500"}`}
                        >
                          <div className="flex justify-between">
                            <p className="font-medium truncate">
                              {notification.title}
                            </p>
                            <span className="text-xs text-gray-500">
                              {notification.time}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 truncate">
                            {notification.message}
                          </p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Activity & Calendar Row */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Activity */}
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-medium mb-4 flex items-center">
                      <BarChart className="h-5 w-5 mr-2 text-purple-500" />
                      Recent Activity
                    </h3>
                    <div className="space-y-4">
                      <div className="border-l-2 border-blue-500 pl-4 pb-4">
                        <p className="text-sm text-gray-500">Today, 10:30 AM</p>
                        <p className="font-medium">Completed Physics Quiz</p>
                        <p className="text-sm text-gray-600">
                          Score: 85/100 - Great job!
                        </p>
                      </div>
                      <div className="border-l-2 border-green-500 pl-4 pb-4">
                        <p className="text-sm text-gray-500">
                          Yesterday, 3:15 PM
                        </p>
                        <p className="font-medium">
                          Submitted Literature Assignment
                        </p>
                        <p className="text-sm text-gray-600">
                          Waiting for teacher review
                        </p>
                      </div>
                      <div className="border-l-2 border-amber-500 pl-4">
                        <p className="text-sm text-gray-500">
                          Monday, 11:45 AM
                        </p>
                        <p className="font-medium">Joined Math Study Group</p>
                        <p className="text-sm text-gray-600">
                          Next meeting on Friday
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Mini Calendar */}
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-medium mb-4 flex items-center">
                      <Calendar className="h-5 w-5 mr-2 text-indigo-500" />
                      Upcoming Events
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-start space-x-3 p-3 bg-indigo-50 rounded-md">
                        <div className="bg-indigo-100 text-indigo-700 rounded-md p-2 text-center min-w-[50px]">
                          <div className="text-xs font-medium">OCT</div>
                          <div className="text-lg font-bold">15</div>
                        </div>
                        <div>
                          <p className="font-medium">Math Midterm Exam</p>
                          <p className="text-sm text-gray-600">
                            9:00 AM - 11:00 AM, Main Hall
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-md">
                        <div className="bg-green-100 text-green-700 rounded-md p-2 text-center min-w-[50px]">
                          <div className="text-xs font-medium">OCT</div>
                          <div className="text-lg font-bold">18</div>
                        </div>
                        <div>
                          <p className="font-medium">Science Fair</p>
                          <p className="text-sm text-gray-600">
                            1:00 PM - 4:00 PM, School Gymnasium
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3 p-3 bg-amber-50 rounded-md">
                        <div className="bg-amber-100 text-amber-700 rounded-md p-2 text-center min-w-[50px]">
                          <div className="text-xs font-medium">OCT</div>
                          <div className="text-lg font-bold">22</div>
                        </div>
                        <div>
                          <p className="font-medium">Parent-Teacher Meeting</p>
                          <p className="text-sm text-gray-600">
                            5:30 PM - 7:30 PM, Conference Room
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Schedule Tab */}
            <TabsContent value="schedule">
              <ScheduleView />
            </TabsContent>

            {/* Courses Tab */}
            <TabsContent value="courses">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.map((course) => (
                  <Card key={course.id}>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold mb-2">{course.name}</h3>
                      <p className="text-gray-500 mb-4">
                        Teacher: {course.teacher}
                      </p>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Progress</span>
                          <span>{course.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-500 h-2 rounded-full"
                            style={{ width: `${course.progress}%` }}
                          ></div>
                        </div>
                      </div>
                      {course.nextAssignment && (
                        <div className="mt-4 pt-4 border-t">
                          <p className="text-sm font-medium">
                            Next Assignment:
                          </p>
                          <div className="flex justify-between items-center mt-1">
                            <p className="text-sm">{course.nextAssignment}</p>
                            <Badge variant="outline">
                              {course.nextAssignmentDue}
                            </Badge>
                          </div>
                        </div>
                      )}
                      <div className="mt-4 pt-4 border-t flex justify-between">
                        <Button variant="outline" size="sm">
                          Materials
                        </Button>
                        <Button size="sm">Go to Course</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Grades Tab */}
            <TabsContent value="grades">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-6">Current Grades</h3>
                  <div className="space-y-6">
                    {courses.map((course) => (
                      <div key={course.id} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <h4 className="font-medium">{course.name}</h4>
                          <div className="flex items-center space-x-2">
                            <Badge
                              className={`${course.progress >= 90 ? "bg-green-100 text-green-800" : course.progress >= 70 ? "bg-blue-100 text-blue-800" : course.progress >= 60 ? "bg-amber-100 text-amber-800" : "bg-red-100 text-red-800"}`}
                            >
                              {course.progress >= 90
                                ? "A"
                                : course.progress >= 80
                                  ? "B"
                                  : course.progress >= 70
                                    ? "C"
                                    : course.progress >= 60
                                      ? "D"
                                      : "F"}
                            </Badge>
                            <span className="font-medium">
                              {course.progress}%
                            </span>
                          </div>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${course.progress >= 90 ? "bg-green-500" : course.progress >= 70 ? "bg-blue-500" : course.progress >= 60 ? "bg-amber-500" : "bg-red-500"}`}
                            style={{ width: `${course.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 pt-6 border-t">
                    <div className="flex justify-between items-center">
                      <h4 className="font-medium">Overall GPA</h4>
                      <Badge className="bg-green-100 text-green-800">
                        3.5 / 4.0
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      Current Semester: Fall 2023
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default StudentDashboard;
