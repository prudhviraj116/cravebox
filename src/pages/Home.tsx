import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Pizza, Beef, Coffee, IceCream, ArrowRight, Drumstick,
  UtensilsCrossed, Rocket, Star, BadgePercent, Search,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import SEO from '@/components/SEO';
import heroImage from '@/assets/hero-food.jpg';

const categories = [
  { name: 'Pizza',    icon: Pizza,            color: 'from-orange-500 to-red-500' },
  { name: 'Burgers',  icon: Beef,             color: 'from-yellow-500 to-orange-500' },
  { name: 'Drinks',   icon: Coffee,           color: 'from-blue-500 to-purple-500' },
  { name: 'Desserts', icon: IceCream,         color: 'from-pink-500 to-purple-500' },
  { name: 'Biryanis', icon: Drumstick,        color: 'from-red-500 to-yellow-500' },
  { name: 'Meals',    icon: UtensilsCrossed,  color: 'from-emerald-500 to-teal-500' },
] as const;

const features = [
  { Icon: Rocket,      title: 'Fast Delivery', desc: 'Hot meals at your door in 30 minutes or less.', accent: 'gradient-primary' },
  { Icon: Star,        title: 'Chef Curated',  desc: 'Only the finest kitchens and freshest ingredients.', accent: 'gradient-secondary' },
  { Icon: BadgePercent,title: 'Daily Deals',   desc: 'Exclusive offers and member-only discounts.', accent: 'gradient-accent' },
] as const;

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.15 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

const Home = () => {
  return (
    <div className="min-h-screen">
      <SEO
        title="FoodieHub — Order Food Online, Delivered Fast"
        description="Order from top local restaurants and get pizza, burgers, sushi and more delivered to your door in minutes with FoodieHub."
        path="/"
      />

      {/* HERO */}
      <section className="relative min-h-[640px] flex items-center overflow-hidden">
        <motion.div
          initial={{ scale: 1.15 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.6, ease: 'easeOut' }}
          className="absolute inset-0"
        >
          <img src={heroImage} alt="A vibrant culinary spread" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        </motion.div>

        {/* Floating glow orbs */}
        <div className="absolute top-1/4 right-10 w-72 h-72 rounded-full gradient-accent opacity-30 blur-3xl animate-float hidden lg:block" aria-hidden />
        <div className="absolute bottom-10 right-1/3 w-56 h-56 rounded-full gradient-primary opacity-20 blur-3xl animate-float hidden lg:block" style={{ animationDelay: '2s' }} aria-hidden />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-20">
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="max-w-2xl space-y-6"
          >
            <motion.span
              variants={fadeUp}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-effect text-xs font-bold tracking-[0.2em] uppercase text-primary"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              Now delivering · Local kitchens
            </motion.span>

            <motion.h1
              variants={fadeUp}
              className="text-5xl md:text-7xl font-bold leading-[1.02] tracking-tight"
            >
              Crave it.{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-accent to-secondary">
                Tap it.
              </span>
              <br />
              Taste it.
            </motion.h1>

            <motion.p variants={fadeUp} className="text-lg md:text-xl text-muted-foreground max-w-xl">
              From late-night biryani to weekend brunch — the best local kitchens, delivered piping hot in minutes.
            </motion.p>

            {/* Search → restaurants */}
            <motion.form
              variants={fadeUp}
              onSubmit={(e) => { e.preventDefault(); window.location.assign('/restaurants'); }}
              className="flex flex-col sm:flex-row gap-3 max-w-xl"
            >
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search dishes, cuisines or restaurants..."
                  className="pl-11 h-14 rounded-2xl bg-card/70 backdrop-blur-md border-border/40 text-base shadow-card"
                  aria-label="Search for food"
                />
              </div>
              <Link to="/restaurants" className="sm:w-auto">
                <Button
                  size="lg"
                  className="w-full sm:w-auto h-14 px-7 rounded-2xl gradient-accent glow-primary group text-base font-semibold"
                >
                  Explore
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 smooth-transition" />
                </Button>
              </Link>
            </motion.form>

            {/* Quick chips */}
            <motion.div variants={fadeUp} className="flex flex-wrap gap-2 pt-2">
              {['Pizza', 'Sushi', 'Biryani', 'Burgers', 'Tacos'].map((c) => (
                <Link
                  key={c}
                  to="/restaurants"
                  className="px-3.5 py-1.5 rounded-full text-xs font-medium glass-effect hover:scale-105 smooth-transition border border-border/40"
                >
                  {c}
                </Link>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5 }}
            className="flex items-end justify-between mb-10 gap-4 flex-wrap"
          >
            <div>
              <p className="text-xs font-bold tracking-[0.2em] uppercase text-primary mb-2">What's your craving?</p>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Browse by category</h2>
            </div>
            <Link to="/restaurants" className="text-sm font-semibold text-primary hover:underline inline-flex items-center gap-1">
              View all <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-50px' }}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4"
          >
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <motion.div key={category.name} variants={fadeUp}>
                  <Link to="/restaurants" className="group block">
                    <motion.div
                      whileHover={{ y: -6 }}
                      transition={{ type: 'spring', stiffness: 280, damping: 20 }}
                      className="aspect-square rounded-2xl glass-effect border border-border/40 shadow-card hover:shadow-2xl smooth-transition flex flex-col items-center justify-center gap-3 p-4"
                    >
                      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${category.color} flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-[-6deg] smooth-transition`}>
                        <Icon className="h-7 w-7 text-white" />
                      </div>
                      <span className="font-semibold text-sm text-center">{category.name}</span>
                    </motion.div>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30 border-y border-border/40">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-50px' }}
            className="grid md:grid-cols-3 gap-6"
          >
            {features.map(({ Icon, title, desc, accent }) => (
              <motion.div
                key={title}
                variants={fadeUp}
                whileHover={{ y: -4 }}
                className="rounded-2xl p-6 bg-card/80 backdrop-blur-sm border border-border/40 shadow-card hover:shadow-xl smooth-transition"
              >
                <div className={`w-14 h-14 rounded-2xl ${accent} flex items-center justify-center mb-4 glow-primary`}>
                  <Icon className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-bold mb-1.5 tracking-tight">{title}</h3>
                <p className="text-muted-foreground leading-relaxed text-sm">{desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto rounded-3xl gradient-primary p-10 md:p-16 text-center text-primary-foreground relative overflow-hidden shadow-2xl glow-primary"
        >
          <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-white/10 blur-3xl" aria-hidden />
          <div className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full bg-white/10 blur-3xl" aria-hidden />
          <div className="relative">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">Ready to feast?</h2>
            <p className="text-base md:text-lg opacity-90 mb-7 max-w-xl mx-auto">
              Order in two taps. Track your rider in real time. Eat well, every day.
            </p>
            <Link to="/restaurants">
              <Button
                size="lg"
                variant="secondary"
                className="h-14 px-8 rounded-2xl text-base font-semibold shadow-xl hover:scale-105 smooth-transition"
              >
                Browse Restaurants
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Home;
