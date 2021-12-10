import { useSelector } from "react-redux";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import BookIcon from "@mui/icons-material/Book";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { getCurrentDate } from "../hooks/useDate";
import Link from "next/link";

const Footer = () => {
  const token = useSelector((state) => state.token.value);

  return (
    <footer className="footer">
      <div className="">©2022 Juicify.app</div>
      {token.login && (
        // <div className="footerMenu mobileOnly">
        <div className="footerMenu">
          <Link passHref href="/coach/">
            <a className="footerMenuElement">
              <SmartToyIcon />
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
          <Link passHref href={`/${token.login}/nutrition-diary/${getCurrentDate()}`}>
            <a className="footerMenuElement">
              <BookIcon />
            </a>
          </Link>
          <Link passHref href={`/${token.login}`}>
            <a className="footerMenuElement">
              <AccountCircleIcon />
            </a>
          </Link>
        </div>
      )}
    </footer>
  );
};

export default Footer;
