import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  CalendarDays,
  MessageSquare,
  BookOpen,
  Users,
  Search,
  Menu,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

export default function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [discussions, setDiscussions] = useState([
    {
      id: 1,
      user: "John",
      avatar: "/placeholder-avatar.jpg",
      content:
        "The narrator's father's advice seems to be a central theme. What do you all think?",
      replies: [
        {
          id: 1,
          user: "Sarah",
          avatar: "/placeholder-avatar-2.jpg",
          content: "I agree! It sets the tone for the entire novel.",
        },
        {
          id: 2,
          user: "Mike",
          avatar: "/placeholder-avatar-3.jpg",
          content:
            "It's interesting how this advice conflicts with the narrator's actions throughout the story.",
        },
      ],
      isExpanded: false,
    },
    {
      id: 2,
      user: "Emily",
      avatar: "/placeholder-avatar-4.jpg",
      content:
        "The symbolism of the green light is fascinating. Any thoughts on its significance?",
      replies: [],
      isExpanded: false,
    },
  ]);

  const toggleReplies = (id: number) => {
    setDiscussions(
      discussions.map((d) =>
        d.id === id ? { ...d, isExpanded: !d.isExpanded } : d
      )
    );
  };

  const addReply = (discussionId: number, reply: string) => {
    setDiscussions(
      discussions.map((d) =>
        d.id === discussionId
          ? {
              ...d,
              replies: [
                ...d.replies,
                {
                  id: d.replies.length + 1,
                  user: "You",
                  avatar: "/placeholder-user.jpg",
                  content: reply,
                },
              ],
              isExpanded: true,
            }
          : d
      )
    );
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0`}
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between p-4">
            <h2 className="text-xl font-bold">Book Chat</h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSidebarOpen(false)}
              className="lg:hidden"
            >
              <Menu className="h-6 w-6" />
            </Button>
          </div>
          <div className="flex-1 overflow-y-auto p-4">
            {/* Chat messages would go here */}
            <div className="space-y-4">
              <div className="flex items-start space-x-2">
                <Avatar>
                  <AvatarImage src="/placeholder-avatar.jpg" alt="User" />
                  <AvatarFallback>U1</AvatarFallback>
                </Avatar>
                <div className="rounded-lg bg-gray-100 p-2">
                  <p className="text-sm">
                    I loved the character development in chapter 3!
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <Avatar>
                  <AvatarImage src="/placeholder-avatar-2.jpg" alt="User" />
                  <AvatarFallback>U2</AvatarFallback>
                </Avatar>
                <div className="rounded-lg bg-gray-100 p-2">
                  <p className="text-sm">
                    The plot twist at the end was unexpected!
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="p-4">
            <form className="flex items-center space-x-2">
              <Input placeholder="Type your message..." />
              <Button type="submit">Send</Button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow">
          <div className="flex items-center justify-between px-4 py-6">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden"
            >
              <Menu className="h-6 w-6" />
            </Button>
            <nav className="hidden space-x-4 lg:flex">
              <Button variant="ghost">
                <BookOpen className="mr-2 h-4 w-4" />
                Books
              </Button>
              <Button variant="ghost">
                <Users className="mr-2 h-4 w-4" />
                Clubs
              </Button>
              <Button variant="ghost">
                <CalendarDays className="mr-2 h-4 w-4" />
                Events
              </Button>
            </nav>
            <div className="flex items-center space-x-4">
              <form className="relative">
                <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                <Input className="pl-8" placeholder="Search books, clubs..." />
              </form>
              <Avatar>
                <AvatarImage src="/placeholder-user.jpg" alt="User" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>

        {/* Main area */}
        <main className="flex-1 overflow-y-auto p-4">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Current Book */}
            <Card className="col-span-2">
              <CardHeader>
                <CardTitle>Current Book: "The Great Gatsby"</CardTitle>
                <CardDescription>by F. Scott Fitzgerald</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="read" className="w-full">
                  <TabsList>
                    <TabsTrigger value="read">Read</TabsTrigger>
                    <TabsTrigger value="annotations">Annotations</TabsTrigger>
                    <TabsTrigger value="discussion">Discussion</TabsTrigger>
                  </TabsList>
                  <TabsContent
                    value="read"
                    className="h-[300px] overflow-y-auto"
                  >
                    <p className="text-sm">
                      In my younger and more vulnerable years my father gave me
                      some advice that I've been turning over in my mind ever
                      since. "Whenever you feel like criticizing any one," he
                      told me, "just remember that all the people in this world
                      haven't had the advantages that you've had."
                    </p>
                    {/* More text would go here */}
                  </TabsContent>
                  <TabsContent value="annotations">
                    <div className="space-y-2">
                      <p className="text-sm font-semibold">
                        Highlighted by Jane:
                      </p>
                      <p className="text-sm italic">
                        "In my younger and more vulnerable years my father gave
                        me some advice that I've been turning over in my mind
                        ever since."
                      </p>
                      <p className="text-sm">
                        Comment: This opening line sets the reflective tone for
                        the entire novel.
                      </p>
                    </div>
                  </TabsContent>
                  <TabsContent
                    value="discussion"
                    className="h-[300px] overflow-y-auto"
                  >
                    <div className="space-y-4">
                      {discussions.map((discussion) => (
                        <div key={discussion.id} className="border-b pb-4">
                          <div className="flex items-start space-x-2">
                            <Avatar>
                              <AvatarImage
                                src={discussion.avatar}
                                alt={discussion.user}
                              />
                              <AvatarFallback>
                                {discussion.user[0]}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <p className="font-semibold">{discussion.user}</p>
                              <p className="text-sm">{discussion.content}</p>
                              <div className="mt-2 flex items-center space-x-2">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => toggleReplies(discussion.id)}
                                  className="text-xs"
                                >
                                  {discussion.isExpanded ? (
                                    <>
                                      <ChevronUp className="mr-1 h-4 w-4" />
                                      Hide Replies
                                    </>
                                  ) : (
                                    <>
                                      <ChevronDown className="mr-1 h-4 w-4" />
                                      Show Replies ({discussion.replies.length})
                                    </>
                                  )}
                                </Button>
                              </div>
                            </div>
                          </div>
                          {discussion.isExpanded && (
                            <div className="mt-2 space-y-2 pl-10">
                              {discussion.replies.map((reply) => (
                                <div
                                  key={reply.id}
                                  className="flex items-start space-x-2"
                                >
                                  <Avatar>
                                    <AvatarImage
                                      src={reply.avatar}
                                      alt={reply.user}
                                    />
                                    <AvatarFallback>
                                      {reply.user[0]}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <p className="font-semibold">
                                      {reply.user}
                                    </p>
                                    <p className="text-sm">{reply.content}</p>
                                  </div>
                                </div>
                              ))}
                              <form
                                onSubmit={(e) => {
                                  e.preventDefault();
                                  const form = e.target as HTMLFormElement;
                                  const textarea = form.elements.namedItem(
                                    "reply"
                                  ) as HTMLTextAreaElement;
                                  addReply(discussion.id, textarea.value);
                                  textarea.value = "";
                                }}
                                className="mt-2"
                              >
                                <Textarea
                                  name="reply"
                                  placeholder="Write a reply..."
                                  className="mb-2"
                                />
                                <Button type="submit" size="sm">
                                  Reply
                                </Button>
                              </form>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
              <CardFooter>
                <Button>Add Annotation</Button>
              </CardFooter>
            </Card>

            {/* Upcoming Events */}
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Events</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold">
                      Author Q&A: Margaret Atwood
                    </h3>
                    <p className="text-sm text-gray-500">
                      July 15, 2023 - 7:00 PM
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold">Book Discussion: "1984"</h3>
                    <p className="text-sm text-gray-500">
                      July 20, 2023 - 6:30 PM
                    </p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline">View All Events</Button>
              </CardFooter>
            </Card>

            {/* Reading Progress */}
            <Card>
              <CardHeader>
                <CardTitle>Your Reading Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>The Great Gatsby</span>
                    <span>75%</span>
                  </div>
                  <div className="h-2 w-full bg-gray-200 rounded-full">
                    <div className="h-2 w-3/4 bg-blue-500 rounded-full"></div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Book Recommendations */}
            <Card>
              <CardHeader>
                <CardTitle>Recommended Books</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center space-x-2">
                    <BookOpen className="h-4 w-4" />
                    <span>To Kill a Mockingbird</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <BookOpen className="h-4 w-4" />
                    <span>1984</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <BookOpen className="h-4 w-4" />
                    <span>Pride and Prejudice</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button variant="outline">See More</Button>
              </CardFooter>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
