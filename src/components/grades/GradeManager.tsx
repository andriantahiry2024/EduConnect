import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "../ui/table";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "../ui/dialog";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../ui/select";
import {
  PlusCircle,
  FileText,
  Edit,
  Trash2,
  Search,
  Download,
  Filter,
} from "lucide-react";

interface Student {
  id: string;
  name: string;
  grade?: string;
  status?: "submitted" | "graded" | "pending";
}

interface Assessment {
  id: string;
  title: string;
  type: string;
  dueDate: string;
  totalPoints: number;
  status: "draft" | "published" | "closed";
}

interface GradeManagerProps {
  students?: Student[];
  assessments?: Assessment[];
  className?: string;
}

const GradeManager = ({
  students = [
    { id: "1", name: "Emma Thompson", grade: "85", status: "graded" },
    { id: "2", name: "Liam Johnson", grade: "92", status: "graded" },
    { id: "3", name: "Olivia Martinez", grade: "", status: "pending" },
    { id: "4", name: "Noah Williams", grade: "78", status: "graded" },
    { id: "5", name: "Ava Brown", grade: "", status: "submitted" },
  ],
  assessments = [
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
  ],
  className = "",
}: GradeManagerProps) => {
  const [activeTab, setActiveTab] = useState("assessments");
  const [isNewAssessmentDialogOpen, setIsNewAssessmentDialogOpen] =
    useState(false);
  const [isGradeDialogOpen, setIsGradeDialogOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Filter students based on search query
  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="w-full h-full p-6 bg-white rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Grade Manager</h1>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>
      </div>

      <Tabs
        defaultValue="assessments"
        className="w-full"
        onValueChange={setActiveTab}
      >
        <TabsList className="mb-4">
          <TabsTrigger value="assessments">Assessments</TabsTrigger>
          <TabsTrigger value="gradebook">Gradebook</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        {/* Assessments Tab */}
        <TabsContent value="assessments" className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="relative w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search assessments..." className="pl-8" />
            </div>
            <Dialog
              open={isNewAssessmentDialogOpen}
              onOpenChange={setIsNewAssessmentDialogOpen}
            >
              <DialogTrigger asChild>
                <Button>
                  <PlusCircle className="h-4 w-4 mr-2" />
                  New Assessment
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New Assessment</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label htmlFor="title" className="text-right">
                      Title
                    </label>
                    <Input
                      id="title"
                      className="col-span-3"
                      placeholder="Enter assessment title"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label htmlFor="type" className="text-right">
                      Type
                    </label>
                    <Select>
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="exam">Exam</SelectItem>
                        <SelectItem value="quiz">Quiz</SelectItem>
                        <SelectItem value="assignment">Assignment</SelectItem>
                        <SelectItem value="project">Project</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label htmlFor="dueDate" className="text-right">
                      Due Date
                    </label>
                    <Input id="dueDate" type="date" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label htmlFor="points" className="text-right">
                      Total Points
                    </label>
                    <Input
                      id="points"
                      type="number"
                      className="col-span-3"
                      placeholder="Enter total points"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => setIsNewAssessmentDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button onClick={() => setIsNewAssessmentDialogOpen(false)}>
                    Create
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Total Points</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {assessments.map((assessment) => (
                <TableRow key={assessment.id}>
                  <TableCell className="font-medium">
                    {assessment.title}
                  </TableCell>
                  <TableCell>{assessment.type}</TableCell>
                  <TableCell>{assessment.dueDate}</TableCell>
                  <TableCell>{assessment.totalPoints}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${assessment.status === "published" ? "bg-green-100 text-green-800" : assessment.status === "draft" ? "bg-gray-100 text-gray-800" : "bg-blue-100 text-blue-800"}`}
                    >
                      {assessment.status.charAt(0).toUpperCase() +
                        assessment.status.slice(1)}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>

        {/* Gradebook Tab */}
        <TabsContent value="gradebook" className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="relative w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search students..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Select assessment" />
              </SelectTrigger>
              <SelectContent>
                {assessments.map((assessment) => (
                  <SelectItem key={assessment.id} value={assessment.id}>
                    {assessment.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student Name</TableHead>
                <TableHead>Grade</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudents.map((student) => (
                <TableRow key={student.id}>
                  <TableCell className="font-medium">{student.name}</TableCell>
                  <TableCell>{student.grade || "-"}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${student.status === "graded" ? "bg-green-100 text-green-800" : student.status === "submitted" ? "bg-blue-100 text-blue-800" : "bg-yellow-100 text-yellow-800"}`}
                    >
                      {student.status?.charAt(0).toUpperCase() +
                        student.status?.slice(1) || "Pending"}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <Dialog
                      open={
                        isGradeDialogOpen && selectedStudent?.id === student.id
                      }
                      onOpenChange={(open) => {
                        setIsGradeDialogOpen(open);
                        if (open) setSelectedStudent(student);
                      }}
                    >
                      <DialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSelectedStudent(student)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>
                            Enter Grade for {selectedStudent?.name}
                          </DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="grid grid-cols-4 items-center gap-4">
                            <label htmlFor="grade" className="text-right">
                              Grade
                            </label>
                            <Input
                              id="grade"
                              className="col-span-3"
                              placeholder="Enter grade"
                              defaultValue={selectedStudent?.grade}
                            />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <label htmlFor="feedback" className="text-right">
                              Feedback
                            </label>
                            <textarea
                              id="feedback"
                              className="col-span-3 min-h-[100px] p-2 border rounded-md"
                              placeholder="Enter feedback for student"
                            />
                          </div>
                        </div>
                        <DialogFooter>
                          <Button
                            variant="outline"
                            onClick={() => setIsGradeDialogOpen(false)}
                          >
                            Cancel
                          </Button>
                          <Button onClick={() => setIsGradeDialogOpen(false)}>
                            Save Grade
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                    <Button variant="ghost" size="sm">
                      <FileText className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>

        {/* Reports Tab */}
        <TabsContent value="reports" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-6 border rounded-lg bg-card">
              <h3 className="text-lg font-medium mb-2">Class Average</h3>
              <div className="text-3xl font-bold">84.2%</div>
              <p className="text-sm text-muted-foreground mt-2">
                Across all assessments
              </p>
            </div>
            <div className="p-6 border rounded-lg bg-card">
              <h3 className="text-lg font-medium mb-2">Completion Rate</h3>
              <div className="text-3xl font-bold">92%</div>
              <p className="text-sm text-muted-foreground mt-2">
                Students submitting on time
              </p>
            </div>
            <div className="p-6 border rounded-lg bg-card">
              <h3 className="text-lg font-medium mb-2">Grade Distribution</h3>
              <div className="h-20 flex items-end space-x-2">
                <div className="bg-blue-500 w-8 h-[20%] rounded-t-sm"></div>
                <div className="bg-blue-500 w-8 h-[30%] rounded-t-sm"></div>
                <div className="bg-blue-500 w-8 h-[80%] rounded-t-sm"></div>
                <div className="bg-blue-500 w-8 h-[60%] rounded-t-sm"></div>
                <div className="bg-blue-500 w-8 h-[40%] rounded-t-sm"></div>
              </div>
              <div className="flex justify-between text-xs text-muted-foreground mt-2">
                <span>F</span>
                <span>D</span>
                <span>C</span>
                <span>B</span>
                <span>A</span>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-lg font-medium mb-4">Generate Reports</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 border rounded-lg flex items-center space-x-4 cursor-pointer hover:bg-muted/50">
                <div className="p-2 bg-primary/10 rounded-full">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium">Individual Student Report</h4>
                  <p className="text-sm text-muted-foreground">
                    Generate detailed report for a specific student
                  </p>
                </div>
              </div>
              <div className="p-4 border rounded-lg flex items-center space-x-4 cursor-pointer hover:bg-muted/50">
                <div className="p-2 bg-primary/10 rounded-full">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium">Class Performance Report</h4>
                  <p className="text-sm text-muted-foreground">
                    Overview of entire class performance
                  </p>
                </div>
              </div>
              <div className="p-4 border rounded-lg flex items-center space-x-4 cursor-pointer hover:bg-muted/50">
                <div className="p-2 bg-primary/10 rounded-full">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium">Assessment Analysis</h4>
                  <p className="text-sm text-muted-foreground">
                    Detailed breakdown of assessment results
                  </p>
                </div>
              </div>
              <div className="p-4 border rounded-lg flex items-center space-x-4 cursor-pointer hover:bg-muted/50">
                <div className="p-2 bg-primary/10 rounded-full">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium">Progress Report</h4>
                  <p className="text-sm text-muted-foreground">
                    Track student progress over time
                  </p>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default GradeManager;
