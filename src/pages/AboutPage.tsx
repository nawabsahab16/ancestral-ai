
import { Card, CardContent } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

const AboutPage = () => {
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
        staggerChildren: 0.2
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
              <h1 className="text-4xl font-bold mb-6">About AncestralAI</h1>
              <p className="text-lg text-foreground/70">
                Discover the stories written in your DNA and see the faces of those who came before you.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <motion.div 
              className="grid md:grid-cols-2 gap-12 items-center"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              <motion.div variants={fadeIn}>
                <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
                <p className="text-lg mb-6 text-foreground/80">
                  At AncestralAI, we're passionate about connecting people with their heritage through the power of artificial intelligence. Our groundbreaking technology helps you visualize your ancestral lineage in ways never before possible.
                </p>
                <p className="text-lg mb-6 text-foreground/80">
                  By analyzing facial characteristics across generations, our proprietary algorithms can predict with remarkable accuracy how your ancestors may have looked, giving you a window into your family's past.
                </p>
              </motion.div>
              <motion.div 
                className="rounded-2xl overflow-hidden shadow-xl"
                variants={fadeIn}
              >
                <img 
                  src="https://plus.unsplash.com/premium_photo-1682090874106-6d85c6eb94a8?q=80&w=2041&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                  alt="Indian family celebrating traditions" 
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </motion.div>
          </div>
        </section>

        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <motion.div 
              className="grid md:grid-cols-2 gap-12 items-center"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              <motion.div className="order-2 md:order-1 rounded-2xl overflow-hidden shadow-xl" variants={fadeIn}>
                <img 
                  src="https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                  alt="Heritage photo analysis" 
                  className="w-full h-full object-cover"
                />
              </motion.div>
              <motion.div className="order-1 md:order-2" variants={fadeIn}>
                <h2 className="text-3xl font-bold mb-6">Our Technology</h2>
                <p className="text-lg mb-6 text-foreground/80">
                  Our cutting-edge AI has been trained on thousands of family lineages to understand how genetic traits are passed down through generations. By analyzing photos from three generations, we can identify patterns and predict ancestral appearances with remarkable accuracy.
                </p>
                <p className="text-lg mb-6 text-foreground/80">
                  The technology behind AncestralAI represents years of research in computer vision, machine learning, and genetic analysis, all working together to create a powerful tool for genealogical discovery.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <motion.h2 
              className="text-3xl font-bold mb-12 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              Meet The Creator
            </motion.h2>
            
            <motion.div 
              className="max-w-md mx-auto"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="overflow-hidden">
                <div className="h-80 overflow-hidden">
                  <img 
                    src="/uploads/f5cd6c6d-7ab8-4f2d-9e01-a897eb0e346c.png" 
                    alt="Sameer Sharma" 
                    className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <CardContent className="text-center py-6">
                  <h3 className="text-xl font-bold">Sameer Sharma</h3>
                  <p className="text-foreground/70">Founder & Lead Developer</p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default AboutPage;
