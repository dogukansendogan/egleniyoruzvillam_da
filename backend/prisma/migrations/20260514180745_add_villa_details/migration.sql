-- AlterTable
ALTER TABLE "Villa" ADD COLUMN     "bathrooms" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "bedrooms" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "capacity" INTEGER NOT NULL DEFAULT 2,
ADD COLUMN     "features" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "imageUrl" TEXT DEFAULT 'https://via.placeholder.com/800',
ADD COLUMN     "location" TEXT NOT NULL DEFAULT 'Belirtilmemiş';
