import React, { useState } from "react";
import {
  Search,
  Plus,
  Edit,
  Trash2,
  FileText,
  Download,
  Filter,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Student {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  grade: string;
  status: "active" | "inactive" | "pending";
  enrollmentDate: string;
  parentName: string;
  parentEmail: string;
  parentPhone: string;
  address: string;
}

const StudentRecordsManager = () => {
  const [activeTab, setActiveTab] = useState("all-students");
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddStudentDialogOpen, setIsAddStudentDialogOpen] = useState(false);
  const [isViewStudentDialogOpen, setIsViewStudentDialogOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  // Mock data for students
  const mockStudents: Student[] = [
    {
      id: "1001",
      firstName: "Emma",
      lastName: "Johnson",
      email: "emma.j@example.com",
      grade: "10th",
      status: "active",
      enrollmentDate: "2023-09-01",
      parentName: "Michael Johnson",
      parentEmail: "michael.j@example.com",
      parentPhone: "(555) 123-4567",
      address: "123 Main St, Anytown, AN 12345",
    },
    {
      id: "1002",
      firstName: "Noah",
      lastName: "Williams",
      email: "noah.w@example.com",
      grade: "9th",
      status: "active",
      enrollmentDate: "2023-09-01",
      parentName: "Sarah Williams",
      parentEmail: "sarah.w@example.com",
      parentPhone: "(555) 234-5678",
      address: "456 Oak Ave, Anytown, AN 12345",
    },
    {
      id: "1003",
      firstName: "Olivia",
      lastName: "Brown",
      email: "olivia.b@example.com",
      grade: "11th",
      status: "inactive",
      enrollmentDate: "2022-09-01",
      parentName: "David Brown",
      parentEmail: "david.b@example.com",
      parentPhone: "(555) 345-6789",
      address: "789 Pine Rd, Anytown, AN 12345",
    },
    {
      id: "1004",
      firstName: "Liam",
      lastName: "Davis",
      email: "liam.d@example.com",
      grade: "12th",
      status: "active",
      enrollmentDate: "2020-09-01",
      parentName: "Jennifer Davis",
      parentEmail: "jennifer.d@example.com",
      parentPhone: "(555) 456-7890",
      address: "101 Maple Dr, Anytown, AN 12345",
    },
    {
      id: "1005",
      firstName: "Ava",
      lastName: "Miller",
      email: "ava.m@example.com",
      grade: "10th",
      status: "pending",
      enrollmentDate: "2023-08-15",
      parentName: "Robert Miller",
      parentEmail: "robert.m@example.com",
      parentPhone: "(555) 567-8901",
      address: "202 Cedar Ln, Anytown, AN 12345",
    },
  ];

  const filteredStudents = mockStudents.filter((student) => {
    const searchLower = searchQuery.toLowerCase();
    const fullName = `${student.firstName} ${student.lastName}`.toLowerCase();
    const matchesSearch =
      fullName.includes(searchLower) ||
      student.email.toLowerCase().includes(searchLower) ||
      student.id.toLowerCase().includes(searchLower);

    if (activeTab === "all-students") return matchesSearch;
    if (activeTab === "active-students")
      return matchesSearch && student.status === "active";
    if (activeTab === "inactive-students")
      return matchesSearch && student.status === "inactive";
    if (activeTab === "pending-students")
      return matchesSearch && student.status === "pending";
    return false;
  });

  const handleViewStudent = (student: Student) => {
    setSelectedStudent(student);
    setIsViewStudentDialogOpen(true);
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "inactive":
        return "bg-gray-100 text-gray-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          Student Records Management
        </h1>
        <Button onClick={() => setIsAddStudentDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> Add New Student
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card className="bg-blue-50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Total Students
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{mockStudents.length}</p>
          </CardContent>
        </Card>

        <Card className="bg-green-50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Active Students
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              {mockStudents.filter((s) => s.status === "active").length}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-yellow-50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Pending Registrations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              {mockStudents.filter((s) => s.status === "pending").length}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gray-50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Inactive Students
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              {mockStudents.filter((s) => s.status === "inactive").length}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="mb-6">
        <Tabs defaultValue="all-students" onValueChange={setActiveTab}>
          <div className="flex justify-between items-center">
            <TabsList>
              <TabsTrigger value="all-students">All Students</TabsTrigger>
              <TabsTrigger value="active-students">Active</TabsTrigger>
              <TabsTrigger value="pending-students">Pending</TabsTrigger>
              <TabsTrigger value="inactive-students">Inactive</TabsTrigger>
            </TabsList>

            <div className="flex space-x-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  type="search"
                  placeholder="Search students..."
                  className="pl-8 w-64"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Filter by Grade</DropdownMenuItem>
                  <DropdownMenuItem>Filter by Enrollment Date</DropdownMenuItem>
                  <DropdownMenuItem>Clear Filters</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Button variant="outline" size="icon">
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <TabsContent value="all-students" className="mt-6">
            <StudentTable
              students={filteredStudents}
              onViewStudent={handleViewStudent}
              getStatusBadgeColor={getStatusBadgeColor}
            />
          </TabsContent>

          <TabsContent value="active-students" className="mt-6">
            <StudentTable
              students={filteredStudents}
              onViewStudent={handleViewStudent}
              getStatusBadgeColor={getStatusBadgeColor}
            />
          </TabsContent>

          <TabsContent value="pending-students" className="mt-6">
            <StudentTable
              students={filteredStudents}
              onViewStudent={handleViewStudent}
              getStatusBadgeColor={getStatusBadgeColor}
            />
          </TabsContent>

          <TabsContent value="inactive-students" className="mt-6">
            <StudentTable
              students={filteredStudents}
              onViewStudent={handleViewStudent}
              getStatusBadgeColor={getStatusBadgeColor}
            />
          </TabsContent>
        </Tabs>
      </div>

      {/* Add Student Dialog */}
      <Dialog
        open={isAddStudentDialogOpen}
        onOpenChange={setIsAddStudentDialogOpen}
      >
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>Add New Student</DialogTitle>
            <DialogDescription>
              Enter the student's information below to create a new student
              record.
            </DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
            <div className="space-y-2">
              <label htmlFor="firstName" className="text-sm font-medium">
                First Name
              </label>
              <Input id="firstName" placeholder="Enter first name" />
            </div>

            <div className="space-y-2">
              <label htmlFor="lastName" className="text-sm font-medium">
                Last Name
              </label>
              <Input id="lastName" placeholder="Enter last name" />
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="student@example.com"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="grade" className="text-sm font-medium">
                Grade
              </label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select grade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="9th">9th Grade</SelectItem>
                  <SelectItem value="10th">10th Grade</SelectItem>
                  <SelectItem value="11th">11th Grade</SelectItem>
                  <SelectItem value="12th">12th Grade</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label htmlFor="enrollmentDate" className="text-sm font-medium">
                Enrollment Date
              </label>
              <Input id="enrollmentDate" type="date" />
            </div>

            <div className="space-y-2">
              <label htmlFor="status" className="text-sm font-medium">
                Status
              </label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label htmlFor="parentName" className="text-sm font-medium">
                Parent/Guardian Name
              </label>
              <Input id="parentName" placeholder="Enter parent name" />
            </div>

            <div className="space-y-2">
              <label htmlFor="parentEmail" className="text-sm font-medium">
                Parent/Guardian Email
              </label>
              <Input
                id="parentEmail"
                type="email"
                placeholder="parent@example.com"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="parentPhone" className="text-sm font-medium">
                Parent/Guardian Phone
              </label>
              <Input id="parentPhone" placeholder="(555) 123-4567" />
            </div>

            <div className="space-y-2 md:col-span-2">
              <label htmlFor="address" className="text-sm font-medium">
                Address
              </label>
              <Input id="address" placeholder="Enter full address" />
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsAddStudentDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={() => setIsAddStudentDialogOpen(false)}>
              Add Student
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Student Dialog */}
      <Dialog
        open={isViewStudentDialogOpen}
        onOpenChange={setIsViewStudentDialogOpen}
      >
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>Student Information</DialogTitle>
          </DialogHeader>

          {selectedStudent && (
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="h-16 w-16 rounded-full bg-gray-200 flex items-center justify-center">
                  <span className="text-xl font-bold text-gray-600">
                    {selectedStudent.firstName.charAt(0)}
                    {selectedStudent.lastName.charAt(0)}
                  </span>
                </div>
                <div>
                  <h3 className="text-xl font-bold">
                    {selectedStudent.firstName} {selectedStudent.lastName}
                  </h3>
                  <div className="flex items-center space-x-2">
                    <Badge
                      className={getStatusBadgeColor(selectedStudent.status)}
                    >
                      {selectedStudent.status.charAt(0).toUpperCase() +
                        selectedStudent.status.slice(1)}
                    </Badge>
                    <span className="text-sm text-gray-500">
                      ID: {selectedStudent.id}
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">Email</p>
                  <p>{selectedStudent.email}</p>
                </div>

                <div className="space-y-1">
                  <p className="text-sm text-gray-500">Grade</p>
                  <p>{selectedStudent.grade}</p>
                </div>

                <div className="space-y-1">
                  <p className="text-sm text-gray-500">Enrollment Date</p>
                  <p>
                    {new Date(
                      selectedStudent.enrollmentDate,
                    ).toLocaleDateString()}
                  </p>
                </div>

                <div className="space-y-1">
                  <p className="text-sm text-gray-500">Address</p>
                  <p>{selectedStudent.address}</p>
                </div>
              </div>

              <div className="border-t pt-4">
                <h4 className="font-medium mb-3">
                  Parent/Guardian Information
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-sm text-gray-500">Name</p>
                    <p>{selectedStudent.parentName}</p>
                  </div>

                  <div className="space-y-1">
                    <p className="text-sm text-gray-500">Email</p>
                    <p>{selectedStudent.parentEmail}</p>
                  </div>

                  <div className="space-y-1">
                    <p className="text-sm text-gray-500">Phone</p>
                    <p>{selectedStudent.parentPhone}</p>
                  </div>
                </div>
              </div>

              <div className="border-t pt-4 flex justify-end space-x-2">
                <Button variant="outline" size="sm">
                  <FileText className="mr-2 h-4 w-4" /> Academic Records
                </Button>
                <Button variant="outline" size="sm">
                  <Edit className="mr-2 h-4 w-4" /> Edit
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

interface StudentTableProps {
  students: Student[];
  onViewStudent: (student: Student) => void;
  getStatusBadgeColor: (status: string) => string;
}

const StudentTable = ({
  students = [],
  onViewStudent = () => {},
  getStatusBadgeColor = () => "bg-gray-100",
}: StudentTableProps) => {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[80px]">ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Grade</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Enrollment Date</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {students.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-6 text-gray-500">
                No students found
              </TableCell>
            </TableRow>
          ) : (
            students.map((student) => (
              <TableRow key={student.id}>
                <TableCell className="font-medium">{student.id}</TableCell>
                <TableCell>
                  {student.firstName} {student.lastName}
                </TableCell>
                <TableCell>{student.email}</TableCell>
                <TableCell>{student.grade}</TableCell>
                <TableCell>
                  <Badge className={getStatusBadgeColor(student.status)}>
                    {student.status.charAt(0).toUpperCase() +
                      student.status.slice(1)}
                  </Badge>
                </TableCell>
                <TableCell>
                  {new Date(student.enrollmentDate).toLocaleDateString()}
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => onViewStudent(student)}>
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      {students.length > 0 && (
        <div className="flex items-center justify-end space-x-2 py-4 px-4 border-t">
          <div className="text-sm text-gray-500">
            Showing <span className="font-medium">{students.length}</span> of{" "}
            <span className="font-medium">{students.length}</span> students
          </div>
          <div className="space-x-2">
            <Button variant="outline" size="icon" disabled>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" disabled>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentRecordsManager;
