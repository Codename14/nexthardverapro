import { readUserData } from '@/lib/actions';
import { Link } from '@/navigation';
import { useTranslations } from 'next-intl';
import { FcMoneyTransfer } from 'react-icons/fc';
import { GoHeart } from 'react-icons/go';
import { LuMessageCircle } from 'react-icons/lu';
import LangToggle from './LangToggle';
import Logo from './Logo';
import LoginButton from './header/LoginButton';
import NotificationDropDown from './header/NotificationDropDown';
import SignOutButton from './header/SignOutButton';
import ThemeToggle from './header/ThemeToggle';
import ProfileMenu from './header/ProfileMenu';
import BurgerButton from './header/BurgerButton';

export default async function Header() {
    const t = useTranslations('Navigation');
    const user = await readUserData();

    // console.log('user', user);
    return (
        <nav className='navbar'>
            <div className='navbar__mobile flex gap-2'>
                <Link href='/' className='flex gap-2'>
                    <Logo className='size-10' />
                    <h4 className='text-xl font-bold logo-text'>Sell Stuff</h4>
                </Link>
                <BurgerButton className='nav__toggle navtog__rotate collapsible' />
            </div>
            <ul className='nav-list'>
                {user ? (
                    <>
                        <li>
                            <NotificationDropDown />
                        </li>
                        <li>
                            <Link href={'/wishlist'}>
                                <GoHeart size={25} />
                            </Link>
                        </li>
                        <li>
                            <Link href={'/messages'}>
                                <LuMessageCircle size={25} />
                            </Link>
                        </li>

                        <li>
                            <ProfileMenu />
                            {/* <Link href={'/account'}>{t('account')}</Link> */}
                        </li>
                        <li className=''>
                            <Link href={'/items/new'} className='btn btn--primary flex gap-2'>
                                {t('sellnow')} <FcMoneyTransfer />
                            </Link>
                        </li>
                    </>
                ) : (
                    <li>
                        <LoginButton>{t('login_register')}</LoginButton>
                    </li>
                )}
                <li>
                    <LangToggle />
                </li>
            </ul>
        </nav>
    );
}
