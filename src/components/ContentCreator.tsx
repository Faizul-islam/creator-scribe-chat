import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Image as ImageIcon, Sparkles, Send } from "lucide-react";

export const ContentCreator = () => {
  const [content, setContent] = useState("");
  const [platform, setPlatform] = useState("");
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [newHashtag, setNewHashtag] = useState("");
  const [scheduleTime, setScheduleTime] = useState("");

  const addHashtag = () => {
    if (newHashtag.trim() && !hashtags.includes(newHashtag.trim())) {
      setHashtags([...hashtags, newHashtag.trim()]);
      setNewHashtag("");
    }
  };

  const removeHashtag = (tag: string) => {
    setHashtags(hashtags.filter(h => h !== tag));
  };

  const generateAIContent = () => {
    const suggestions = [
      "🚀 Ready to transform your content strategy? Here's what successful creators do differently...",
      "💡 Just discovered an incredible productivity hack that's saving me 3+ hours daily!",
      "🎯 The secret to viral content isn't what you think. It's all about timing and authenticity...",
      "✨ Behind the scenes: How I create engaging content that actually converts...",
    ];
    
    const randomSuggestion = suggestions[Math.floor(Math.random() * suggestions.length)];
    setContent(randomSuggestion);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Content Creation Form */}
      <Card className="p-6 bg-gradient-card border-glass-border backdrop-blur-sm">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-foreground">Create Content</h3>
          <Button
            variant="outline"
            onClick={generateAIContent}
            className="border-primary/30 hover:bg-primary/10"
          >
            <Sparkles className="h-4 w-4 mr-2" />
            AI Generate
          </Button>
        </div>

        <div className="space-y-6">
          {/* Platform Selection */}
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">
              Platform
            </label>
            <Select value={platform} onValueChange={setPlatform}>
              <SelectTrigger className="bg-background border-border">
                <SelectValue placeholder="Select platform" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="facebook">Facebook</SelectItem>
                <SelectItem value="instagram">Instagram</SelectItem>
                <SelectItem value="twitter">Twitter</SelectItem>
                <SelectItem value="linkedin">LinkedIn</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Content Input */}
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">
              Content
            </label>
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="What's on your mind? Share your thoughts..."
              className="min-h-32 bg-background border-border resize-none"
            />
          </div>

          {/* Hashtags */}
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">
              Hashtags
            </label>
            <div className="flex space-x-2 mb-2">
              <Input
                value={newHashtag}
                onChange={(e) => setNewHashtag(e.target.value)}
                placeholder="Add hashtag"
                className="flex-1 bg-background border-border"
                onKeyPress={(e) => e.key === 'Enter' && addHashtag()}
              />
              <Button onClick={addHashtag} variant="outline" size="sm">
                Add
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {hashtags.map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="cursor-pointer hover:bg-destructive hover:text-destructive-foreground"
                  onClick={() => removeHashtag(tag)}
                >
                  #{tag} ×
                </Badge>
              ))}
            </div>
          </div>

          {/* Schedule */}
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">
              Schedule (Optional)
            </label>
            <Input
              type="datetime-local"
              value={scheduleTime}
              onChange={(e) => setScheduleTime(e.target.value)}
              className="bg-background border-border"
            />
          </div>

          {/* Actions */}
          <div className="flex space-x-3 pt-4">
            <Button variant="gradient" className="flex-1">
              <Send className="h-4 w-4 mr-2" />
              Publish Now
            </Button>
            <Button variant="outline" className="flex-1 border-border">
              <Calendar className="h-4 w-4 mr-2" />
              Schedule
            </Button>
          </div>
        </div>
      </Card>

      {/* Preview */}
      <Card className="p-6 bg-card border-border">
        <h3 className="text-xl font-semibold text-foreground mb-6">Preview</h3>
        
        {platform ? (
          <div className="space-y-4">
            {/* Platform Header */}
            <div className="flex items-center space-x-3 p-4 rounded-lg bg-background/50">
              <div className="h-10 w-10 rounded-full bg-gradient-primary"></div>
              <div>
                <p className="font-medium text-foreground">Your Brand</p>
                <p className="text-sm text-muted-foreground">
                  {platform.charAt(0).toUpperCase() + platform.slice(1)}
                </p>
              </div>
            </div>

            {/* Content Preview */}
            <div className="p-4 bg-background/30 rounded-lg">
              {content ? (
                <div>
                  <p className="text-foreground whitespace-pre-wrap mb-3">
                    {content}
                  </p>
                  {hashtags.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {hashtags.map((tag) => (
                        <span key={tag} className="text-ai-primary">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <p className="text-muted-foreground italic">
                  Your content will appear here...
                </p>
              )}
            </div>

            {/* Schedule Info */}
            {scheduleTime && (
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>Scheduled for {new Date(scheduleTime).toLocaleString()}</span>
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center justify-center h-64 text-muted-foreground">
            <div className="text-center">
              <ImageIcon className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Select a platform to see preview</p>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};