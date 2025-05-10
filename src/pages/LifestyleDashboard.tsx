
import React from 'react';
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Calendar, Clock, Dumbbell, Award, Trophy, Flame, Bell, Star, Heart, Goal } from 'lucide-react';
import { Button } from "@/components/ui/button";
import DailyChallenge from "@/components/lifestyle/DailyChallenge";
import AchievementCard from "@/components/lifestyle/AchievementCard";
import GoalProgressCard from "@/components/lifestyle/GoalProgressCard";
import TimelineEvent from "@/components/lifestyle/TimelineEvent";
import XpLevel from "@/components/lifestyle/XpLevel";
import SmartSuggestion from "@/components/lifestyle/SmartSuggestion";

const LifestyleDashboard: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-6 max-w-4xl">
      <div className="bg-black/30 rounded-xl p-6 mb-6 border border-white/10">
        <div className="flex justify-between items-center mb-3">
          <h1 className="text-2xl font-bold text-finance-chart">Lifestyle Dashboard</h1>
          <XpLevel level={12} xp={4350} nextLevelXp={5000} />
        </div>
        <p className="text-finance-gray">
          Track your progress, unlock achievements, and level up your lifestyle with personalized challenges and insights.
        </p>
      </div>

      {/* Featured Goal Progress */}
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-3 flex items-center gap-2">
          <Goal className="text-finance-chart" /> 
          Featured Goal Progress
        </h2>
        <GoalProgressCard 
          title="Running Target" 
          progress={70} 
          message="You're 70% to your running target – 3 days left!"
          icon={<Flame className="text-orange-500" />}
          color="orange"
        />
      </div>
      
      {/* Challenges */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-3 flex items-center gap-2">
          <Trophy className="text-finance-chart" /> 
          Daily & Weekly Challenges
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <DailyChallenge 
            title="Beat Last Week" 
            description="Beat last week's cardio time by 5 minutes" 
            reward="150 XP"
            difficulty="medium"
            deadline="Today"
          />
          <DailyChallenge 
            title="Sleep Streak" 
            description="Maintain 7-hour sleep for 3 consecutive nights" 
            reward="200 XP"
            difficulty="hard"
            deadline="This week"
          />
          <DailyChallenge 
            title="Nutrition Win" 
            description="Hit your protein goal for 5 consecutive days" 
            reward="100 XP"
            difficulty="easy"
            deadline="This week"
          />
          <DailyChallenge 
            title="Step Master" 
            description="Reach 10,000 steps every day this week" 
            reward="250 XP"
            difficulty="medium"
            deadline="4 days left"
          />
        </div>
      </div>
      
      {/* Achievements */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-3 flex items-center gap-2">
          <Award className="text-finance-chart" /> 
          Recent Achievements
        </h2>
        <Carousel className="w-full">
          <CarouselContent>
            <CarouselItem className="sm:basis-1/2 lg:basis-1/3">
              <AchievementCard 
                title="Consistent Sleeper" 
                description="7 days of consistent sleep schedule" 
                xpEarned={300}
                icon={<Clock />}
              />
            </CarouselItem>
            <CarouselItem className="sm:basis-1/2 lg:basis-1/3">
              <AchievementCard 
                title="Weekly PR" 
                description="Beat your personal record in deadlift" 
                xpEarned={250}
                icon={<Dumbbell />}
              />
            </CarouselItem>
            <CarouselItem className="sm:basis-1/2 lg:basis-1/3">
              <AchievementCard 
                title="Meal Plan Master" 
                description="Completed full week of meal planning" 
                xpEarned={200}
                icon={<Heart />}
              />
            </CarouselItem>
            <CarouselItem className="sm:basis-1/2 lg:basis-1/3">
              <AchievementCard 
                title="Early Riser" 
                description="Woke up before 7am five days in a row" 
                xpEarned={150}
                icon={<Bell />}
              />
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious className="left-0" />
          <CarouselNext className="right-0" />
        </Carousel>
      </div>
      
      {/* Timeline */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-3 flex items-center gap-2">
          <Calendar className="text-finance-chart" /> 
          Upcoming Timeline
        </h2>
        <div className="space-y-3">
          <TimelineEvent 
            title="HIIT Workout" 
            time="Today, 6:00 PM" 
            description="30 min high intensity interval training"
            icon={<Dumbbell className="text-red-500" />}
            category="workout"
          />
          <TimelineEvent 
            title="Recovery Day" 
            time="Tomorrow" 
            description="Focus on stretching and light activity"
            icon={<Heart className="text-green-500" />}
            category="recovery"
          />
          <TimelineEvent 
            title="5K Race Prep" 
            time="Saturday, 8:00 AM" 
            description="Final training run before race day"
            icon={<Flame className="text-amber-500" />}
            category="competition"
          />
          <TimelineEvent 
            title="Meal Prep" 
            time="Sunday, 2:00 PM" 
            description="Prepare meals for the next week"
            icon={<Star className="text-blue-500" />}
            category="habit"
          />
        </div>
      </div>
      
      {/* Smart Suggestions */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-3 flex items-center gap-2">
          <Bell className="text-finance-chart" /> 
          Smart Suggestions
        </h2>
        <div className="space-y-3">
          <SmartSuggestion 
            title="Improve Sleep Quality" 
            description="Your sleep data shows irregular patterns. Try to maintain a consistent sleep schedule, even on weekends."
            category="rest"
          />
          <SmartSuggestion 
            title="Nutrition Insight" 
            description="Your protein intake is below target. Consider adding a protein-rich snack after workouts."
            category="diet"
          />
          <SmartSuggestion 
            title="Workout Balance" 
            description="You've been focusing on cardio. Adding 2 strength sessions per week would improve overall fitness."
            category="fitness"
          />
        </div>
      </div>
      
      {/* Motivational Alert */}
      <div className="mb-8">
        <Card className="border border-finance-accent/30 bg-finance-accent/10">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-finance-accent/20 rounded-full">
                <Trophy className="h-8 w-8 text-finance-accent" />
              </div>
              <div>
                <h3 className="font-bold text-white">You're on a streak!</h3>
                <p className="text-finance-gray">5-day workout streak! Complete today's workout to keep it going!</p>
              </div>
            </div>
            <div className="flex justify-end mt-4">
              <Button size="sm" className="bg-finance-accent hover:bg-finance-accent/80 text-white">
                View Workout
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LifestyleDashboard;
