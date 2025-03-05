
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const FAQPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <section className="py-32 hero-gradient">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h1 className="text-4xl font-bold mb-6">Frequently Asked Questions</h1>
              <p className="text-lg text-foreground/70">
                Find answers to common questions about AncestralAI
              </p>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="bg-card rounded-xl shadow-sm border p-6 md:p-8">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-lg font-medium">
                    How does AncestralAI predict the appearance of ancestors?
                  </AccordionTrigger>
                  <AccordionContent className="text-foreground/80">
                    <p className="mb-3">
                      AncestralAI uses advanced machine learning algorithms that have been trained on thousands of family lineages. By analyzing photos from three generations of your family, our AI can identify genetic patterns in facial features.
                    </p>
                    <p>
                      The system tracks how specific traits are passed down through generations and uses this data to predict how ancestors further up the family tree might have looked. We combine this with historical context data to create an authentic representation.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2">
                  <AccordionTrigger className="text-lg font-medium">
                    How accurate are the predictions?
                  </AccordionTrigger>
                  <AccordionContent className="text-foreground/80">
                    <p className="mb-3">
                      While no prediction can be 100% accurate, our system has been validated through numerous cases where later-discovered photographs confirmed many aspects of our predictions. The accuracy improves with the quality of input photos and when more generations are provided.
                    </p>
                    <p>
                      In general, our predictions have an estimated 75-85% accuracy for primary facial characteristics when using three generations of good quality photos.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3">
                  <AccordionTrigger className="text-lg font-medium">
                    What photo quality do I need to provide?
                  </AccordionTrigger>
                  <AccordionContent className="text-foreground/80">
                    <p className="mb-3">
                      For best results, we recommend:
                    </p>
                    <ul className="list-disc pl-5 mb-3 space-y-1">
                      <li>Clear, well-lit photos</li>
                      <li>Front-facing or slight profile views</li>
                      <li>Minimal obstruction of facial features (no sunglasses, etc.)</li>
                      <li>Images where the face occupies a significant portion of the frame</li>
                    </ul>
                    <p>
                      That said, our system can still work with less-than-ideal photos, though accuracy may be affected.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-4">
                  <AccordionTrigger className="text-lg font-medium">
                    Is my family photo data kept private?
                  </AccordionTrigger>
                  <AccordionContent className="text-foreground/80">
                    <p className="mb-3">
                      Absolutely. We take privacy extremely seriously. Your photos are encrypted and used solely for the purpose of generating your ancestral predictions. We do not share your images with third parties, and you can request deletion of your data at any time.
                    </p>
                    <p>
                      For additional details, please review our comprehensive Privacy Policy.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-5">
                  <AccordionTrigger className="text-lg font-medium">
                    Can I use AncestralAI for genealogy research?
                  </AccordionTrigger>
                  <AccordionContent className="text-foreground/80">
                    <p className="mb-3">
                      AncestralAI is a perfect complement to traditional genealogy research. While our system doesn't replace documentary research, it can provide visual context to your findings and sometimes offer clues about family connections based on shared physical traits.
                    </p>
                    <p>
                      Many users integrate our ancestral predictions into their family trees and genealogy software.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-6">
                  <AccordionTrigger className="text-lg font-medium">
                    How many generations can AncestralAI predict?
                  </AccordionTrigger>
                  <AccordionContent className="text-foreground/80">
                    <p className="mb-3">
                      With our standard three-generation input (e.g., you, your parent, and your grandparent), AncestralAI can typically predict appearances back 2-3 additional generations with reasonable confidence.
                    </p>
                    <p>
                      Our premium service allows for more extensive predictions and the inclusion of additional family photos to enhance accuracy.
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

            <div className="mt-12 text-center">
              <h3 className="text-2xl font-bold mb-4">Still have questions?</h3>
              <p className="text-lg text-foreground/70 mb-6">
                We're here to help! Get in touch with our team for personalized assistance.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="group">
                  Contact Support
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
                <Link to="/get-started">
                  <Button variant="outline" size="lg">
                    Try AncestralAI Now
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">How It Works</h2>
                <div className="space-y-6">
                  <div className="flex">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                      <span className="text-primary font-bold">1</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-medium mb-2">Upload Photos</h3>
                      <p className="text-foreground/70">
                        Provide photos of three generations from your family - typically yourself, a parent, and a grandparent.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                      <span className="text-primary font-bold">2</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-medium mb-2">AI Processing</h3>
                      <p className="text-foreground/70">
                        Our advanced algorithms analyze the genetic patterns visible in your family's facial features.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                      <span className="text-primary font-bold">3</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-medium mb-2">Receive Predictions</h3>
                      <p className="text-foreground/70">
                        Within minutes, receive high-quality visualizations of your ancestors' likely appearances.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="rounded-2xl overflow-hidden shadow-xl">
                <img 
                  src="https://images.unsplash.com/photo-1551590192-8070a16d9f67?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80" 
                  alt="How AncestralAI works" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default FAQPage;
