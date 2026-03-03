
import { useState, useEffect } from "react";
import { FooterSection } from "@/components/landing/FooterSection";
import { getConnectedUsername, fetchLatestProjects } from "@/utils/hive";
import {
    Users,
    Rocket,
    CircleDollarSign,
    TrendingUp,
    Activity,
    Calendar,
    LayoutDashboard,
    ExternalLink,
    ChevronRight,
    PlusCircle
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const [username, setUsername] = useState<string | null>(null);
    const [stats, setStats] = useState({
        totalProjects: 0,
        totalContributions: 0,
        activeCampaigns: 0,
        totalRaised: 0
    });
    const [recentProjects, setRecentProjects] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const { toast } = useToast();
    const navigate = useNavigate();

    useEffect(() => {
        const connectedUser = getConnectedUsername();
        setUsername(connectedUser);

        if (!connectedUser) {
            toast({
                title: "Connection Required",
                description: "Please connect your Hive wallet to access your dashboard.",
                variant: "destructive",
            });
            // We could redirect to home here, but maybe user just wants to see the layout
        }

        const loadDashboardData = async () => {
            try {
                setIsLoading(true);
                // In a real app, we'd fetch specific user stats
                // For now, we'll simulate some stats and fetch some projects
                const projects = await fetchLatestProjects('crowdhive', 'created', 3);
                setRecentProjects(projects.slice(0, 3));

                // Simulated stats
                setStats({
                    totalProjects: projects.filter(p => p.author === connectedUser).length || 0,
                    totalContributions: 12, // Simulated
                    activeCampaigns: 2, // Simulated
                    totalRaised: 450 // Simulated HBD/HIVE
                });
            } catch (error) {
                console.error("Error loading dashboard data:", error);
            } finally {
                setIsLoading(false);
            }
        };

        loadDashboardData();
    }, [toast]);

    return (
        <div className="min-h-screen bg-background text-foreground">
            <main className="container mx-auto px-4 py-8">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-4xl font-bold gradient-text">Dashboard</h1>
                        <p className="text-muted-foreground mt-2">
                            Welcome back{username ? `, ${username}` : ""}! Here's what's happening with your projects.
                        </p>
                    </div>
                    <div className="flex gap-3">
                        <Button
                            variant="outline"
                            className="border-primary/50 hover:bg-primary/10"
                            onClick={() => navigate('/projects')}
                        >
                            Explore Projects
                        </Button>
                        <Button
                            className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:opacity-90"
                            onClick={() => navigate('/my-projects')}
                        >
                            <PlusCircle className="mr-2 h-4 w-4" />
                            Manage My Projects
                        </Button>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                    <StatCard
                        title="My Projects"
                        value={stats.totalProjects.toString()}
                        icon={<Rocket className="h-5 w-5 text-purple-500" />}
                        description="Total projects created"
                    />
                    <StatCard
                        title="Contributions"
                        value={stats.totalContributions.toString()}
                        icon={<Users className="h-5 w-5 text-blue-500" />}
                        description="Projects backed by you"
                    />
                    <StatCard
                        title="Total Raised"
                        value={`$${stats.totalRaised}`}
                        icon={<CircleDollarSign className="h-5 w-5 text-green-500" />}
                        description="Total funding received"
                    />
                    <StatCard
                        title="Activity Score"
                        value="84"
                        icon={<TrendingUp className="h-5 w-5 text-orange-500" />}
                        description="Network engagement level"
                    />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                    {/* Recent Activity */}
                    <Card className="lg:col-span-2 bg-card/50 backdrop-blur-sm border-primary/10">
                        <CardHeader className="flex flex-row items-center justify-between">
                            <div>
                                <CardTitle>Recent Marketplace Activity</CardTitle>
                                <CardDescription>Latest projects on CrowdHive</CardDescription>
                            </div>
                            <Button variant="ghost" size="sm" onClick={() => navigate('/projects')}>
                                View All <ChevronRight className="ml-1 h-4 w-4" />
                            </Button>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {isLoading ? (
                                    [1, 2, 3].map((i) => (
                                        <div key={i} className="h-20 bg-muted/50 animate-pulse rounded-lg" />
                                    ))
                                ) : recentProjects.length > 0 ? (
                                    recentProjects.map((project, idx) => (
                                        <div
                                            key={idx}
                                            className="flex items-center justify-between p-4 rounded-xl bg-background/50 border border-border/50 hover:border-primary/30 transition-all cursor-pointer group"
                                            onClick={() => navigate('/projects')}
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center text-primary font-bold">
                                                    {project.title.charAt(0)}
                                                </div>
                                                <div>
                                                    <h4 className="font-semibold group-hover:text-primary transition-colors">{project.title}</h4>
                                                    <div className="flex items-center gap-2 mt-1">
                                                        <Badge variant="secondary" className="text-[10px] h-4">
                                                            {project.author}
                                                        </Badge>
                                                        <span className="text-xs text-muted-foreground">
                                                            {new Date(project.created).toLocaleDateString()}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div className="font-mono text-sm text-primary">Active</div>
                                                <div className="text-xs text-muted-foreground">Campaign</div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center py-10 text-muted-foreground">
                                        No recent activity found.
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Quick Stats/Links */}
                    <div className="space-y-6">
                        <Card className="bg-gradient-to-br from-indigo-900/20 to-purple-900/20 border-primary/20">
                            <CardHeader>
                                <CardTitle className="text-lg flex items-center gap-2">
                                    <Activity className="h-5 w-5 text-indigo-400" />
                                    Hive Network Status
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-muted-foreground">Network Load</span>
                                    <span className="text-green-400 font-mono">Stable</span>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-muted-foreground">Your RC</span>
                                    <span className="font-mono">98.4%</span>
                                </div>
                                <div className="w-full bg-secondary h-1.5 rounded-full overflow-hidden">
                                    <div className="bg-indigo-500 h-full w-[98%]" />
                                </div>
                                <Button variant="outline" size="sm" className="w-full mt-2 text-xs" asChild>
                                    <a href="https://hiveblocks.com" target="_blank" rel="noopener noreferrer">
                                        View on Blockchain <ExternalLink className="ml-2 h-3 w-3" />
                                    </a>
                                </Button>
                            </CardContent>
                        </Card>

                        <Card className="bg-card/50 backdrop-blur-sm border-primary/10">
                            <CardHeader>
                                <CardTitle className="text-lg flex items-center gap-2">
                                    <Calendar className="h-5 w-5 text-purple-400" />
                                    Upcoming Events
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="p-3 rounded-lg bg-background/40 border border-border/40">
                                    <div className="text-xs text-primary mb-1 font-semibold">TOKEN LAUNCH</div>
                                    <p className="text-sm font-medium italic">"Decentralized AI Initiative"</p>
                                    <p className="text-xs text-muted-foreground mt-1">Starting in 2 days</p>
                                </div>
                                <div className="p-3 rounded-lg bg-background/40 border border-border/40">
                                    <div className="text-xs text-indigo-400 mb-1 font-semibold">GOVERNANCE VOTE</div>
                                    <p className="text-sm font-medium">Proposal #427: Platform Fees</p>
                                    <p className="text-xs text-muted-foreground mt-1">Ends tomorrow</p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </main>
            <FooterSection />
        </div>
    );
};

const StatCard = ({ title, value, icon, description }: { title: string, value: string, icon: React.ReactNode, description: string }) => (
    <Card className="bg-card/40 backdrop-blur-md border-primary/10 hover:border-primary/30 transition-all hover:translate-y-[-2px]">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
                {title}
            </CardTitle>
            {icon}
        </CardHeader>
        <CardContent>
            <div className="text-2xl font-bold">{value}</div>
            <p className="text-xs text-muted-foreground mt-1">
                {description}
            </p>
        </CardContent>
    </Card>
);

export default Dashboard;
