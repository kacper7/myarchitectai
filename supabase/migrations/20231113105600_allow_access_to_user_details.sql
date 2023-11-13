create policy "Enable read for users based on user_id"
on "public"."user_details"
as permissive
for select
to public
using ((auth.uid() = user_id));



