import { Link } from 'react-router-dom';
import { Pizza, Beef, Coffee, IceCream, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import heroImage from '@/assets/hero-food.jpg';

const categories = [
  { name: 'Pizza', icon: Pizza, color: 'from-orange-500 to-red-500' },
  { name: 'Burgers', icon: Beef, color: 'from-yellow-500 to-orange-500' },
  { name: 'Drinks', icon: Coffee, color: 'from-blue-500 to-purple-500' },
  { name: 'Desserts', icon: IceCream, color: 'from-pink-500 to-purple-500' },
  { name: 'Biryanis', icon: chicken, color: 'from-red-500 to-yellow-500'},
  { name: 'Meals' , icon: Curry, color: 'from-green-500 to-white-500'},
];

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Delicious food"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
          <div className="max-w-2xl space-y-6 animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              Delicious Food
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
                Delivered Fast
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-200">
              Order from your favorite restaurants and get it delivered to your doorstep in minutes!
            </p>
            <Link to="/restaurants">
              <Button
                size="lg"
                className="gradient-primary text-lg px-8 py-6 glow-primary animate-pulse-glow group"
              >
                Order Now
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 smooth-transition" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Floating Food Elements */}
        <div className="absolute bottom-10 right-10 animate-float hidden lg:block">
          <div className="w-32 h-32 rounded-full gradient-accent opacity-20 blur-3xl" />
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Browse by Category
          </h2>
          <div className="flex overflow-x-auto gap-6 pb-4 scrollbar-hide">
            {categories.map((category, index) => {
              const Icon = category.icon;
              return (
                <Link
                  key={category.name}
                  to="/restaurants"
                  className="flex-shrink-0 animate-scale-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="w-40 h-40 group">
                    <div className="w-full h-full rounded-2xl glass-effect smooth-transition hover:scale-110 hover:shadow-2xl flex flex-col items-center justify-center space-y-3 p-4">
                      <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${category.color} flex items-center justify-center`}>
                        <Icon className="h-8 w-8 text-white" />
                      </div>
                      <span className="font-semibold text-center">{category.name}</span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center space-y-3 animate-fade-in">
              <div className="w-16 h-16 rounded-full gradient-primary mx-auto flex items-center justify-center">
                <span className="text-3xl">🚀</span>
              </div>
              <h3 className="text-xl font-bold">Fast Delivery</h3>
              <p className="text-muted-foreground">Get your food delivered in 30 minutes or less</p>
            </div>
            <div className="text-center space-y-3 animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <div className="w-16 h-16 rounded-full gradient-secondary mx-auto flex items-center justify-center">
                <span className="text-3xl">⭐</span>
              </div>
              <h3 className="text-xl font-bold">Best Quality</h3>
              <p className="text-muted-foreground">Only the finest restaurants and freshest ingredients</p>
            </div>
            <div className="text-center space-y-3 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="w-16 h-16 rounded-full gradient-accent mx-auto flex items-center justify-center">
                <span className="text-3xl">💰</span>
              </div>
              <h3 className="text-xl font-bold">Great Prices</h3>
              <p className="text-muted-foreground">Affordable meals with exclusive deals and offers</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
