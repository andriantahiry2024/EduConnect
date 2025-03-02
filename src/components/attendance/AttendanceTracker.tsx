import React, { useState } from "react";
import { format } from "date-fns";
import {
  Calendar,
  Clock,
  Search,
  Filter,
  Download,
  Check,
  X,
  AlertCircle,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Student {
  id: string;
  name: string;
  grade: string;
  status?: "present" | "absent" | "late" | "excused";
  notes?: string;
}

interface AttendanceRecord {
  date: string;
  class: string;
  students: Student[];
  submitted: boolean;
}

const mockStudents: Student[] = [
  { id: "1", name: "Emma Thompson", grade: "10A" },
  { id: "2", name: "Noah Williams", grade: "10A" },
  { id: "3", name: "Olivia Martinez", grade: "10A" },
  { id: "4", name: "Liam Johnson", grade: "10A" },
  { id: "5", name: "Ava Brown", grade: "10A" },
  { id: "6", name: "Sophia Davis", grade: "10A" },
  { id: "7", name: "Jackson Miller", grade: "10A" },
  { id: "8", name: "Isabella Wilson", grade: "10A" },
  { id: "9", name: "Lucas Moore", grade: "10A" },
  { id: "10", name: "Mia Taylor", grade: "10A" },
];

const mockClasses = [
  "Mathematics - 10A",
  "Physics - 10A",
  "Literature - 10A",
  "History - 10A",
  "Chemistry - 10A",
];

const mockAttendanceHistory: AttendanceRecord[] = [
  {
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

const AttendanceTracker: React.FC = () => {
  const [activeTab, setActiveTab] = useState("take-attendance");
  const [selectedClass, setSelectedClass] = useState(mockClasses[0]);
  const [searchQuery, setSearchQuery] = useState("");
  const [attendanceData, setAttendanceData] = useState<Student[]>(
    mockStudents.map((student) => ({ ...student })),
  );

  const filteredStudents = attendanceData.filter((student) =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleStatusChange = (
    studentId: string,
    status: "present" | "absent" | "late" | "excused",
  ) => {
    setAttendanceData((prev) =>
      prev.map((student) =>
        student.id === studentId ? { ...student, status } : student,
      ),
    );
  };

  const handleNotesChange = (studentId: string, notes: string) => {
    setAttendanceData((prev) =>
      prev.map((student) =>
        student.id === studentId ? { ...student, notes } : student,
      ),
    );
  };

  const getStatusBadge = (status?: string) => {
    switch (status) {
      case "present":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
            Present
          </Badge>
        );
      case "absent":
        return (
          <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
            Absent
          </Badge>
        );
      case "late":
        return (
          <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">
            Late
          </Badge>
        );
      case "excused":
        return (
          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
            Excused
          </Badge>
        );
      default:
        return (
          <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">
            Not Marked
          </Badge>
        );
    }
  };

  const getStatusIcon = (status?: string) => {
    switch (status) {
      case "present":
        return <Check className="h-5 w-5 text-green-500" />;
      case "absent":
        return <X className="h-5 w-5 text-red-500" />;
      case "late":
        return <Clock className="h-5 w-5 text-amber-500" />;
      case "excused":
        return <AlertCircle className="h-5 w-5 text-blue-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="w-full h-full p-6 bg-white rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Attendance Tracker</h1>
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
        defaultValue="take-attendance"
        value={activeTab}
        onValueChange={setActiveTab}
      >
        <TabsList className="mb-4">
          <TabsTrigger value="take-attendance">Take Attendance</TabsTrigger>
          <TabsTrigger value="history">Attendance History</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        {/* Take Attendance Tab */}
        <TabsContent value="take-attendance" className="space-y-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
              <div className="w-full md:w-64">
                <Select value={selectedClass} onValueChange={setSelectedClass}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select class" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockClasses.map((cls) => (
                      <SelectItem key={cls} value={cls}>
                        {cls}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-gray-500" />
                <span className="font-medium">
                  {format(new Date(), "MMMM d, yyyy")}
                </span>
              </div>
            </div>
            <div className="relative w-full md:w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search students..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">
                {selectedClass} Attendance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[50px]">No.</TableHead>
                    <TableHead>Student Name</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Notes</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredStudents.map((student, index) => (
                    <TableRow key={student.id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell className="font-medium">
                        {student.name}
                      </TableCell>
                      <TableCell>{getStatusBadge(student.status)}</TableCell>
                      <TableCell>
                        <Input
                          placeholder="Add notes (optional)"
                          value={student.notes || ""}
                          onChange={(e) =>
                            handleNotesChange(student.id, e.target.value)
                          }
                          className="h-8"
                        />
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-1">
                          <Button
                            variant={
                              student.status === "present"
                                ? "default"
                                : "outline"
                            }
                            size="sm"
                            className="h-8 w-8 p-0"
                            onClick={() =>
                              handleStatusChange(student.id, "present")
                            }
                          >
                            <Check className="h-4 w-4" />
                          </Button>
                          <Button
                            variant={
                              student.status === "absent"
                                ? "default"
                                : "outline"
                            }
                            size="sm"
                            className="h-8 w-8 p-0"
                            onClick={() =>
                              handleStatusChange(student.id, "absent")
                            }
                          >
                            <X className="h-4 w-4" />
                          </Button>
                          <Button
                            variant={
                              student.status === "late" ? "default" : "outline"
                            }
                            size="sm"
                            className="h-8 w-8 p-0"
                            onClick={() =>
                              handleStatusChange(student.id, "late")
                            }
                          >
                            <Clock className="h-4 w-4" />
                          </Button>
                          <Button
                            variant={
                              student.status === "excused"
                                ? "default"
                                : "outline"
                            }
                            size="sm"
                            className="h-8 w-8 p-0"
                            onClick={() =>
                              handleStatusChange(student.id, "excused")
                            }
                          >
                            <AlertCircle className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <div className="mt-4 flex justify-end gap-2">
                <Button variant="outline">Save Draft</Button>
                <Button>Submit Attendance</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Attendance History Tab */}
        <TabsContent value="history" className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="relative w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search records..." className="pl-8" />
            </div>
            <div className="flex gap-2">
              <Select defaultValue="all">
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Filter by class" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Classes</SelectItem>
                  {mockClasses.map((cls) => (
                    <SelectItem key={cls} value={cls}>
                      {cls}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon">
                <Calendar className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Class</TableHead>
                    <TableHead>Present</TableHead>
                    <TableHead>Absent</TableHead>
                    <TableHead>Late</TableHead>
                    <TableHead>Excused</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockAttendanceHistory.map((record) => {
                    const presentCount = record.students.filter(
                      (s) => s.status === "present",
                    ).length;
                    const absentCount = record.students.filter(
                      (s) => s.status === "absent",
                    ).length;
                    const lateCount = record.students.filter(
                      (s) => s.status === "late",
                    ).length;
                    const excusedCount = record.students.filter(
                      (s) => s.status === "excused",
                    ).length;

                    return (
                      <TableRow key={`${record.date}-${record.class}`}>
                        <TableCell>
                          {format(new Date(record.date), "MMM d, yyyy")}
                        </TableCell>
                        <TableCell>{record.class}</TableCell>
                        <TableCell>{presentCount}</TableCell>
                        <TableCell>{absentCount}</TableCell>
                        <TableCell>{lateCount}</TableCell>
                        <TableCell>{excusedCount}</TableCell>
                        <TableCell>
                          {record.submitted ? (
                            <Badge className="bg-green-100 text-green-800">
                              Submitted
                            </Badge>
                          ) : (
                            <Badge variant="outline">Draft</Badge>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">
                            View
                          </Button>
                          <Button variant="ghost" size="sm">
                            Edit
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Reports Tab */}
        <TabsContent value="reports" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Attendance Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Present Rate</span>
                    <span className="font-bold text-green-600">92%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-green-600 h-2.5 rounded-full"
                      style={{ width: "92%" }}
                    ></div>
                  </div>

                  <div className="flex justify-between items-center">
                    <span>Absent Rate</span>
                    <span className="font-bold text-red-600">5%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-red-600 h-2.5 rounded-full"
                      style={{ width: "5%" }}
                    ></div>
                  </div>

                  <div className="flex justify-between items-center">
                    <span>Late Rate</span>
                    <span className="font-bold text-amber-600">3%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-amber-600 h-2.5 rounded-full"
                      style={{ width: "3%" }}
                    ></div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Class Comparison</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockClasses.slice(0, 3).map((cls, index) => (
                    <div key={cls} className="space-y-1">
                      <div className="flex justify-between items-center">
                        <span>{cls}</span>
                        <span className="font-bold">{90 + index}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div
                          className="bg-blue-600 h-2.5 rounded-full"
                          style={{ width: `${90 + index}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Recent Absences</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockAttendanceHistory
                    .flatMap((record) =>
                      record.students
                        .filter((student) => student.status === "absent")
                        .map((student) => ({
                          name: student.name,
                          date: record.date,
                          class: record.class,
                          notes: student.notes,
                        })),
                    )
                    .slice(0, 3)
                    .map((absence, index) => (
                      <div
                        key={index}
                        className="flex items-start space-x-2 p-2 rounded-md bg-red-50"
                      >
                        <X className="h-5 w-5 text-red-500 mt-0.5" />
                        <div>
                          <p className="font-medium">{absence.name}</p>
                          <p className="text-sm text-gray-600">
                            {format(new Date(absence.date), "MMM d, yyyy")} -{" "}
                            {absence.class}
                          </p>
                          {absence.notes && (
                            <p className="text-sm text-gray-500">
                              {absence.notes}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Generate Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button variant="outline" className="h-auto p-4 justify-start">
                  <div className="flex flex-col items-start">
                    <span className="font-medium">
                      Monthly Attendance Report
                    </span>
                    <span className="text-sm text-muted-foreground">
                      Comprehensive monthly statistics
                    </span>
                  </div>
                </Button>
                <Button variant="outline" className="h-auto p-4 justify-start">
                  <div className="flex flex-col items-start">
                    <span className="font-medium">
                      Student Attendance Report
                    </span>
                    <span className="text-sm text-muted-foreground">
                      Individual student attendance
                    </span>
                  </div>
                </Button>
                <Button variant="outline" className="h-auto p-4 justify-start">
                  <div className="flex flex-col items-start">
                    <span className="font-medium">Class Comparison Report</span>
                    <span className="text-sm text-muted-foreground">
                      Compare attendance across classes
                    </span>
                  </div>
                </Button>
                <Button variant="outline" className="h-auto p-4 justify-start">
                  <div className="flex flex-col items-start">
                    <span className="font-medium">Absence Patterns Report</span>
                    <span className="text-sm text-muted-foreground">
                      Identify patterns in absences
                    </span>
                  </div>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AttendanceTracker;
