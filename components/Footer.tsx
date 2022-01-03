import { useAppSelector } from "../hooks/useRedux";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import BookIcon from "@mui/icons-material/Book";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { getShortDate } from "../utils/manageDate";
import Avatar from '@mui/material/Avatar';
import Link from "next/link";

const Footer = () => {
  const token: any = useAppSelector(state => state.token.value);

  return (
    <footer className="footer">
      <div className="">©2022 Juicify.app</div>
      {token.login && (
        <div className="footerMenu">
          <Link passHref href="/coach/">
            <a className="footerMenuElement">
              <EmojiEventsIcon />
            </a>
          </Link>
          <Link passHref href="/workout">
            <div className="footerMenuElement">
              <FitnessCenterIcon />
            </div>
          </Link>
          <Link passHref href="/barcode">
            <div className="footerMenuElement">
              <PhotoCameraIcon />
            </div>
          </Link>
          <Link passHref href={`/${token.login}/nutrition-diary/${getShortDate()}`}>
            <a className="footerMenuElement">
              <BookIcon />
            </a>
          </Link>
          <Link passHref href={`/${token.login}`}>
            <a className="footerMenuElement">
              <Avatar
                sx={{ width: '28px', height: '28px' }}
                alt={`${token.login} ${token.name} ${token.surname} on Juicify`}
                src={`https://juicify.app:4000/server/avatar/${token._id}.jpg`}
              >
                <AccountCircleIcon />
              </Avatar>
            </a>
          </Link>
        </div>
      )}
    </footer>
  );
};

export default Footer;
