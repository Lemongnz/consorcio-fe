import { Plus, FolderOpen, FileText, Download, Eye, Calendar } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const mockDocuments = [
  {
    id: '1',
    name: 'Reglamento Interno 2024',
    description: 'Reglamento interno actualizado para el año 2024',
    category: 'Reglamentos',
    building: 'Edificio San Martín',
    type: 'PDF',
    size: '2.4 MB',
    uploadedBy: 'Administración',
    uploadedAt: new Date('2024-01-15'),
    lastModified: new Date('2024-01-15'),
    isPublic: true,
    downloads: 45
  },
  {
    id: '2',
    name: 'Acta Asamblea Enero 2024',
    description: 'Acta de la asamblea ordinaria de enero',
    category: 'Actas',
    building: 'Torre Libertador',
    type: 'PDF',
    size: '1.8 MB',
    uploadedBy: 'Secretaría',
    uploadedAt: new Date('2024-01-25'),
    lastModified: new Date('2024-01-25'),
    isPublic: false,
    downloads: 28
  },
  {
    id: '3',
    name: 'Presupuesto Obras Fachada',
    description: 'Presupuesto detallado para reparación de fachada',
    category: 'Presupuestos',
    building: 'Complejo Norte',
    type: 'Excel',
    size: '856 KB',
    uploadedBy: 'Administración',
    uploadedAt: new Date('2024-01-20'),
    lastModified: new Date('2024-01-22'),
    isPublic: false,
    downloads: 12
  },
  {
    id: '4',
    name: 'Certificado Fumigación',
    description: 'Certificado de fumigación y desinfección',
    category: 'Certificados',
    building: 'Edificio San Martín',
    type: 'PDF',
    size: '1.2 MB',
    uploadedBy: 'Control de Plagas SA',
    uploadedAt: new Date('2024-01-10'),
    lastModified: new Date('2024-01-10'),
    isPublic: true,
    downloads: 8
  }
]

const getCategoryColor = (category: string) => {
  switch (category) {
    case 'Reglamentos':
      return 'bg-blue-100 text-blue-800'
    case 'Actas':
      return 'bg-green-100 text-green-800'
    case 'Presupuestos':
      return 'bg-yellow-100 text-yellow-800'
    case 'Certificados':
      return 'bg-purple-100 text-purple-800'
    case 'Contratos':
      return 'bg-red-100 text-red-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

const getFileIcon = (type: string) => {
  switch (type.toLowerCase()) {
    case 'pdf':
      return <FileText className="h-5 w-5 text-red-600" />
    case 'excel':
    case 'xlsx':
      return <FileText className="h-5 w-5 text-green-600" />
    case 'word':
    case 'docx':
      return <FileText className="h-5 w-5 text-blue-600" />
    default:
      return <FileText className="h-5 w-5 text-gray-600" />
  }
}

export function DocumentsPage() {
  const categories = [...new Set(mockDocuments.map(doc => doc.category))]
  const totalSize = mockDocuments.reduce((sum, doc) => {
    const sizeInMB = parseFloat(doc.size.replace(' MB', '').replace(' KB', '')) / (doc.size.includes('KB') ? 1024 : 1)
    return sum + sizeInMB
  }, 0)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Documentos</h1>
          <p className="text-muted-foreground">
            Gestión de documentos y archivos del consorcio
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Subir Documento
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">{mockDocuments.length}</p>
              <p className="text-sm text-muted-foreground">Total Documentos</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">{categories.length}</p>
              <p className="text-sm text-muted-foreground">Categorías</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">{totalSize.toFixed(1)} MB</p>
              <p className="text-sm text-muted-foreground">Espacio Usado</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600">
                {mockDocuments.filter(doc => doc.isPublic).length}
              </p>
              <p className="text-sm text-muted-foreground">Públicos</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {mockDocuments.map((document) => (
          <Card key={document.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {getFileIcon(document.type)}
                  <div className="min-w-0 flex-1">
                    <p className="truncate">{document.name}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(document.category)}`}>
                    {document.category}
                  </span>
                  {document.isPublic && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Público
                    </span>
                  )}
                </div>
              </CardTitle>
              <p className="text-sm text-muted-foreground">{document.description}</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Edificio:</span>
                  <span>{document.building}</span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Tipo:</span>
                  <span>{document.type}</span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Tamaño:</span>
                  <span>{document.size}</span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subido por:</span>
                  <span>{document.uploadedBy}</span>
                </div>
                
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>
                    Subido: {document.uploadedAt.toLocaleDateString('es-ES')}
                  </span>
                </div>
                
                <div className="flex items-center gap-2 text-sm">
                  <Download className="h-4 w-4 text-muted-foreground" />
                  <span>{document.downloads} descargas</span>
                </div>

                <div className="flex gap-2 pt-2">
                  <Button size="sm" className="flex-1">
                    <Eye className="mr-2 h-4 w-4" />
                    Ver
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <Download className="mr-2 h-4 w-4" />
                    Descargar
                  </Button>
                  <Button variant="outline" size="sm">
                    Editar
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {mockDocuments.length === 0 && (
        <div className="text-center py-12">
          <FolderOpen className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-4 text-lg font-semibold">No hay documentos</h3>
          <p className="text-muted-foreground">
            Comienza subiendo el primer documento
          </p>
          <Button className="mt-4">
            <Plus className="mr-2 h-4 w-4" />
            Subir Documento
          </Button>
        </div>
      )}
    </div>
  )
}
