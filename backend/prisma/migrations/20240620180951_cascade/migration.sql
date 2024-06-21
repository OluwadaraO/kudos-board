-- DropForeignKey
ALTER TABLE "KudoCard" DROP CONSTRAINT "KudoCard_boardId_fkey";

-- AddForeignKey
ALTER TABLE "KudoCard" ADD CONSTRAINT "KudoCard_boardId_fkey" FOREIGN KEY ("boardId") REFERENCES "KudosBoard"("id") ON DELETE CASCADE ON UPDATE CASCADE;
