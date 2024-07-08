import { readUserData } from '@/lib/actions';
import { Link } from '@/navigation';
import { useTranslations } from 'next-intl';
import { CiBookmark, CiHeart, CiLogout, CiSettings, CiUser } from 'react-icons/ci';
import { FcMoneyTransfer } from 'react-icons/fc';
import { LuMessageCircle } from 'react-icons/lu';
import LangToggle from './LangToggle';
import Logo from './Logo';
import BurgerButton from './header/BurgerButton';
import LoginButton from './header/LoginButton';
import ProfileMenu from './header/ProfileMenu';
import SignOutButton from './header/SignOutButton';

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
                        {/* <li>
                            <NotificationDropDown />
                        </li> */}
                        <li>
                            <Link prefetch={true} href={'/'} className='icon-text flex gap-2'>
                                <CiBookmark size={25} className='icon' />
                                <span>{t('home')}</span>
                            </Link>
                        </li>
                        <li>
                            <Link prefetch={true} href={'/wishlist'} className='icon-text flex gap-2'>
                                <CiHeart size={30} className='icon' />
                                <span>{t('likes')}</span>
                            </Link>
                        </li>
                        <li>
                            <Link href={'/messages'} className='icon-text flex gap-2'>
                                <LuMessageCircle size={25} className='icon' />
                                <span>{t('messages')}</span>
                            </Link>
                        </li>
                        <li className='profile_nav-mobile flex'>
                            <CiUser size={30} className='icon' />
                            <Link prefetch={true} href='/account'>
                                {t('profile')}
                            </Link>
                        </li>
                        <li className='profile_nav-mobile flex icon-text'>
                            <CiSettings size={30} className='icon' />
                            <Link prefetch={true} href='/user-settings'>
                                {t('settings')}
                            </Link>
                        </li>
                        <li className='profile_nav-mobile'>
                            <Link prefetch={true} href='/' className='flex icon-text'>
                                <CiLogout size={30} className='icon' />
                                <SignOutButton text={t('logout')} />
                            </Link>
                        </li>
                        <li className='profile_nav-pc'>
                            <ProfileMenu />
                        </li>
                        <li className=''>
                            <Link prefetch={true} href={'/items/new'} className='btn btn--primary flex gap-2'>
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
