import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plus, Calendar, BarChart3, Sparkles } from "lucide-react";
import { ContentCreator } from "./ContentCreator";
import { AIChat } from "./AIChat";
import { ScheduleView } from "./ScheduleView";
import { StatsOverview } from "./StatsOverview";
import heroImage from "@/assets/hero-content-creation.jpg";

export const Dashboard = () => {
  const [activeTab, setActiveTab] = useState<"create" | "schedule" | "stats">("create");
  const [showAIChat, setShowAIChat] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-xl">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="h-8 w-8 rounded-lg bg-gradient-primary"></div>
              <h1 className="text-xl font-bold text-foreground">ContentAI</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowAIChat(true)}
                className="border-border bg-card hover:bg-card-elevated"
              >
                <Sparkles className="h-4 w-4 mr-2" />
                AI Assistant
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="relative container mx-auto px-6 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
              Create. Schedule. Automate.
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              AI-powered content creation for social media with automatic publishing
            </p>
            <Button 
              size="lg"
              variant="gradient"
            >
              <Plus className="h-5 w-5 mr-2" />
              Create Content
            </Button>
          </div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <nav className="border-b border-border bg-card/30 backdrop-blur-sm">
        <div className="container mx-auto px-6">
          <div className="flex space-x-8">
            {[
              { id: "create", label: "Create", icon: Plus },
              { id: "schedule", label: "Schedule", icon: Calendar },
              { id: "stats", label: "Analytics", icon: BarChart3 },
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id as any)}
                className={`flex items-center space-x-2 px-4 py-4 border-b-2 transition-smooth ${
                  activeTab === id
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                <Icon className="h-4 w-4" />
                <span className="font-medium">{label}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        {activeTab === "create" && <ContentCreator />}
        {activeTab === "schedule" && <ScheduleView />}
        {activeTab === "stats" && <StatsOverview />}
      </main>

      {/* AI Chat Sidebar */}
      {showAIChat && (
        <AIChat onClose={() => setShowAIChat(false)} />
      )}
    </div>
  );
};