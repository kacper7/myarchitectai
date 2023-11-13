alter table "public"."myarchitectai_users" drop constraint "myarchitectai_users_lemonsqueezy_email_key";

alter table "public"."myarchitectai_users" drop constraint "myarchitectai_users_pkey";

drop index if exists "public"."myarchitectai_users_lemonsqueezy_email_key";

drop index if exists "public"."myarchitectai_users_pkey";

drop table "public"."myarchitectai_users";


