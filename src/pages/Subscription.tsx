import React from "react";
import { Check, Star, Zap, Shield, Crown, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { motion } from "framer-motion";
import { FooterSection } from "@/components/landing/FooterSection";

const plans = [
  {
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
    icon: <Sparkles className="h-6 w-6 text-blue-500" />,
    buttonText: "Start for Free",
    popular: false,
  },
  {
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
    icon: <Zap className="h-6 w-6 text-yellow-500" />,
    buttonText: "Go Pro Now",
    popular: true,
  },
  {
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
    icon: <Crown className="h-6 w-6 text-purple-500" />,
    buttonText: "Contact Sales",
    popular: false,
  },
];

const faq = [
  {
    question: "How do platform fees work?",
    answer: "Platform fees are automatically deducted from the total funds raised. Community members pay 5%, while Pro members pay only 2%. Enterprise members pay 0% fees.",
  },
  {
    question: "Can I upgrade or downgrade anytime?",
    answer: "Yes, you can change your plan at any time. If you upgrade, the new features will be available immediately. If you downgrade, your current benefits will continue until the end of your billing cycle.",
  },
  {
    question: "What blockchain does CrowdHive use?",
    answer: "All transactions and funding occur on the Hive blockchain, ensuring transparency, security, and zero gas fees for our users.",
  },
];

const Subscription = () => {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col relative overflow-hidden">
      {/* Background Decorations - Matching Dashboard style */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] bg-purple-600/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-5%] right-[-5%] w-[30%] h-[30%] bg-indigo-600/10 rounded-full blur-[100px]" />
        <div className="absolute top-[20%] right-[10%] w-[20%] h-[20%] bg-blue-600/5 rounded-full blur-[80px]" />
      </div>

      <main className="flex-grow relative z-10">
        {/* Header Section */}
        <section className="py-24 px-4 text-center relative overflow-hidden">
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Badge variant="outline" className="mb-4 px-4 py-1 text-primary border-primary/30 bg-primary/10 backdrop-blur-sm">
                Subscription Plans
              </Badge>
              <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6 gradient-text">
                Fuel Your Creative Journey
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-12">
                Join the elite community of creators. Choose a plan that matches your ambition and scale your impact on the Hive blockchain.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="py-12 px-4 container mx-auto mb-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex"
              >
                <Card className={`glass-card relative flex flex-col w-full border-border/50 transition-all duration-500 hover:shadow-[0_0_40px_rgba(147,51,234,0.15)] hover:-translate-y-3 group overflow-hidden ${plan.popular ? 'border-primary/50 ring-1 ring-primary/20 bg-primary/5' : 'hover:border-primary/30'}`}>
                  {plan.popular && (
                    <div className="absolute top-0 right-0">
                      <div className="bg-primary text-primary-foreground text-[10px] font-bold px-8 py-1 rotate-45 translate-x-6 translate-y-3 shadow-lg uppercase tracking-tighter">
                        Most Popular
                      </div>
                    </div>
                  )}
                  
                  <CardHeader className="pb-8">
                    <div className="flex justify-between items-start mb-6">
                      <div className={`p-4 rounded-2xl transition-all duration-300 group-hover:scale-110 shadow-lg ${plan.popular ? 'bg-primary/20 text-primary' : 'bg-muted/50 text-muted-foreground'}`}>
                        {plan.icon}
                      </div>
                    </div>
                    <CardTitle className="text-3xl font-black tracking-tight">{plan.name}</CardTitle>
                    <CardDescription className="text-base min-h-[3rem] mt-3 font-medium text-muted-foreground/80">
                      {plan.description}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="flex-grow">
                    <div className="mb-10 flex items-baseline gap-1">
                      <span className="text-6xl font-black tracking-tighter">${plan.price}</span>
                      <span className="text-muted-foreground font-semibold">/month</span>
                    </div>
                    
                    <ul className="space-y-4">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-start group/item">
                          <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center mr-3 mt-0 flex-shrink-0 transition-colors group-hover/item:bg-primary/20">
                            <Check className="h-3.5 w-3.5 text-primary" strokeWidth={3} />
                          </div>
                          <span className="text-sm font-semibold text-foreground/90">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  
                  <CardFooter className="pt-6">
                    <Button 
                      className={`w-full py-7 text-lg font-black rounded-2xl transition-all duration-300 ${plan.popular ? 'bg-gradient-to-r from-primary to-indigo-600 hover:opacity-90 shadow-[0_10px_20px_rgba(147,51,234,0.3)] hover:shadow-[0_15px_30px_rgba(147,51,234,0.4)]' : 'bg-muted/20 hover:bg-muted/40 border-border'}`}
                      variant={plan.popular ? "default" : "outline"}
                    >
                      {plan.buttonText}
                      {plan.popular && <Zap className="ml-2 h-5 w-5 fill-current" />}
                    </Button>
                  </CardFooter>

                  {/* Visual accent line at bottom */}
                  <div className={`absolute bottom-0 left-0 w-full h-1.5 bg-gradient-to-r from-transparent via-primary/40 to-transparent transition-opacity duration-500 ${plan.popular ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`} />
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Feature Comparison or FAQ */}
        <section className="py-32 px-4 bg-muted/20 border-y border-border/50 relative overflow-hidden">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
              <div>
                <Badge variant="outline" className="mb-4 border-primary/30 text-primary">Questions & Answers</Badge>
                <h2 className="text-4xl font-black mb-8 tracking-tight">Everything You Need <br/> to Know</h2>
                <p className="text-lg text-muted-foreground mb-12">
                  Our transparent pricing and fee structure ensure you have all the information needed to scale your decentralized projects efficiently.
                </p>
                <Accordion type="single" collapsible className="w-full space-y-4">
                  {faq.map((item, i) => (
                    <AccordionItem key={i} value={`item-${i}`} className="border border-border/50 bg-card/50 rounded-2xl px-6 transition-all data-[state=open]:bg-card shadow-sm">
                      <AccordionTrigger className="text-lg font-bold hover:no-underline py-6">
                        {item.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground text-base leading-relaxed pb-6">
                        {item.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
              <div className="relative">
                <div className="glass-card border-primary/20 bg-card/30 rounded-[2.5rem] p-10 shadow-2xl relative z-10 backdrop-blur-xl">
                  <div className="flex items-center gap-4 mb-10">
                    <div className="p-3 rounded-2xl bg-primary/20">
                      <Shield className="text-primary h-8 w-8" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-black tracking-tight">The CrowdHive Guarantee</h3>
                      <p className="text-sm text-muted-foreground">Premium security & infinite scaling</p>
                    </div>
                  </div>
                  
                  <div className="space-y-10">
                    <div className="flex gap-6 group/feature">
                      <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0 transition-transform group-hover/feature:scale-110 shadow-inner">
                        <Star className="text-primary h-7 w-7" />
                      </div>
                      <div>
                        <h5 className="font-bold text-lg mb-1">On-Chain Reputation</h5>
                        <p className="text-muted-foreground leading-relaxed">Gain permanent, decentralized trust with verified badges and verifiable transaction history on the Hive blockchain.</p>
                      </div>
                    </div>
                    <div className="flex gap-6 group/feature">
                      <div className="h-14 w-14 rounded-2xl bg-indigo-500/10 flex items-center justify-center flex-shrink-0 transition-transform group-hover/feature:scale-110 shadow-inner">
                        <Zap className="text-indigo-400 h-7 w-7" />
                      </div>
                      <div>
                        <h5 className="font-bold text-lg mb-1">Unmatched Performance</h5>
                        <p className="text-muted-foreground leading-relaxed">Get lightning-fast project updates and real-time contribution notifications through our optimized data indexers.</p>
                      </div>
                    </div>
                    <div className="flex gap-6 group/feature">
                      <div className="h-14 w-14 rounded-2xl bg-purple-500/10 flex items-center justify-center flex-shrink-0 transition-transform group-hover/feature:scale-110 shadow-inner">
                        <Sparkles className="text-purple-400 h-7 w-7" />
                      </div>
                      <div>
                        <h5 className="font-bold text-lg mb-1">Curated Exposure</h5>
                        <p className="text-muted-foreground leading-relaxed">Let our algorithms do the work. Pro and Enterprise members get direct placement in high-traffic landing pages.</p>
                      </div>
                    </div>
                  </div>
                  
                  <Button className="w-full mt-12 py-7 bg-primary font-black text-lg rounded-2xl shadow-lg transition-transform hover:scale-[1.02]">
                    Compare All Premium Features
                  </Button>
                </div>
                {/* Decorative blob shapes */}
                <div className="absolute -top-16 -right-16 w-80 h-80 bg-indigo-600/10 blur-[100px] rounded-full -z-0" />
                <div className="absolute -bottom-16 -left-16 w-80 h-80 bg-purple-600/10 blur-[100px] rounded-full -z-0" />
              </div>
            </div>
          </div>
        </section>
      </main>
      <FooterSection />
    </div>
  );
};

export default Subscription;
