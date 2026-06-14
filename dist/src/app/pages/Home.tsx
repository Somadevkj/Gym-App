import { motion } from "motion/react";
import { Link } from "react-router";
import { CheckCircle2, ChevronRight, Activity, Zap, Shield, ArrowRight } from "lucide-react";

export function Home() {
  return (
    <div className="flex-1 bg-black text-white">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden border-b border-zinc-900">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1765728617805-b9f22d64e5b3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBneW0lMjB0cmFpbmluZ3xlbnwxfHx8fDE3NzMwNzE5NDZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Modern Gym"
            className="w-full h-full object-cover opacity-30 object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent"></div>
        </div>

        <div className="container relative z-10 px-4 pt-20 pb-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-zinc-800 bg-zinc-900/50 backdrop-blur-sm text-sm font-medium tracking-wide uppercase text-zinc-300 mx-auto">
              <Zap size={16} className="text-red-500" />
              <span>Smarter Training Starts Here</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.1] uppercase">
              Don't Guess Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">Workout.</span>
              <br /> Engineer It.
            </h1>

            <p className="text-xl md:text-2xl text-zinc-400 max-w-2xl mx-auto leading-relaxed">
              Experience the power of our intelligent Gym Planner. Get a custom training plan tailored to your goals, experience, and lifestyle—instantly.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
              <Link to="/gym-planner" className="group flex items-center gap-2 bg-red-600 hover:bg-red-500 text-white px-8 py-4 rounded-full font-bold text-lg transition-all w-full sm:w-auto shadow-[0_0_30px_rgba(220,38,38,0.4)]">
                Generate My Free Plan
                <ArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <a href="#how-it-works" className="flex items-center gap-2 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-white px-8 py-4 rounded-full font-bold text-lg transition-all w-full sm:w-auto">
                How It Works
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-20 bg-zinc-950 border-b border-zinc-900" id="how-it-works">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tight mb-4">
              Why Use Our <span className="text-red-500">Gym Planner?</span>
            </h2>
            <p className="text-zinc-400 max-w-2xl mx-auto text-lg">
              Many gym-goers rely on generic plans or random advice. Our intelligent engine mimics the reasoning of a professional trainer to build a plan that actually fits you.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-zinc-900 p-8 rounded-2xl border border-zinc-800 hover:border-red-500/50 transition-colors"
            >
              <div className="w-14 h-14 bg-red-500/10 rounded-xl flex items-center justify-center mb-6">
                <Activity className="text-red-500" size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-4">Goal-Oriented Logic</h3>
              <p className="text-zinc-400 leading-relaxed">
                Whether it's fat loss, muscle gain, or endurance, the system adjusts volume, intensity, and rep ranges specifically to trigger the right adaptations.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-zinc-900 p-8 rounded-2xl border border-zinc-800 hover:border-red-500/50 transition-colors"
            >
              <div className="w-14 h-14 bg-red-500/10 rounded-xl flex items-center justify-center mb-6">
                <Activity className="text-red-500" size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-4">Lifestyle Matched</h3>
              <p className="text-zinc-400 leading-relaxed">
                Can only train 3 days a week? No problem. The engine intelligently assigns splits (Full Body, PPL, Upper/Lower) based on your exact availability.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-zinc-900 p-8 rounded-2xl border border-zinc-800 hover:border-red-500/50 transition-colors"
            >
              <div className="w-14 h-14 bg-red-500/10 rounded-xl flex items-center justify-center mb-6">
                <Shield className="text-red-500" size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-4">Injury Aware</h3>
              <p className="text-zinc-400 leading-relaxed">
                Safety first. By indicating any physical limitations, the system automatically suggests lower-risk alternatives and provides vital safety advice.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Feature Split Section */}
      <section className="py-24 bg-black overflow-hidden border-b border-zinc-900">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="w-full lg:w-1/2">
              <div className="relative rounded-3xl overflow-hidden aspect-[4/5] md:aspect-square lg:aspect-[4/5] border border-zinc-800 group">
                <img
                  src="https://images.unsplash.com/photo-1609899494145-417d7327ea9e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXJzb24lMjBsaWZ0aW5nJTIwd2VpZ2h0c3xlbnwxfHx8fDE3NzMwNzE5NDd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Person lifting weights"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
              </div>
            </div>

            <div className="w-full lg:w-1/2 space-y-8">
              <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-tight">
                No more <span className="text-red-500">Guesswork.</span>
              </h2>
              <p className="text-zinc-400 text-lg leading-relaxed">
                Stop copying random routines from the internet. Our Gym Planner utilizes over 40 rules derived from sports science guidelines and professional training principles to build a plan that makes logical sense for your body.
              </p>

              <ul className="space-y-4 pt-4">
                {[
                  "Transparent reasoning: Know exactly WHY a plan was chosen.",
                  "Scientific principles: Based on real strength & hypertrophy guidelines.",
                  "Dynamic output: Adapts to your progress and changing schedules.",
                  "100% Free: No credit card required to get your first plan."
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="text-red-500 shrink-0 mt-1" size={20} />
                    <span className="text-zinc-300 font-medium">{item}</span>
                  </li>
                ))}
              </ul>

              <div className="pt-8">
                <Link to="/gym-planner" className="inline-flex items-center gap-2 bg-white text-black hover:bg-zinc-200 px-8 py-4 rounded-full font-bold text-lg transition-all shadow-lg">
                  Try The Engine Now
                  <ChevronRight size={20} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
