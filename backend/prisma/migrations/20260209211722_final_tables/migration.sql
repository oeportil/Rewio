-- CreateTable
CREATE TABLE "public"."DoctorBlock" (
    "id" SERIAL NOT NULL,
    "doctorId" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "startTime" TEXT NOT NULL,
    "endTime" TEXT NOT NULL,
    "reason" TEXT,

    CONSTRAINT "DoctorBlock_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."DoctorVacation" (
    "id" SERIAL NOT NULL,
    "doctorId" INTEGER NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "reason" TEXT,

    CONSTRAINT "DoctorVacation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."AppointmentReschedule" (
    "id" SERIAL NOT NULL,
    "appointmentId" INTEGER NOT NULL,
    "oldDate" TIMESTAMP(3) NOT NULL,
    "oldStartTime" TEXT NOT NULL,
    "oldEndTime" TEXT NOT NULL,
    "newDate" TIMESTAMP(3) NOT NULL,
    "newStartTime" TEXT NOT NULL,
    "newEndTime" TEXT NOT NULL,
    "reason" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AppointmentReschedule_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "DoctorBlock_doctorId_date_idx" ON "public"."DoctorBlock"("doctorId", "date");

-- AddForeignKey
ALTER TABLE "public"."DoctorBlock" ADD CONSTRAINT "DoctorBlock_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "public"."Doctor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."DoctorVacation" ADD CONSTRAINT "DoctorVacation_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "public"."Doctor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."AppointmentReschedule" ADD CONSTRAINT "AppointmentReschedule_appointmentId_fkey" FOREIGN KEY ("appointmentId") REFERENCES "public"."Appointment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
