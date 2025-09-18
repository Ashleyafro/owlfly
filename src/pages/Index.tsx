import { useState } from "react";
import { FlightSearchForm } from "@/components/FlightSearchForm";
import { FlightResults } from "@/components/FlightResults";
import heroAirplane from "@/assets/hero-airplane.jpg";

interface FlightSearchData {
  personalData: {
    firstName: string;
    lastName: string;
    email: string;
  };
  origin: string;
  destination: string;
  departureDate: Date | undefined;
  returnDate?: Date | undefined;
  isRoundTrip: boolean;
  flightClass: string;
  priceRange: {
    min: string;
    max: string;
  };
}

interface Flight {
  id: string;
  airline: string;
  flightNumber: string;
  departure: {
    time: string;
    airport: string;
  };
  arrival: {
    time: string;
    airport: string;
  };
  duration: string;
  price: number;
  class: string;
}

const mockFlights: Flight[] = [
  {
    id: "1",
    airline: "LATAM Airlines",
    flightNumber: "LA 1234",
    departure: { time: "08:30", airport: "MAD" },
    arrival: { time: "11:45", airport: "BCN" },
    duration: "3h 15m",
    price: 299,
    class: "economy"
  },
  {
    id: "2",
    airline: "Iberia",
    flightNumber: "IB 5678",
    departure: { time: "14:20", airport: "MAD" },
    arrival: { time: "17:35", airport: "BCN" },
    duration: "3h 15m",
    price: 450,
    class: "business"
  },
  {
    id: "3",
    airline: "Vueling",
    flightNumber: "VY 9012",
    departure: { time: "19:10", airport: "MAD" },
    arrival: { time: "22:25", airport: "BCN" },
    duration: "3h 15m",
    price: 189,
    class: "economy"
  },
  {
    id: "4",
    airline: "Air Europa",
    flightNumber: "UX 3456",
    departure: { time: "06:45", airport: "MAD" },
    arrival: { time: "10:00", airport: "BCN" },
    duration: "3h 15m",
    price: 320,
    class: "economy"
  },
  {
    id: "5",
    airline: "Ryanair",
    flightNumber: "FR 7890",
    departure: { time: "12:15", airport: "MAD" },
    arrival: { time: "15:30", airport: "BCN" },
    duration: "3h 15m",
    price: 156,
    class: "economy"
  }
];

const Index = () => {
  const [searchResults, setSearchResults] = useState<Flight[]>([]);
  const [searchData, setSearchData] = useState<FlightSearchData | null>(null);

  const handleSearch = (data: FlightSearchData) => {
    setSearchData(data);
    
    // Filter flights based on search criteria
    let filteredFlights = mockFlights.filter(flight => {
      // Filter by class
      if (data.flightClass) {
        const searchClass = data.flightClass === 'economy' ? 'economy' : 'business';
        if (flight.class !== searchClass) return false;
      }
      
      // Filter by price range
      if (data.priceRange.min && flight.price < parseInt(data.priceRange.min)) return false;
      if (data.priceRange.max && flight.price > parseInt(data.priceRange.max)) return false;
      
      return true;
    });

    setSearchResults(filteredFlights);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div 
        className="relative h-64 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroAirplane})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-sky-primary/80 to-sky-secondary/80"></div>
        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="text-center text-primary-foreground">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Encuentra tu Vuelo Ideal
            </h1>
            <p className="text-xl md:text-2xl opacity-90">
              Compara precios de las mejores aerolíneas del mundo
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 space-y-8">
        <FlightSearchForm onSearch={handleSearch} />
        
        {searchResults.length > 0 && searchData && (
          <FlightResults 
            flights={searchResults} 
            origin={searchData.origin} 
            destination={searchData.destination}
          />
        )}
      </div>
    </div>
  );
};

export default Index;