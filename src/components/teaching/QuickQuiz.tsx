import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Clock, Plus, X, Send, Save } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface QuickQuizProps {
  onSave?: (quizData: any) => void;
  onSend?: (quizData: any) => void;
}

const QuickQuiz: React.FC<QuickQuizProps> = ({ onSave, onSend }) => {
  const [quizTitle, setQuizTitle] = useState("Quiz rapide");
  const [questions, setQuestions] = useState<
    Array<{
      id: string;
      text: string;
      type: "multiple" | "true-false" | "short-answer";
      options: Array<{ id: string; text: string; isCorrect: boolean }>;
    }>
  >([
    {
      id: "1",
      text: "",
      type: "multiple",
      options: [
        { id: "o1", text: "", isCorrect: false },
        { id: "o2", text: "", isCorrect: false },
        { id: "o3", text: "", isCorrect: false },
        { id: "o4", text: "", isCorrect: false },
      ],
    },
  ]);

  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        id: Date.now().toString(),
        text: "",
        type: "multiple",
        options: [
          { id: `o1-${Date.now()}`, text: "", isCorrect: false },
          { id: `o2-${Date.now()}`, text: "", isCorrect: false },
          { id: `o3-${Date.now()}`, text: "", isCorrect: false },
          { id: `o4-${Date.now()}`, text: "", isCorrect: false },
        ],
      },
    ]);
  };

  const removeQuestion = (id: string) => {
    if (questions.length > 1) {
      setQuestions(questions.filter((q) => q.id !== id));
    }
  };

  const updateQuestion = (id: string, field: string, value: any) => {
    setQuestions(
      questions.map((q) => (q.id === id ? { ...q, [field]: value } : q)),
    );
  };

  const updateQuestionType = (
    id: string,
    type: "multiple" | "true-false" | "short-answer",
  ) => {
    setQuestions(
      questions.map((q) => {
        if (q.id === id) {
          let options = q.options;

          if (type === "true-false") {
            options = [
              { id: "true", text: "Vrai", isCorrect: false },
              { id: "false", text: "Faux", isCorrect: false },
            ];
          } else if (type === "short-answer") {
            options = [];
          } else if (q.type === "true-false" || q.type === "short-answer") {
            options = [
              { id: `o1-${Date.now()}`, text: "", isCorrect: false },
              { id: `o2-${Date.now()}`, text: "", isCorrect: false },
              { id: `o3-${Date.now()}`, text: "", isCorrect: false },
              { id: `o4-${Date.now()}`, text: "", isCorrect: false },
            ];
          }

          return { ...q, type, options };
        }
        return q;
      }),
    );
  };

  const updateOption = (
    questionId: string,
    optionId: string,
    field: string,
    value: any,
  ) => {
    setQuestions(
      questions.map((q) => {
        if (q.id === questionId) {
          return {
            ...q,
            options: q.options.map((o) => {
              if (o.id === optionId) {
                if (field === "isCorrect" && value === true) {
                  // If setting this option as correct, make sure other options are not correct
                  return { ...o, [field]: value };
                } else {
                  return { ...o, [field]: value };
                }
              } else if (field === "isCorrect" && value === true) {
                // Make other options not correct
                return { ...o, isCorrect: false };
              }
              return o;
            }),
          };
        }
        return q;
      }),
    );
  };

  const addOption = (questionId: string) => {
    setQuestions(
      questions.map((q) => {
        if (q.id === questionId && q.type === "multiple") {
          return {
            ...q,
            options: [
              ...q.options,
              {
                id: `o${q.options.length + 1}-${Date.now()}`,
                text: "",
                isCorrect: false,
              },
            ],
          };
        }
        return q;
      }),
    );
  };

  const removeOption = (questionId: string, optionId: string) => {
    setQuestions(
      questions.map((q) => {
        if (q.id === questionId && q.options.length > 2) {
          return {
            ...q,
            options: q.options.filter((o) => o.id !== optionId),
          };
        }
        return q;
      }),
    );
  };

  const handleSave = () => {
    // Validate that we have at least one question with content
    const hasValidQuestions = questions.some((q) => q.text.trim() !== "");
    if (!hasValidQuestions) {
      alert("Veuillez ajouter au moins une question avec du contenu");
      return;
    }

    const quizData = {
      title: quizTitle,
      questions,
      createdAt: new Date(),
    };

    if (onSave) {
      onSave(quizData);
    }
  };

  const handleSend = () => {
    // Validate that we have at least one question with content
    const hasValidQuestions = questions.some((q) => q.text.trim() !== "");
    if (!hasValidQuestions) {
      alert("Veuillez ajouter au moins une question avec du contenu");
      return;
    }

    // Validate that each question has at least one correct answer for multiple choice
    const allQuestionsHaveCorrectAnswers = questions.every((q) => {
      if (q.type === "multiple" || q.type === "true-false") {
        return q.options.some((o) => o.isCorrect);
      }
      return true; // Short answer questions don't need this validation
    });

    if (!allQuestionsHaveCorrectAnswers) {
      alert(
        "Veuillez sélectionner au moins une réponse correcte pour chaque question à choix multiples",
      );
      return;
    }

    const quizData = {
      title: quizTitle,
      questions,
      createdAt: new Date(),
    };

    if (onSend) {
      onSend(quizData);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Quiz Rapide</h2>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleSave}>
            <Save className="mr-2 h-4 w-4" /> Enregistrer
          </Button>
          <Button onClick={handleSend}>
            <Send className="mr-2 h-4 w-4" /> Envoyer aux élèves
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>
              <Input
                value={quizTitle}
                onChange={(e) => setQuizTitle(e.target.value)}
                placeholder="Titre du quiz"
                className="text-xl font-bold border-none p-0 focus-visible:ring-0 max-w-md"
              />
            </CardTitle>
            <Badge variant="outline" className="flex items-center gap-1">
              <Clock className="h-3 w-3" /> {questions.length} question(s)
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {questions.map((question, index) => (
            <div key={question.id} className="border rounded-md p-4 space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-medium">Question {index + 1}</h3>
                <div className="flex items-center gap-2">
                  <div className="flex border rounded-md overflow-hidden">
                    <Button
                      type="button"
                      variant={
                        question.type === "multiple" ? "default" : "ghost"
                      }
                      size="sm"
                      className="rounded-none"
                      onClick={() =>
                        updateQuestionType(question.id, "multiple")
                      }
                    >
                      QCM
                    </Button>
                    <Button
                      type="button"
                      variant={
                        question.type === "true-false" ? "default" : "ghost"
                      }
                      size="sm"
                      className="rounded-none"
                      onClick={() =>
                        updateQuestionType(question.id, "true-false")
                      }
                    >
                      Vrai/Faux
                    </Button>
                    <Button
                      type="button"
                      variant={
                        question.type === "short-answer" ? "default" : "ghost"
                      }
                      size="sm"
                      className="rounded-none"
                      onClick={() =>
                        updateQuestionType(question.id, "short-answer")
                      }
                    >
                      Réponse courte
                    </Button>
                  </div>
                  {questions.length > 1 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeQuestion(question.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor={`question-${question.id}`}>Question</Label>
                <Textarea
                  id={`question-${question.id}`}
                  value={question.text}
                  onChange={(e) =>
                    updateQuestion(question.id, "text", e.target.value)
                  }
                  placeholder="Saisissez votre question ici..."
                />
              </div>

              {question.type === "multiple" && (
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <Label>Options</Label>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => addOption(question.id)}
                    >
                      <Plus className="h-3 w-3 mr-1" /> Ajouter une option
                    </Button>
                  </div>
                  {question.options.map((option, optionIndex) => (
                    <div key={option.id} className="flex items-center gap-2">
                      <input
                        type="radio"
                        id={`option-${option.id}`}
                        name={`question-${question.id}`}
                        checked={option.isCorrect}
                        onChange={() =>
                          updateOption(
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
                            question.id,
                            option.id,
                            "text",
                            e.target.value,
                          )
                        }
                        placeholder={`Option ${optionIndex + 1}`}
                        className="flex-1"
                      />
                      {question.options.length > 2 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeOption(question.id, option.id)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {question.type === "true-false" && (
                <div className="space-y-3">
                  <Label>Options</Label>
                  {question.options.map((option) => (
                    <div key={option.id} className="flex items-center gap-2">
                      <input
                        type="radio"
                        id={`option-${option.id}`}
                        name={`question-${question.id}`}
                        checked={option.isCorrect}
                        onChange={() =>
                          updateOption(
                            question.id,
                            option.id,
                            "isCorrect",
                            true,
                          )
                        }
                      />
                      <Label htmlFor={`option-${option.id}`} className="flex-1">
                        {option.text}
                      </Label>
                    </div>
                  ))}
                </div>
              )}

              {question.type === "short-answer" && (
                <div className="space-y-2">
                  <Label>Réponse attendue</Label>
                  <Input
                    placeholder="Réponse correcte (pour votre référence)"
                    value={question.options[0]?.text || ""}
                    onChange={(e) => {
                      if (question.options.length === 0) {
                        updateQuestion(question.id, "options", [
                          {
                            id: "answer",
                            text: e.target.value,
                            isCorrect: true,
                          },
                        ]);
                      } else {
                        updateOption(
                          question.id,
                          question.options[0].id,
                          "text",
                          e.target.value,
                        );
                      }
                    }}
                  />
                  <p className="text-xs text-gray-500">
                    Les élèves devront saisir leur réponse dans un champ texte.
                  </p>
                </div>
              )}
            </div>
          ))}

          <Button onClick={addQuestion} className="w-full">
            <Plus className="h-4 w-4 mr-2" /> Ajouter une question
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuickQuiz;
