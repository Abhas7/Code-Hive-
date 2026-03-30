import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Mail, Lock, User, ArrowRight, Github } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";

const Login = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate login
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Successfully logged in!");
      navigate("/dashboard");
    }, 1500);
  };

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate signup
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Account created successfully!");
      navigate("/dashboard");
    }, 1500);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 bg-gradient-to-br from-background to-muted/50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="border-border/50 shadow-xl shadow-black/5 dark:shadow-white/5 backdrop-blur-sm bg-background/80">
          <CardHeader className="space-y-1 pb-6 text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="w-6 h-6 text-primary" />
            </div>
            <CardTitle className="text-2xl font-bold tracking-tight">Welcome back</CardTitle>
            <CardDescription className="text-muted-foreground">
              Sign in to your account to continue
            </CardDescription>
          </CardHeader>
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6 px-6 bg-transparent">
              <TabsTrigger value="login" className="data-[state=active]:bg-primary/5 data-[state=active]:text-primary border-b-2 border-transparent data-[state=active]:border-primary rounded-none shadow-none transition-all">Login</TabsTrigger>
              <TabsTrigger value="register" className="data-[state=active]:bg-primary/5 data-[state=active]:text-primary border-b-2 border-transparent data-[state=active]:border-primary rounded-none shadow-none transition-all">Register</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login">
              <form onSubmit={handleLogin}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                      <Input id="email" type="email" placeholder="m@example.com" className="pl-10" required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password">Password</Label>
                      <Link to="#" className="text-sm font-medium text-primary hover:underline">
                        Forgot password?
                      </Link>
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                      <Input id="password" type="password" className="pl-10" required />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col space-y-4">
                  <Button className="w-full h-11" type="submit" disabled={isLoading}>
                    {isLoading ? "Signing in..." : "Sign In"}
                    {!isLoading && <ArrowRight className="ml-2 h-4 w-4" />}
                  </Button>
                  <div className="relative w-full">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t border-muted" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
                    </div>
                  </div>
                  <Button variant="outline" type="button" className="w-full h-11" disabled={isLoading}>
                    <Github className="mr-2 h-4 w-4" />
                    Github
                  </Button>
                </CardFooter>
              </form>
            </TabsContent>

            <TabsContent value="register">
              <form onSubmit={handleSignUp}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                      <Input id="name" placeholder="John Doe" className="pl-10" required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="register-email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                      <Input id="register-email" type="email" placeholder="m@example.com" className="pl-10" required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="register-password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                      <Input id="register-password" type="password" className="pl-10" required />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col space-y-4">
                  <Button className="w-full h-11" type="submit" disabled={isLoading}>
                    {isLoading ? "Creating account..." : "Create Account"}
                    {!isLoading && <ArrowRight className="ml-2 h-4 w-4" />}
                  </Button>
                </CardFooter>
              </form>
            </TabsContent>
          </Tabs>
        </Card>
      </motion.div>
    </div>
  );
};

export default Login;
