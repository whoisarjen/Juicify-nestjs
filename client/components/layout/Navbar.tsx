import Link from "next/link";
import useTranslation from "next-translate/useTranslation";
import { forwardRef } from "react";
import LoginIcon from "@mui/icons-material/Login";
import SchoolIcon from '@mui/icons-material/School';
import BookIcon from "@mui/icons-material/Book";
import { getShortDate } from "../../utils/date.utils";
import Image from 'next/image'
import logo from '../../public/images/logo.png'
import SearchBox from '../common/SearchBox'
import Settings from "@mui/icons-material/Settings";
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { useTheme } from '../../hooks/useTheme'
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useRouter } from "next/router";
import Button from '@mui/material/Button';
import styled from 'styled-components'

const MyLogo = forwardRef<any, any>(({ onClick, href }, ref) => {
    return (
        <a href={href} onClick={onClick} ref={ref}>
            <Image width={40} height={40} alt="juicify.app" src={logo} />
        </a>
    )
})
MyLogo.displayName = "MyLogo Navbar";

const Navbar = styled.nav`
    width: 100%;
    min-height: 43px;
    border-bottom: 1px solid #e4e4e4;
`

const Ul = styled.ul`
    padding: 11px;
    max-width: 1200px;
    list-style-type: none;
    width: calc(100% - 22px);
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    margin: 0 auto;
    ${this} li:nth-child(1) {
        margin: auto auto auto 8px;
    }
    ${this} li:nth-child(3) {
        margin-right: 0;
    }
    @media (max-width: 1089px) {
        padding: 11px;
        width: calc(100% - 22px);
        grid-template-columns: auto 1fr;
    }
    ${this} li:last-child {
        margin-right: 0;
    }
`

const Ul__li = styled.li`
    text-align: center;
    margin: auto;
    cursor: pointer;
`

const Ul__li_mobile = styled.li`
    text-align: center;
    margin: auto;
    cursor: pointer;
    @media (min-width: 1089px) {
        display: none !important;
    }
`

const Ul__li_web = styled.li`
    text-align: center;
    margin: auto;
    cursor: pointer;
    @media (max-width: 1089px) {
        display: none !important;
    }
`

export default ({ token }: { token: any }) => {
    const { t } = useTranslation("home");
    const router = useRouter()
    const [, toggleDarkMode, theme]: any = useTheme()

    return (
        <header>
            <Navbar>
                <Ul>
                    <Ul__li>
                        <Link passHref href="/">
                            <MyLogo />
                        </Link>
                    </Ul__li>
                    <Ul__li_web>
                        <SearchBox />
                    </Ul__li_web>
                    <Ul__li_web>
                        <Link passHref href="/blog">
                            <a>
                                <Button startIcon={<SchoolIcon />}>
                                    {t('Blog')}
                                </Button>
                            </a>
                        </Link>
                        {
                            token
                                ?
                                <>
                                    <Link passHref href={`/${token.login}/nutrition-diary/${getShortDate()}`}>
                                        <a>
                                            <Button startIcon={<BookIcon />}>
                                                {t('Diary')}
                                            </Button>
                                        </a>
                                    </Link>
                                    <Link passHref href="/settings">
                                        <a>
                                            <Button startIcon={<Settings />}>
                                                {t('Settings')}
                                            </Button>
                                        </a>
                                    </Link>
                                </>
                                :
                                <>
                                    <Link passHref href="/login">
                                        <a>
                                            <Button startIcon={<BookIcon />}>
                                                {t('Diary')}
                                            </Button>
                                        </a>
                                    </Link>
                                    <Link passHref href="/login">
                                        <a>
                                            <Button startIcon={<LoginIcon />}>
                                                {t('Login')}
                                            </Button>
                                        </a>
                                    </Link>
                                </>
                        }
                        <Link passHref href={`${router.asPath}`}>
                            <a onClick={toggleDarkMode}>
                                <IconButton color="primary" aria-label="Dark / light mode">
                                    {
                                        theme.palette.mode === 'dark'
                                            ?
                                            <Brightness7Icon />
                                            :
                                            <Brightness4Icon />
                                    }
                                </IconButton>
                            </a>
                        </Link>
                    </Ul__li_web>

                    <Ul__li_mobile>
                        <Link passHref href="/search">
                            <a>
                                <IconButton color="primary" aria-label="search">
                                    <SearchIcon />
                                </IconButton>
                            </a>
                        </Link>
                        <Link passHref href="/blog">
                            <a>
                                <IconButton color="primary" aria-label={t('Blog')}>
                                    <SchoolIcon />
                                </IconButton>
                            </a>
                        </Link>
                        {
                            token
                                ?
                                <>
                                    <Link passHref href={`/${token.login}/nutrition-diary/${getShortDate()}`}>
                                        <a>
                                            <IconButton color="primary" aria-label={t('Diary')}>
                                                <BookIcon />
                                            </IconButton>
                                        </a>
                                    </Link>
                                    <Link passHref href="/settings">
                                        <a>
                                            <IconButton color="primary" aria-label={t('Settings')}>
                                                <Settings />
                                            </IconButton>
                                        </a>
                                    </Link>
                                </>
                                :
                                <>
                                    <Link passHref href="/login">
                                        <a>
                                            <IconButton color="primary" aria-label={t('Diary')}>
                                                <BookIcon />
                                            </IconButton>
                                        </a>
                                    </Link>
                                    <Link passHref href="/login">
                                        <a>
                                            <IconButton color="primary" aria-label={t('Login')}>
                                                <LoginIcon />
                                            </IconButton>
                                        </a>
                                    </Link>
                                </>
                        }
                        <Link passHref href={`${router.asPath}`}>
                            <a onClick={toggleDarkMode}>
                                <IconButton color="primary" aria-label="Dark / light mode">
                                    {
                                        theme.palette.mode === 'dark'
                                            ?
                                            <Brightness7Icon />
                                            :
                                            <Brightness4Icon />
                                    }
                                </IconButton>
                            </a>
                        </Link>
                    </Ul__li_mobile>
                </Ul>
            </Navbar>
        </header>
    );
};
