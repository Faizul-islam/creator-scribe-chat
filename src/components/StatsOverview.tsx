import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Eye, Heart, MessageCircle, Share, Download } from "lucide-react";

interface PlatformStat {
  platform: string;
  followers: number;
  engagement: number;
  posts: number;
  trend: "up" | "down";
  trendValue: number;
}

interface PostStat {
  id: string;
  platform: string;
  content: string;
  views: number;
  likes: number;
  comments: number;
  shares: number;
  publishedAt: Date;
}

const mockPlatformStats: PlatformStat[] = [
  {
    platform: "Facebook",
    followers: 2500,
    engagement: 8.4,
    posts: 15,
    trend: "up",
    trendValue: 12.5,
  },
  {
    platform: "Instagram",
    followers: 5200,
    engagement: 12.8,
    posts: 22,
    trend: "up",
    trendValue: 18.2,
  },
  {
    platform: "Twitter",
    followers: 1800,
    engagement: 5.2,
    posts: 28,
    trend: "down",
    trendValue: -3.1,
  },
  {
    platform: "LinkedIn",
    followers: 950,
    engagement: 15.6,
    posts: 8,
    trend: "up",
    trendValue: 25.4,
  },
];

const mockPostStats: PostStat[] = [
  {
    id: "1",
    platform: "Instagram",
    content: "🚀 Ready to transform your content strategy? Here's what successful creators do differently...",
    views: 15420,
    likes: 1240,
    comments: 87,
    shares: 156,
    publishedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
  },
  {
    id: "2",
    platform: "Facebook",
    content: "💡 Just discovered an incredible productivity hack that's saving me 3+ hours daily!",
    views: 8950,
    likes: 425,
    comments: 52,
    shares: 89,
    publishedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
  },
  {
    id: "3",
    platform: "Twitter",
    content: "The secret to viral content isn't what you think. It's all about timing and authenticity...",
    views: 3250,
    likes: 187,
    comments: 24,
    shares: 45,
    publishedAt: new Date(Date.now() - 5 * 60 * 60 * 1000),
  },
];

export const StatsOverview = () => {
  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Analytics Overview</h2>
          <p className="text-muted-foreground">Track your content performance across platforms</p>
        </div>
        <Button variant="outline" className="border-border">
          <Download className="h-4 w-4 mr-2" />
          Export Report
        </Button>
      </div>

      {/* Platform Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {mockPlatformStats.map((stat) => (
          <Card key={stat.platform} className="p-6 bg-gradient-card border-glass-border">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-foreground">{stat.platform}</h3>
                <Badge className={stat.trend === "up" ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}>
                  {stat.trend === "up" ? (
                    <TrendingUp className="h-3 w-3 mr-1" />
                  ) : (
                    <TrendingDown className="h-3 w-3 mr-1" />
                  )}
                  {Math.abs(stat.trendValue)}%
                </Badge>
              </div>
              
              <div className="space-y-2">
                <div>
                  <p className="text-2xl font-bold text-foreground">
                    {formatNumber(stat.followers)}
                  </p>
                  <p className="text-sm text-muted-foreground">Followers</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="font-medium text-foreground">{stat.engagement}%</p>
                    <p className="text-muted-foreground">Engagement</p>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{stat.posts}</p>
                    <p className="text-muted-foreground">Posts</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Top Performing Posts */}
      <div className="space-y-6">
        <h3 className="text-xl font-semibold text-foreground">Top Performing Posts</h3>
        
        <div className="space-y-4">
          {mockPostStats.map((post) => (
            <Card key={post.id} className="p-6 bg-card border-border">
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <Badge variant="secondary">{post.platform}</Badge>
                      <span className="text-sm text-muted-foreground">
                        {post.publishedAt.toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-foreground line-clamp-2">{post.content}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="flex items-center space-x-2">
                    <Eye className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium text-foreground">
                      {formatNumber(post.views)}
                    </span>
                    <span className="text-sm text-muted-foreground">Views</span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Heart className="h-4 w-4 text-red-400" />
                    <span className="text-sm font-medium text-foreground">
                      {formatNumber(post.likes)}
                    </span>
                    <span className="text-sm text-muted-foreground">Likes</span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <MessageCircle className="h-4 w-4 text-blue-400" />
                    <span className="text-sm font-medium text-foreground">
                      {formatNumber(post.comments)}
                    </span>
                    <span className="text-sm text-muted-foreground">Comments</span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Share className="h-4 w-4 text-green-400" />
                    <span className="text-sm font-medium text-foreground">
                      {formatNumber(post.shares)}
                    </span>
                    <span className="text-sm text-muted-foreground">Shares</span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};