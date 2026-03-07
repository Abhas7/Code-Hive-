import React from "react";
import { Check, Star, Zap, Crown, Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const plans = [
  {
    id: "community",
    name: "Community",
    price: "0",
    description: "Start your journey today.",
    features: ["2 active projects", "Community support"],
    icon: <Sparkles className="h-6 w-6 text-blue-500" />,
    popular: false,
  },
  {
    id: "pro",
    name: "Pro",
    price: "19",
    description: "Scale your impact.",
    features: ["Unlimited projects", "Priority support", "Featured placement"],
    icon: <Zap className="h-6 w-6 text-yellow-500" />,
    popular: true,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: "99",
    description: "For serious organizations.",
    features: ["No platform fees", "Custom contracts", "VIP networking"],
    icon: <Crown className="h-6 w-6 text-purple-500" />,
    popular: false,
  },
];

export const PricingSection = () => {
  const navigate = useNavigate();

  return (
    <section id="pricing" className="py-24 bg-background relative overflow-hidden">
      <div className="container px-4 md:px-6 relative z-10">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 border-primary/30 text-primary">Simple Pricing</Badge>
          <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight gradient-text">Fuel Your Dreams</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Choose the perfect plan to accelerate your decentralized funding goals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              onClick={() => navigate(`/subscription/checkout/${plan.id}`)}
              className="cursor-pointer"
            >
              <Card className={`glass-card h-full transition-all duration-300 hover:scale-105 border-border/50 ${plan.popular ? 'border-primary/50 ring-1 ring-primary/20 shadow-2xl shadow-primary/10' : 'hover:border-primary/30'}`}>
                <CardHeader>
                  <div className="flex justify-between items-start mb-4">
                    <div className={`p-3 rounded-xl ${plan.popular ? 'bg-primary/20 text-primary' : 'bg-muted/50 text-muted-foreground'}`}>
                      {plan.icon}
                    </div>
                    {plan.popular && (
                      <Badge className="bg-primary hover:bg-primary text-xs font-bold px-3 py-1 uppercase tracking-tighter">Popular</Badge>
                    )}
                  </div>
                  <CardTitle className="text-2xl font-black">{plan.name}</CardTitle>
                  <CardDescription className="text-sm font-medium">{plan.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-black">${plan.price}</span>
                    <span className="text-muted-foreground font-semibold">/mo</span>
                  </div>
                  <ul className="space-y-3">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-3 text-sm font-bold">
                        <Check className="h-4 w-4 text-primary" strokeWidth={3} />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button 
                    variant={plan.popular ? "default" : "outline"} 
                    className="w-full font-black py-6 rounded-xl group"
                  >
                    Get Started <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <Button 
            variant="link" 
            className="text-lg font-bold text-muted-foreground hover:text-primary transition-colors"
            onClick={() => navigate("/subscription")}
          >
            Compare all features and FAQ <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none -z-0 opacity-20">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-indigo-600/30 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-600/30 rounded-full blur-[120px]" />
      </div>
    </section>
  );
};
