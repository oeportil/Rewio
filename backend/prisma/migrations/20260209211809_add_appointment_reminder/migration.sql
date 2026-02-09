-- CreateEnum
CREATE TYPE "public"."ReminderChannel" AS ENUM ('email', 'sms', 'whatsapp');

-- CreateTable
CREATE TABLE "public"."AppointmentReminder" (
    "id" SERIAL NOT NULL,
    "appointmentId" INTEGER NOT NULL,
    "sendAt" TIMESTAMP(3) NOT NULL,
    "channel" "public"."ReminderChannel" NOT NULL,
    "sent" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "AppointmentReminder_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."AppointmentReminder" ADD CONSTRAINT "AppointmentReminder_appointmentId_fkey" FOREIGN KEY ("appointmentId") REFERENCES "public"."Appointment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
