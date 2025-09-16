import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plane, Search } from "lucide-react";

interface FlightSearchData {
  personalData: {
    firstName: string;
    lastName: string;
    email: string;
  };
  origin: string;
  destination: string;
  departureDate: string;
  flightClass: string;
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
    departureDate: "",
    flightClass: "",
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
                <Label htmlFor="departureDate">Fecha</Label>
                <Input
                  id="departureDate"
                  type="date"
                  value={formData.departureDate}
                  onChange={(e) => setFormData(prev => ({ ...prev, departureDate: e.target.value }))}
                  required
                />
              </div>
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