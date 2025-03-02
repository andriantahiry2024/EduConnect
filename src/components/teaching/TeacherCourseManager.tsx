import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  BookOpen,
  Search,
  Plus,
  Video,
  FileText,
  Clock,
  Users,
  BarChart,
  Filter,
} from "lucide-react";
import CourseCreator from "./CourseCreator";
import QuickQuiz from "./QuickQuiz";

interface TeacherCourseManagerProps {}

const TeacherCourseManager: React.FC<TeacherCourseManagerProps> = () => {
  const [activeTab, setActiveTab] = useState("courses");
  const [showCourseCreator, setShowCourseCreator] = useState(false);
  const [showQuickQuiz, setShowQuickQuiz] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Mock data for courses
  const [mockCourses, setMockCourses] = useState([
    {
      id: "1",
      title: "Mathématiques - Algèbre linéaire",
      subject: "Mathématiques",
      level: "Lycée",
      students: 28,
      progress: 65,
      lastUpdated: "2023-11-10",
      resources: 12,
    },
    {
      id: "2",
      title: "Physique - Mécanique classique",
      subject: "Physique",
      level: "Lycée",
      students: 24,
      progress: 42,
      lastUpdated: "2023-11-08",
      resources: 8,
    },
    {
      id: "3",
      title: "Littérature française - XIXe siècle",
      subject: "Littérature",
      level: "Lycée",
      students: 32,
      progress: 78,
      lastUpdated: "2023-11-05",
      resources: 15,
    },
  ]);

  // Mock data for resources
  const [mockResources, setMockResources] = useState([
    {
      id: "1",
      title: "Introduction à l'algèbre linéaire",
      type: "document",
      course: "Mathématiques - Algèbre linéaire",
      views: 124,
      uploadDate: "2023-10-15",
    },
    {
      id: "2",
      title: "Résolution d'équations du second degré",
      type: "video",
      course: "Mathématiques - Algèbre linéaire",
      views: 87,
      uploadDate: "2023-10-18",
      duration: "12:45",
    },
    {
      id: "3",
      title: "Les forces en physique",
      type: "document",
      course: "Physique - Mécanique classique",
      views: 56,
      uploadDate: "2023-10-22",
    },
    {
      id: "4",
      title: "Analyse de texte - Madame Bovary",
      type: "document",
      course: "Littérature française - XIXe siècle",
      views: 42,
      uploadDate: "2023-11-01",
    },
    {
      id: "5",
      title: "Démonstration - Lois de Newton",
      type: "video",
      course: "Physique - Mécanique classique",
      views: 103,
      uploadDate: "2023-10-25",
      duration: "18:30",
    },
  ]);

  // Mock data for quizzes
  const [mockQuizzes, setMockQuizzes] = useState([
    {
      id: "1",
      title: "Quiz - Systèmes d'équations",
      course: "Mathématiques - Algèbre linéaire",
      questions: 10,
      submissions: 26,
      averageScore: 78,
      createdDate: "2023-10-20",
    },
    {
      id: "2",
      title: "Évaluation - Forces et mouvement",
      course: "Physique - Mécanique classique",
      questions: 8,
      submissions: 22,
      averageScore: 65,
      createdDate: "2023-10-28",
    },
    {
      id: "3",
      title: "Quiz rapide - Vocabulaire littéraire",
      course: "Littérature française - XIXe siècle",
      questions: 5,
      submissions: 30,
      averageScore: 82,
      createdDate: "2023-11-03",
    },
  ]);

  const filteredCourses = mockCourses.filter((course) =>
    course.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const filteredResources = mockResources.filter((resource) =>
    resource.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const filteredQuizzes = mockQuizzes.filter((quiz) =>
    quiz.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleSaveCourse = (courseData: any) => {
    console.log("Course saved:", courseData);
    // Add the new course to our mock data
    const newCourse = {
      id: (mockCourses.length + 1).toString(),
      title: courseData.title,
      subject: courseData.subject || "Autre",
      level: courseData.level || "Lycée",
      students: 0,
      progress: 0,
      lastUpdated: new Date().toISOString().split("T")[0],
      resources: courseData.sections.reduce(
        (total, section) => total + section.resources.length,
        0,
      ),
    };
    setMockCourses([...mockCourses, newCourse]);
    setShowCourseCreator(false);
  };

  const handleSaveQuiz = (quizData: any) => {
    console.log("Quiz saved:", quizData);
    // Add the new quiz to our mock data
    const newQuiz = {
      id: (mockQuizzes.length + 1).toString(),
      title: quizData.title,
      course: mockCourses[0]?.title || "Cours général",
      questions: quizData.questions.length,
      submissions: 0,
      averageScore: 0,
      createdDate: new Date().toISOString().split("T")[0],
    };
    setMockQuizzes([...mockQuizzes, newQuiz]);
    setShowQuickQuiz(false);
  };

  const handleSendQuiz = (quizData: any) => {
    console.log("Quiz sent to students:", quizData);
    // Add the new quiz to our mock data and mark as sent
    const newQuiz = {
      id: (mockQuizzes.length + 1).toString(),
      title: quizData.title,
      course: mockCourses[0]?.title || "Cours général",
      questions: quizData.questions.length,
      submissions: 0,
      averageScore: 0,
      createdDate: new Date().toISOString().split("T")[0],
    };
    setMockQuizzes([...mockQuizzes, newQuiz]);

    // Show a confirmation message (in a real app, this would be a toast notification)
    alert("Quiz envoyé aux élèves avec succès!");
    setShowQuickQuiz(false);
  };

  const getResourceIcon = (type: string) => {
    switch (type) {
      case "document":
        return <FileText className="h-5 w-5 text-blue-500" />;
      case "video":
        return <Video className="h-5 w-5 text-red-500" />;
      default:
        return <FileText className="h-5 w-5 text-gray-500" />;
    }
  };

  if (showCourseCreator) {
    return <CourseCreator onSave={handleSaveCourse} />;
  }

  if (showQuickQuiz) {
    return <QuickQuiz onSave={handleSaveQuiz} onSend={handleSendQuiz} />;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Gestion des Cours</h2>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setShowQuickQuiz(true)}>
            <Clock className="mr-2 h-4 w-4" /> Créer un quiz rapide
          </Button>
          <Button onClick={() => setShowCourseCreator(true)}>
            <Plus className="mr-2 h-4 w-4" /> Créer un nouveau cours
          </Button>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button variant="outline" size="icon">
          <Filter className="h-4 w-4" />
        </Button>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-4"
      >
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="courses">
            <BookOpen className="mr-2 h-4 w-4" /> Mes cours
          </TabsTrigger>
          <TabsTrigger value="resources">
            <FileText className="mr-2 h-4 w-4" /> Ressources
          </TabsTrigger>
          <TabsTrigger value="quizzes">
            <Clock className="mr-2 h-4 w-4" /> Quiz et évaluations
          </TabsTrigger>
        </TabsList>

        {/* Courses Tab */}
        <TabsContent value="courses" className="space-y-4 mt-4">
          {filteredCourses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredCourses.map((course) => (
                <Card key={course.id} className="overflow-hidden">
                  <div className="h-3 bg-primary" />
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{course.title}</CardTitle>
                      <Badge variant="outline">{course.level}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {course.subject}
                    </p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between text-sm">
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span>{course.students} élèves</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <FileText className="h-4 w-4 text-muted-foreground" />
                          <span>{course.resources} ressources</span>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>Progression</span>
                          <span>{course.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-primary h-2 rounded-full"
                            style={{ width: `${course.progress}%` }}
                          ></div>
                        </div>
                      </div>

                      <div className="flex justify-between pt-2">
                        <Button variant="outline" size="sm">
                          <FileText className="mr-2 h-4 w-4" /> Ressources
                        </Button>
                        <Button size="sm">
                          <BookOpen className="mr-2 h-4 w-4" /> Gérer
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <BookOpen className="h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium mb-2">Aucun cours trouvé</h3>
                <p className="text-gray-500 mb-4 text-center max-w-md">
                  {searchQuery
                    ? `Aucun cours ne correspond à "${searchQuery}"`
                    : "Vous n'avez pas encore créé de cours. Commencez par créer votre premier cours."}
                </p>
                {!searchQuery && (
                  <Button onClick={() => setShowCourseCreator(true)}>
                    <Plus className="mr-2 h-4 w-4" /> Créer un cours
                  </Button>
                )}
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Resources Tab */}
        <TabsContent value="resources" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Ressources pédagogiques</CardTitle>
            </CardHeader>
            <CardContent>
              {filteredResources.length > 0 ? (
                <div className="space-y-4">
                  {filteredResources.map((resource) => (
                    <div
                      key={resource.id}
                      className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        {getResourceIcon(resource.type)}
                        <div>
                          <h4 className="font-medium">{resource.title}</h4>
                          <p className="text-sm text-muted-foreground">
                            {resource.course}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-sm text-right">
                          <div className="font-medium">
                            {resource.views} vues
                          </div>
                          <div className="text-muted-foreground">
                            {resource.uploadDate}
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">
                          <FileText className="h-4 w-4" />
                          <span className="sr-only">Voir</span>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-8">
                  <FileText className="h-12 w-12 text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium mb-2">
                    Aucune ressource trouvée
                  </h3>
                  <p className="text-gray-500 text-center max-w-md">
                    {searchQuery
                      ? `Aucune ressource ne correspond à "${searchQuery}"`
                      : "Vous n'avez pas encore ajouté de ressources à vos cours."}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Quizzes Tab */}
        <TabsContent value="quizzes" className="mt-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Quiz et évaluations</CardTitle>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowQuickQuiz(true)}
              >
                <Plus className="mr-2 h-4 w-4" /> Nouveau quiz
              </Button>
            </CardHeader>
            <CardContent>
              {filteredQuizzes.length > 0 ? (
                <div className="space-y-4">
                  {filteredQuizzes.map((quiz) => (
                    <div
                      key={quiz.id}
                      className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <Clock className="h-5 w-5 text-primary" />
                        <div>
                          <h4 className="font-medium">{quiz.title}</h4>
                          <p className="text-sm text-muted-foreground">
                            {quiz.course} • {quiz.questions} questions
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <div className="flex items-center gap-1">
                            <Users className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">
                              {quiz.submissions} réponses
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <BarChart className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">
                              Moyenne: {quiz.averageScore}%
                            </span>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">
                          <FileText className="h-4 w-4" />
                          <span className="sr-only">Voir</span>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-8">
                  <Clock className="h-12 w-12 text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium mb-2">
                    Aucun quiz trouvé
                  </h3>
                  <p className="text-gray-500 text-center max-w-md">
                    {searchQuery
                      ? `Aucun quiz ne correspond à "${searchQuery}"`
                      : "Vous n'avez pas encore créé de quiz pour vos cours."}
                  </p>
                  {!searchQuery && (
                    <Button
                      className="mt-4"
                      onClick={() => setShowQuickQuiz(true)}
                    >
                      <Plus className="mr-2 h-4 w-4" /> Créer un quiz
                    </Button>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TeacherCourseManager;
