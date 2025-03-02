import React, { useState } from "react";
import {
  format,
  addDays,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  addMonths,
  subMonths,
} from "date-fns";
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Plus,
  Clock,
  MapPin,
  Users,
  Info,
  Filter,
  Download,
  Search,
} from "lucide-react";

import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface Event {
  id: string;
  title: string;
  date: Date;
  startTime: string;
  endTime: string;
  location: string;
  type: "class" | "exam" | "meeting" | "activity";
  description?: string;
  participants?: string[];
}

interface SchoolCalendarProps {
  events?: Event[];
  onAddEvent?: (event: Omit<Event, "id">) => void;
  onEditEvent?: (event: Event) => void;
  onDeleteEvent?: (id: string) => void;
}

const SchoolCalendar: React.FC<SchoolCalendarProps> = ({
  events = [
    {
      id: "1",
      title: "Mathematics Class",
      date: new Date(),
      startTime: "08:00",
      endTime: "09:30",
      location: "Room 101",
      type: "class",
      description: "Algebra and Geometry",
      participants: ["Grade 10A"],
    },
    {
      id: "2",
      title: "Science Exam",
      date: addDays(new Date(), 2),
      startTime: "10:00",
      endTime: "12:00",
      location: "Main Hall",
      type: "exam",
      description: "Mid-term examination",
      participants: ["Grade 10A", "Grade 10B"],
    },
    {
      id: "3",
      title: "Parent-Teacher Meeting",
      date: addDays(new Date(), 1),
      startTime: "16:00",
      endTime: "18:00",
      location: "Conference Room",
      type: "meeting",
      description: "Quarterly progress discussion",
      participants: ["Teachers", "Parents"],
    },
    {
      id: "4",
      title: "Basketball Tournament",
      date: addDays(new Date(), 5),
      startTime: "14:00",
      endTime: "17:00",
      location: "School Gymnasium",
      type: "activity",
      description: "Inter-class basketball tournament",
      participants: ["All Students"],
    },
    {
      id: "5",
      title: "Literature Club",
      date: addDays(new Date(), 3),
      startTime: "15:30",
      endTime: "17:00",
      location: "Library",
      type: "activity",
      description: "Book discussion: To Kill a Mockingbird",
      participants: ["Literature Club Members"],
    },
  ],
  onAddEvent = () => {},
  onEditEvent = () => {},
  onDeleteEvent = () => {},
}) => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [viewMode, setViewMode] = useState<"month" | "week" | "day" | "list">(
    "month",
  );
  const [filterType, setFilterType] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [showEventDialog, setShowEventDialog] = useState<boolean>(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  // New event form state
  const [newEvent, setNewEvent] = useState<Omit<Event, "id">>({
    title: "",
    date: new Date(),
    startTime: "",
    endTime: "",
    location: "",
    type: "class",
    description: "",
    participants: [],
  });

  // Filter events based on selected date, filter type, and search query
  const filteredEvents = events.filter((event) => {
    // Filter by search query
    if (
      searchQuery &&
      !event.title.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }

    // Filter by type
    if (filterType !== "all" && event.type !== filterType) {
      return false;
    }

    // Filter by view mode
    if (viewMode === "day") {
      return isSameDay(event.date, selectedDate);
    } else if (viewMode === "week") {
      const weekStart = startOfWeek(selectedDate);
      const weekEnd = addDays(weekStart, 6);
      return event.date >= weekStart && event.date <= weekEnd;
    } else if (viewMode === "month") {
      return isSameMonth(event.date, currentMonth);
    }

    return true;
  });

  // Helper function to get start of week
  const startOfWeek = (date: Date) => {
    const day = date.getDay();
    return addDays(date, -day);
  };

  // Get days for the current month view
  const getDaysInMonth = () => {
    const start = startOfMonth(currentMonth);
    const end = endOfMonth(currentMonth);
    return eachDayOfInterval({ start, end });
  };

  // Get days for the current week view
  const getDaysInWeek = () => {
    const start = startOfWeek(selectedDate);
    return Array.from({ length: 7 }, (_, i) => addDays(start, i));
  };

  // Handle month navigation
  const handlePreviousMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  // Handle event dialog
  const handleAddEvent = () => {
    setSelectedEvent(null);
    setNewEvent({
      title: "",
      date: selectedDate,
      startTime: "",
      endTime: "",
      location: "",
      type: "class",
      description: "",
      participants: [],
    });
    setShowEventDialog(true);
  };

  const handleEditEvent = (event: Event) => {
    setSelectedEvent(event);
    setNewEvent({
      title: event.title,
      date: event.date,
      startTime: event.startTime,
      endTime: event.endTime,
      location: event.location,
      type: event.type,
      description: event.description || "",
      participants: event.participants || [],
    });
    setShowEventDialog(true);
  };

  const handleSaveEvent = () => {
    if (selectedEvent) {
      onEditEvent({ ...newEvent, id: selectedEvent.id } as Event);
    } else {
      onAddEvent(newEvent);
    }
    setShowEventDialog(false);
  };

  // Get event color based on type
  const getEventColor = (type: string) => {
    switch (type) {
      case "class":
        return "bg-blue-100 border-blue-500 text-blue-800";
      case "exam":
        return "bg-red-100 border-red-500 text-red-800";
      case "meeting":
        return "bg-purple-100 border-purple-500 text-purple-800";
      case "activity":
        return "bg-green-100 border-green-500 text-green-800";
      default:
        return "bg-gray-100 border-gray-500 text-gray-800";
    }
  };

  // Get event icon based on type
  const getEventIcon = (type: string) => {
    switch (type) {
      case "class":
        return <CalendarIcon className="h-4 w-4" />;
      case "exam":
        return <Info className="h-4 w-4" />;
      case "meeting":
        return <Users className="h-4 w-4" />;
      case "activity":
        return <Clock className="h-4 w-4" />;
      default:
        return <CalendarIcon className="h-4 w-4" />;
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm w-full h-full">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <CalendarIcon className="h-6 w-6 text-primary" />
          <h1 className="text-2xl font-bold">School Calendar</h1>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search events..."
              className="pl-8 w-64"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Events</SelectItem>
              <SelectItem value="class">Classes</SelectItem>
              <SelectItem value="exam">Exams</SelectItem>
              <SelectItem value="meeting">Meetings</SelectItem>
              <SelectItem value="activity">Activities</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" size="icon">
            <Download className="h-4 w-4" />
          </Button>

          <Button onClick={handleAddEvent}>
            <Plus className="h-4 w-4 mr-2" /> Add Event
          </Button>
        </div>
      </div>

      <div className="mb-6">
        <Tabs
          defaultValue="month"
          onValueChange={(value) => setViewMode(value as any)}
        >
          <div className="flex justify-between items-center">
            <TabsList>
              <TabsTrigger value="month">Month</TabsTrigger>
              <TabsTrigger value="week">Week</TabsTrigger>
              <TabsTrigger value="day">Day</TabsTrigger>
              <TabsTrigger value="list">List</TabsTrigger>
            </TabsList>

            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={handlePreviousMonth}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="font-medium">
                {format(
                  viewMode === "month" ? currentMonth : selectedDate,
                  "MMMM yyyy",
                )}
              </span>
              <Button variant="outline" size="sm" onClick={handleNextMonth}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Month View */}
          <TabsContent value="month" className="mt-4">
            <div className="grid grid-cols-7 gap-1 mb-2">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                <div key={day} className="text-center font-medium text-sm py-2">
                  {day}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-1">
              {getDaysInMonth().map((day, i) => {
                const dayEvents = events.filter((event) =>
                  isSameDay(event.date, day),
                );
                const isToday = isSameDay(day, new Date());
                const isSelected = isSameDay(day, selectedDate);
                const isCurrentMonth = isSameMonth(day, currentMonth);

                return (
                  <div
                    key={i}
                    className={`min-h-[100px] p-1 border rounded-md ${isCurrentMonth ? "" : "opacity-40"} ${
                      isToday ? "bg-blue-50" : ""
                    } ${isSelected ? "ring-2 ring-primary" : ""}`}
                    onClick={() => setSelectedDate(day)}
                  >
                    <div
                      className={`text-right p-1 font-medium ${isToday ? "text-primary" : ""}`}
                    >
                      {format(day, "d")}
                    </div>
                    <div className="space-y-1 overflow-y-auto max-h-[80px]">
                      {dayEvents.slice(0, 3).map((event) => (
                        <div
                          key={event.id}
                          className={`text-xs p-1 rounded truncate border-l-2 ${getEventColor(event.type)}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEditEvent(event);
                          }}
                        >
                          {event.startTime} - {event.title}
                        </div>
                      ))}
                      {dayEvents.length > 3 && (
                        <div className="text-xs text-center text-gray-500">
                          +{dayEvents.length - 3} more
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </TabsContent>

          {/* Week View */}
          <TabsContent value="week" className="mt-4">
            <div className="grid grid-cols-8 gap-2">
              {/* Time column */}
              <div className="border-r pr-2">
                <div className="h-12"></div> {/* Header space */}
                {Array.from({ length: 12 }, (_, i) => i + 8).map((hour) => (
                  <div
                    key={hour}
                    className="h-20 text-sm text-gray-500 text-right pr-2"
                  >
                    {hour}:00
                  </div>
                ))}
              </div>

              {/* Days columns */}
              {getDaysInWeek().map((day, dayIndex) => (
                <div key={dayIndex} className="relative">
                  <div
                    className={`text-center p-2 mb-2 font-medium ${isSameDay(day, new Date()) ? "bg-blue-50 rounded-md" : ""}`}
                  >
                    <div>{format(day, "EEE")}</div>
                    <div
                      className={`${isSameDay(day, new Date()) ? "text-primary" : ""}`}
                    >
                      {format(day, "d")}
                    </div>
                  </div>

                  <div className="relative h-[240px] min-h-[240px]">
                    {/* Hour lines */}
                    {Array.from({ length: 12 }, (_, i) => (
                      <div
                        key={i}
                        className="absolute w-full border-t border-gray-100"
                        style={{ top: `${i * 20}px` }}
                      ></div>
                    ))}

                    {/* Events */}
                    {events
                      .filter((event) => isSameDay(event.date, day))
                      .map((event) => {
                        const startHour = parseInt(
                          event.startTime.split(":")[0],
                        );
                        const startMinute = parseInt(
                          event.startTime.split(":")[1] || "0",
                        );
                        const endHour = parseInt(event.endTime.split(":")[0]);
                        const endMinute = parseInt(
                          event.endTime.split(":")[1] || "0",
                        );

                        const top = ((startHour - 8) * 60 + startMinute) / 3;
                        const height =
                          ((endHour - startHour) * 60 +
                            (endMinute - startMinute)) /
                          3;

                        return (
                          <TooltipProvider key={event.id}>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <div
                                  className={`absolute left-0 right-0 mx-1 p-1 text-xs rounded border-l-2 overflow-hidden ${getEventColor(event.type)}`}
                                  style={{
                                    top: `${top}px`,
                                    height: `${height}px`,
                                  }}
                                  onClick={() => handleEditEvent(event)}
                                >
                                  <div className="font-medium truncate">
                                    {event.title}
                                  </div>
                                  <div className="truncate">
                                    {event.startTime} - {event.endTime}
                                  </div>
                                </div>
                              </TooltipTrigger>
                              <TooltipContent>
                                <div className="p-2 space-y-1">
                                  <div className="font-bold">{event.title}</div>
                                  <div className="flex items-center gap-1">
                                    <Clock className="h-3 w-3" />
                                    <span>
                                      {event.startTime} - {event.endTime}
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <MapPin className="h-3 w-3" />
                                    <span>{event.location}</span>
                                  </div>
                                  {event.description && (
                                    <div className="text-sm">
                                      {event.description}
                                    </div>
                                  )}
                                </div>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        );
                      })}
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* Day View */}
          <TabsContent value="day" className="mt-4">
            <div className="text-center mb-4">
              <h2 className="text-xl font-bold">
                {format(selectedDate, "EEEE, MMMM d, yyyy")}
              </h2>
            </div>

            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-2 border-r pr-4">
                {Array.from({ length: 12 }, (_, i) => i + 8).map((hour) => (
                  <div
                    key={hour}
                    className="h-24 text-sm text-gray-500 text-right pr-2"
                  >
                    {hour}:00
                  </div>
                ))}
              </div>

              <div className="col-span-10 relative">
                {/* Hour lines */}
                {Array.from({ length: 12 }, (_, i) => (
                  <div
                    key={i}
                    className="absolute w-full border-t border-gray-100 h-24"
                    style={{ top: `${i * 96}px` }}
                  ></div>
                ))}

                {/* Events */}
                {events
                  .filter((event) => isSameDay(event.date, selectedDate))
                  .map((event) => {
                    const startHour = parseInt(event.startTime.split(":")[0]);
                    const startMinute = parseInt(
                      event.startTime.split(":")[1] || "0",
                    );
                    const endHour = parseInt(event.endTime.split(":")[0]);
                    const endMinute = parseInt(
                      event.endTime.split(":")[1] || "0",
                    );

                    const top = ((startHour - 8) * 60 + startMinute) * 1.6;
                    const height =
                      ((endHour - startHour) * 60 + (endMinute - startMinute)) *
                      1.6;

                    return (
                      <div
                        key={event.id}
                        className={`absolute left-0 right-0 mx-4 p-3 rounded border-l-4 ${getEventColor(event.type)}`}
                        style={{ top: `${top}px`, height: `${height}px` }}
                        onClick={() => handleEditEvent(event)}
                      >
                        <div className="font-bold">{event.title}</div>
                        <div className="flex items-center gap-1 mt-1">
                          <Clock className="h-4 w-4" />
                          <span>
                            {event.startTime} - {event.endTime}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 mt-1">
                          <MapPin className="h-4 w-4" />
                          <span>{event.location}</span>
                        </div>
                        {event.description && (
                          <div className="mt-1 text-sm">
                            {event.description}
                          </div>
                        )}
                      </div>
                    );
                  })}
              </div>
            </div>
          </TabsContent>

          {/* List View */}
          <TabsContent value="list" className="mt-4">
            <div className="space-y-4">
              {filteredEvents.length > 0 ? (
                // Group events by date
                Object.entries(
                  filteredEvents.reduce(
                    (groups, event) => {
                      const dateKey = format(event.date, "yyyy-MM-dd");
                      if (!groups[dateKey]) groups[dateKey] = [];
                      groups[dateKey].push(event);
                      return groups;
                    },
                    {} as Record<string, Event[]>,
                  ),
                )
                  .sort(([dateA], [dateB]) => dateA.localeCompare(dateB))
                  .map(([dateKey, dateEvents]) => (
                    <div key={dateKey}>
                      <h3 className="font-bold text-lg mb-2">
                        {format(new Date(dateKey), "EEEE, MMMM d, yyyy")}
                      </h3>
                      <div className="space-y-2">
                        {dateEvents.map((event) => (
                          <Card
                            key={event.id}
                            className={`border-l-4 ${getEventColor(event.type)}`}
                          >
                            <CardContent className="p-4">
                              <div className="flex justify-between items-start">
                                <div>
                                  <div className="flex items-center gap-2">
                                    {getEventIcon(event.type)}
                                    <h4 className="font-bold text-lg">
                                      {event.title}
                                    </h4>
                                  </div>
                                  <div className="mt-2 space-y-1">
                                    <div className="flex items-center gap-2">
                                      <Clock className="h-4 w-4 text-gray-500" />
                                      <span>
                                        {event.startTime} - {event.endTime}
                                      </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <MapPin className="h-4 w-4 text-gray-500" />
                                      <span>{event.location}</span>
                                    </div>
                                    {event.participants &&
                                      event.participants.length > 0 && (
                                        <div className="flex items-center gap-2">
                                          <Users className="h-4 w-4 text-gray-500" />
                                          <span>
                                            {event.participants.join(", ")}
                                          </span>
                                        </div>
                                      )}
                                    {event.description && (
                                      <div className="mt-2 text-sm">
                                        {event.description}
                                      </div>
                                    )}
                                  </div>
                                </div>
                                <Badge variant="outline">{event.type}</Badge>
                              </div>
                              <div className="flex justify-end mt-4 gap-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleEditEvent(event)}
                                >
                                  Edit
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="text-red-500 hover:text-red-700"
                                  onClick={() => onDeleteEvent(event.id)}
                                >
                                  Delete
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  ))
              ) : (
                <div className="text-center py-12 text-gray-500">
                  No events found matching your criteria
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Add/Edit Event Dialog */}
      <Dialog open={showEventDialog} onOpenChange={setShowEventDialog}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>
              {selectedEvent ? "Edit Event" : "Add New Event"}
            </DialogTitle>
            <DialogDescription>
              Fill in the details for this calendar event. Click save when
              you're done.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="title" className="text-right font-medium">
                Title
              </label>
              <Input
                id="title"
                value={newEvent.title}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, title: e.target.value })
                }
                className="col-span-3"
                placeholder="Enter event title"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="type" className="text-right font-medium">
                Type
              </label>
              <Select
                value={newEvent.type}
                onValueChange={(value) =>
                  setNewEvent({ ...newEvent, type: value as any })
                }
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select event type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="class">Class</SelectItem>
                  <SelectItem value="exam">Exam</SelectItem>
                  <SelectItem value="meeting">Meeting</SelectItem>
                  <SelectItem value="activity">Activity</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <label className="text-right font-medium">Date</label>
              <div className="col-span-3">
                <Calendar
                  mode="single"
                  selected={newEvent.date}
                  onSelect={(date) =>
                    date && setNewEvent({ ...newEvent, date })
                  }
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
                value={newEvent.startTime}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, startTime: e.target.value })
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
                value={newEvent.endTime}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, endTime: e.target.value })
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
                value={newEvent.location}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, location: e.target.value })
                }
                className="col-span-3"
                placeholder="Enter location"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="participants" className="text-right font-medium">
                Participants
              </label>
              <Input
                id="participants"
                value={newEvent.participants?.join(", ") || ""}
                onChange={(e) =>
                  setNewEvent({
                    ...newEvent,
                    participants: e.target.value
                      .split(",")
                      .map((p) => p.trim())
                      .filter(Boolean),
                  })
                }
                className="col-span-3"
                placeholder="Enter participants (comma separated)"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="description" className="text-right font-medium">
                Description
              </label>
              <Input
                id="description"
                value={newEvent.description || ""}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, description: e.target.value })
                }
                className="col-span-3"
                placeholder="Enter description"
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEventDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveEvent}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SchoolCalendar;
