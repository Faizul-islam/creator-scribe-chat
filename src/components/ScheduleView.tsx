import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Edit, Trash2, Facebook, Instagram, Twitter, Linkedin } from "lucide-react";

interface ScheduledPost {
  id: string;
  platform: string;
  content: string;
  scheduledTime: Date;
  status: "scheduled" | "published" | "failed";
}

const mockPosts: ScheduledPost[] = [
  {
    id: "1",
    platform: "facebook",
    content: "🚀 Ready to transform your content strategy? Here's what successful creators do differently...",
    scheduledTime: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2 hours from now
    status: "scheduled",
  },
  {
    id: "2",
    platform: "instagram",
    content: "💡 Just discovered an incredible productivity hack that's saving me 3+ hours daily!",
    scheduledTime: new Date(Date.now() + 6 * 60 * 60 * 1000), // 6 hours from now
    status: "scheduled",
  },
  {
    id: "3",
    platform: "twitter",
    content: "The secret to viral content isn't what you think. It's all about timing and authenticity...",
    scheduledTime: new Date(Date.now() - 1 * 60 * 60 * 1000), // 1 hour ago
    status: "published",
  },
];

const platformIcons = {
  facebook: Facebook,
  instagram: Instagram,
  twitter: Twitter,
  linkedin: Linkedin,
};

const platformColors = {
  facebook: "bg-blue-500",
  instagram: "bg-gradient-to-br from-purple-500 to-pink-500",
  twitter: "bg-sky-500",
  linkedin: "bg-blue-600",
};

export const ScheduleView = () => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "scheduled":
        return "bg-ai-primary/20 text-ai-primary";
      case "published":
        return "bg-green-500/20 text-green-400";
      case "failed":
        return "bg-destructive/20 text-destructive";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Content Schedule</h2>
          <p className="text-muted-foreground">Manage your scheduled and published content</p>
        </div>
        <Button variant="gradient" className="bg-gradient-primary hover:opacity-90 border-0">
          <Calendar className="h-4 w-4 mr-2" />
          Calendar View
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 bg-gradient-card border-glass-border">
          <div className="flex items-center space-x-3">
            <div className="p-3 rounded-full bg-ai-primary/20">
              <Clock className="h-6 w-6 text-ai-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">
                {mockPosts.filter(p => p.status === "scheduled").length}
              </p>
              <p className="text-muted-foreground">Scheduled</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-6 bg-gradient-card border-glass-border">
          <div className="flex items-center space-x-3">
            <div className="p-3 rounded-full bg-green-500/20">
              <Calendar className="h-6 w-6 text-green-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">
                {mockPosts.filter(p => p.status === "published").length}
              </p>
              <p className="text-muted-foreground">Published</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-6 bg-gradient-card border-glass-border">
          <div className="flex items-center space-x-3">
            <div className="p-3 rounded-full bg-primary/20">
              <Calendar className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{mockPosts.length}</p>
              <p className="text-muted-foreground">Total Posts</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Posts List */}
      <div className="space-y-4">
        {mockPosts.map((post) => {
          const PlatformIcon = platformIcons[post.platform as keyof typeof platformIcons];
          const platformColor = platformColors[post.platform as keyof typeof platformColors];
          
          return (
            <Card key={post.id} className="p-6 bg-card border-border hover:bg-card-elevated transition-smooth">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4 flex-1">
                  {/* Platform Icon */}
                  <div className={`p-3 rounded-full text-white ${platformColor}`}>
                    <PlatformIcon className="h-5 w-5" />
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="font-medium text-foreground capitalize">
                        {post.platform}
                      </h3>
                      <Badge className={getStatusColor(post.status)}>
                        {post.status}
                      </Badge>
                    </div>
                    
                    <p className="text-muted-foreground mb-3 line-clamp-2">
                      {post.content}
                    </p>
                    
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="h-4 w-4 mr-1" />
                      {post.status === "scheduled" 
                        ? `Scheduled for ${post.scheduledTime.toLocaleString()}`
                        : `Published ${post.scheduledTime.toLocaleString()}`
                      }
                    </div>
                  </div>
                </div>
                
                {/* Actions */}
                <div className="flex items-center space-x-2 ml-4">
                  <Button variant="outline" size="sm" className="border-border">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" className="border-border hover:bg-destructive/10">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};