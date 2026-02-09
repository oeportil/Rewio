-- CreateEnum
CREATE TYPE "public"."ClinicRole" AS ENUM ('owner', 'admin', 'doctor', 'receptionist');

-- CreateTable
CREATE TABLE "public"."ClinicUser" (
    "id" SERIAL NOT NULL,
    "clinicId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "role" "public"."ClinicRole" NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "ClinicUser_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ClinicUser_clinicId_userId_key" ON "public"."ClinicUser"("clinicId", "userId");

-- AddForeignKey
ALTER TABLE "public"."ClinicUser" ADD CONSTRAINT "ClinicUser_clinicId_fkey" FOREIGN KEY ("clinicId") REFERENCES "public"."Clinic"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ClinicUser" ADD CONSTRAINT "ClinicUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
