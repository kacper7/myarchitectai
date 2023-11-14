alter table "public"."user_details" add column "number_of_renders" bigint default '0'::bigint;

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.reset_number_of_renders()
 RETURNS void
 LANGUAGE plpgsql
AS $function$begin
  update public.user_details set number_of_renders = 0;
end$function$
;

SELECT cron.schedule(
  'monthly-renders-count-reset',
  '0 0 1 * *',
  $$ update public.user_details set number_of_renders = 0 $$
);


