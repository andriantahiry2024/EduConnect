import React, { useState } from "react";
import { format } from "date-fns";
import {
  Search,
  Send,
  Paperclip,
  MoreVertical,
  Phone,
  Video,
  Info,
  Users,
  Plus,
  Filter,
  ChevronDown,
  Smile,
  Image,
  Mic,
  X,
  Check,
  Clock,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface User {
  id: string;
  name: string;
  avatar?: string;
  role: "student" | "teacher" | "parent" | "admin";
  status?: "online" | "offline" | "away";
  lastSeen?: Date;
}

interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: Date;
  status: "sent" | "delivered" | "read";
  attachments?: {
    id: string;
    type: "image" | "document" | "audio";
    url: string;
    name: string;
  }[];
}

interface Conversation {
  id: string;
  participants: User[];
  lastMessage?: Message;
  unreadCount: number;
  isGroup: boolean;
  groupName?: string;
}

interface MessagingSystemProps {
  currentUser?: User;
  conversations?: Conversation[];
  onSendMessage?: (conversationId: string, message: string) => void;
  onCreateConversation?: (participants: User[]) => void;
}

const MessagingSystem: React.FC<MessagingSystemProps> = ({
  currentUser = {
    id: "current-user",
    name: "John Doe",
    role: "teacher",
    status: "online",
  },
  conversations = [
    {
      id: "conv1",
      participants: [
        {
          id: "current-user",
          name: "John Doe",
          role: "teacher",
          status: "online",
        },
        {
          id: "user1",
          name: "Emma Thompson",
          role: "student",
          status: "online",
        },
      ],
      lastMessage: {
        id: "msg1",
        senderId: "user1",
        text: "Hello, I have a question about the homework assignment.",
        timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
        status: "read",
      },
      unreadCount: 0,
      isGroup: false,
    },
    {
      id: "conv2",
      participants: [
        {
          id: "current-user",
          name: "John Doe",
          role: "teacher",
          status: "online",
        },
        {
          id: "user2",
          name: "Michael Johnson",
          role: "parent",
          status: "offline",
          lastSeen: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
        },
      ],
      lastMessage: {
        id: "msg2",
        senderId: "current-user",
        text: "Thank you for attending the parent-teacher meeting.",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
        status: "delivered",
      },
      unreadCount: 0,
      isGroup: false,
    },
    {
      id: "conv3",
      participants: [
        {
          id: "current-user",
          name: "John Doe",
          role: "teacher",
          status: "online",
        },
        {
          id: "user3",
          name: "Sophia Martinez",
          role: "student",
          status: "away",
        },
        {
          id: "user4",
          name: "Daniel Wilson",
          role: "student",
          status: "online",
        },
        {
          id: "user5",
          name: "Olivia Brown",
          role: "student",
          status: "offline",
        },
      ],
      lastMessage: {
        id: "msg3",
        senderId: "user4",
        text: "When is our group project due?",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
        status: "read",
      },
      unreadCount: 2,
      isGroup: true,
      groupName: "Physics Project Group",
    },
    {
      id: "conv4",
      participants: [
        {
          id: "current-user",
          name: "John Doe",
          role: "teacher",
          status: "online",
        },
        {
          id: "user6",
          name: "Principal Anderson",
          role: "admin",
          status: "online",
        },
      ],
      lastMessage: {
        id: "msg4",
        senderId: "user6",
        text: "Please submit your quarterly reports by Friday.",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48), // 2 days ago
        status: "read",
      },
      unreadCount: 0,
      isGroup: false,
    },
  ],
  onSendMessage = () => {},
  onCreateConversation = () => {},
}) => {
  const [activeTab, setActiveTab] = useState("all");
  const [selectedConversation, setSelectedConversation] = useState<
    Conversation | undefined
  >(conversations[0]);
  const [messageText, setMessageText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [showNewMessageDialog, setShowNewMessageDialog] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);

  // Mock messages for the selected conversation
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "msg1-1",
      senderId: "user1",
      text: "Hello, I have a question about the homework assignment.",
      timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
      status: "read",
    },
    {
      id: "msg1-2",
      senderId: "current-user",
      text: "Sure, what's your question?",
      timestamp: new Date(Date.now() - 1000 * 60 * 25), // 25 minutes ago
      status: "read",
    },
    {
      id: "msg1-3",
      senderId: "user1",
      text: "I'm having trouble with problem #5. Could you explain how to approach it?",
      timestamp: new Date(Date.now() - 1000 * 60 * 20), // 20 minutes ago
      status: "read",
    },
    {
      id: "msg1-4",
      senderId: "current-user",
      text: "For problem #5, you need to use the quadratic formula. First, identify the values of a, b, and c from the equation.",
      timestamp: new Date(Date.now() - 1000 * 60 * 15), // 15 minutes ago
      status: "read",
    },
    {
      id: "msg1-5",
      senderId: "current-user",
      text: "Then substitute these values into the formula: x = (-b ± √(b² - 4ac)) / 2a",
      timestamp: new Date(Date.now() - 1000 * 60 * 14), // 14 minutes ago
      status: "read",
    },
    {
      id: "msg1-6",
      senderId: "user1",
      text: "Oh, I see! I was trying to factor it directly, but that won't work here. Thank you!",
      timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
      status: "read",
    },
  ]);

  // Mock available users for new conversations
  const availableUsers: User[] = [
    {
      id: "user1",
      name: "Emma Thompson",
      role: "student",
      status: "online",
    },
    {
      id: "user2",
      name: "Michael Johnson",
      role: "parent",
      status: "offline",
    },
    {
      id: "user3",
      name: "Sophia Martinez",
      role: "student",
      status: "away",
    },
    {
      id: "user4",
      name: "Daniel Wilson",
      role: "student",
      status: "online",
    },
    {
      id: "user5",
      name: "Olivia Brown",
      role: "student",
      status: "offline",
    },
    {
      id: "user6",
      name: "Principal Anderson",
      role: "admin",
      status: "online",
    },
    {
      id: "user7",
      name: "Ms. Garcia",
      role: "teacher",
      status: "online",
    },
    {
      id: "user8",
      name: "Mr. Taylor",
      role: "teacher",
      status: "away",
    },
  ];

  // Filter conversations based on search and active tab
  const filteredConversations = conversations.filter((conversation) => {
    // Filter by search query
    const matchesSearch = conversation.isGroup
      ? conversation.groupName?.toLowerCase().includes(searchQuery.toLowerCase())
      : conversation.participants
          .find((p) => p.id !== currentUser.id)?
          .name.toLowerCase()
          .includes(searchQuery.toLowerCase());

    // Filter by tab
    if (activeTab === "all") return matchesSearch;
    if (activeTab === "unread") return matchesSearch && conversation.unreadCount > 0;
    if (activeTab === "groups") return matchesSearch && conversation.isGroup;
    if (activeTab === "direct") return matchesSearch && !conversation.isGroup;

    return matchesSearch;
  });

  // Filter available users based on search in new message dialog
  const filteredUsers = availableUsers.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSendMessage = () => {
    if (!messageText.trim() || !selectedConversation) return;

    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      senderId: currentUser.id,
      text: messageText,
      timestamp: new Date(),
      status: "sent",
    };

    setMessages([...messages, newMessage]);
    setMessageText("");
    onSendMessage(selectedConversation.id, messageText);
  };

  const handleCreateConversation = () => {
    if (selectedUsers.length === 0) return;

    onCreateConversation([...selectedUsers, currentUser]);
    setSelectedUsers([]);
    setShowNewMessageDialog(false);
  };

  const toggleUserSelection = (user: User) => {
    if (selectedUsers.some((u) => u.id === user.id)) {
      setSelectedUsers(selectedUsers.filter((u) => u.id !== user.id));
    } else {
      setSelectedUsers([...selectedUsers, user]);
    }
  };

  const getStatusColor = (status?: string) => {
    switch (status) {
      case "online":
        return "bg-green-500";
      case "away":
        return "bg-yellow-500";
      default:
        return "bg-gray-500";
    }
  };

  const getMessageTime = (timestamp: Date) => {
    const now = new Date();
    const diffInHours = (now.getTime() - timestamp.getTime()) / (1000 * 60 * 60);

    if (diffInHours < 24) {
      return format(timestamp, "h:mm a");
    } else if (diffInHours < 48) {
      return "Yesterday";
    } else {
      return format(timestamp, "MMM d");
    }
  };

  const getConversationName = (conversation: Conversation) => {
    if (conversation.isGroup) return conversation.groupName;

    const otherParticipant = conversation.participants.find(
      (p) => p.id !== currentUser.id
    );
    return otherParticipant?.name || "Unknown";
  };

  const getMessageStatusIcon = (status: string) => {
    switch (status) {
      case "sent":
        return <Check className="h-3 w-3 text-gray-400" />;
      case "delivered":
        return <Check className="h-3 w-3 text-blue-500" />;
      case "read":
        return (
          <div className="flex">
            <Check className="h-3 w-3 text-blue-500" />
            <Check className="h-3 w-3 text-blue-500 -ml-1" />
          </div>
        );
      default:
        return <Clock className="h-3 w-3 text-gray-400" />;
    }
  };

  return (
    <div className="flex h-full w-full bg-white rounded-lg shadow-sm overflow-hidden">
      {/* Sidebar */}
      <div className="w-80 border-r flex flex-col bg-gray-50">
        <div className="p-4 border-b">
          <h2 className="text-xl font-bold mb-4">Messages</h2>
          <div className="flex space-x-2">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search messages..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Dialog open={showNewMessageDialog} onOpenChange={setShowNewMessageDialog}>
              <DialogTrigger asChild>
                <Button size="icon">
                  <Plus className="h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>New Message</DialogTitle>
                  <DialogDescription>
                    Select users to start a conversation.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                    <Input
                      placeholder="Search users..."
                      className="pl-8"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  {selectedUsers.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-2">
                      {selectedUsers.map((user) => (
                        <Badge key={user.id} variant="secondary" className="pl-2 pr-1 py-1">
                          {user.name}
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-4 w-4 ml-1"
                            onClick={() => toggleUserSelection(user)}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </Badge>
                      ))}
                    </div>
                  )}
                  <ScrollArea className="h-[300px]">
                    <div className="space-y-2">
                      {filteredUsers.map((user) => (
                        <div
                          key={user.id}
                          className={`flex items-center justify-between p-2 rounded-md cursor-pointer ${selectedUsers.some((u) => u.id === user.id) ? "bg-primary/10" : "hover:bg-gray-100"}`}
                          onClick={() => toggleUserSelection(user)}
                        >
                          <div className="flex items-center space-x-3">
                            <Avatar>
                              <AvatarImage src={user.avatar} />
                              <AvatarFallback>
                                {user.name.split(" ").map((n) => n[0]).join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{user.name}</p>
                              <p className="text-xs text-gray-500 capitalize">
                                {user.role}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div
                              className={`h-2 w-2 rounded-full ${getStatusColor(user.status)}`}
                            />
                            {selectedUsers.some((u) => u.id === user.id) && (
                              <Check className="h-4 w-4 text-primary" />
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </div>
                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => setShowNewMessageDialog(false)}
                  >
                    Cancel
                  </Button>
                  <Button onClick={handleCreateConversation}>
                    {selectedUsers.length > 1 ? "Create Group" : "Start Chat"}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Sort by Recent</DropdownMenuItem>
                <DropdownMenuItem>Sort by Unread</DropdownMenuItem>
                <DropdownMenuItem>Filter by Role</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-4 m-2">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="unread">Unread</TabsTrigger>
            <TabsTrigger value="groups">Groups</TabsTrigger>
            <TabsTrigger value="direct">Direct</TabsTrigger>
          </TabsList>
        </Tabs>

        <ScrollArea className="flex-1">
          <div className="p-2 space-y-2">
            {filteredConversations.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No conversations found
              </div>
            ) : (
              filteredConversations.map((conversation) => {
                const isActive = selectedConversation?.id === conversation.id;
                const conversationName = getConversationName(conversation);
                const lastMessage = conversation.lastMessage;

                return (
                  <div
                    key={conversation.id}
                    className={`p-3 rounded-lg cursor-pointer ${isActive ? "bg-primary/10" : "hover:bg-gray-100"}`}
                    onClick={() => setSelectedConversation(conversation)}
                  >
                    <div className="flex items-start space-x-3">
                      {conversation.isGroup ? (
                        <div className="relative">
                          <div className="h-10 w-10 bg-primary/20 rounded-full flex items-center justify-center">
                            <Users className="h-5 w-5 text-primary" />
                          </div>
                          <div
                            className={`absolute -bottom-1 -right-1 h-3 w-3 rounded-full border-2 border-white ${getStatusColor("online")}`}
                          />
                        </div>
                      ) : (
                        <div className="relative">
                          <Avatar>
                            <AvatarImage
                              src={conversation.participants.find(
                                (p) => p.id !== currentUser.id
                              )?.avatar}
                            />
                            <AvatarFallback>
                              {conversationName
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div
                            className={`absolute -bottom-1 -right-1 h-3 w-3 rounded-full border-2 border-white ${getStatusColor(
                              conversation.participants.find(
                                (p) => p.id !== currentUser.id
                              )?.status
                            )}`}
                          />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start">
                          <h3 className="font-medium truncate">
                            {conversationName}
                          </h3>
                          {lastMessage && (
                            <span className="text-xs text-gray-500">
                              {getMessageTime(lastMessage.timestamp)}
                            </span>
                          )}
                        </div>
                        {lastMessage && (
                          <div className="flex items-center justify-between">
                            <p className="text-sm text-gray-600 truncate">
                              {lastMessage.senderId === currentUser.id
                                ? "You: "
                                : ""}
                              {lastMessage.text}
                            </p>
                            <div className="flex items-center space-x-1">
                              {lastMessage.senderId === currentUser.id && (
                                <div className="flex items-center">
                                  {getMessageStatusIcon(lastMessage.status)}
                                </div>
                              )}
                              {conversation.unreadCount > 0 && (
                                <Badge className="h-5 w-5 flex items-center justify-center p-0 rounded-full">
                                  {conversation.unreadCount}
                                </Badge>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </ScrollArea>
      </div>

      {/* Chat Area */}
      {selectedConversation ? (
        <div className="flex-1 flex flex-col">
          {/* Chat Header */}
          <div className="p-4 border-b flex justify-between items-center">
            <div className="flex items-center space-x-3">
              {selectedConversation.isGroup ? (
                <div className="h-10 w-10 bg-primary/20 rounded-full flex items-center justify-center">
                  <Users className="h-5 w-5 text-primary" />
                </div>
              ) : (
                <Avatar>
                  <AvatarImage
                    src={selectedConversation.participants.find(
                      (p) => p.id !== currentUser.id
                    )?.avatar}
                  />
                  <AvatarFallback>
                    {getConversationName(selectedConversation)
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
              )}
              <div>
                <h3 className="font-medium">
                  {getConversationName(selectedConversation)}
                </h3>
                <div className="flex items-center space-x-1">
                  <div
                    className={`h-2 w-2 rounded-full ${getStatusColor(
                      selectedConversation.isGroup
                        ? "online"
                        : selectedConversation.participants.find(
                            (p) => p.id !== currentUser.id
                          )?.status
                    )}`}
                  />
                  <p className="text-xs text-gray-500">
                    {selectedConversation.isGroup
                      ? `${selectedConversation.participants.length} members`
                      : selectedConversation.participants.find(
                          (p) => p.id !== currentUser.id
                        )?.status === "online"
                      ? "Online"
                      : selectedConversation.participants.find(
                          (p) => p.id !== currentUser.id
                        )?.status === "away"
                      ? "Away"
                      : "Offline"}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Phone className="h-5 w-5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Call</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Video className="h-5 w-5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Video Call</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Info className="h-5 w-5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Info</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Search in conversation</DropdownMenuItem>
                  <DropdownMenuItem>Mute notifications</DropdownMenuItem>
                  <DropdownMenuItem className="text-red-600">
                    Delete conversation
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((message) => {
                const isCurrentUser = message.senderId === currentUser.id;
                return (
                  <div
                    key={message.id}
                    className={`flex ${isCurrentUser ? "justify-end" : "justify-start"}`}
                  >
                    <div className="flex items-end space-x-2 max-w-[70%]">
                      {!isCurrentUser && (
                        <Avatar className="h-8 w-8">
                          <AvatarImage
                            src={selectedConversation.participants.find(
                              (p) => p.id === message.senderId
                            )?.avatar}
                          />
                          <AvatarFallback>
                            {selectedConversation.participants
                              .find((p) => p.id === message.senderId)
                              ?.name.split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                      )}
                      <div
                        className={`rounded-lg p-3 ${isCurrentUser ? "bg-primary text-primary-foreground" : "bg-gray-100"}`}
                      >
                        <p className="text-sm">{message.text}</p>
                        <div
                          className={`flex items-center mt-1 text-xs ${isCurrentUser ? "text-primary-foreground/70" : "text-gray-500"}`}
                        >
                          <span>{format(message.timestamp, "h:mm a")}</span>
                          {isCurrentUser && (
                            <span className="ml-1">
                              {getMessageStatusIcon(message.status)}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </ScrollArea>

          {/* Message Input */}
          <div className="p-4 border-t">
            <div className="flex items-end space-x-2">
              <div className="flex-1 relative">
                <Input
                  placeholder="Type a message..."
                  className="pr-20 py-6"
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                />
                <div className="absolute right-2 bottom-2 flex space-x-1">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Smile className="h-5 w-5 text-gray-500" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Emoji</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Paperclip className="h-5 w-5 text-gray-500" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Attach file</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Image className="h-5 w-5 text-gray-500" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Image</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Mic className="h-5 w-5 text-gray-500" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Voice message</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>
              <Button
                className="h-10 w-10 rounded-full p-0 flex items-center justify-center"
                onClick={handleSendMessage}
                disabled={!messageText.trim()}
              >
                <Send className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageSquare className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-medium mb-2">No conversation selected</h3>
            <p className="text-gray-500 mb-4">
              Choose a conversation from the sidebar or start a new one.
            </p>
            <Button onClick={() => setShowNewMessageDialog(true)}>
              <Plus className="h-4 w-4 mr-2" /> New Message
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MessagingSystem;
