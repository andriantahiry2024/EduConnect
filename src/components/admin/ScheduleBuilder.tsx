import React, { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  Clock,
  Calendar as CalendarIcon,
  Plus,
  Edit,
  Trash2,
  Users,
  BookOpen,
  Award,
} from "lucide-react";

interface ScheduleItem {
  id: string;
  title: string;
  type: "class" | "exam" | "meeting";
  date: Date;
  startTime: string;
  endTime: string;
  location: string;
  participants: string[];
  description?: string;
}

interface ScheduleBuilderProps {
  scheduleItems?: ScheduleItem[];
  onSave?: (item: ScheduleItem) => void;
  onDelete?: (id: string) => void;
}

const ScheduleBuilder = ({
  scheduleItems = [
    {
      id: "1",
      title: "Mathematics Class",
      type: "class",
      date: new Date(),
      startTime: "08:00",
      endTime: "09:30",
      location: "Room 101",
      participants: ["Grade 10A"],
      description: "Algebra and Geometry",
    },
    {
      id: "2",
      title: "Science Exam",
      type: "exam",
      date: new Date(new Date().setDate(new Date().getDate() + 2)),
      startTime: "10:00",
      endTime: "12:00",
      location: "Main Hall",
      participants: ["Grade 10A", "Grade 10B"],
      description: "Mid-term examination",
    },
    {
      id: "3",
      title: "Parent-Teacher Meeting",
      type: "meeting",
      date: new Date(new Date().setDate(new Date().getDate() + 1)),
      startTime: "16:00",
      endTime: "18:00",
      location: "Conference Room",
      participants: ["Teachers", "Parents"],
      description: "Quarterly progress discussion",
    },
  ],
  onSave = () => {},
  onDelete = () => {},
}: ScheduleBuilderProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date(),
  );
  const [selectedTab, setSelectedTab] = useState("classes");
  const [showNewItemDialog, setShowNewItemDialog] = useState(false);
  const [editingItem, setEditingItem] = useState<ScheduleItem | null>(null);

  // Form state for new/edit item
  const [formData, setFormData] = useState<Partial<ScheduleItem>>({
    title: "",
    type: "class",
    date: new Date(),
    startTime: "",
    endTime: "",
    location: "",
    participants: [],
    description: "",
  });

  const handleNewItem = () => {
    setEditingItem(null);
    setFormData({
      title: "",
      type: "class",
      date: selectedDate || new Date(),
      startTime: "",
      endTime: "",
      location: "",
      participants: [],
      description: "",
    });
    setShowNewItemDialog(true);
  };

  const handleEditItem = (item: ScheduleItem) => {
    setEditingItem(item);
    setFormData(item);
    setShowNewItemDialog(true);
  };

  const handleSaveItem = () => {
    if (
      formData.title &&
      formData.date &&
      formData.startTime &&
      formData.endTime
    ) {
      const newItem: ScheduleItem = {
        id: editingItem ? editingItem.id : Date.now().toString(),
        title: formData.title || "",
        type: formData.type as "class" | "exam" | "meeting",
        date: formData.date as Date,
        startTime: formData.startTime || "",
        endTime: formData.endTime || "",
        location: formData.location || "",
        participants: formData.participants || [],
        description: formData.description,
      };

      onSave(newItem);
      setShowNewItemDialog(false);
    }
  };

  const handleDeleteItem = (id: string) => {
    onDelete(id);
  };

  const filteredItems = scheduleItems.filter((item) => {
    // Filter by selected date if available
    if (selectedDate) {
      const itemDate = new Date(item.date);
      if (
        itemDate.getDate() !== selectedDate.getDate() ||
        itemDate.getMonth() !== selectedDate.getMonth() ||
        itemDate.getFullYear() !== selectedDate.getFullYear()
      ) {
        return false;
      }
    }

    // Filter by selected tab
    if (selectedTab === "classes" && item.type !== "class") return false;
    if (selectedTab === "exams" && item.type !== "exam") return false;
    if (selectedTab === "meetings" && item.type !== "meeting") return false;

    return true;
  });

  const getItemIcon = (type: string) => {
    switch (type) {
      case "class":
        return <BookOpen className="h-4 w-4 mr-2" />;
      case "exam":
        return <Award className="h-4 w-4 mr-2" />;
      case "meeting":
        return <Users className="h-4 w-4 mr-2" />;
      default:
        return <CalendarIcon className="h-4 w-4 mr-2" />;
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Calendar Section */}
        <div className="md:w-1/3">
          <Card>
            <CardHeader>
              <CardTitle>Calendar</CardTitle>
              <CardDescription>
                Select a date to view or create schedule items
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="rounded-md border"
              />
            </CardContent>
            <CardFooter>
              <Button onClick={handleNewItem} className="w-full">
                <Plus className="mr-2 h-4 w-4" /> Add New Item
              </Button>
            </CardFooter>
          </Card>
        </div>

        {/* Schedule Items Section */}
        <div className="md:w-2/3">
          <Card>
            <CardHeader>
              <CardTitle>Schedule Items</CardTitle>
              <CardDescription>
                {selectedDate
                  ? `Items for ${selectedDate.toLocaleDateString()}`
                  : "All scheduled items"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs
                defaultValue="classes"
                value={selectedTab}
                onValueChange={setSelectedTab}
              >
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="classes">Classes</TabsTrigger>
                  <TabsTrigger value="exams">Exams</TabsTrigger>
                  <TabsTrigger value="meetings">Meetings</TabsTrigger>
                </TabsList>

                {["classes", "exams", "meetings"].map((tab) => (
                  <TabsContent key={tab} value={tab} className="space-y-4 mt-4">
                    {filteredItems.length > 0 ? (
                      filteredItems.map((item) => (
                        <Card key={item.id}>
                          <CardContent className="p-4">
                            <div className="flex justify-between items-start">
                              <div>
                                <div className="flex items-center">
                                  {getItemIcon(item.type)}
                                  <h3 className="text-lg font-semibold">
                                    {item.title}
                                  </h3>
                                </div>
                                <div className="mt-2 text-sm text-gray-600">
                                  <div className="flex items-center mt-1">
                                    <CalendarIcon className="h-4 w-4 mr-2" />
                                    {new Date(item.date).toLocaleDateString()}
                                  </div>
                                  <div className="flex items-center mt-1">
                                    <Clock className="h-4 w-4 mr-2" />
                                    {item.startTime} - {item.endTime}
                                  </div>
                                  <div className="mt-1">
                                    <strong>Location:</strong> {item.location}
                                  </div>
                                  {item.description && (
                                    <div className="mt-1">
                                      <strong>Description:</strong>{" "}
                                      {item.description}
                                    </div>
                                  )}
                                  <div className="mt-1">
                                    <strong>Participants:</strong>{" "}
                                    {item.participants.join(", ")}
                                  </div>
                                </div>
                              </div>
                              <div className="flex space-x-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleEditItem(item)}
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleDeleteItem(item.id)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))
                    ) : (
                      <div className="text-center py-8 text-gray-500">
                        No {tab} scheduled for{" "}
                        {selectedDate?.toLocaleDateString() ||
                          "the selected date"}
                        .
                      </div>
                    )}
                  </TabsContent>
                ))}
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* New/Edit Item Dialog */}
      <Dialog open={showNewItemDialog} onOpenChange={setShowNewItemDialog}>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>
              {editingItem ? "Edit Schedule Item" : "Create New Schedule Item"}
            </DialogTitle>
            <DialogDescription>
              Fill in the details for the schedule item. Click save when you're
              done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="title" className="text-right font-medium">
                Title
              </label>
              <Input
                id="title"
                value={formData.title || ""}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="type" className="text-right font-medium">
                Type
              </label>
              <Select
                value={formData.type}
                onValueChange={(value) =>
                  setFormData({
                    ...formData,
                    type: value as "class" | "exam" | "meeting",
                  })
                }
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="class">Class</SelectItem>
                  <SelectItem value="exam">Exam</SelectItem>
                  <SelectItem value="meeting">Meeting</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="date" className="text-right font-medium">
                Date
              </label>
              <div className="col-span-3">
                <Calendar
                  mode="single"
                  selected={formData.date}
                  onSelect={(date) => setFormData({ ...formData, date })}
                  className="rounded-md border"
                />
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="startTime" className="text-right font-medium">
                Start Time
              </label>
              <Input
                id="startTime"
                type="time"
                value={formData.startTime || ""}
                onChange={(e) =>
                  setFormData({ ...formData, startTime: e.target.value })
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="endTime" className="text-right font-medium">
                End Time
              </label>
              <Input
                id="endTime"
                type="time"
                value={formData.endTime || ""}
                onChange={(e) =>
                  setFormData({ ...formData, endTime: e.target.value })
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="location" className="text-right font-medium">
                Location
              </label>
              <Input
                id="location"
                value={formData.location || ""}
                onChange={(e) =>
                  setFormData({ ...formData, location: e.target.value })
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="participants" className="text-right font-medium">
                Participants
              </label>
              <Input
                id="participants"
                value={formData.participants?.join(", ") || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    participants: e.target.value
                      .split(",")
                      .map((p) => p.trim()),
                  })
                }
                placeholder="Enter comma-separated participants"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="description" className="text-right font-medium">
                Description
              </label>
              <Input
                id="description"
                value={formData.description || ""}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowNewItemDialog(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleSaveItem}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ScheduleBuilder;
