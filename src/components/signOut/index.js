import { useClerk } from "@clerk/clerk-react";
import Button from '@mui/material/Button';

const SignOutButton = () => {
  const { signOut } = useClerk();
  return (
    <Button onClick={() => signOut()} variant="contained" >Sign out</Button>
  );
};

export default SignOutButton;