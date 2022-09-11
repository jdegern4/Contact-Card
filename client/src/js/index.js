import "./form";
import "./submit";
import "../css/index.css";
import { initDB } from "./database";
import { Tooltip, Toast, Popover } from "bootstrap";

import Logo from '../images/logo.png';
import Bear from '../images/bear.png';
import Dog from '../images/dog.png';

window.addEventListener('load', function () {
    initDB();
    document.getElementById('logo').src = Logo;
    document.getElementById('bearThumbnail').src = Bear;
    document.getElementById('dogThumbnail').src = Dog;
});