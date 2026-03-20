import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { motion } from "framer-motion";
const faqs = [{
  question: "How many members can apply in one team in kodekurrent",
  answer: "Minimum of 2 members and a maximum of 4 members can apply in one team."
}, {
  question: "Do I need prior development experience?",
  answer: "Not at all! Hackathons are the best place to learn. We'll have mentors and workshops to guide you through your journey."
}, {
  question: "Can a college have multiple teams?",
  answer: "Yes, there is no limit on the number of teams from a single college. However, each person can only be part of one team."
}, {
  question: "What is the team size?",
  answer: "You can form a team of 2-4 members. If you don't have a team, don't worry! We'll have a team formation session before the event starts."
}, {
  question: "What are the selection criteria?",
  answer: "Teams will be shortlisted based on their GitHub profiles, past projects, and the quality of their idea submission on Devfolio."
}];
export function FAQ() {
  return <section id="faq" className="py-20">
    <div className="container mx-auto px-4 max-w-4xl">
      <h2 className="text-3xl md:text-5xl font-pixel text-center mb-16 text-white tracking-widest">
        Frequently Asked <br /><span className="text-primary">Questions</span>
      </h2>

      <Accordion type="single" collapsible className="w-full space-y-4">
        {faqs.map((faq, index) => <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}>
          <AccordionItem value={`item-${index}`} className="sci-fi-panel px-4 data-[state=open]:bg-[#030712] transition-all duration-300 mb-4 overflow-hidden relative group">
            {/* Manual Corner Accents */}
            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-primary/40 group-data-[state=open]:border-primary" />
            <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-primary/40 group-data-[state=open]:border-primary" />
            <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-primary/40 group-data-[state=open]:border-primary" />
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-primary/40 group-data-[state=open]:border-primary" />
            
            <AccordionTrigger className="font-mono text-lg hover:text-primary hover:no-underline text-left relative z-10 transition-colors">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground font-sans text-base leading-relaxed pb-4 relative z-10">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        </motion.div>)}
      </Accordion>
    </div>
  </section>;
}