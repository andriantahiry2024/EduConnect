import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  BarChart,
  Users,
  BookOpen,
  Calendar,
  Bell,
  Settings,
  FileText,
  School,
  TrendingUp,
  AlertCircle,
} from "lucide-react";
import DashboardSidebar from "./DashboardSidebar";
import DashboardHeader from "./DashboardHeader";
import StudentRecordsManager from "../admin/StudentRecordsManager";
import ScheduleBuilder from "../admin/ScheduleBuilder";

interface AdminDashboardProps {
  userName?: string;
  userAvatar?: string;
}

const AdminDashboard = ({
  userName = "Admin User",
  userAvatar = "",
}: AdminDashboardProps) => {
  const [activeTab, setActiveTab] = useState("overview");

  // Mock data for dashboard stats
  const stats = {
    totalStudents: 1250,
    totalTeachers: 85,
    totalClasses: 42,
    attendanceRate: 94.5,
    upcomingEvents: 8,
    pendingRequests: 12,
  };

  // Mock data for recent notifications
  const recentNotifications = [
    {
      id: 1,
      title: "New Student Registration",
      message: "5 new student registrations pending approval",
      time: "2 hours ago",
      type: "info",
    },
    {
      id: 2,
      title: "System Maintenance",
      message: "Scheduled maintenance on Saturday, 10 PM - 2 AM",
      time: "1 day ago",
      type: "warning",
    },
    {
      id: 3,
      title: "Teacher Meeting",
      message: "Faculty meeting scheduled for Friday at 3 PM",
      time: "2 days ago",
      type: "info",
    },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      <DashboardSidebar
        userType="admin"
        userName={userName}
        userAvatar={userAvatar}
        activePath="/dashboard"
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader />

        <main className="flex-1 overflow-y-auto p-6">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="space-y-6"
          >
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold">
                Tableau de Bord Administrateur
              </h1>
              <TabsList>
                <TabsTrigger value="overview">Aperçu</TabsTrigger>
                <TabsTrigger value="students">Élèves</TabsTrigger>
                <TabsTrigger value="schedule">Emploi du temps</TabsTrigger>
                <TabsTrigger value="reports">Rapports</TabsTrigger>
              </TabsList>
            </div>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">
                      Total des élèves
                    </CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {stats.totalStudents}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      +2,5% par rapport au mois dernier
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">
                      Total des enseignants
                    </CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {stats.totalTeachers}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      +1,2% par rapport au mois dernier
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">
                      Total des classes
                    </CardTitle>
                    <BookOpen className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {stats.totalClasses}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Identique au semestre précédent
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">
                      Taux de présence
                    </CardTitle>
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {stats.attendanceRate}%
                    </div>
                    <p className="text-xs text-muted-foreground">
                      +0,8% par rapport au mois dernier
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">
                      Événements à venir
                    </CardTitle>
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {stats.upcomingEvents}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      7 prochains jours
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">
                      Demandes en attente
                    </CardTitle>
                    <Bell className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {stats.pendingRequests}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Nécessite attention
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Actions rapides</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Button
                    variant="outline"
                    className="h-24 flex flex-col items-center justify-center gap-2"
                  >
                    <Users className="h-6 w-6" />
                    <span>Gérer les utilisateurs</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="h-24 flex flex-col items-center justify-center gap-2"
                  >
                    <Calendar className="h-6 w-6" />
                    <span>Emploi du temps</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="h-24 flex flex-col items-center justify-center gap-2"
                  >
                    <FileText className="h-6 w-6" />
                    <span>Rapports</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="h-24 flex flex-col items-center justify-center gap-2"
                  >
                    <Settings className="h-6 w-6" />
                    <span>Paramètres</span>
                  </Button>
                </CardContent>
              </Card>

              {/* Recent Notifications */}
              <Card>
                <CardHeader>
                  <CardTitle>Notifications récentes</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recentNotifications.map((notification) => (
                    <div
                      key={notification.id}
                      className="flex items-start space-x-4 p-3 rounded-lg border"
                    >
                      <div className="rounded-full p-2 bg-primary/10">
                        {notification.type === "warning" ? (
                          <AlertCircle className="h-4 w-4 text-amber-500" />
                        ) : (
                          <Bell className="h-4 w-4 text-primary" />
                        )}
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-medium">
                          {notification.title}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {notification.message}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {notification.time}
                        </p>
                      </div>
                    </div>
                  ))}
                  <Button variant="outline" className="w-full">
                    Voir toutes les notifications
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Students Tab */}
            <TabsContent value="students">
              <StudentRecordsManager />
            </TabsContent>

            {/* Schedule Tab */}
            <TabsContent value="schedule">
              <ScheduleBuilder />
            </TabsContent>

            {/* Reports Tab */}
            <TabsContent value="reports" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Rapports disponibles</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button
                    variant="outline"
                    className="h-24 flex flex-col items-center justify-center gap-2 text-left"
                  >
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
                      <Users className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Rapports des élèves</h3>
                      <p className="text-xs text-muted-foreground">
                        Présence, notes et performance
                      </p>
                    </div>
                  </Button>

                  <Button
                    variant="outline"
                    className="h-24 flex flex-col items-center justify-center gap-2 text-left"
                  >
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
                      <Users className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Rapports des enseignants</h3>
                      <p className="text-xs text-muted-foreground">
                        Performance et gestion de classe
                      </p>
                    </div>
                  </Button>

                  <Button
                    variant="outline"
                    className="h-24 flex flex-col items-center justify-center gap-2 text-left"
                  >
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
                      <School className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Rapports académiques</h3>
                      <p className="text-xs text-muted-foreground">
                        Performance de classe et analyse du programme
                      </p>
                    </div>
                  </Button>

                  <Button
                    variant="outline"
                    className="h-24 flex flex-col items-center justify-center gap-2 text-left"
                  >
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
                      <BarChart className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Rapports administratifs</h3>
                      <p className="text-xs text-muted-foreground">
                        Statistiques financières et opérationnelles
                      </p>
                    </div>
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Rapports récents</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <FileText className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <h4 className="text-sm font-medium">
                            Rapport mensuel de présence
                          </h4>
                          <p className="text-xs text-muted-foreground">
                            Généré le 1 mai 2023
                          </p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Voir
                      </Button>
                    </div>

                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <FileText className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <h4 className="text-sm font-medium">
                            Analyse trimestrielle des notes
                          </h4>
                          <p className="text-xs text-muted-foreground">
                            Généré le 15 avril 2023
                          </p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Voir
                      </Button>
                    </div>

                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <FileText className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <h4 className="text-sm font-medium">
                            Évaluation de performance des enseignants
                          </h4>
                          <p className="text-xs text-muted-foreground">
                            Généré le 10 avril 2023
                          </p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Voir
                      </Button>
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

export default AdminDashboard;
