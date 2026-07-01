CREATE TYPE "categorie_precise" AS ENUM('Loyer', 'Abonnement', 'Gaz/Electricité', 'Course', 'Autre');--> statement-breakpoint
CREATE TYPE "frequence_role" AS ENUM('mensuel', 'annuel', 'unique');--> statement-breakpoint
CREATE TABLE "ticket" (
	"id" serial PRIMARY KEY,
	"categorie" "categorie_precise",
	"montant" integer,
	"frequence" "frequence_role" DEFAULT 'mensuel'::"frequence_role"
);
--> statement-breakpoint
CREATE TABLE "user_ticket" (
	"user_id" integer,
	"ticket_id" integer,
	CONSTRAINT "user_ticket_pkey" PRIMARY KEY("user_id","ticket_id")
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY,
	"revenu" integer NOT NULL,
	"name" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "user_ticket" ADD CONSTRAINT "user_ticket_user_id_users_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "user_ticket" ADD CONSTRAINT "user_ticket_ticket_id_ticket_id_fkey" FOREIGN KEY ("ticket_id") REFERENCES "ticket"("id") ON DELETE CASCADE;