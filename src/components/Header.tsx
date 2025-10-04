import { Search, Heart, ShoppingCart, Key, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-nav-gradient-from to-nav-gradient-to text-nav-text">
    <div className="grid grid-cols-3 items-center px-6 py-2.5">
      {/* Logo (1/3) */}
      <div className="flex items-center">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/8/8f/Logo_of_the_Carrier_Corporation.svg"
          alt="Carrier"
          className="h-10 mix-blend-screen"
        />
      </div>
  
      {/* Right Actions (2/3) */}
      <div className="col-span-2 flex items-center justify-end gap-3">
        {/* Search */}
        <div className="flex-1 max-w-xl mx-8">
          <div className="relative">
            <Input
              type="search"
              placeholder="Search"
              className="w-full bg-white text-foreground pl-4 pr-10 py-2 rounded-xl border-0 h-9"
            />
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          </div>
        </div>
  
        {/* Buttons */}
        <button className="flex items-center gap-1.5 text-nav-text hover:text-white text-sm">
          <Key className="h-4 w-4" />
          Self-Service Password Reset
        </button>
        <button className="text-nav-text hover:text-white text-sm">My Assets</button>
        <button className="text-nav-text hover:text-white">
          <Heart className="h-5 w-5" />
        </button>
        <button className="flex items-center justify-center w-8 h-8 rounded-full bg-white text-nav">
          <span className="text-sm font-semibold">M</span>
        </button>
        <button className="flex items-center gap-1 text-nav-text hover:text-white">
          <ShoppingCart className="h-4 w-4" />
          <span className="text-sm">Cart</span>
        </button>
        <button className="text-nav-text hover:text-white text-sm">Tours</button>
      </div>
    </div>
  
    {/* Navigation Menu */}
    <div className="flex items-center gap-6 text-sm px-6 py-2.5">
      {[
        "All Applications",
        "Identity & Access",
        "Security",
        "Computer & Peripherals",
        "Office 365",
        "Cloud",
        "Server, Storage & Network",
        "Procure-To-Pay",
      ].map((item) => (
        <button
          key={item}
          className="text-nav-text hover:text-white py-1.5 flex items-center gap-1.5"
        >
          {item}
          <ChevronDown className="h-3.5 w-3.5" />
        </button>
      ))}
    </div>
  </header>
  
  );
};

export default Header;

 