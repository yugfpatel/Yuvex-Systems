import { motion } from "framer-motion";
import { useState, useRef } from "react";

export default function YuvexLandingPage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const contactRef = useRef(null);

  const scrollToContact = () => {
    contactRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://127.0.0.1:5001/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        alert("Lead sent successfully 🚀");
        setFormData({
          name: "",
          email: "",
          message: "",
        });
      }
    } catch (error) {
      alert("Connection failed.");
    }
  };
  return (
    <div
      className="min-h-screen bg-black text-white overflow-x-hidden relative"
      onMouseMove={(e) =>
        setMousePosition({ x: e.clientX, y: e.clientY })
      }
    >
      <div className="fixed inset-0 pointer-events-none opacity-20">
        <motion.div
          animate={{
            x: mousePosition.x - 200,
            y: mousePosition.y - 200,
          }}
          transition={{ type: "spring", damping: 30, stiffness: 120 }}
          className="absolute w-[400px] h-[400px] bg-white/20 blur-[120px] rounded-full"
        />
        <div className="absolute top-20 left-20 w-96 h-96 bg-white blur-[180px] rounded-full" />
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-zinc-400 blur-[160px] rounded-full" />
      </div>
      <div className="max-w-7xl mx-auto px-6 py-10 relative z-10">
        <nav className="sticky top-0 z-50 backdrop-blur-xl bg-black/60 border border-zinc-900 rounded-2xl px-6 py-4 mb-10 flex justify-between items-center">
          <h2 className="font-semibold tracking-[0.2em] text-sm">
            YUVEX SYSTEMS
          </h2>

          <button
            onClick={scrollToContact}
            className="border border-zinc-700 px-5 py-2 rounded-xl text-sm transition-all duration-200 active:scale-95 hover:scale-105"
          >
            Contact
          </button>
        </nav>
        {/* Hero */}
        <section className="grid md:grid-cols-2 gap-20 items-center min-h-screen py-16">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <p className="tracking-[0.3em] text-zinc-500 text-sm mb-4">
              YUVEX SYSTEMS
            </p>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.05] tracking-tight">
              Build.
              <br />
              Automate.
              <br />
              <span className="text-zinc-400">Scale.</span>
            </h1>

            <p className="mt-8 text-xl text-zinc-300 max-w-xl">
              Premium websites, backend infrastructure, database systems, and
              AI automations engineered for ambitious businesses.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mt-10">
              <button
                onClick={scrollToContact}
                className="bg-white text-black px-8 py-4 rounded-2xl font-semibold transition-all duration-200 active:scale-95 hover:scale-105"
              >
                Start Project
              </button>
              <button className="border border-zinc-700 px-8 py-4 rounded-2xl transition-all duration-200 active:scale-95 hover:scale-105">
                View Projects
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="bg-zinc-950 border border-zinc-800 rounded-[2rem] p-8 shadow-2xl"
          >
            <div className="space-y-5 text-lg text-zinc-300">
              <div>✓ Business Websites</div>
              <div>✓ Backend Systems</div>
              <div>✓ MySQL Integration</div>
              <div>✓ AI Automation</div>
            </div>
          </motion.div>
        </section>

        {/* Contact */}
        <section
          ref={contactRef}
          className="py-32 border-t border-zinc-900 mt-12"
        >
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <div>
              <p className="tracking-[0.3em] text-zinc-500 text-sm mb-4">
                CONTACT
              </p>
              <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
                Let’s Build Something Powerful
              </h2>
              <p className="text-zinc-400 max-w-md text-lg">
                Need a premium website, backend system, database integration, or AI automation? Yuvex Systems is built for ambitious brands.
              </p>
            </div>

            <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-10">
              <form onSubmit={handleSubmit} className="space-y-5">
                <input
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl px-5 py-4"
                  placeholder="Your Name"
                />

                <input
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl px-5 py-4"
                  placeholder="Business Email"
                />

                <textarea
                  required
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl px-5 py-4 min-h-[160px]"
                  placeholder="Tell us about your project"
                />

                <button className="w-full bg-white text-black px-8 py-4 rounded-2xl font-semibold transition-all duration-200 active:scale-95 hover:scale-105">
                  Start Your Project
                </button>
              </form>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
