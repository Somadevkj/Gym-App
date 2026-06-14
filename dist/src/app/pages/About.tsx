import { Link } from "react-router";
import { CheckCircle2, ChevronRight, Dumbbell } from "lucide-react";

export function About() {
  return (
    <div className="flex-1 bg-black text-white">
      {/* Header Section */}
      <section className="py-24 bg-zinc-950 border-b border-zinc-900 text-center">
        <div className="container mx-auto px-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-red-500/30 bg-red-500/10 text-red-500 font-bold uppercase tracking-wider text-sm mb-6">
            <Dumbbell size={16} /> Our Mission
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold uppercase tracking-tight mb-8">
            About <span className="text-red-500">ApexFit</span>
          </h1>
          <p className="text-xl md:text-2xl text-zinc-300 max-w-4xl mx-auto leading-relaxed font-light mb-12">
            At ApexFit, our mission is to build a platform that provides people with the knowledge, tools, and personalized gym plans to reach their fitness and physique goals. We believe that everyone deserves access to structured, science-backed training without the guesswork.
          </p>
        </div>
      </section>

      {/* Pillars Section */}
      <section className="py-24 bg-black border-b border-zinc-900">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-tight">
                Our Core <span className="text-red-500">Pillars</span>
              </h2>
              
              <div className="space-y-6">
                <div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800">
                  <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                    <CheckCircle2 className="text-red-500" size={20} /> Science-Backed
                  </h3>
                  <p className="text-zinc-400">Our engine uses rules derived directly from sports science literature on hypertrophy, endurance, and fat loss.</p>
                </div>
                
                <div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800">
                  <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                    <CheckCircle2 className="text-red-500" size={20} /> Highly Personalized
                  </h3>
                  <p className="text-zinc-400">We don't do cookie-cutter plans. We adjust volume, frequency, and exercise selection based on your exact profile and limitations.</p>
                </div>
                
                <div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800">
                  <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                    <CheckCircle2 className="text-red-500" size={20} /> 100% Free
                  </h3>
                  <p className="text-zinc-400">We believe that access to proper training structure shouldn't be locked behind a paywall.</p>
                </div>
              </div>
            </div>
            
            <div className="relative rounded-3xl overflow-hidden aspect-[4/5] border border-zinc-800">
              <img
                src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHxneW18ZW58MXx8fHwxNzczMDcxOTQ2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Gym Equipment"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-red-600 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1652364653960-1c23c208ef43?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXJkaW8lMjB3b3Jrb3V0JTIwdHJlYWRtaWxsfGVufDF8fHx8MTc3Mjk3MzM0N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Cardio Workout"
            className="w-full h-full object-cover opacity-20 mix-blend-multiply"
          />
        </div>
        <div className="container relative z-10 mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-6xl font-extrabold text-white uppercase tracking-tight mb-6">
            Ready to Transform?
          </h2>
          <p className="text-xl text-white/90 max-w-2xl mx-auto mb-10 font-medium">
            Take 60 seconds to answer a few questions and let our Gym Planner build your ultimate workout schedule.
          </p>
          <Link to="/gym-planner" className="inline-flex items-center justify-center bg-black hover:bg-zinc-900 text-white px-10 py-5 rounded-full font-bold text-xl transition-all shadow-2xl uppercase tracking-wider">
            Start Your Journey <ChevronRight className="ml-2" />
          </Link>
        </div>
      </section>
    </div>
  );
}
