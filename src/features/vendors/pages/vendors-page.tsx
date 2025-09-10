import { Plus, Users, Phone, Mail, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const mockVendors = [
  {
    id: '1',
    name: 'Plomería Rodríguez',
    category: 'Plomería',
    contact: 'Pedro Rodríguez',
    phone: '+54 11 1234-5678',
    email: 'pedro@plomeria.com',
    address: 'Av. Corrientes 1234, CABA',
    rating: 4.8,
    services: ['Reparaciones', 'Instalaciones', 'Emergencias 24hs']
  },
  {
    id: '2',
    name: 'Electricidad Moderna',
    category: 'Electricidad',
    contact: 'Ana Martínez',
    phone: '+54 11 2345-6789',
    email: 'ana@electricidad.com',
    address: 'Av. Santa Fe 5678, CABA',
    rating: 4.6,
    services: ['Instalaciones', 'Mantenimiento', 'Tableros']
  },
  {
    id: '3',
    name: 'Limpieza Total',
    category: 'Limpieza',
    contact: 'Carlos López',
    phone: '+54 11 3456-7890',
    email: 'carlos@limpieza.com',
    address: 'Av. Rivadavia 9012, CABA',
    rating: 4.9,
    services: ['Limpieza general', 'Cristales', 'Alfombras']
  }
]

export function VendorsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Proveedores</h1>
          <p className="text-muted-foreground">
            Gestión de proveedores y contratistas
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Nuevo Proveedor
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">{mockVendors.length}</p>
              <p className="text-sm text-muted-foreground">Total Proveedores</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">
                {mockVendors.filter(v => v.rating >= 4.5).length}
              </p>
              <p className="text-sm text-muted-foreground">Alta Calificación</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">
                {new Set(mockVendors.map(v => v.category)).size}
              </p>
              <p className="text-sm text-muted-foreground">Categorías</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-yellow-600">2</p>
              <p className="text-sm text-muted-foreground">Trabajos Activos</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockVendors.map((vendor) => (
          <Card key={vendor.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  {vendor.name}
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-yellow-500">★</span>
                  <span className="text-sm font-medium">{vendor.rating}</span>
                </div>
              </CardTitle>
              <p className="text-sm text-muted-foreground">{vendor.category}</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span>{vendor.contact}</span>
                </div>
                
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>{vendor.phone}</span>
                </div>
                
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>{vendor.email}</span>
                </div>
                
                <div className="flex items-start gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                  <span>{vendor.address}</span>
                </div>

                <div className="border-t pt-3">
                  <p className="text-sm font-medium mb-2">Servicios:</p>
                  <div className="flex flex-wrap gap-1">
                    {vendor.services.map((service, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-primary/10 text-primary"
                      >
                        {service}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    Contactar
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    Ver Historial
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {mockVendors.length === 0 && (
        <div className="text-center py-12">
          <Users className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-4 text-lg font-semibold">No hay proveedores</h3>
          <p className="text-muted-foreground">
            Comienza agregando el primer proveedor
          </p>
          <Button className="mt-4">
            <Plus className="mr-2 h-4 w-4" />
            Crear Proveedor
          </Button>
        </div>
      )}
    </div>
  )
}
