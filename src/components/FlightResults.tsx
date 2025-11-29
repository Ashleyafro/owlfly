import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Star, DollarSign, Clock, Plane, List } from "lucide-react";

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
  isDirect: boolean;
}

interface FlightResultsProps {
  flights: Flight[];
  origin: string;
  destination: string;
}

export const FlightResults = ({ flights, origin, destination }: FlightResultsProps) => {
  if (flights.length === 0) {
    return null;
  }

  const convertDurationToMinutes = (duration: string): number => {
    const hours = parseInt(duration.match(/(\d+)h/)?.[1] || '0');
    const minutes = parseInt(duration.match(/(\d+)m/)?.[1] || '0');
    return hours * 60 + minutes;
  };

  // Create filtered arrays for each category
  const bestRatedFlights = [...flights].sort((a, b) => b.rating - a.rating).slice(0, 10);
  const fastestFlights = [...flights].sort((a, b) => convertDurationToMinutes(a.duration) - convertDurationToMinutes(b.duration)).slice(0, 10);
  const cheapestFlights = [...flights].sort((a, b) => a.price - b.price).slice(0, 10);
  const allFlights = [...flights].sort(() => Math.random() - 0.5).slice(0, 10);

  const renderFlightCard = (flight: Flight) => (
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
                {flight.isDirect && (
                  <p className="text-xs text-green-600 font-medium">Directo</p>
                )}
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
  );

  return (
    <div className="w-full max-w-6xl mx-auto space-y-4">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-foreground">
          Vuelos de {origin} a {destination}
        </h2>
        <p className="text-muted-foreground mt-2">
          {flights.length} vuelos encontrados
        </p>
      </div>

      <Tabs defaultValue="todos-vuelos" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="mejor-valorados" className="flex items-center gap-2">
            <Star className="h-4 w-4" />
            Mejor valorados
          </TabsTrigger>
          <TabsTrigger value="mas-rapidos" className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Más rápidos
          </TabsTrigger>
          <TabsTrigger value="mas-baratos" className="flex items-center gap-2">
            <DollarSign className="h-4 w-4" />
            Más baratos
          </TabsTrigger>
          <TabsTrigger value="todos-vuelos" className="flex items-center gap-2">
            <List className="h-4 w-4" />
            Todos los vuelos
          </TabsTrigger>
        </TabsList>

        <TabsContent value="mejor-valorados" className="space-y-4 mt-6">
          <div className="text-center mb-4">
            <h3 className="text-lg font-semibold text-foreground">Mejor valorados</h3>
            <p className="text-sm text-muted-foreground">Los 10 vuelos con mejor puntuación</p>
          </div>
          {bestRatedFlights.map(renderFlightCard)}
        </TabsContent>

        <TabsContent value="mas-rapidos" className="space-y-4 mt-6">
          <div className="text-center mb-4">
            <h3 className="text-lg font-semibold text-foreground">Más rápidos</h3>
            <p className="text-sm text-muted-foreground">Los 10 vuelos de menor duración</p>
          </div>
          {fastestFlights.map(renderFlightCard)}
        </TabsContent>

        <TabsContent value="mas-baratos" className="space-y-4 mt-6">
          <div className="text-center mb-4">
            <h3 className="text-lg font-semibold text-foreground">Más baratos</h3>
            <p className="text-sm text-muted-foreground">Los 10 vuelos con mejor precio</p>
          </div>
          {cheapestFlights.map(renderFlightCard)}
        </TabsContent>

        <TabsContent value="todos-vuelos" className="space-y-4 mt-6">
          <div className="text-center mb-4">
            <h3 className="text-lg font-semibold text-foreground">Todos los vuelos</h3>
            <p className="text-sm text-muted-foreground">{allFlights.length} vuelos disponibles</p>
          </div>
          {allFlights.map(renderFlightCard)}
        </TabsContent>
      </Tabs>
    </div>
  );
};