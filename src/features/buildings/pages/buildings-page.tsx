import { useEffect, useState } from 'react'
import { Plus, Building2, MapPin, Users, Layers, Edit, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useBuildingsStore } from '../store/buildings-store'
import { BuildingForm } from '../components/building-form'
import { BuildingDetail } from '../components/building-detail'
import { Building, CreateBuildingData } from '../types/building'

type ViewMode = 'list' | 'create' | 'edit' | 'detail'

export function BuildingsPage() {
  const {
    buildings,
    selectedBuilding,
    isLoading,
    error,
    fetchBuildings,
    createBuilding,
    updateBuilding,
    deleteBuilding,
    selectBuilding,
    clearError
  } = useBuildingsStore()

  const [viewMode, setViewMode] = useState<ViewMode>('list')
  const [editingBuilding, setEditingBuilding] = useState<Building | null>(null)

  useEffect(() => {
    fetchBuildings()
  }, [fetchBuildings])

  const handleCreateBuilding = async (data: CreateBuildingData) => {
    await createBuilding(data)
    if (!error) {
      setViewMode('list')
    }
  }

  const handleUpdateBuilding = async (data: CreateBuildingData) => {
    if (editingBuilding) {
      await updateBuilding({ ...data, id: editingBuilding.id })
      if (!error) {
        setViewMode('list')
        setEditingBuilding(null)
      }
    }
  }

  const handleDeleteBuilding = async (id: string) => {
    if (confirm('¿Estás seguro de que quieres eliminar este edificio?')) {
      await deleteBuilding(id)
    }
  }

  const handleViewDetail = (building: Building) => {
    selectBuilding(building)
    setViewMode('detail')
  }

  const handleEditBuilding = (building: Building) => {
    setEditingBuilding(building)
    setViewMode('edit')
  }

  const handleBackToList = () => {
    setViewMode('list')
    setEditingBuilding(null)
    selectBuilding(null)
    clearError()
  }

  if (viewMode === 'create') {
    return (
      <div>
        <BuildingForm
          onSubmit={handleCreateBuilding}
          onCancel={handleBackToList}
          isLoading={isLoading}
        />
        {error && (
          <div className="mt-4 p-4 bg-destructive/10 text-destructive rounded-md">
            {error}
          </div>
        )}
      </div>
    )
  }

  if (viewMode === 'edit' && editingBuilding) {
    return (
      <div>
        <BuildingForm
          building={editingBuilding}
          onSubmit={handleUpdateBuilding}
          onCancel={handleBackToList}
          isLoading={isLoading}
        />
        {error && (
          <div className="mt-4 p-4 bg-destructive/10 text-destructive rounded-md">
            {error}
          </div>
        )}
      </div>
    )
  }

  if (viewMode === 'detail' && selectedBuilding) {
    return (
      <BuildingDetail
        building={selectedBuilding}
        onEdit={() => handleEditBuilding(selectedBuilding)}
        onBack={handleBackToList}
      />
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Edificios</h1>
          <p className="text-muted-foreground">
            Gestión de edificios y unidades del consorcio
          </p>
        </div>
        <Button onClick={() => setViewMode('create')}>
          <Plus className="mr-2 h-4 w-4" />
          Nuevo Edificio
        </Button>
      </div>

      {error && (
        <div className="p-4 bg-destructive/10 text-destructive rounded-md">
          {error}
          <Button
            variant="outline"
            size="sm"
            onClick={clearError}
            className="ml-2"
          >
            Cerrar
          </Button>
        </div>
      )}

      {isLoading ? (
        <div className="text-center py-8">
          <p>Cargando edificios...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {buildings.map((building) => (
            <Card key={building.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="h-5 w-5" />
                  {building.name}
                </CardTitle>
                <p className="text-sm text-muted-foreground flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {building.address}
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {building.description}
                  </p>
                  
                  <div className="flex justify-between text-sm">
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      {building.units} unidades
                    </div>
                    <div className="flex items-center gap-1">
                      <Layers className="h-4 w-4" />
                      {building.floors} pisos
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleViewDetail(building)}
                      className="flex-1"
                    >
                      Ver Detalle
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEditBuilding(building)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteBuilding(building.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {buildings.length === 0 && !isLoading && (
        <div className="text-center py-12">
          <Building2 className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-4 text-lg font-semibold">No hay edificios</h3>
          <p className="text-muted-foreground">
            Comienza creando tu primer edificio
          </p>
          <Button className="mt-4" onClick={() => setViewMode('create')}>
            <Plus className="mr-2 h-4 w-4" />
            Crear Edificio
          </Button>
        </div>
      )}
    </div>
  )
}
