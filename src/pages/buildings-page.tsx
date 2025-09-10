import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'

export function BuildingsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Edificios</h1>
          <p className="text-muted-foreground">
            Gestión de edificios y unidades
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Nuevo Edificio
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Edificio Central</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Av. Corrientes 1234, CABA
            </p>
            <p className="text-sm">24 unidades</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Torre Norte</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Av. Santa Fe 5678, CABA
            </p>
            <p className="text-sm">36 unidades</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Complejo Sur</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Av. Rivadavia 9012, CABA
            </p>
            <p className="text-sm">48 unidades</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
