/*
  Warnings:

  - A unique constraint covering the columns `[doctorId,weekday]` on the table `DoctorSchedule` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "public"."DoctorSchedule_doctorId_weekday_startTime_endTime_key";

-- CreateIndex
CREATE UNIQUE INDEX "DoctorSchedule_doctorId_weekday_key" ON "public"."DoctorSchedule"("doctorId", "weekday");
