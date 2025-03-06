
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

const FeaturesPage = () => {
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
              <h1 className="text-4xl font-bold mb-6">Features & Capabilities</h1>
              <p className="text-lg text-foreground/70">
                Explore the powerful features of AncestralAI that make ancestral visualization possible.
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
                <h2 className="text-3xl font-bold mb-6">Ancestral Prediction</h2>
                <p className="text-lg mb-6 text-foreground/80">
                  Our core technology analyzes the facial characteristics of three generations to identify genetic patterns and predict ancestral appearance with remarkable accuracy.
                </p>
                <ul className="space-y-3">
                  {[
                    "Facial structure analysis across generations",
                    "Genetic trait identification and tracking",
                    "Advanced aging and de-aging algorithms",
                    "Historical context integration for accurate period styling"
                  ].map((feature, index) => (
                    <motion.li 
                      key={index} 
                      className="flex items-start"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <CheckCircle className="h-6 w-6 text-primary mr-3 flex-shrink-0 mt-0.5" />
                      <span className="text-foreground/80">{feature}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
              <motion.div 
                className="rounded-2xl overflow-hidden shadow-xl"
                variants={fadeIn}
              >
                <img 
                  src="https://plus.unsplash.com/premium_photo-1682090845582-0e8d40f99628?q=80&w=1976&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                  alt="Indian family generation" 
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </motion.div>
          </div>
        </section>

        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <motion.h2 
              className="text-3xl font-bold mb-12 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              Key Features
            </motion.h2>
            <motion.div 
              className="grid md:grid-cols-3 gap-8"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {[
                {
                  title: "3-Generation Analysis",
                  description: "Upload photos from three generations of your family for the most accurate ancestral predictions.",
                  image: "https://media.istockphoto.com/id/1541954970/photo/happy-indian-senior-father-standing-with-his-son-and-grandson-smiling-looking-at-camera.jpg?s=612x612&w=is&k=20&c=0Jqa3jEAOwnq4zYAP6lN4iONDtcO3X6v4sBxsm5QSk8="
                },
                {
                  title: "Historical Context",
                  description: "Our AI integrates historical fashion and styling elements appropriate to the predicted time period.",
                  image: "https://images.unsplash.com/photo-1570286424693-a17f3dbf9f20?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                },
                {
                  title: "High-Resolution Results",
                  description: "Receive detailed, high-resolution images of your predicted ancestors that can be downloaded and shared.",
                  image: "https://images.unsplash.com/photo-1543342384-1f1350e27861?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                }
              ].map((feature, index) => (
                <motion.div key={index} variants={fadeIn}>
                  <Card className="overflow-hidden h-full hover:shadow-lg transition-shadow duration-300">
                    <div className="h-52 overflow-hidden">
                      <img 
                        src={feature.image} 
                        alt={feature.title} 
                        className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <CardContent className="px-6 py-8">
                      <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                      <p className="text-foreground/70">{feature.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
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
              <motion.div 
                className="rounded-2xl overflow-hidden shadow-xl"
                variants={fadeIn}
              >
                <img 
                  src="https://plus.unsplash.com/premium_photo-1661326273214-6dc0b7d2ba2e?q=80&w=2059&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                  alt="Indian family tree" 
                  className="w-full h-full object-cover"
                />
              </motion.div>
              <motion.div variants={fadeIn}>
                <h2 className="text-3xl font-bold mb-6">Family Tree Integration</h2>
                <p className="text-lg mb-6 text-foreground/80">
                  Connect your existing genealogy research with our AI visualization tools to create a rich, visual family history that brings your ancestors to life.
                </p>
                <ul className="space-y-3">
                  {[
                    "Import data from popular genealogy platforms",
                    "Create interactive visual family trees",
                    "Add predicted ancestral images to your family records",
                    "Export high-quality images for printing and sharing"
                  ].map((feature, index) => (
                    <motion.li 
                      key={index} 
                      className="flex items-start"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <CheckCircle className="h-6 w-6 text-primary mr-3 flex-shrink-0 mt-0.5" />
                      <span className="text-foreground/80">{feature}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default FeaturesPage;
