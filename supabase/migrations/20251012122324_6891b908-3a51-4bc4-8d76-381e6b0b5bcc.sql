-- Create a function to make the first registered user an admin
-- This is safe to run multiple times - it only affects users without roles

DO $$
DECLARE
  first_user_id uuid;
BEGIN
  -- Get the first user (by creation date) who doesn't have any roles yet
  SELECT au.id INTO first_user_id
  FROM auth.users au
  LEFT JOIN public.user_roles ur ON au.id = ur.user_id
  WHERE ur.id IS NULL
  ORDER BY au.created_at ASC
  LIMIT 1;

  -- If we found a user without roles, make them an admin
  IF first_user_id IS NOT NULL THEN
    INSERT INTO public.user_roles (user_id, role)
    VALUES (first_user_id, 'admin')
    ON CONFLICT (user_id, role) DO NOTHING;
    
    RAISE NOTICE 'Admin role assigned to first user: %', first_user_id;
  ELSE
    RAISE NOTICE 'No users without roles found';
  END IF;
END $$;