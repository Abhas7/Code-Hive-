import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Check, Shield, CreditCard, ArrowLeft, Zap, Crown, Sparkles, Building2, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import { FooterSection } from "@/components/landing/FooterSection";

const plans = {
  community: {
    name: "Community",
    price: "0",
    description: "Perfect for testing the waters and small personal projects.",
    features: [
      "Up to 2 active projects",
      "Standard platform fee (5%)",
      "Community support",
      "Basic project analytics",
      "CrowdHive badge",
    ],
    icon: <Sparkles className="h-10 w-10 text-blue-500" />,
    color: "blue",
  },
  pro: {
    name: "Pro",
    price: "19",
    description: "Best for growing creators and serious project launches.",
    features: [
      "Unlimited active projects",
      "Reduced platform fee (2%)",
      "Priority email support",
      "Advanced real-time analytics",
      "Featured project placement",
      "Pro badge on profile",
      "Custom project URL",
    ],
    icon: <Zap className="h-10 w-10 text-yellow-500" />,
    color: "yellow",
  },
  enterprise: {
    name: "Enterprise",
    price: "99",
    description: "For established organizations and large-scale funding needs.",
    features: [
      "No platform fees",
      "Dedicated account manager",
      "White-label project pages",
      "Custom smart contract options",
      "API access for automation",
      "VIP networking events",
      "Corporate verified status",
    ],
    icon: <Crown className="h-10 w-10 text-purple-500" />,
    color: "purple",
  },
};

const SubscriptionCheckout = () => {
  const { planId } = useParams<{ planId: string }>();
  const navigate = useNavigate();
  
  const selectedPlan = plans[planId as keyof typeof plans] || plans.pro;

  const [paymentStep, setPaymentStep] = React.useState(1);
  const [isProcessing, setIsProcessing] = React.useState(false);

  const handlePayment = () => {
    setIsProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setPaymentStep(2);
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className={`absolute top-[-10%] left-[-5%] w-[40%] h-[40%] bg-${selectedPlan.color}-600/10 rounded-full blur-[120px] animate-pulse`} />
        <div className="absolute bottom-[-5%] right-[-5%] w-[30%] h-[30%] bg-indigo-600/10 rounded-full blur-[100px]" />
      </div>

      <main className="flex-grow relative z-10 pt-12 pb-24">
        <div className="container mx-auto px-4">
          <Button 
            variant="ghost" 
            className="mb-8 hover:bg-muted/50 transition-all gap-2"
            onClick={() => navigate("/subscription")}
          >
            <ArrowLeft className="h-4 w-4" /> Back to Plans
          </Button>

          <AnimatePresence mode="wait">
            {paymentStep === 1 ? (
              <motion.div 
                key="checkout-form"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-6xl mx-auto"
              >
                {/* Left: Summary */}
                <div className="lg:col-span-5">
                  <Badge variant="outline" className="mb-4 border-primary/30 text-primary">Your Selection</Badge>
                  <h1 className="text-4xl font-black mb-6 tracking-tight">Complete Your <br/>Subscription</h1>
                  
                  <Card className="glass-card border-primary/20 overflow-hidden">
                    <CardHeader className="bg-primary/5 pb-8">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 rounded-2xl bg-background shadow-lg border border-border/50">
                          {selectedPlan.icon}
                        </div>
                        <div>
                          <CardTitle className="text-2xl font-bold">{selectedPlan.name} Plan</CardTitle>
                          <CardDescription>Billed monthly</CardDescription>
                        </div>
                      </div>
                      <div className="text-4xl font-black tracking-tight mt-2">
                        ${selectedPlan.price}<span className="text-lg text-muted-foreground font-medium">/month</span>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-8 space-y-4">
                      <h4 className="font-bold text-sm uppercase tracking-wider text-muted-foreground">What's included:</h4>
                      <ul className="space-y-3">
                        {selectedPlan.features.map((feature, i) => (
                          <li key={i} className="flex items-center gap-3 text-sm font-semibold">
                            <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                              <Check className="h-3 w-3 text-primary" />
                            </div>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                    <div className="p-6 bg-muted/20 border-t border-border/50">
                      <div className="flex justify-between items-center font-bold">
                        <span>Total Due Today</span>
                        <span className="text-xl text-primary font-black">${selectedPlan.price}.00</span>
                      </div>
                    </div>
                  </Card>

                  <div className="mt-8 flex items-center gap-3 p-4 rounded-xl bg-muted/10 border border-border/50 text-xs text-muted-foreground italic">
                    <Shield className="h-6 w-6 text-green-500/70" />
                    Secure checkout powered by Hive Blockchain. Transactions are immutable and transparent.
                  </div>
                </div>

                {/* Right: Payment Form */}
                <div className="lg:col-span-7">
                  <Card className="glass-card h-full border-border/50">
                    <CardHeader>
                      <CardTitle className="text-2xl font-extrabold flex items-center gap-3">
                        <Wallet className="h-6 w-6 text-indigo-500" />
                        Select Payment Method
                      </CardTitle>
                      <CardDescription>Choose how you'd like to fuel your journey</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-8">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <button className="flex items-center gap-4 p-5 rounded-2xl border-2 border-primary bg-primary/5 transition-all text-left group">
                          <div className="h-12 w-12 rounded-xl bg-primary/20 flex items-center justify-center border border-primary/30">
                            <Building2 className="text-primary h-6 w-6" />
                          </div>
                          <div>
                            <p className="font-black">Hive Keychain</p>
                            <p className="text-xs text-muted-foreground">Direct wallet connection</p>
                          </div>
                        </button>
                        <button className="flex items-center gap-4 p-5 rounded-2xl border border-border bg-card/30 hover:bg-muted/30 transition-all text-left group opacity-60">
                          <div className="h-12 w-12 rounded-xl bg-muted flex items-center justify-center border border-transparent">
                            <CreditCard className="text-muted-foreground h-6 w-6" />
                          </div>
                          <div>
                            <p className="font-black text-muted-foreground">Credit Card</p>
                            <p className="text-xs text-muted-foreground">Coming soon</p>
                          </div>
                        </button>
                      </div>

                      <div className="p-8 border-2 border-primary/20 rounded-3xl bg-muted/5 relative overflow-hidden group">
                        <div className="absolute -right-8 -bottom-8 w-40 h-40 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors" />
                        <h4 className="text-lg font-bold mb-4 flex items-center gap-2">
                          <CreditCard className="h-5 w-5 text-primary" />
                          Wallet Information
                        </h4>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground pl-1">Hive Username</label>
                            <div className="w-full bg-background border border-border/50 rounded-xl px-4 py-3 font-semibold focus-within:ring-2 ring-primary/30 transition-all">
                              @username
                            </div>
                          </div>
                          <div className="flex items-center gap-2 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg text-xs text-yellow-600 dark:text-yellow-400 font-medium">
                            <Zap className="h-4 w-4 fill-current animate-pulse" />
                            Please ensure your Hive Keychain extension is unlocked.
                          </div>
                        </div>
                      </div>

                      <Button 
                        disabled={isProcessing}
                        onClick={handlePayment}
                        className="w-full py-8 text-xl font-black rounded-2xl bg-gradient-to-r from-primary to-indigo-600 hover:shadow-[0_10px_30px_rgba(147,51,234,0.3)] transition-all relative overflow-hidden group"
                      >
                        {isProcessing ? (
                          <div className="flex items-center gap-3">
                            <div className="h-6 w-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Processing...
                          </div>
                        ) : (
                          <>
                            Verify & Confirm Payment
                            <ArrowLeft className="ml-2 h-6 w-6 rotate-180 group-hover:translate-x-1 transition-transform" />
                          </>
                        )}
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key="success-state"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-2xl mx-auto text-center py-20"
              >
                <div className="mb-8 relative inline-block">
                  <div className="h-28 w-28 rounded-full bg-green-500/10 flex items-center justify-center mx-auto border-2 border-green-500/20 shadow-[0_0_50px_rgba(34,197,94,0.2)]">
                    <Check className="h-14 w-14 text-green-500" strokeWidth={3} />
                  </div>
                  <motion.div 
                    initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.3 }}
                    className="absolute -right-2 -top-2 h-10 w-10 rounded-full bg-primary flex items-center justify-center text-white"
                  >
                    <Sparkles className="h-5 w-5 fill-current" />
                  </motion.div>
                </div>
                
                <h1 className="text-5xl font-black mb-6 tracking-tight gradient-text">Welcome to the {selectedPlan.name} Tier!</h1>
                <p className="text-xl text-muted-foreground mb-12 max-w-lg mx-auto leading-relaxed">
                  Your transaction was successful. Your account has been upgraded and all {selectedPlan.name} benefits are now active.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    onClick={() => navigate("/dashboard")}
                    className="py-7 px-10 text-lg font-bold rounded-2xl bg-primary hover:bg-primary/90 shadow-xl"
                  >
                    Go to Dashboard
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => navigate("/my-projects")}
                    className="py-7 px-10 text-lg font-bold rounded-2xl border-border/50 hover:bg-muted/50"
                  >
                    View My Projects
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
      <FooterSection />
    </div>
  );
};

export default SubscriptionCheckout;
