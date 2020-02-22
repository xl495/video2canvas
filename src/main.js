require('./asstes/css/style.scss');
import videoPath from './asstes/mp4/d24d775e72598a98fe3a5aa0ac83a5651addc588e0427eb19b3c961951403fed0897affdfa5f069dfb10dd736a4e5297.mp4'
const wrap = document.getElementById('mcc-wrap');
import video2canvas from "./video2canvas"
(() => {
    const Mc_video = new video2canvas(wrap, videoPath);
    if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
        module.exports = Mc_video;
        console.log(1)
    } else {
        console.log(2)
        window.Mc_video = Mc_video;
    }
})();