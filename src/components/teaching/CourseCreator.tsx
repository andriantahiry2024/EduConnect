import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BookOpen,
  Upload,
  Video,
  FileText,
  Plus,
  X,
  Save,
  Clock,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface CourseCreatorProps {
  onSave?: (courseData: any) => void;
}

const CourseCreator: React.FC<CourseCreatorProps> = ({ onSave }) => {
  const [activeTab, setActiveTab] = useState("details");
  const [courseTitle, setCourseTitle] = useState("");
  const [courseDescription, setCourseDescription] = useState("");
  const [courseLevel, setCourseLevel] = useState("");
  const [courseSubject, setCourseSubject] = useState("");
  const [courseDuration, setCourseDuration] = useState("");
  const [courseImage, setCourseImage] = useState<File | null>(null);
  const [courseImagePreview, setCourseImagePreview] = useState<string>("");

  // Sections du cours
  const [sections, setSections] = useState<
    Array<{
      id: string;
      title: string;
      content: string;
      resources: Array<{
        id: string;
        type: "document" | "video" | "link";
        title: string;
        file?: File;
        url?: string;
        preview?: string;
      }>;
    }>
  >([{ id: "1", title: "", content: "", resources: [] }]);

  // Quiz
  const [quizzes, setQuizzes] = useState<
    Array<{
      id: string;
      title: string;
      questions: Array<{
        id: string;
        text: string;
        options: Array<{ id: string; text: string; isCorrect: boolean }>;
      }>;
    }>
  >([]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setCourseImage(file);
      setCourseImagePreview(URL.createObjectURL(file));
    }
  };

  const addSection = () => {
    setSections([
      ...sections,
      { id: Date.now().toString(), title: "", content: "", resources: [] },
    ]);
  };

  const removeSection = (id: string) => {
    setSections(sections.filter((section) => section.id !== id));
  };

  const updateSection = (id: string, field: string, value: string) => {
    setSections(
      sections.map((section) =>
        section.id === id ? { ...section, [field]: value } : section,
      ),
    );
  };

  const addResource = (
    sectionId: string,
    type: "document" | "video" | "link",
  ) => {
    setSections(
      sections.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              resources: [
                ...section.resources,
                {
                  id: Date.now().toString(),
                  type,
                  title: "",
                  url: type === "link" ? "" : undefined,
                },
              ],
            }
          : section,
      ),
    );
  };

  const removeResource = (sectionId: string, resourceId: string) => {
    setSections(
      sections.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              resources: section.resources.filter(
                (resource) => resource.id !== resourceId,
              ),
            }
          : section,
      ),
    );
  };

  const updateResource = (
    sectionId: string,
    resourceId: string,
    field: string,
    value: any,
  ) => {
    setSections(
      sections.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              resources: section.resources.map((resource) =>
                resource.id === resourceId
                  ? { ...resource, [field]: value }
                  : resource,
              ),
            }
          : section,
      ),
    );
  };

  const handleResourceFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    sectionId: string,
    resourceId: string,
  ) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      updateResource(sectionId, resourceId, "file", file);
      updateResource(sectionId, resourceId, "title", file.name);

      // Create preview URL for videos
      const resource = sections
        .find((s) => s.id === sectionId)
        ?.resources.find((r) => r.id === resourceId);

      if (resource?.type === "video" && file.type.startsWith("video/")) {
        updateResource(
          sectionId,
          resourceId,
          "preview",
          URL.createObjectURL(file),
        );
      }
    }
  };

  // Quiz functions
  const addQuiz = () => {
    setQuizzes([
      ...quizzes,
      {
        id: Date.now().toString(),
        title: "Nouveau Quiz",
        questions: [
          {
            id: "q1",
            text: "",
            options: [
              { id: "o1", text: "", isCorrect: false },
              { id: "o2", text: "", isCorrect: false },
              { id: "o3", text: "", isCorrect: false },
              { id: "o4", text: "", isCorrect: false },
            ],
          },
        ],
      },
    ]);
  };

  const updateQuiz = (quizId: string, field: string, value: string) => {
    setQuizzes(
      quizzes.map((quiz) =>
        quiz.id === quizId ? { ...quiz, [field]: value } : quiz,
      ),
    );
  };

  const addQuestion = (quizId: string) => {
    setQuizzes(
      quizzes.map((quiz) =>
        quiz.id === quizId
          ? {
              ...quiz,
              questions: [
                ...quiz.questions,
                {
                  id: Date.now().toString(),
                  text: "",
                  options: [
                    { id: "o1", text: "", isCorrect: false },
                    { id: "o2", text: "", isCorrect: false },
                    { id: "o3", text: "", isCorrect: false },
                    { id: "o4", text: "", isCorrect: false },
                  ],
                },
              ],
            }
          : quiz,
      ),
    );
  };

  const updateQuestion = (quizId: string, questionId: string, text: string) => {
    setQuizzes(
      quizzes.map((quiz) =>
        quiz.id === quizId
          ? {
              ...quiz,
              questions: quiz.questions.map((question) =>
                question.id === questionId ? { ...question, text } : question,
              ),
            }
          : quiz,
      ),
    );
  };

  const updateOption = (
    quizId: string,
    questionId: string,
    optionId: string,
    field: "text" | "isCorrect",
    value: string | boolean,
  ) => {
    setQuizzes(
      quizzes.map((quiz) =>
        quiz.id === quizId
          ? {
              ...quiz,
              questions: quiz.questions.map((question) =>
                question.id === questionId
                  ? {
                      ...question,
                      options: question.options.map((option) =>
                        option.id === optionId
                          ? { ...option, [field]: value }
                          : field === "isCorrect" && value === true
                            ? { ...option, isCorrect: false }
                            : option,
                      ),
                    }
                  : question,
              ),
            }
          : quiz,
      ),
    );
  };

  const handleSave = () => {
    // Validate required fields
    if (!courseTitle) {
      alert("Veuillez saisir un titre pour le cours");
      return;
    }

    const courseData = {
      title: courseTitle,
      description: courseDescription,
      level: courseLevel,
      subject: courseSubject,
      duration: courseDuration,
      image: courseImage,
      sections,
      quizzes,
    };

    if (onSave) {
      onSave(courseData);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Créateur de Cours</h2>
        <Button onClick={handleSave}>
          <Save className="mr-2 h-4 w-4" /> Enregistrer le cours
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="details">
            <BookOpen className="mr-2 h-4 w-4" /> Détails du cours
          </TabsTrigger>
          <TabsTrigger value="content">
            <FileText className="mr-2 h-4 w-4" /> Contenu et ressources
          </TabsTrigger>
          <TabsTrigger value="quiz">
            <Clock className="mr-2 h-4 w-4" /> Quiz et évaluations
          </TabsTrigger>
        </TabsList>

        {/* Détails du cours */}
        <TabsContent value="details" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Informations générales</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="courseTitle">Titre du cours</Label>
                  <Input
                    id="courseTitle"
                    value={courseTitle}
                    onChange={(e) => setCourseTitle(e.target.value)}
                    placeholder="Ex: Mathématiques - Algèbre linéaire"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="courseSubject">Matière</Label>
                  <Select
                    value={courseSubject}
                    onValueChange={setCourseSubject}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner une matière" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="math">Mathématiques</SelectItem>
                      <SelectItem value="physics">Physique</SelectItem>
                      <SelectItem value="chemistry">Chimie</SelectItem>
                      <SelectItem value="biology">Biologie</SelectItem>
                      <SelectItem value="literature">Littérature</SelectItem>
                      <SelectItem value="history">Histoire</SelectItem>
                      <SelectItem value="geography">Géographie</SelectItem>
                      <SelectItem value="languages">Langues</SelectItem>
                      <SelectItem value="art">Arts</SelectItem>
                      <SelectItem value="music">Musique</SelectItem>
                      <SelectItem value="pe">Éducation physique</SelectItem>
                      <SelectItem value="other">Autre</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="courseLevel">Niveau</Label>
                  <Select value={courseLevel} onValueChange={setCourseLevel}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner un niveau" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="elementary">Primaire</SelectItem>
                      <SelectItem value="middle">Collège</SelectItem>
                      <SelectItem value="high">Lycée</SelectItem>
                      <SelectItem value="university">Université</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="courseDuration">Durée estimée</Label>
                  <Input
                    id="courseDuration"
                    value={courseDuration}
                    onChange={(e) => setCourseDuration(e.target.value)}
                    placeholder="Ex: 10 heures, 4 semaines"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="courseDescription">Description du cours</Label>
                <Textarea
                  id="courseDescription"
                  value={courseDescription}
                  onChange={(e) => setCourseDescription(e.target.value)}
                  placeholder="Décrivez le contenu et les objectifs du cours..."
                  rows={5}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="courseImage">Image du cours</Label>
                <div className="flex items-center gap-4">
                  <div
                    className="border-2 border-dashed rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors"
                    style={{ width: "200px", height: "150px" }}
                    onClick={() =>
                      document.getElementById("courseImageInput")?.click()
                    }
                  >
                    {courseImagePreview ? (
                      <img
                        src={courseImagePreview}
                        alt="Course preview"
                        className="max-h-full max-w-full object-contain"
                      />
                    ) : (
                      <>
                        <Upload className="h-10 w-10 text-gray-400 mb-2" />
                        <p className="text-sm text-gray-500">
                          Cliquez pour ajouter une image
                        </p>
                      </>
                    )}
                    <input
                      id="courseImageInput"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageChange}
                    />
                  </div>
                  {courseImagePreview && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setCourseImage(null);
                        setCourseImagePreview("");
                      }}
                    >
                      <X className="h-4 w-4 mr-2" /> Supprimer
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Contenu du cours */}
        <TabsContent value="content" className="space-y-4 mt-4">
          {sections.map((section, index) => (
            <Card key={section.id} className="mb-4">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg">Section {index + 1}</CardTitle>
                  {sections.length > 1 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeSection(section.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor={`section-title-${section.id}`}>
                    Titre de la section
                  </Label>
                  <Input
                    id={`section-title-${section.id}`}
                    value={section.title}
                    onChange={(e) =>
                      updateSection(section.id, "title", e.target.value)
                    }
                    placeholder="Ex: Introduction à l'algèbre"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`section-content-${section.id}`}>
                    Contenu
                  </Label>
                  <Textarea
                    id={`section-content-${section.id}`}
                    value={section.content}
                    onChange={(e) =>
                      updateSection(section.id, "content", e.target.value)
                    }
                    placeholder="Contenu de la section..."
                    rows={5}
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label>Ressources</Label>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => addResource(section.id, "document")}
                      >
                        <FileText className="h-4 w-4 mr-2" /> Document
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => addResource(section.id, "video")}
                      >
                        <Video className="h-4 w-4 mr-2" /> Vidéo
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => addResource(section.id, "link")}
                      >
                        <Plus className="h-4 w-4 mr-2" /> Lien
                      </Button>
                    </div>
                  </div>

                  {section.resources.length > 0 ? (
                    <div className="space-y-3 mt-3">
                      {section.resources.map((resource) => (
                        <div
                          key={resource.id}
                          className="border rounded-md p-3 flex flex-col gap-2"
                        >
                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                              {resource.type === "document" && (
                                <FileText className="h-5 w-5 text-blue-500" />
                              )}
                              {resource.type === "video" && (
                                <Video className="h-5 w-5 text-red-500" />
                              )}
                              {resource.type === "link" && (
                                <BookOpen className="h-5 w-5 text-green-500" />
                              )}
                              <span className="font-medium capitalize">
                                {resource.type}
                              </span>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() =>
                                removeResource(section.id, resource.id)
                              }
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>

                          {resource.type === "link" ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                              <div>
                                <Label
                                  htmlFor={`resource-title-${resource.id}`}
                                >
                                  Titre
                                </Label>
                                <Input
                                  id={`resource-title-${resource.id}`}
                                  value={resource.title}
                                  onChange={(e) =>
                                    updateResource(
                                      section.id,
                                      resource.id,
                                      "title",
                                      e.target.value,
                                    )
                                  }
                                  placeholder="Titre du lien"
                                />
                              </div>
                              <div>
                                <Label htmlFor={`resource-url-${resource.id}`}>
                                  URL
                                </Label>
                                <Input
                                  id={`resource-url-${resource.id}`}
                                  value={resource.url || ""}
                                  onChange={(e) =>
                                    updateResource(
                                      section.id,
                                      resource.id,
                                      "url",
                                      e.target.value,
                                    )
                                  }
                                  placeholder="https://example.com"
                                />
                              </div>
                            </div>
                          ) : (
                            <div className="space-y-2">
                              <Label htmlFor={`resource-file-${resource.id}`}>
                                {resource.type === "document"
                                  ? "Document"
                                  : "Vidéo"}
                              </Label>
                              <div className="flex items-center gap-2">
                                <Input
                                  id={`resource-file-${resource.id}`}
                                  type="file"
                                  accept={
                                    resource.type === "document"
                                      ? ".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx"
                                      : "video/*"
                                  }
                                  className="flex-1"
                                  onChange={(e) =>
                                    handleResourceFileChange(
                                      e,
                                      section.id,
                                      resource.id,
                                    )
                                  }
                                />
                              </div>
                              {resource.file && (
                                <p className="text-sm text-gray-500">
                                  Fichier sélectionné: {resource.file.name}
                                </p>
                              )}
                              {resource.type === "video" &&
                                resource.preview && (
                                  <div className="mt-2">
                                    <video
                                      src={resource.preview}
                                      controls
                                      className="max-w-full h-auto rounded"
                                      style={{ maxHeight: "200px" }}
                                      onError={(e) => {
                                        console.error(
                                          "Video preview error:",
                                          e,
                                        );
                                        // Fallback to a placeholder if video preview fails
                                        e.currentTarget.style.display = "none";
                                      }}
                                    />
                                  </div>
                                )}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500 italic">
                      Aucune ressource ajoutée. Utilisez les boutons ci-dessus
                      pour ajouter des documents, vidéos ou liens.
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}

          <Button onClick={addSection} className="w-full">
            <Plus className="h-4 w-4 mr-2" /> Ajouter une section
          </Button>
        </TabsContent>

        {/* Quiz et évaluations */}
        <TabsContent value="quiz" className="space-y-4 mt-4">
          {quizzes.length > 0 ? (
            quizzes.map((quiz, quizIndex) => (
              <Card key={quiz.id} className="mb-4">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div className="space-y-1">
                      <CardTitle className="text-lg">
                        Quiz {quizIndex + 1}
                      </CardTitle>
                      <Input
                        value={quiz.title}
                        onChange={(e) =>
                          updateQuiz(quiz.id, "title", e.target.value)
                        }
                        placeholder="Titre du quiz"
                        className="max-w-md"
                      />
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {quiz.questions.map((question, questionIndex) => (
                    <div
                      key={question.id}
                      className="border rounded-md p-4 space-y-4"
                    >
                      <div className="flex justify-between items-center">
                        <h4 className="font-medium">
                          Question {questionIndex + 1}
                        </h4>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor={`question-${question.id}`}>
                          Texte de la question
                        </Label>
                        <Textarea
                          id={`question-${question.id}`}
                          value={question.text}
                          onChange={(e) =>
                            updateQuestion(quiz.id, question.id, e.target.value)
                          }
                          placeholder="Saisissez votre question ici..."
                        />
                      </div>

                      <div className="space-y-3">
                        <Label>Options de réponse</Label>
                        {question.options.map((option, optionIndex) => (
                          <div
                            key={option.id}
                            className="flex items-center gap-2"
                          >
                            <input
                              type="radio"
                              id={`option-${option.id}`}
                              name={`question-${question.id}`}
                              checked={option.isCorrect}
                              onChange={() =>
                                updateOption(
                                  quiz.id,
                                  question.id,
                                  option.id,
                                  "isCorrect",
                                  true,
                                )
                              }
                            />
                            <Input
                              value={option.text}
                              onChange={(e) =>
                                updateOption(
                                  quiz.id,
                                  question.id,
                                  option.id,
                                  "text",
                                  e.target.value,
                                )
                              }
                              placeholder={`Option ${optionIndex + 1}`}
                              className="flex-1"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}

                  <Button
                    variant="outline"
                    onClick={() => addQuestion(quiz.id)}
                  >
                    <Plus className="h-4 w-4 mr-2" /> Ajouter une question
                  </Button>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Clock className="h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium mb-2">
                  Aucun quiz créé pour ce cours
                </h3>
                <p className="text-gray-500 mb-4 text-center max-w-md">
                  Les quiz permettent d'évaluer la compréhension des élèves et
                  de renforcer leur apprentissage.
                </p>
              </CardContent>
            </Card>
          )}

          <Button onClick={addQuiz} className="w-full">
            <Plus className="h-4 w-4 mr-2" /> Créer un nouveau quiz
          </Button>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CourseCreator;
