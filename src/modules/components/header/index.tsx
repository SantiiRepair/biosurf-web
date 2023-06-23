import { motion } from "framer-motion";
import Link from "next/link";

interface HeaderProps {
    hidden: boolean;
}

const Header = ({ hidden }: HeaderProps) => {
    return (
        <nav style={{ display: hidden ? "none" : "block" }}>
            <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h1>Logo</h1>
            </motion.div>
            <motion.ul
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                <li>
                    <Link href="/">Inicio</Link>
                </li>
                <li>
                    <Link href="/about">Acerca de</Link>
                </li>
                <li>
                    <Link href="/contact">Contacto</Link>
                </li>
            </motion.ul>
        </nav>
    );
};

export default Header;
