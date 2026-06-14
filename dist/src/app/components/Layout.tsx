import { Outlet, Link } from "react-router";
import { Dumbbell, Menu, X } from "lucide-react";
import { useState } from "react";

export function Layout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-zinc-950 text-zinc-50">
      <header className="border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-xl font-bold uppercase tracking-wider">
            <Dumbbell className="text-red-500" />
            <span>Apex<span className="text-red-500">Fit</span></span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 font-medium">
            <Link to="/" className="hover:text-red-500 transition-colors">Home</Link>
            <Link to="/gym-planner" className="hover:text-red-500 transition-colors">Free Workout Plan</Link>
            <Link to="/history" className="hover:text-red-500 transition-colors">History</Link>
            <Link to="/about" className="hover:text-red-500 transition-colors">About Us</Link>
          </nav>

          <div className="hidden md:block">
            <Link to="/gym-planner" className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-full font-bold transition-all shadow-[0_0_15px_rgba(239,68,68,0.5)]">
              Start Now
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Nav */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-zinc-800 bg-zinc-900 p-4">
            <nav className="flex flex-col gap-4">
              <Link to="/" onClick={() => setIsMenuOpen(false)} className="hover:text-red-500 transition-colors">Home</Link>
              <Link to="/gym-planner" onClick={() => setIsMenuOpen(false)} className="hover:text-red-500 transition-colors">Free Workout Plan</Link>
              <Link to="/history" onClick={() => setIsMenuOpen(false)} className="hover:text-red-500 transition-colors">History</Link>
              <Link to="/about" onClick={() => setIsMenuOpen(false)} className="hover:text-red-500 transition-colors">About Us</Link>
              <Link to="/gym-planner" onClick={() => setIsMenuOpen(false)} className="bg-red-500 text-center hover:bg-red-600 text-white px-6 py-2 rounded-full font-bold transition-all">
                Start Now
              </Link>
            </nav>
          </div>
        )}
      </header>

      <main className="flex-grow flex flex-col">
        <Outlet />
      </main>

      <footer className="border-t border-zinc-900 bg-black py-12 text-zinc-400 text-sm">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 text-xl font-bold uppercase tracking-wider text-white mb-4">
              <Dumbbell className="text-red-500" />
              <span>Apex<span className="text-red-500">Fit</span></span>
            </div>
            <p className="max-w-xs">Building stronger bodies and sharper minds with our intelligent gym planner.</p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4 uppercase">Links</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="hover:text-red-500">Home</Link></li>
              <li><Link to="/gym-planner" className="hover:text-red-500">Gym Planner</Link></li>
              <li><Link to="/history" className="hover:text-red-500">History</Link></li>
              <li><Link to="/about" className="hover:text-red-500">About Us</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4 uppercase">Legal</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-red-500">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-red-500">Terms of Service</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4 uppercase">Contact</h4>
            <ul className="space-y-2">
              <li>support@apexfit.com</li>
              <li>1-800-APEX-FIT</li>
            </ul>
          </div>
        </div>
        <div className="container mx-auto px-4 mt-12 pt-8 border-t border-zinc-900 text-center">
          <p>&copy; {new Date().getFullYear()} ApexFit. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
