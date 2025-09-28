import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Star } from "lucide-react";
import { Clock, DollarSign, Plane } from "lucide-react";

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
  rating: number;
}

interface FlightResultsProps {
  flights: Flight[];
  origin: string;
  destination: string;
}

export const FlightResults = ({ flights, origin, destination }: FlightResultsProps) => {
  const [sortBy, setSortBy] = useState<string>("");
  
  if (flights.length === 0) {
    return null;
  }

  const convertDurationToMinutes = (duration: string): number => {
    const hours = parseInt(duration.match(/(\d+)h/)?.[1] || '0');
    const minutes = parseInt(duration.match(/(\d+)m/)?.[1] || '0');
    return hours * 60 + minutes;
  };

  const sortedFlights = [...flights].sort((a, b) => {
    switch (sortBy) {
      case 'price-asc':
        return a.price - b.price;
      case 'duration-asc':
        return convertDurationToMinutes(a.duration) - convertDurationToMinutes(b.duration);
      case 'rating-desc':
        return b.rating - a.rating;
      default:
        return 0;
    }
  });

  return (
    <div className="w-full max-w-4xl mx-auto space-y-4">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-foreground">
          Vuelos de {origin} a {destination}
        </h2>
        <p className="text-muted-foreground mt-2">
          {flights.length} vuelos encontrados
        </p>
      </div>

      {/* Filtros de ordenamiento */}
      <div className="flex justify-center mb-6">
        <div className="w-full max-w-xs">
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger>
              <SelectValue placeholder="Ordenar por..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="price-asc">Más baratos</SelectItem>
              <SelectItem value="duration-asc">Más rápidos</SelectItem>
              <SelectItem value="rating-desc">Mejor valorados</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="space-y-4">
        {sortedFlights.map((flight) => (
          <Card key={flight.id} className="hover:shadow-lg transition-shadow duration-300 bg-gradient-to-r from-card to-secondary/20">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                {/* Airline Info */}
                <div className="flex items-center space-x-3">
                  <div className="bg-gradient-to-r from-sky-primary to-sky-secondary p-2 rounded-lg">
                    <Plane className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{flight.airline}</p>
                    <p className="text-sm text-muted-foreground">{flight.flightNumber}</p>
                  </div>
                </div>

                {/* Flight Details */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 flex-1">
                  {/* Departure */}
                  <div className="text-center">
                    <p className="text-xl font-bold text-foreground">{flight.departure.time}</p>
                    <p className="text-sm text-muted-foreground">{flight.departure.airport}</p>
                  </div>

                  {/* Duration */}
                  <div className="flex items-center justify-center flex-1 px-4">
                    <div className="text-center">
                      <div className="flex items-center justify-center space-x-2 text-muted-foreground">
                        <div className="h-px bg-muted-foreground flex-1"></div>
                        <Clock className="h-4 w-4" />
                        <div className="h-px bg-muted-foreground flex-1"></div>
                      </div>
                      <p className="text-sm mt-1">{flight.duration}</p>
                    </div>
                  </div>

                  {/* Arrival */}
                  <div className="text-center">
                    <p className="text-xl font-bold text-foreground">{flight.arrival.time}</p>
                    <p className="text-sm text-muted-foreground">{flight.arrival.airport}</p>
                  </div>
                </div>

                {/* Price, Class and Rating */}
                <div className="text-center lg:text-right space-y-2">
                  <div className="flex items-center justify-center lg:justify-end">
                    <DollarSign className="h-5 w-5 text-sky-primary mr-1" />
                    <span className="text-2xl font-bold text-sky-primary">${flight.price}</span>
                  </div>
                  <div className="flex items-center justify-center lg:justify-end space-x-1 mb-2">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium text-foreground">{flight.rating}</span>
                  </div>
                  <Badge 
                    variant={flight.class === 'business' ? 'default' : 'secondary'}
                    className={flight.class === 'business' ? 'bg-gradient-to-r from-sky-primary to-sky-secondary' : ''}
                  >
                    {flight.class === 'business' ? 'Business' : 'Comercial'}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};