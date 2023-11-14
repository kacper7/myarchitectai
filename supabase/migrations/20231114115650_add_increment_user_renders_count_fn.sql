set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.increment_user_renders_count(userid uuid)
 RETURNS void
 LANGUAGE plpgsql
AS $function$BEGIN
  UPDATE public.user_details SET number_of_renders = (number_of_renders + 1) WHERE user_id = userid;
END$function$
;


