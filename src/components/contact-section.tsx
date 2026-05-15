"use client";

import type React from "react";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Textarea } from "@/src/components/ui/textarea";
import { Github, Linkedin, Mail, Facebook, Phone } from "lucide-react";
import { useSendMessageMutation } from "../redux/services/messageApi";
import { toast } from "sonner";

export function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [send, { isLoading }] = useSendMessageMutation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    content: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { name, email, content } = formData;
    const messageData = { name, email, content };
    try {
      const response = await send(messageData).unwrap();
      if (response.statusCode === 201) {
        toast.success("Message sent successfully!");
        setFormData({ name: "", email: "", content: "" });
      } else {
        toast.error("Failed to send message. Please try again.");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("An error occurred while sending the message.");
    }
  };

  return (
    <section id="contact" className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-2xl" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 text-center">
            Get In Touch
          </h2>
          <p className="text-lg text-muted-foreground text-center mb-12 text-pretty">
            I'm always open to discussing new projects, opportunities, or
            collaborations.
          </p>

          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="border-2 shadow-lg">
                <CardHeader>
                  <CardTitle>Send a Message</CardTitle>
                  <CardDescription>
                    Fill out the form and I'll get back to you as soon as
                    possible.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <motion.div
                      whileFocus={{ scale: 1.02 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Input
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        required
                        className="focus:ring-2 focus:ring-accent transition-all"
                      />
                    </motion.div>
                    <motion.div
                      whileFocus={{ scale: 1.02 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Input
                        type="email"
                        placeholder="Your Email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        required
                        className="focus:ring-2 focus:ring-accent transition-all"
                      />
                    </motion.div>
                    <motion.div
                      whileFocus={{ scale: 1.02 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Textarea
                        placeholder="Your Message"
                        rows={5}
                        value={formData.content}
                        onChange={(e) =>
                          setFormData({ ...formData, content: e.target.value })
                        }
                        required
                        className="focus:ring-2 focus:ring-accent transition-all"
                      />
                    </motion.div>
                    <Button
                      type="submit"
                      className="w-full shadow-md hover:shadow-lg transition-shadow"
                    >
                    { isLoading ? 'Sending...' : 'Send Message' }
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Card className="border-2 shadow-lg">
                <CardHeader>
                  <CardTitle>Connect With Me</CardTitle>
                  <CardDescription>
                    Find me on these platforms or reach out directly.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <motion.a
                    href="https://github.com/Erazul-Islam"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-secondary transition-all group border border-transparent hover:border-accent/30"
                    whileHover={{ x: 5 }}
                  >
                    <div className="p-2 bg-gradient-to-br from-accent/20 to-primary/20 rounded-lg group-hover:shadow-lg transition-shadow">
                      <Github className="h-5 w-5 text-accent" />
                    </div>
                    <span className="text-muted-foreground group-hover:text-foreground transition-colors font-medium">
                      GitHub
                    </span>
                  </motion.a>
                  <motion.a
                    href="https://www.linkedin.com/in/md-erazul-islam"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-secondary transition-all group border border-transparent hover:border-primary/30"
                    whileHover={{ x: 5 }}
                  >
                    <div className="p-2 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg group-hover:shadow-lg transition-shadow">
                      <Linkedin className="h-5 w-5 text-primary" />
                    </div>
                    <span className="text-muted-foreground group-hover:text-foreground transition-colors font-medium">
                      LinkedIn
                    </span>
                  </motion.a>
                  <motion.a
                    href="https://www.facebook.com/erazulislam.taosif"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-secondary transition-all group border border-transparent hover:border-accent/30"
                    whileHover={{ x: 5 }}
                  >
                    <div className="p-2 bg-gradient-to-br from-accent/20 to-primary/20 rounded-lg group-hover:shadow-lg transition-shadow">
                      <Facebook className="h-5 w-5 text-accent" />
                    </div>
                    <span className="text-muted-foreground group-hover:text-foreground transition-colors font-medium">
                      Facebook
                    </span>
                  </motion.a>
                  <motion.a
                    href="mailto:erazul@example.com"
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-secondary transition-all group border border-transparent hover:border-primary/30"
                    whileHover={{ x: 5 }}
                  >
                    <div className="p-2 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg group-hover:shadow-lg transition-shadow">
                      <Mail className="h-5 w-5 text-primary" />
                    </div>
                    <span className="text-muted-foreground group-hover:text-foreground transition-colors font-medium">
                      erazul89@gmail.com
                    </span>
                  </motion.a>
                  <motion.a
                    href="tel:+01843291218"
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-secondary transition-all group border border-transparent hover:border-accent/30"
                    whileHover={{ x: 5 }}
                  >
                    <div className="p-2 bg-gradient-to-br from-accent/20 to-primary/20 rounded-lg group-hover:shadow-lg transition-shadow">
                      <Phone className="h-5 w-5 text-accent" />
                    </div>
                    <span className="text-muted-foreground group-hover:text-foreground transition-colors font-medium">
                      +880 1843 291218
                    </span>
                  </motion.a>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
