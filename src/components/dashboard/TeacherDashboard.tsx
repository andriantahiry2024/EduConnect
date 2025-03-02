import React, { useState } from "react";
import { Link } from "react-router-dom";
import DashboardSidebar from "./DashboardSidebar";
import ScheduleView from "../schedule/ScheduleView";
import GradeManager from "../grades/GradeManager";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Users,
  BookOpen,
  FileText,
  Bell,
  Calendar,
  MessageSquare,
  Clock,
} from "lucide-react";

interface TeacherDashboardProps {
  teacherName?: string;
  teacherAvatar?: string;
  notifications?: number;
  activePath?: string;
}

const TeacherDashboard: React.FC<TeacherDashboardProps> = ({
  teacherName = "Sarah Johnson",
  teacherAvatar = "https://api.dicebear.com/7.x/avataaars/svg?seed=teacher1",
  notifications = 3,
  activePath = "/dashboard",
}) => {
  const [activeTab, setActiveTab] = useState("overview");

  // Mock data for quick stats
  const quickStats = [
    {
      title: "Classes",
      value: "5",
      icon: <Users className="h-5 w-5 text-blue-500" />,
      color: "bg-blue-50",
    },
    {
      title: "Students",
      value: "127",
      icon: <Users className="h-5 w-5 text-green-500" />,
      color: "bg-green-50",
    },
    {
      title: "Assignments",
      value: "12",
      icon: <BookOpen className="h-5 w-5 text-purple-500" />,
      color: "bg-purple-50",
    },
    {
      title: "Pending Grades",
      value: "8",
      icon: <FileText className="h-5 w-5 text-yellow-500" />,
      color: "bg-yellow-50",
    },
  ];

  // Mock data for upcoming events
  const upcomingEvents = [
    {
      title: "Physics Class - Grade 11A",
      time: "Today, 10:00 AM",
      location: "Room 203",
      icon: <Clock className="h-4 w-4 text-blue-500" />,
    },
    {
      title: "Faculty Meeting",
      time: "Today, 3:30 PM",
      location: "Conference Room",
      icon: <Users className="h-4 w-4 text-green-500" />,
    },
    {
      title: "Chemistry Exam",
      time: "Tomorrow, 9:00 AM",
      location: "Main Hall",
      icon: <FileText className="h-4 w-4 text-red-500" />,
    },
    {
      title: "Parent-Teacher Conference",
      time: "Friday, 4:00 PM",
      location: "Room 101",
      icon: <MessageSquare className="h-4 w-4 text-purple-500" />,
    },
  ];

  // Mock data for recent notifications
  const recentNotifications = [
    {
      title: "Assignment Submitted",
      description: "Emma Thompson submitted Physics Lab Report",
      time: "10 minutes ago",
      read: false,
    },
    {
      title: "Absence Report",
      description: "Noah Williams will be absent tomorrow",
      time: "1 hour ago",
      read: false,
    },
    {
      title: "Grade Update",
      description: "You've updated grades for Chemistry class",
      time: "3 hours ago",
      read: true,
    },
    {
      title: "New Announcement",
      description: "Principal posted a new school announcement",
      time: "Yesterday",
      read: true,
    },
  ];

  // Placeholder component for AttendanceTracker
  const AttendanceTracker = () => (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-2xl font-bold mb-6">Attendance Tracker</h2>
      <p className="text-gray-500">
        This is a placeholder for the Attendance Tracker component. The actual
        component will allow teachers to mark and track student attendance with
        class roster and attendance status options.
      </p>
    </div>
  );

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <DashboardSidebar
        userType="teacher"
        userName={teacherName}
        userAvatar={teacherAvatar}
        activePath={activePath}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b h-16 flex items-center justify-between px-6">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-gray-800">
              Tableau de Bord Enseignant
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm" className="relative">
              <Bell className="h-5 w-5" />
              {notifications > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {notifications}
                </span>
              )}
            </Button>
            <div className="text-sm font-medium">{teacherName}</div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-6">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="mb-6">
              <TabsTrigger value="overview">Aperçu</TabsTrigger>
              <TabsTrigger value="schedule">Emploi du temps</TabsTrigger>
              <TabsTrigger value="attendance">Présences</TabsTrigger>
              <TabsTrigger value="grades">Notes</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              {/* Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {quickStats.map((stat, index) => (
                  <Card key={index} className={`${stat.color}`}>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-sm font-medium text-gray-500">
                            {stat.title === "Classes"
                              ? "Classes"
                              : stat.title === "Students"
                                ? "Élèves"
                                : stat.title === "Assignments"
                                  ? "Devoirs"
                                  : stat.title === "Pending Grades"
                                    ? "Notes en attente"
                                    : stat.title}
                          </p>
                          <p className="text-3xl font-bold mt-1">
                            {stat.value}
                          </p>
                        </div>
                        <div className="p-3 rounded-full bg-white">
                          {stat.icon}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Two Column Layout for Events and Notifications */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Upcoming Events */}
                <Card>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-lg font-bold">Événements à venir</h2>
                      <Link to="/calendar">
                        <Button variant="ghost" size="sm">
                          <Calendar className="h-4 w-4 mr-2" />
                          Voir le calendrier
                        </Button>
                      </Link>
                    </div>
                    <div className="space-y-4">
                      {upcomingEvents.map((event, index) => (
                        <div
                          key={index}
                          className="flex items-start p-3 rounded-lg hover:bg-gray-50"
                        >
                          <div className="mr-3">{event.icon}</div>
                          <div>
                            <h3 className="font-medium">{event.title}</h3>
                            <p className="text-sm text-gray-500">
                              {event.time}
                            </p>
                            <p className="text-sm text-gray-500">
                              {event.location}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Recent Notifications */}
                <Card>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-lg font-bold">
                        Notifications récentes
                      </h2>
                      <Link to="/notifications">
                        <Button variant="ghost" size="sm">
                          Voir tout
                        </Button>
                      </Link>
                    </div>
                    <div className="space-y-4">
                      {recentNotifications.map((notification, index) => (
                        <div
                          key={index}
                          className={`p-3 rounded-lg border-l-4 ${notification.read ? "border-gray-200 bg-gray-50" : "border-blue-500 bg-blue-50"}`}
                        >
                          <h3 className="font-medium">{notification.title}</h3>
                          <p className="text-sm text-gray-600">
                            {notification.description}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            {notification.time}
                          </p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Quick Actions */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-lg font-bold mb-4">Actions rapides</h2>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Button
                      variant="outline"
                      className="h-auto py-4 flex flex-col items-center justify-center gap-2"
                      onClick={() => setActiveTab("attendance")}
                    >
                      <Clock className="h-6 w-6" />
                      <span>Faire l'appel</span>
                    </Button>
                    <Button
                      variant="outline"
                      className="h-auto py-4 flex flex-col items-center justify-center gap-2"
                      onClick={() => setActiveTab("grades")}
                    >
                      <FileText className="h-6 w-6" />
                      <span>Saisir les notes</span>
                    </Button>
                    <Button
                      variant="outline"
                      className="h-auto py-4 flex flex-col items-center justify-center gap-2"
                    >
                      <BookOpen className="h-6 w-6" />
                      <span>Télécharger des ressources</span>
                    </Button>
                    <Button
                      variant="outline"
                      className="h-auto py-4 flex flex-col items-center justify-center gap-2"
                    >
                      <MessageSquare className="h-6 w-6" />
                      <span>Envoyer un message aux élèves</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Schedule Tab */}
            <TabsContent value="schedule">
              <ScheduleView />
            </TabsContent>

            {/* Attendance Tab */}
            <TabsContent value="attendance">
              <AttendanceTracker />
            </TabsContent>

            {/* Grades Tab */}
            <TabsContent value="grades">
              <GradeManager />
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default TeacherDashboard;
