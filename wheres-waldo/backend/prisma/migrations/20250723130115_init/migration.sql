-- CreateTable
CREATE TABLE "map" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,

    CONSTRAINT "map_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "characters" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "yMax" DOUBLE PRECISION NOT NULL,
    "yMin" DOUBLE PRECISION NOT NULL,
    "xMax" DOUBLE PRECISION NOT NULL,
    "xMin" DOUBLE PRECISION NOT NULL,
    "mapId" TEXT NOT NULL,

    CONSTRAINT "characters_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "timings" (
    "username" TEXT NOT NULL,
    "time" DOUBLE PRECISION NOT NULL,
    "mapId" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "timings_username_key" ON "timings"("username");

-- AddForeignKey
ALTER TABLE "characters" ADD CONSTRAINT "characters_mapId_fkey" FOREIGN KEY ("mapId") REFERENCES "map"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "timings" ADD CONSTRAINT "timings_mapId_fkey" FOREIGN KEY ("mapId") REFERENCES "map"("id") ON DELETE CASCADE ON UPDATE CASCADE;
