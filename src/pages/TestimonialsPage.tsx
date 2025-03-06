
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import { motion } from "framer-motion";

const TestimonialsPage = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };
  
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <section className="py-32 hero-gradient">
          <div className="container mx-auto px-4">
            <motion.div 
              className="max-w-3xl mx-auto text-center mb-16"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
            >
              <h1 className="text-4xl font-bold mb-6">Success Stories</h1>
              <p className="text-lg text-foreground/70">
                Discover how AncestralAI has helped people connect with their heritage.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <motion.div 
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {[
                {
                  name: "Arjun Patel",
                  location: "Mumbai, India",
                  quote: "I was amazed at how accurately AncestralAI predicted my great-grandfather's appearance. When I later found an old photograph, the resemblance was uncanny!",
                  image: "https://images.unsplash.com/photo-1480455624313-e29b44bbfde1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
                  rating: 5
                },
                {
                  name: "Priya Sharma",
                  location: "Delhi, India",
                  quote: "AncestralAI helped me visualize my ancestors from pre-photography eras. It's given my family a connection to our past that we never thought possible.",
                  image: "https://images.unsplash.com/photo-1597586124394-fbd6ef244026?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1976&q=80",
                  rating: 5
                },
                {
                  name: "Rajiv Mehta",
                  location: "Bangalore, India",
                  quote: "After using AncestralAI, I felt a deeper connection to my heritage. Seeing the faces of ancestors I never knew has been a profound experience.",
                  image: "https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
                  rating: 4
                },
                {
                  name: "Ananya Reddy",
                  location: "Hyderabad, India",
                  quote: "The historical styling features are incredible. AncestralAI didn't just show me what my ancestors looked like, but how they would have dressed in their era.",
                  image: "https://images.unsplash.com/photo-1573497019418-b400bb3ab074?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
                  rating: 5
                },
                {
                  name: "Vikram Singh",
                  location: "Jaipur, India",
                  quote: "As a genealogy enthusiast, AncestralAI has added a new dimension to my research. Now I can put faces to the names in my family tree.",
                  image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
                  rating: 4
                },
                {
                  name: "Kavita Malhotra",
                  location: "Kolkata, India",
                  quote: "The customer service at AncestralAI is exceptional. They helped me understand the nuances in my family's genetic patterns across generations.",
                  image: "https://images.unsplash.com/photo-1589571894960-20bbe2828d0a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
                  rating: 5
                }
              ].map((testimonial, index) => (
                <motion.div key={index} variants={fadeIn}>
                  <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-center mb-4">
                        <div className="h-14 w-14 rounded-full overflow-hidden mr-4">
                          <img 
                            src={testimonial.image} 
                            alt={testimonial.name} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h3 className="font-bold">{testimonial.name}</h3>
                          <p className="text-sm text-foreground/60">{testimonial.location}</p>
                        </div>
                      </div>
                      <div className="flex mb-4">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`h-5 w-5 ${i < testimonial.rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`} 
                          />
                        ))}
                      </div>
                      <p className="italic text-foreground/80">"{testimonial.quote}"</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <motion.div 
                className="text-center mb-12"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl font-bold mb-6">Featured Success Story</h2>
                <p className="text-lg text-foreground/70">
                  How one family discovered their royal Rajput lineage
                </p>
              </motion.div>
              
              <motion.div 
                className="rounded-2xl overflow-hidden shadow-xl mb-8"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <img 
                  src="https://images.unsplash.com/photo-1611024847487-e26177381a3f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHJveWFsJTIwZmFtaWx5fGVufDB8fDB8fHww" 
                  alt="Indian family" 
                  className="w-full h-80 object-cover"
                />
              </motion.div>
              
              <motion.div 
                className="prose prose-lg max-w-none dark:prose-invert"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <h3>The Chauhan Family's Discovery</h3>
                <p>
                  When the Chauhan family began their ancestral journey with AncestralAI, they were simply curious about their heritage. Little did they know that our technology would help them uncover a connection to Rajput nobility from the 18th century.
                </p>
                <p>
                  "We had always heard family stories about a distant connection to Rajput warriors, but we had no proof," explains Rohit Chauhan. "When AncestralAI generated the image of our ancestor from the 1700s, we were struck by the resemblance to portraits of the minor nobility from that region and era."
                </p>
                <p>
                  Further genealogical research confirmed what AncestralAI had suggested - the Chauhans did indeed have an aristocratic connection through a great-great-great-grandfather who was a respected Rajput warrior.
                </p>
                <blockquote>
                  "Without the visual evidence that AncestralAI provided, we might never have pursued this line of inquiry. It's completely transformed our understanding of our family history."
                </blockquote>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default TestimonialsPage;
