import { useState } from 'react';
import RestaurantCard from '@/components/RestaurantCard';
import restaurantsData from '@/data/restaurants.json';
import { Button } from '@/components/ui/button';

const allTags = ['All', 'Burgers', 'Pizza', 'Sushi', 'Mexican', 'Indian', 'Asian'];

const Restaurants = () => {
  const [selectedTag, setSelectedTag] = useState('All');

  const filteredRestaurants = selectedTag === 'All'
    ? restaurantsData
    : restaurantsData.filter((r) => r.tags.includes(selectedTag));

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
          Restaurants Near You
        </h1>

        {/* Filter Bar */}
        <div className="flex overflow-x-auto gap-3 mb-8 pb-4 scrollbar-hide">
          {allTags.map((tag) => (
            <Button
              key={tag}
              variant={selectedTag === tag ? 'default' : 'outline'}
              onClick={() => setSelectedTag(tag)}
              className={`flex-shrink-0 ${
                selectedTag === tag ? 'gradient-primary' : ''
              }`}
            >
              {tag}
            </Button>
          ))}
        </div>

        {/* Restaurant Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRestaurants.map((restaurant, index) => (
            <div
              key={restaurant.id}
              className="animate-scale-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <RestaurantCard restaurant={restaurant} />
            </div>
          ))}
        </div>

        {filteredRestaurants.length === 0 && (
          <div className="text-center py-16">
            <p className="text-xl text-muted-foreground">
              No restaurants found for this category
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Restaurants;
