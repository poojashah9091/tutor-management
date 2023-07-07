import Image from "next/image";
import Link from "next/link";
import logo from "../../../public/logo_light.png";
import SignOutButton from "../signOut";

const Header = () => {
    return (
        <nav className='header'>
            <Link href="/tutor">
                <Image src={logo} alt="Logo" width={150} />
            </Link>
            <SignOutButton />
        </nav>
    )
}

export default Header;