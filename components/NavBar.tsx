import Link from "next/link";
import { Search, Film } from "lucide-react";

export function NavBar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-stone-950/80 backdrop-blur-md border-b border-white/10">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="group flex items-center gap-2">
          <Film className="w-5 h-5 text-amber-500 group-hover:text-amber-400 transition-colors" />
          <span className="font-serif text-xl font-medium tracking-wide">
            8 ½ <span className="text-white/40 font-sans text-sm ml-2 hidden sm:inline-block">The Classical Cinema Archive</span>
          </span>
        </Link>

        <div className="flex items-center gap-6">
          <button className="text-white/60 hover:text-amber-500 transition-colors">
            <Search className="w-5 h-5" />
          </button>
        </div>
      </div>
    </nav>
  );
}
