import SignInForm from "@/components/signInForm";
import { Paper } from "@mui/material";
import styles from "../../styles/signIn.module.scss";
import logo from '../../../public/logo_dark.png';
import Image from "next/image";

export default function SignUp() {
  return (
    <main className={styles.container}>
      <Image src={logo} alt="Logo" width={250} />
      <Paper elevation={3} sx={{ padding: '20px', width: '30vw' }}>
        <SignInForm />
      </Paper>
    </main>
  )
}