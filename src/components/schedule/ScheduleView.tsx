import React, { useState } from "react";
import { format, addDays, startOfWeek, isSameDay } from "date-fns";
import { Calendar, Clock, Info } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ClassSession {
  id: string;
  subject: string;
  teacher: string;
  room: string;
  startTime: string;
  endTime: string;
  day: number; // 0-6 for Sunday-Saturday
  color: string;
  notes?: string;
}

interface ScheduleViewProps {
  classes?: ClassSession[];
  currentDate?: Date;
  viewType?: "week" | "day" | "list";
}

const timeSlots = [
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
];

const defaultClasses: ClassSession[] = [
  {
    id: "1",
    subject: "Mathematics",
    teacher: "Prof. Johnson",
    room: "Room 101",
    startTime: "08:00",
    endTime: "09:30",
    day: 1, // Monday
    color: "bg-blue-100 border-blue-300",
  },
  {
    id: "2",
    subject: "Physics",
    teacher: "Dr. Smith",
    room: "Lab 3",
    startTime: "10:00",
    endTime: "11:30",
    day: 1, // Monday
    color: "bg-green-100 border-green-300",
  },
  {
    id: "3",
    subject: "Literature",
    teacher: "Mrs. Davis",
    room: "Room 205",
    startTime: "13:00",
    endTime: "14:30",
    day: 2, // Tuesday
    color: "bg-purple-100 border-purple-300",
  },
  {
    id: "4",
    subject: "History",
    teacher: "Mr. Wilson",
    room: "Room 108",
    startTime: "09:00",
    endTime: "10:30",
    day: 3, // Wednesday
    color: "bg-yellow-100 border-yellow-300",
  },
  {
    id: "5",
    subject: "Chemistry",
    teacher: "Dr. Martinez",
    room: "Lab 2",
    startTime: "14:00",
    endTime: "15:30",
    day: 4, // Thursday
    color: "bg-red-100 border-red-300",
    notes: "Bring lab coat and safety goggles",
  },
  {
    id: "6",
    subject: "Physical Education",
    teacher: "Coach Brown",
    room: "Gymnasium",
    startTime: "15:00",
    endTime: "16:30",
    day: 5, // Friday
    color: "bg-orange-100 border-orange-300",
  },
];

const ScheduleView: React.FC<ScheduleViewProps> = ({
  classes = defaultClasses,
  currentDate = new Date(),
  viewType = "week",
}) => {
  const [selectedDate, setSelectedDate] = useState<Date>(currentDate);
  const [activeView, setActiveView] = useState<"week" | "day" | "list">(
    viewType,
  );

  // Get the start of the week (Sunday)
  const weekStart = startOfWeek(selectedDate);

  // Generate array of days for the week view
  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const day = addDays(weekStart, i);
    return {
      date: day,
      dayName: format(day, "EEE"),
      dayNumber: format(day, "d"),
    };
  });

  // Filter classes for the selected day (for day view)
  const getDayClasses = (dayIndex: number) => {
    return classes.filter((cls) => cls.day === dayIndex);
  };

  // Get all classes for the current week (for list view)
  const weekClasses = classes.sort((a, b) => {
    // Sort by day first, then by start time
    if (a.day !== b.day) return a.day - b.day;
    return a.startTime.localeCompare(b.startTime);
  });

  // Render a class block in the week view
  const renderClassBlock = (cls: ClassSession) => {
    const startHour = parseInt(cls.startTime.split(":")[0]);
    const startMinute = parseInt(cls.startTime.split(":")[1] || "0");
    const endHour = parseInt(cls.endTime.split(":")[0]);
    const endMinute = parseInt(cls.endTime.split(":")[1] || "0");

    // Calculate position and height based on time
    const startPosition = (startHour - 8) * 60 + startMinute;
    const duration = (endHour - startHour) * 60 + (endMinute - startMinute);

    return (
      <TooltipProvider key={cls.id}>
        <Tooltip>
          <TooltipTrigger asChild>
            <div
              className={`absolute rounded-md border-l-4 p-2 shadow-sm ${cls.color}`}
              style={{
                top: `${startPosition}px`,
                height: `${duration}px`,
                width: "calc(100% - 8px)",
                left: "4px",
              }}
            >
              <h4 className="font-medium text-sm truncate">{cls.subject}</h4>
              <p className="text-xs truncate">{cls.room}</p>
              <p className="text-xs text-gray-500 truncate">
                {cls.startTime} - {cls.endTime}
              </p>
            </div>
          </TooltipTrigger>
          <TooltipContent className="w-64 p-3">
            <div className="space-y-2">
              <h4 className="font-bold">{cls.subject}</h4>
              <div className="flex items-center gap-2 text-sm">
                <Clock className="h-4 w-4" />
                <span>
                  {cls.startTime} - {cls.endTime}
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <svg
                  className="h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M19 21V5a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v16" />
                  <path d="M12 11.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
                </svg>
                <span>{cls.teacher}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <svg
                  className="h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" />
                  <path d="M3 9V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v4" />
                </svg>
                <span>{cls.room}</span>
              </div>
              {cls.notes && (
                <div className="flex items-start gap-2 text-sm">
                  <Info className="h-4 w-4 mt-0.5" />
                  <span>{cls.notes}</span>
                </div>
              )}
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  };

  return (
    <Card className="w-full h-full bg-white">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Class Schedule
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs
          value={activeView}
          onValueChange={(value) =>
            setActiveView(value as "week" | "day" | "list")
          }
        >
          <TabsList>
            <TabsTrigger value="week">Week</TabsTrigger>
            <TabsTrigger value="day">Day</TabsTrigger>
            <TabsTrigger value="list">List</TabsTrigger>
          </TabsList>
          <TabsContent value="week" className="mt-0">
            <div className="grid grid-cols-8 gap-1">
              {/* Time column */}
              <div className="col-span-1 pr-2 pt-8">
                {timeSlots.map((time) => (
                  <div
                    key={time}
                    className="h-[60px] text-xs text-gray-500 -mt-2"
                  >
                    {time}
                  </div>
                ))}
              </div>

              {/* Days columns */}
              {weekDays.map((day, index) => (
                <div key={index} className="col-span-1 relative">
                  <div
                    className={`text-center p-2 mb-2 rounded-md ${isSameDay(day.date, new Date()) ? "bg-blue-50" : ""}`}
                  >
                    <div className="text-sm font-medium">{day.dayName}</div>
                    <div
                      className={`text-lg font-bold ${isSameDay(day.date, new Date()) ? "text-blue-600" : ""}`}
                    >
                      {day.dayNumber}
                    </div>
                  </div>
                  <div className="relative h-[600px] border-l border-gray-100">
                    {/* Render hour lines */}
                    {timeSlots.map((_, i) => (
                      <div
                        key={i}
                        className="absolute w-full border-t border-gray-100"
                        style={{ top: `${i * 60}px` }}
                      />
                    ))}

                    {/* Render classes for this day */}
                    {getDayClasses(index).map(renderClassBlock)}
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="day" className="mt-0">
            <div className="flex justify-center mb-4">
              <div className="text-center p-2 rounded-md bg-blue-50 w-32">
                <div className="text-sm font-medium">
                  {format(selectedDate, "EEEE")}
                </div>
                <div className="text-lg font-bold text-blue-600">
                  {format(selectedDate, "d MMM")}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-2 pr-2">
                {timeSlots.map((time) => (
                  <div
                    key={time}
                    className="h-[100px] text-sm text-gray-500 flex items-start"
                  >
                    {time}
                  </div>
                ))}
              </div>

              <div className="col-span-10 relative">
                <div className="relative h-[1000px]">
                  {/* Render hour lines */}
                  {timeSlots.map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-full border-t border-gray-100 h-[100px]"
                      style={{ top: `${i * 100}px` }}
                    />
                  ))}

                  {/* Render classes for selected day */}
                  {getDayClasses(selectedDate.getDay()).map((cls) => {
                    const startHour = parseInt(cls.startTime.split(":")[0]);
                    const startMinute = parseInt(
                      cls.startTime.split(":")[1] || "0",
                    );
                    const endHour = parseInt(cls.endTime.split(":")[0]);
                    const endMinute = parseInt(
                      cls.endTime.split(":")[1] || "0",
                    );

                    // Calculate position and height based on time
                    const startPosition =
                      (startHour - 8) * 100 + (startMinute / 60) * 100;
                    const duration =
                      (((endHour - startHour) * 60 +
                        (endMinute - startMinute)) /
                        60) *
                      100;

                    return (
                      <div
                        key={cls.id}
                        className={`absolute rounded-md border-l-4 p-4 shadow-sm ${cls.color} w-full`}
                        style={{
                          top: `${startPosition}px`,
                          height: `${duration}px`,
                        }}
                      >
                        <h4 className="font-medium text-base">{cls.subject}</h4>
                        <p className="text-sm">{cls.teacher}</p>
                        <p className="text-sm">{cls.room}</p>
                        <p className="text-sm text-gray-500">
                          {cls.startTime} - {cls.endTime}
                        </p>
                        {cls.notes && (
                          <div className="mt-2 flex items-start gap-1">
                            <Info className="h-4 w-4 mt-0.5 text-blue-500" />
                            <p className="text-sm text-blue-500">{cls.notes}</p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="list" className="mt-0">
            <div className="space-y-4">
              {/* Group classes by day */}
              {[0, 1, 2, 3, 4, 5, 6].map((dayIndex) => {
                const dayClasses = getDayClasses(dayIndex);
                if (dayClasses.length === 0) return null;

                const dayName = format(addDays(weekStart, dayIndex), "EEEE");

                return (
                  <div key={dayIndex} className="space-y-2">
                    <h3 className="font-medium text-lg">{dayName}</h3>
                    <div className="space-y-2">
                      {dayClasses.map((cls) => (
                        <Card
                          key={cls.id}
                          className={`${cls.color} border-l-4`}
                        >
                          <CardContent className="p-4">
                            <div className="flex justify-between items-start">
                              <div>
                                <h4 className="font-medium text-base">
                                  {cls.subject}
                                </h4>
                                <p className="text-sm">{cls.teacher}</p>
                                <p className="text-sm">{cls.room}</p>
                              </div>
                              <Badge variant="secondary" className="text-xs">
                                {cls.startTime} - {cls.endTime}
                              </Badge>
                            </div>
                            {cls.notes && (
                              <div className="mt-2 flex items-start gap-1">
                                <Info className="h-4 w-4 mt-0.5 text-blue-500" />
                                <p className="text-sm text-blue-500">
                                  {cls.notes}
                                </p>
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ScheduleView;
