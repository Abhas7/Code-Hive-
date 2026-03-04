
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
    ExternalLink,
    ChevronRight,
    PlusCircle,
    Bell,
    Settings,
    ShieldCheck,
    ArrowUpRight
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    Bar
} from 'recharts';

const chartData = [
    { name: 'Jan', activity: 40, funding: 2400 },
    { name: 'Feb', activity: 30, funding: 1398 },
    { name: 'Mar', activity: 20, funding: 9800 },
    { name: 'Apr', activity: 27, funding: 3908 },
    { name: 'May', activity: 18, funding: 4800 },
    { name: 'Jun', activity: 23, funding: 3800 },
    { name: 'Jul', activity: 34, funding: 4300 },
];

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
        }

        const loadDashboardData = async () => {
            try {
                setIsLoading(true);
                const projects = await fetchLatestProjects('crowdhive', 'created', 3);
                setRecentProjects(projects.slice(0, 3));

                setStats({
                    totalProjects: projects.filter(p => p.author === connectedUser).length || 0,
                    totalContributions: 12,
                    activeCampaigns: 2,
                    totalRaised: 450
                });
            } catch (error) {
                console.error("Error loading dashboard data:", error);
            } finally {
                setIsLoading(false);
            }
        };

        loadDashboardData();
    }, [toast]);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.5,
                ease: "easeOut"
            }
        }
    };

    return (
        <div className="relative min-h-screen bg-background text-foreground overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
                <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] bg-purple-600/10 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-[-5%] right-[-5%] w-[30%] h-[30%] bg-indigo-600/10 rounded-full blur-[100px]" />
                <div className="absolute top-[20%] right-[10%] w-[20%] h-[20%] bg-blue-600/5 rounded-full blur-[80px]" />
            </div>

            <main className="relative container mx-auto px-4 py-8 z-10">
                {/* Header Section */}
                <motion.div
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6"
                >
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <Badge variant="outline" className="border-primary/30 text-primary-foreground/70 bg-primary/5 px-2 py-0.5">
                                Account Overview
                            </Badge>
                            {username && (
                                <Badge variant="secondary" className="bg-green-500/10 text-green-400 border-none">
                                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 mr-2 animate-pulse" />
                                    Active: @{username}
                                </Badge>
                            )}
                        </div>
                        <h1 className="text-5xl font-black tracking-tight gradient-text mb-2">
                            Dashboard
                        </h1>
                        <p className="text-muted-foreground text-lg max-w-xl">
                            Welcome back! Track your ecosystem engagement, manage hive projects, and monitor network statistics.
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="rounded-full bg-white/5 hover:bg-white/10 border border-white/10"
                        >
                            <Bell className="h-5 w-5" />
                        </Button>
                        <Button
                            variant="outline"
                            className="border-primary/50 hover:bg-primary/10 rounded-full px-6"
                            onClick={() => navigate('/projects')}
                        >
                            Explore
                        </Button>
                        <Button
                            className="bg-gradient-to-r from-primary to-indigo-600 hover:opacity-90 shadow-[0_0_20px_rgba(147,51,234,0.3)] rounded-full px-6"
                            onClick={() => navigate('/my-projects')}
                        >
                            <PlusCircle className="mr-2 h-4 w-4" />
                            Launch Project
                        </Button>
                    </div>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="space-y-8"
                >
                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <motion.div variants={itemVariants}>
                            <StatCard
                                title="My Projects"
                                value={stats.totalProjects.toString()}
                                trend="+2 this month"
                                icon={<Rocket className="h-5 w-5 text-purple-500" />}
                                description="Created on-chain"
                                color="purple"
                            />
                        </motion.div>
                        <motion.div variants={itemVariants}>
                            <StatCard
                                title="Contributions"
                                value={stats.totalContributions.toString()}
                                trend="Top contributor"
                                icon={<Users className="h-5 w-5 text-blue-500" />}
                                description="Projects supported"
                                color="blue"
                            />
                        </motion.div>
                        <motion.div variants={itemVariants}>
                            <StatCard
                                title="Total Raised"
                                value={`$${stats.totalRaised}`}
                                trend="+14.2%"
                                icon={<CircleDollarSign className="h-5 w-5 text-green-500" />}
                                description="Funding accumulated"
                                color="green"
                            />
                        </motion.div>
                        <motion.div variants={itemVariants}>
                            <StatCard
                                title="Activity Score"
                                value="84"
                                trend="Excellent"
                                icon={<TrendingUp className="h-5 w-5 text-orange-500" />}
                                description="Engagement percentile"
                                color="orange"
                            />
                        </motion.div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Main Content Area */}
                        <div className="lg:col-span-2 space-y-8">
                            {/* Analytics Chart */}
                            <motion.div variants={itemVariants}>
                                <Card className="glass-card border-white/10 bg-black/20 overflow-hidden h-full">
                                    <CardHeader className="flex flex-row items-center justify-between">
                                        <div>
                                            <CardTitle className="text-xl">Network Engagement</CardTitle>
                                            <CardDescription>Activity & Funding metrics over time</CardDescription>
                                        </div>
                                        <div className="flex gap-2">
                                            <Badge variant="secondary" className="bg-primary/20 text-primary">Funding</Badge>
                                            <Badge variant="outline" className="text-muted-foreground">Activity</Badge>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="pt-6">
                                        <div className="h-[300px] w-full">
                                            <ResponsiveContainer width="100%" height="100%">
                                                <AreaChart data={chartData}>
                                                    <defs>
                                                        <linearGradient id="colorFunding" x1="0" y1="0" x2="0" y2="1">
                                                            <stop offset="5%" stopColor="#9333ea" stopOpacity={0.3} />
                                                            <stop offset="95%" stopColor="#9333ea" stopOpacity={0} />
                                                        </linearGradient>
                                                    </defs>
                                                    <CartesianGrid strokeDasharray="3 3" stroke="#2a2a40" vertical={false} />
                                                    <XAxis
                                                        dataKey="name"
                                                        stroke="#64748b"
                                                        fontSize={12}
                                                        tickLine={false}
                                                        axisLine={false}
                                                    />
                                                    <YAxis
                                                        stroke="#64748b"
                                                        fontSize={12}
                                                        tickLine={false}
                                                        axisLine={false}
                                                        tickFormatter={(value) => `$${value}`}
                                                    />
                                                    <Tooltip
                                                        contentStyle={{ backgroundColor: '#13111c', borderColor: '#302e40', color: '#fff' }}
                                                        itemStyle={{ color: '#fff' }}
                                                    />
                                                    <Area
                                                        type="monotone"
                                                        dataKey="funding"
                                                        stroke="#9333ea"
                                                        fillOpacity={1}
                                                        fill="url(#colorFunding)"
                                                        strokeWidth={2}
                                                    />
                                                    <Area
                                                        type="monotone"
                                                        dataKey="activity"
                                                        stroke="#6366f1"
                                                        fillOpacity={0}
                                                        strokeWidth={2}
                                                        strokeDasharray="5 5"
                                                    />
                                                </AreaChart>
                                            </ResponsiveContainer>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>

                            {/* Recent Activity List */}
                            <motion.div variants={itemVariants}>
                                <Card className="glass-card border-primary/10">
                                    <div className="p-6 border-b border-white/5 flex flex-row items-center justify-between">
                                        <div>
                                            <h3 className="text-xl font-bold">Latest Network Activity</h3>
                                            <p className="text-sm text-muted-foreground">Recent project updates on the blockchain</p>
                                        </div>
                                        <Button variant="ghost" size="sm" className="hover:bg-white/5" onClick={() => navigate('/projects')}>
                                            Full Report <ChevronRight className="ml-1 h-4 w-4" />
                                        </Button>
                                    </div>
                                    <CardContent className="p-0">
                                        <div className="divide-y divide-white/5">
                                            {isLoading ? (
                                                [1, 2, 3].map((i) => (
                                                    <div key={i} className="p-6 h-20 bg-muted/20 animate-pulse" />
                                                ))
                                            ) : recentProjects.length > 0 ? (
                                                recentProjects.map((project, idx) => (
                                                    <div
                                                        key={idx}
                                                        className="flex items-center justify-between p-5 hover:bg-white/5 transition-all cursor-pointer group"
                                                        onClick={() => navigate('/projects')}
                                                    >
                                                        <div className="flex items-center gap-4">
                                                            <div className="relative">
                                                                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary/30 to-indigo-600/30 flex items-center justify-center text-primary font-bold shadow-lg">
                                                                    {project.title.charAt(0)}
                                                                </div>
                                                                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-4 border-[#0F0B21] flex items-center justify-center">
                                                                    <div className="w-1.5 h-1.5 bg-white rounded-full" />
                                                                </div>
                                                            </div>
                                                            <div>
                                                                <h4 className="font-semibold group-hover:text-primary transition-colors text-lg">{project.title}</h4>
                                                                <div className="flex items-center gap-2 mt-1">
                                                                    <span className="text-xs text-muted-foreground bg-white/5 px-2 py-0.5 rounded">@{project.author}</span>
                                                                    <span className="text-xs text-muted-foreground">
                                                                        {new Date(project.created).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="hidden sm:flex items-center gap-4">
                                                            <div className="text-right">
                                                                <div className="font-mono text-sm text-primary font-bold">ACTIVE</div>
                                                                <div className="text-xs text-muted-foreground">Crowdfund</div>
                                                            </div>
                                                            <div className="p-2 rounded-full group-hover:bg-primary/20 transition-colors">
                                                                <ArrowUpRight className="h-5 w-5 text-muted-foreground group-hover:text-primary" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))
                                            ) : (
                                                <div className="text-center py-16 text-muted-foreground">
                                                    <Activity className="h-12 w-12 mx-auto mb-4 opacity-20" />
                                                    <p>No network activity observed yet.</p>
                                                    <Button variant="link" color="primary">Start Exploration</Button>
                                                </div>
                                            )}
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        </div>

                        {/* Sidebar Widgets */}
                        <div className="space-y-8">
                            {/* Network Health */}
                            <motion.div variants={itemVariants}>
                                <Card className="glass-card border-indigo-500/20 bg-indigo-500/5 relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                                        <Activity className="h-16 w-16" />
                                    </div>
                                    <CardHeader>
                                        <CardTitle className="text-lg flex items-center gap-2">
                                            <div className="p-1.5 rounded-lg bg-indigo-500/20">
                                                <Activity className="h-4 w-4 text-indigo-400" />
                                            </div>
                                            Node Health
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-6">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wider">Status</p>
                                                <p className="text-green-400 font-bold flex items-center">
                                                    Optimal <ShieldCheck className="ml-1.5 h-3.5 w-3.5" />
                                                </p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wider">Sync</p>
                                                <p className="font-bold">100.0%</p>
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <div className="flex justify-between items-center text-sm">
                                                <span className="text-muted-foreground">Wallet RC Usage</span>
                                                <span className="font-mono font-bold text-indigo-400">98.4%</span>
                                            </div>
                                            <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                                                <div className="bg-gradient-to-r from-indigo-500 to-purple-500 h-full w-[98.4%] animate-shimmer" />
                                            </div>
                                        </div>

                                        <Button variant="outline" size="sm" className="w-full bg-white/5 border-white/10 text-xs py-5 rounded-xl hover:bg-white/10" asChild>
                                            <a href="https://hiveblocks.com" target="_blank" rel="noopener noreferrer">
                                                View Blocks <ExternalLink className="ml-2 h-3 w-3" />
                                            </a>
                                        </Button>
                                    </CardContent>
                                </Card>
                            </motion.div>

                            {/* Upcoming Events */}
                            <motion.div variants={itemVariants}>
                                <Card className="glass-card border-purple-500/20 bg-black/20">
                                    <CardHeader>
                                        <CardTitle className="text-lg flex items-center gap-2">
                                            <div className="p-1.5 rounded-lg bg-purple-500/20">
                                                <Calendar className="h-4 w-4 text-purple-400" />
                                            </div>
                                            Ecosystem Calendar
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="group p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-purple-500/30 transition-all cursor-pointer">
                                            <div className="flex justify-between items-start mb-2">
                                                <span className="text-[10px] font-bold tracking-widest text-purple-400 uppercase">Token Launch</span>
                                                <Badge variant="outline" className="text-[9px] h-4 border-purple-500/50">T-48H</Badge>
                                            </div>
                                            <p className="text-sm font-bold group-hover:text-purple-300 transition-colors">Decentralized AI Initiative</p>
                                            <p className="text-xs text-muted-foreground mt-1">Staking period begins at block #82.4M</p>
                                        </div>

                                        <div className="group p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-indigo-500/30 transition-all cursor-pointer">
                                            <div className="flex justify-between items-start mb-2">
                                                <span className="text-[10px] font-bold tracking-widest text-indigo-400 uppercase">Governance</span>
                                                <Badge variant="outline" className="text-[9px] h-4 border-indigo-500/50 text-indigo-400">Live</Badge>
                                            </div>
                                            <p className="text-sm font-bold group-hover:text-indigo-300 transition-colors">Proposal #427: Platform Fees</p>
                                            <p className="text-xs text-muted-foreground mt-1">Vote ending in 14 hours 22 minutes</p>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>

                            {/* Settings Shortcut */}
                            <motion.div variants={itemVariants}>
                                <Card className="glass-card border-white/5 bg-transparent hover:bg-white/5 transition-all cursor-pointer">
                                    <CardContent className="p-4 flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 rounded-lg bg-secondary text-muted-foreground">
                                                <Settings className="h-4 w-4" />
                                            </div>
                                            <span className="text-sm font-medium">Account Settings</span>
                                        </div>
                                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                                    </CardContent>
                                </Card>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
            </main>
            <FooterSection />
        </div>
    );
};

interface StatCardProps {
    title: string;
    value: string;
    icon: React.ReactNode;
    description: string;
    trend?: string;
    color: 'purple' | 'blue' | 'green' | 'orange';
}

const StatCard = ({ title, value, icon, description, trend, color }: StatCardProps) => {
    const colorClasses = {
        purple: "from-purple-500/20 to-purple-600/5 hover:border-purple-500/40",
        blue: "from-blue-500/20 to-blue-600/5 hover:border-blue-500/40",
        green: "from-green-500/20 to-green-600/5 hover:border-green-500/40",
        orange: "from-orange-500/20 to-orange-600/5 hover:border-orange-500/40"
    };

    return (
        <Card className={`glass-card bg-gradient-to-br ${colorClasses[color]} border-white/10 transition-all hover:translate-y-[-4px] overflow-hidden group`}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors uppercase tracking-wider">
                    {title}
                </CardTitle>
                <div className="p-2 rounded-xl bg-black/20 group-hover:scale-110 transition-transform">
                    {icon}
                </div>
            </CardHeader>
            <CardContent>
                <div className="flex items-baseline gap-2">
                    <div className="text-3xl font-black">{value}</div>
                    {trend && <div className="text-[10px] font-bold text-green-400 bg-green-500/10 px-1.5 py-0.5 rounded">{trend}</div>}
                </div>
                <p className="text-xs text-muted-foreground mt-2 font-medium">
                    {description}
                </p>

                {/* Visual accent */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </CardContent>
        </Card>
    );
};

export default Dashboard;
