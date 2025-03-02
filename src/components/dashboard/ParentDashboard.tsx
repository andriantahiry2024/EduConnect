import React, { useState } from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import {
  Bell,
  Calendar,
  Clock,
  FileText,
  MessageSquare,
  User,
  ChevronDown,
  Search,
  BarChart,
  BookOpen,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import DashboardSidebar from "./DashboardSidebar";
import DashboardHeader from "./DashboardHeader";
import ScheduleView from "../schedule/ScheduleView";

interface Child {
  id: string;
  name: string;
  grade: string;
  avatar?: string;
}

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: "message" | "grade" | "attendance" | "event";
}

interface UpcomingEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
}

interface ParentDashboardProps {
  parentName?: string;
  parentAvatar?: string;
  children?: Child[];
  notifications?: Notification[];
  upcomingEvents?: UpcomingEvent[];
}

const ParentDashboard: React.FC<ParentDashboardProps> = ({
  parentName = "Sarah Johnson",
  parentAvatar = "",
  children = [
    {
      id: "1",
      name: "Emma Johnson",
      grade: "10th Grade",
      avatar: "",
    },
    {
      id: "2",
      name: "Noah Johnson",
      grade: "7th Grade",
      avatar: "",
    },
  ],
  notifications = [
    {
      id: "1",
      title: "New Message",
      message:
        "Mrs. Davis sent you a message about the upcoming science project.",
      time: "10 minutes ago",
      read: false,
      type: "message",
    },
    {
      id: "2",
      title: "Grade Posted",
      message: "Emma received a grade for Mathematics Quiz #5.",
      time: "2 hours ago",
      read: false,
      type: "grade",
    },
    {
      id: "3",
      title: "Absence Recorded",
      message: "Noah was marked absent for today's Physical Education class.",
      time: "4 hours ago",
      read: true,
      type: "attendance",
    },
    {
      id: "4",
      title: "School Event",
      message: "Parent-Teacher Conference scheduled for next Friday.",
      time: "Yesterday",
      read: true,
      type: "event",
    },
  ],
  upcomingEvents = [
    {
      id: "1",
      title: "Parent-Teacher Conference",
      date: "2023-11-17",
      time: "15:00 - 17:00",
      location: "Main Building, Room 105",
    },
    {
      id: "2",
      title: "Science Fair",
      date: "2023-11-22",
      time: "13:00 - 16:00",
      location: "School Gymnasium",
    },
    {
      id: "3",
      title: "School Holiday - Thanksgiving",
      date: "2023-11-23",
      time: "All Day",
      location: "No School",
    },
  ],
}) => {
  const [selectedChild, setSelectedChild] = useState<Child | null>(
    children.length > 0 ? children[0] : null,
  );
  const [activeTab, setActiveTab] = useState("overview");

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "message":
        return <MessageSquare className="h-5 w-5 text-blue-500" />;
      case "grade":
        return <FileText className="h-5 w-5 text-green-500" />;
      case "attendance":
        return <Clock className="h-5 w-5 text-red-500" />;
      case "event":
        return <Calendar className="h-5 w-5 text-purple-500" />;
      default:
        return <Bell className="h-5 w-5 text-gray-500" />;
    }
  };

  const unreadNotificationsCount = notifications.filter(
    (notification) => !notification.read,
  ).length;

  return (
    <div className="flex h-screen bg-gray-100">
      <DashboardSidebar
        userType="parent"
        userName={parentName}
        userAvatar={parentAvatar}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader />

        <main className="flex-1 overflow-y-auto p-6">
          {/* Child Selector */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Tableau de Bord Parent</h1>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  {selectedChild && (
                    <>
                      <Avatar className="h-6 w-6">
                        <AvatarImage
                          src={selectedChild.avatar}
                          alt={selectedChild.name}
                        />
                        <AvatarFallback>
                          {selectedChild.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <span>{selectedChild.name}</span>
                      <ChevronDown className="h-4 w-4 opacity-50" />
                    </>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="p-2">
                  <p className="text-sm font-medium">Sélectionner un enfant</p>
                </div>
                <DropdownMenuSeparator />
                {children.map((child) => (
                  <DropdownMenuItem
                    key={child.id}
                    className="flex items-center gap-2 p-2"
                    onClick={() => setSelectedChild(child)}
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={child.avatar} alt={child.name} />
                      <AvatarFallback>{child.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{child.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {child.grade}
                      </p>
                    </div>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Tabs */}
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="space-y-4"
          >
            <TabsList>
              <TabsTrigger value="overview">Aperçu</TabsTrigger>
              <TabsTrigger value="attendance">Présence</TabsTrigger>
              <TabsTrigger value="grades">Notes</TabsTrigger>
              <TabsTrigger value="schedule">Emploi du temps</TabsTrigger>
              <TabsTrigger value="behavior">Comportement</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Quick Stats */}
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">
                          Taux de présence
                        </p>
                        <h3 className="text-2xl font-bold mt-1">96%</h3>
                      </div>
                      <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                        <Clock className="h-6 w-6 text-blue-600" />
                      </div>
                    </div>
                    <div className="mt-4 h-2 bg-blue-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-600 rounded-full"
                        style={{ width: "96%" }}
                      ></div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">
                          Moyenne actuelle
                        </p>
                        <h3 className="text-2xl font-bold mt-1">3.8</h3>
                      </div>
                      <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                        <BarChart className="h-6 w-6 text-green-600" />
                      </div>
                    </div>
                    <div className="mt-4 h-2 bg-green-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-green-600 rounded-full"
                        style={{ width: "95%" }}
                      ></div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">
                          Devoirs
                        </p>
                        <h3 className="text-2xl font-bold mt-1">5 à rendre</h3>
                      </div>
                      <div className="h-12 w-12 rounded-full bg-amber-100 flex items-center justify-center">
                        <BookOpen className="h-6 w-6 text-amber-600" />
                      </div>
                    </div>
                    <div className="mt-4 text-sm text-muted-foreground">
                      <span className="text-amber-600 font-medium">
                        2 en retard
                      </span>{" "}
                      • 3 à venir
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Recent Notifications */}
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-medium">
                        Notifications récentes
                      </h3>
                      <Badge variant="outline">
                        {unreadNotificationsCount} New
                      </Badge>
                    </div>
                    <div className="space-y-4">
                      {notifications.slice(0, 3).map((notification) => (
                        <div
                          key={notification.id}
                          className={`flex gap-3 p-3 rounded-lg ${!notification.read ? "bg-muted" : ""}`}
                        >
                          <div className="mt-1">
                            {getNotificationIcon(notification.type)}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="font-medium text-sm">
                                {notification.title}
                              </h4>
                              {!notification.read && (
                                <span className="h-2 w-2 rounded-full bg-blue-600"></span>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">
                              {notification.message}
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                              {notification.time}
                            </p>
                          </div>
                        </div>
                      ))}
                      <Button
                        variant="ghost"
                        className="w-full text-sm"
                        asChild
                      >
                        <Link to="/notifications">
                          Voir toutes les notifications
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Upcoming Events */}
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-medium mb-4">
                      Événements à venir
                    </h3>
                    <div className="space-y-4">
                      {upcomingEvents.map((event) => (
                        <div key={event.id} className="flex gap-3">
                          <div className="flex flex-col items-center">
                            <div className="text-sm font-medium">
                              {format(new Date(event.date), "MMM")}
                            </div>
                            <div className="text-2xl font-bold">
                              {format(new Date(event.date), "dd")}
                            </div>
                          </div>
                          <div>
                            <h4 className="font-medium">{event.title}</h4>
                            <p className="text-sm text-muted-foreground">
                              {event.time} • {event.location}
                            </p>
                          </div>
                        </div>
                      ))}
                      <Button
                        variant="ghost"
                        className="w-full text-sm"
                        asChild
                      >
                        <Link to="/calendar">Voir le calendrier complet</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Attendance Tab */}
            <TabsContent value="attendance">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-medium mb-4">
                    Attendance Records
                  </h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="p-4 bg-green-50 rounded-lg">
                        <div className="text-sm text-muted-foreground">
                          Present
                        </div>
                        <div className="text-2xl font-bold text-green-600">
                          42 days
                        </div>
                      </div>
                      <div className="p-4 bg-amber-50 rounded-lg">
                        <div className="text-sm text-muted-foreground">
                          Tardy
                        </div>
                        <div className="text-2xl font-bold text-amber-600">
                          3 days
                        </div>
                      </div>
                      <div className="p-4 bg-red-50 rounded-lg">
                        <div className="text-sm text-muted-foreground">
                          Absent
                        </div>
                        <div className="text-2xl font-bold text-red-600">
                          2 days
                        </div>
                      </div>
                    </div>

                    <div className="border rounded-lg overflow-hidden">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-muted">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                              Date
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                              Status
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                              Class
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                              Notes
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          <tr>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                              Nov 10, 2023
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
                                Absent
                              </Badge>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                              All Day
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                              Doctor's appointment
                            </td>
                          </tr>
                          <tr>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                              Nov 8, 2023
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">
                                Tardy
                              </Badge>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                              Mathematics
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                              15 minutes late
                            </td>
                          </tr>
                          <tr>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                              Nov 7, 2023
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                                Present
                              </Badge>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                              All Day
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                              -
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Grades Tab */}
            <TabsContent value="grades">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-medium mb-4">
                    Academic Performance
                  </h3>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 border rounded-lg">
                        <h4 className="font-medium mb-2">Current Grades</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span>Mathematics</span>
                            <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                              A
                            </Badge>
                          </div>
                          <div className="flex justify-between items-center">
                            <span>Science</span>
                            <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                              A-
                            </Badge>
                          </div>
                          <div className="flex justify-between items-center">
                            <span>English</span>
                            <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                              B+
                            </Badge>
                          </div>
                          <div className="flex justify-between items-center">
                            <span>History</span>
                            <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                              A
                            </Badge>
                          </div>
                          <div className="flex justify-between items-center">
                            <span>Physical Education</span>
                            <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                              A+
                            </Badge>
                          </div>
                        </div>
                      </div>

                      <div className="p-4 border rounded-lg">
                        <h4 className="font-medium mb-2">Recent Assessments</h4>
                        <div className="space-y-3">
                          <div>
                            <div className="flex justify-between">
                              <span className="font-medium">
                                Mathematics Quiz #5
                              </span>
                              <span className="font-medium">92%</span>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              Nov 8, 2023
                            </p>
                          </div>
                          <div>
                            <div className="flex justify-between">
                              <span className="font-medium">
                                Science Lab Report
                              </span>
                              <span className="font-medium">88%</span>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              Nov 5, 2023
                            </p>
                          </div>
                          <div>
                            <div className="flex justify-between">
                              <span className="font-medium">English Essay</span>
                              <span className="font-medium">95%</span>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              Nov 3, 2023
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium mb-2">Grade Trend</h4>
                      <div className="h-60 flex items-end space-x-2">
                        <div className="flex-1 flex flex-col items-center">
                          <div
                            className="w-full bg-blue-500 rounded-t-sm"
                            style={{ height: "70%" }}
                          ></div>
                          <span className="text-xs mt-1">Q1</span>
                        </div>
                        <div className="flex-1 flex flex-col items-center">
                          <div
                            className="w-full bg-blue-500 rounded-t-sm"
                            style={{ height: "85%" }}
                          ></div>
                          <span className="text-xs mt-1">Q2</span>
                        </div>
                        <div className="flex-1 flex flex-col items-center">
                          <div
                            className="w-full bg-blue-500 rounded-t-sm"
                            style={{ height: "75%" }}
                          ></div>
                          <span className="text-xs mt-1">Q3</span>
                        </div>
                        <div className="flex-1 flex flex-col items-center">
                          <div
                            className="w-full bg-blue-500 rounded-t-sm"
                            style={{ height: "90%" }}
                          ></div>
                          <span className="text-xs mt-1">Q4</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Schedule Tab */}
            <TabsContent value="schedule">
              <ScheduleView />
            </TabsContent>

            {/* Behavior Tab */}
            <TabsContent value="behavior">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-medium mb-4">Behavior Reports</h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="p-4 bg-green-50 rounded-lg">
                        <div className="text-sm text-muted-foreground">
                          Positive Reports
                        </div>
                        <div className="text-2xl font-bold text-green-600">
                          12
                        </div>
                      </div>
                      <div className="p-4 bg-amber-50 rounded-lg">
                        <div className="text-sm text-muted-foreground">
                          Neutral Reports
                        </div>
                        <div className="text-2xl font-bold text-amber-600">
                          3
                        </div>
                      </div>
                      <div className="p-4 bg-red-50 rounded-lg">
                        <div className="text-sm text-muted-foreground">
                          Negative Reports
                        </div>
                        <div className="text-2xl font-bold text-red-600">0</div>
                      </div>
                    </div>

                    <div className="border rounded-lg overflow-hidden">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-muted">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                              Date
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                              Type
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                              Class
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                              Description
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                              Teacher
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          <tr>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                              Nov 9, 2023
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                                Positive
                              </Badge>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                              Science
                            </td>
                            <td className="px-6 py-4 text-sm">
                              Excellent participation in class discussion and
                              helped other students with lab work.
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                              Mrs. Davis
                            </td>
                          </tr>
                          <tr>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                              Nov 7, 2023
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                                Positive
                              </Badge>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                              Mathematics
                            </td>
                            <td className="px-6 py-4 text-sm">
                              Volunteered to solve a challenging problem on the
                              board and explained the solution clearly.
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                              Mr. Johnson
                            </td>
                          </tr>
                          <tr>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                              Nov 3, 2023
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">
                                Neutral
                              </Badge>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                              English
                            </td>
                            <td className="px-6 py-4 text-sm">
                              Seemed distracted during group work but completed
                              the assigned task.
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                              Ms. Wilson
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
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

export default ParentDashboard;
