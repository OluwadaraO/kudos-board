-- CreateTable
CREATE TABLE "KudoCard" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "imgUrl" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "boardId" INTEGER NOT NULL,

    CONSTRAINT "KudoCard_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "KudoCard" ADD CONSTRAINT "KudoCard_boardId_fkey" FOREIGN KEY ("boardId") REFERENCES "KudosBoard"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
