CREATE TYPE "frequence" AS ENUM('mensuel', 'annuel', 'unique');--> statement-breakpoint
ALTER TABLE "ticket" ALTER COLUMN "frequence" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "ticket" ALTER COLUMN "frequence" SET DATA TYPE "frequence" USING "frequence"::text::"frequence";--> statement-breakpoint
ALTER TABLE "ticket" ALTER COLUMN "frequence" SET DEFAULT 'mensuel'::"frequence";--> statement-breakpoint
ALTER TABLE "ticket" ALTER COLUMN "is_paid" SET DATA TYPE boolean USING "is_paid"::boolean;--> statement-breakpoint
ALTER TABLE "ticket" ALTER COLUMN "is_paid" SET DEFAULT false;--> statement-breakpoint
DROP TYPE "frequence_role";