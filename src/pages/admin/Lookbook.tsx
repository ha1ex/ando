import { useState } from 'react';
import {
  useLookbookSeasons,
  useLookbookImages,
  useCreateLookbookSeason,
  useUpdateLookbookSeason,
  useDeleteLookbookSeason,
  useCreateLookbookImage,
  useDeleteLookbookImage,
  LookbookSeason,
} from '@/hooks/useLookbook';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { ImageUploader } from '@/components/admin/ImageUploader';
import { DeleteConfirmDialog } from '@/components/admin/DeleteConfirmDialog';
import { Loader2, Plus, Trash2, Eye, EyeOff } from 'lucide-react';

export default function Lookbook() {
  const { data: seasons, isLoading: seasonsLoading } = useLookbookSeasons();
  const [selectedSeasonId, setSelectedSeasonId] = useState<string | undefined>();
  const { data: images, isLoading: imagesLoading } = useLookbookImages(selectedSeasonId);
  
  const createSeason = useCreateLookbookSeason();
  const updateSeason = useUpdateLookbookSeason();
  const deleteSeason = useDeleteLookbookSeason();
  const createImage = useCreateLookbookImage();
  const deleteImage = useDeleteLookbookImage();

  const [newSeasonName, setNewSeasonName] = useState('');
  const [deleteSeasonId, setDeleteSeasonId] = useState<string | null>(null);
  const [deleteImageId, setDeleteImageId] = useState<string | null>(null);
  const [photographerCredit, setPhotographerCredit] = useState('');

  const handleCreateSeason = async () => {
    if (!newSeasonName.trim()) return;

    const maxOrder = seasons?.reduce((max, s) => Math.max(max, s.display_order), -1) ?? -1;
    await createSeason.mutateAsync({
      season_name: newSeasonName,
      display_order: maxOrder + 1,
      is_active: true,
    });
    setNewSeasonName('');
  };

  const handleToggleActive = async (season: LookbookSeason) => {
    await updateSeason.mutateAsync({
      id: season.id,
      is_active: !season.is_active,
    });
  };

  const handleAddImage = async (url: string) => {
    if (!selectedSeasonId) return;

    const maxOrder = images?.reduce((max, img) => Math.max(max, img.display_order), -1) ?? -1;
    await createImage.mutateAsync({
      season_id: selectedSeasonId,
      image_url: url,
      display_order: maxOrder + 1,
      photographer_credit: photographerCredit || undefined,
    });
    setPhotographerCredit('');
  };

  if (seasonsLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Лукбук</h1>
        <p className="text-muted-foreground mt-2">
          Управление сезонами и изображениями лукбука
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Сезоны</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              value={newSeasonName}
              onChange={(e) => setNewSeasonName(e.target.value)}
              placeholder="Название сезона (например: Весна 2024)"
              onKeyDown={(e) => e.key === 'Enter' && handleCreateSeason()}
            />
            <Button onClick={handleCreateSeason} disabled={!newSeasonName.trim()}>
              <Plus className="h-4 w-4 mr-2" />
              Добавить
            </Button>
          </div>

          <div className="space-y-2">
            {seasons?.map((season) => (
              <div
                key={season.id}
                className="flex items-center justify-between p-3 border rounded-lg"
              >
                <div className="flex items-center gap-3 flex-1">
                  <Button
                    variant={selectedSeasonId === season.id ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedSeasonId(season.id)}
                  >
                    {season.season_name}
                  </Button>
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={season.is_active}
                      onCheckedChange={() => handleToggleActive(season)}
                    />
                    <span className="text-sm text-muted-foreground flex items-center gap-1">
                      {season.is_active ? (
                        <>
                          <Eye className="h-3 w-3" />
                          Активен
                        </>
                      ) : (
                        <>
                          <EyeOff className="h-3 w-3" />
                          Скрыт
                        </>
                      )}
                    </span>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setDeleteSeasonId(season.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {selectedSeasonId && (
        <Card>
          <CardHeader>
            <CardTitle>
              Изображения -{' '}
              {seasons?.find((s) => s.id === selectedSeasonId)?.season_name}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Автор фотографий (необязательно)</Label>
              <Input
                value={photographerCredit}
                onChange={(e) => setPhotographerCredit(e.target.value)}
                placeholder="Имя фотографа"
              />
            </div>

            <ImageUploader
              bucket="site-images"
              onUploadComplete={handleAddImage}
            />

            {imagesLoading ? (
              <div className="flex justify-center py-8">
                <Loader2 className="h-6 w-6 animate-spin" />
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
                {images?.map((image) => (
                  <div key={image.id} className="relative group">
                    <img
                      src={image.image_url}
                      alt={`Lookbook ${image.display_order}`}
                      className="w-full aspect-square object-cover rounded-lg"
                    />
                    {image.photographer_credit && (
                      <p className="text-xs text-muted-foreground mt-1">
                        Фото: {image.photographer_credit}
                      </p>
                    )}
                    <Button
                      variant="destructive"
                      size="icon"
                      className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => setDeleteImageId(image.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}

      <DeleteConfirmDialog
        open={!!deleteSeasonId}
        onOpenChange={() => setDeleteSeasonId(null)}
        onConfirm={() => {
          if (deleteSeasonId) {
            deleteSeason.mutate(deleteSeasonId);
            setDeleteSeasonId(null);
            if (selectedSeasonId === deleteSeasonId) {
              setSelectedSeasonId(undefined);
            }
          }
        }}
        title="Удалить сезон?"
        description="Это также удалит все изображения этого сезона."
        itemName={seasons?.find((s) => s.id === deleteSeasonId)?.season_name}
      />

      <DeleteConfirmDialog
        open={!!deleteImageId}
        onOpenChange={() => setDeleteImageId(null)}
        onConfirm={() => {
          if (deleteImageId) {
            deleteImage.mutate(deleteImageId);
            setDeleteImageId(null);
          }
        }}
        title="Удалить изображение?"
      />
    </div>
  );
}
