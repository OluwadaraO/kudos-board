-- CreateTable
CREATE TABLE "KudosBoard" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "category" TEXT NOT NULL,

    CONSTRAINT "KudosBoard_pkey" PRIMARY KEY ("id")
);
