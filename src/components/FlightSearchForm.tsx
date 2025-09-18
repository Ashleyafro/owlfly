import { useState } from "react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Switch } from "@/components/ui/switch";
import { Plane, Search, CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";

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
  passengers: number;
  priceRange: {
    min: string;
    max: string;
  };
}

interface FlightSearchFormProps {
  onSearch: (data: FlightSearchData) => void;
}

export const FlightSearchForm = ({ onSearch }: FlightSearchFormProps) => {
  const [formData, setFormData] = useState<FlightSearchData>({
    personalData: {
      firstName: "",
      lastName: "",
      email: "",
    },
    origin: "",
    destination: "",
    departureDate: undefined,
    returnDate: undefined,
    isRoundTrip: false,
    flightClass: "",
    passengers: 1,
    priceRange: {
      min: "",
      max: "",
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(formData);
  };

  const updatePersonalData = (field: keyof FlightSearchData['personalData'], value: string) => {
    setFormData(prev => ({
      ...prev,
      personalData: {
        ...prev.personalData,
        [field]: value
      }
    }));
  };

  const updatePriceRange = (field: keyof FlightSearchData['priceRange'], value: string) => {
    setFormData(prev => ({
      ...prev,
      priceRange: {
        ...prev.priceRange,
        [field]: value
      }
    }));
  };

  return (
    <Card className="w-full max-w-4xl mx-auto bg-card shadow-lg">
      <CardHeader className="bg-gradient-to-r from-sky-primary to-sky-secondary text-primary-foreground rounded-t-lg">
        <CardTitle className="flex items-center gap-2 text-xl">
          <Plane className="h-6 w-6" />
          Buscar Vuelos
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Datos Personales */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Datos Personales</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">Nombre</Label>
                <Input
                  id="firstName"
                  value={formData.personalData.firstName}
                  onChange={(e) => updatePersonalData('firstName', e.target.value)}
                  placeholder="Ingresa tu nombre"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Apellido</Label>
                <Input
                  id="lastName"
                  value={formData.personalData.lastName}
                  onChange={(e) => updatePersonalData('lastName', e.target.value)}
                  placeholder="Ingresa tu apellido"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.personalData.email}
                  onChange={(e) => updatePersonalData('email', e.target.value)}
                  placeholder="tu@email.com"
                  required
                />
              </div>
            </div>
          </div>

          {/* Detalles del Vuelo */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Detalles del Vuelo</h3>
            {/* Toggle de Tipo de Viaje */}
            <div className="flex items-center space-x-2 mb-4">
              <Switch 
                id="round-trip"
                checked={formData.isRoundTrip}
                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isRoundTrip: checked }))}
              />
              <Label htmlFor="round-trip">Viaje de ida y vuelta</Label>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label htmlFor="origin">Origen</Label>
                <Input
                  id="origin"
                  value={formData.origin}
                  onChange={(e) => setFormData(prev => ({ ...prev, origin: e.target.value }))}
                  placeholder="Ciudad de origen"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="destination">Destino</Label>
                <Input
                  id="destination"
                  value={formData.destination}
                  onChange={(e) => setFormData(prev => ({ ...prev, destination: e.target.value }))}
                  placeholder="Ciudad de destino"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Fecha de Salida</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !formData.departureDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.departureDate ? format(formData.departureDate, "dd/MM/yyyy") : "Seleccionar fecha"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={formData.departureDate}
                      onSelect={(date) => setFormData(prev => ({ ...prev, departureDate: date }))}
                      disabled={(date) => date < new Date()}
                      initialFocus
                      className="p-3 pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>
              {formData.isRoundTrip && (
                <div className="space-y-2">
                  <Label>Fecha de Regreso</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !formData.returnDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {formData.returnDate ? format(formData.returnDate, "dd/MM/yyyy") : "Seleccionar fecha"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={formData.returnDate}
                        onSelect={(date) => setFormData(prev => ({ ...prev, returnDate: date }))}
                        disabled={(date) => {
                          const today = new Date();
                          const minDate = formData.departureDate || today;
                          return date < minDate;
                        }}
                        initialFocus
                        className="p-3 pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="flightClass">Clase</Label>
                <Select value={formData.flightClass} onValueChange={(value) => setFormData(prev => ({ ...prev, flightClass: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona clase" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="economy">Comercial</SelectItem>
                    <SelectItem value="business">Business</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="passengers">Pasajeros</Label>
                <Input
                  id="passengers"
                  type="number"
                  value={formData.passengers}
                  onChange={(e) => setFormData(prev => ({ ...prev, passengers: parseInt(e.target.value) || 1 }))}
                  min="1"
                  max="9"
                  placeholder="1"
                  required
                />
              </div>
            </div>
          </div>

          {/* Rango de Precios */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Rango de Precios (USD)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="minPrice">Precio Mínimo</Label>
                <Input
                  id="minPrice"
                  type="number"
                  value={formData.priceRange.min}
                  onChange={(e) => updatePriceRange('min', e.target.value)}
                  placeholder="100"
                  min="0"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="maxPrice">Precio Máximo</Label>
                <Input
                  id="maxPrice"
                  type="number"
                  value={formData.priceRange.max}
                  onChange={(e) => updatePriceRange('max', e.target.value)}
                  placeholder="1000"
                  min="0"
                />
              </div>
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full bg-gradient-to-r from-sky-primary to-sky-secondary hover:from-sky-secondary hover:to-sky-primary transition-all duration-300 text-primary-foreground"
            size="lg"
          >
            <Search className="mr-2 h-5 w-5" />
            Buscar Vuelos
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};