import config from "./config.js"
export default class video2canvas {
    constructor(el = document.querySelector('#mcc-wrap'), video_src = null) {
        this.el = el;
        this.width = el.offsetWidth - 10;
        this.height = el.offsetHeight - 50;
        this.video_src = video_src;
        this.video = document.createElement('video');
        this.video.autoplay = config.autoplay;
        this.video.ontimeupdate = this.startVideo;
        this.canvas = null;
        this.ctx = document.createElement('CANVAS');
        this.c = this.ctx.getContext("2d");
        this.init();
    }
    init() {
        this.create_tool();
    }
    createCanvas() { //创建工具栏
        this.el.position = 'relative';
        this.ctx.height = this.height;
        this.ctx.width = this.width;
        this.ctx.style.position = 'absolute';
        this.ctx.style.top = 0;
        this.ctx.style.left = 0;
        this.ctx.style.bottom = 0;
        this.ctx.style.right = 0;
    }
    create_tool() { //底部创建工具栏
        const wrap = document.createElement('div');
        const player = document.createElement('div');
        const player_bar = document.createElement('div');
        const child = `
            <div id='mc-tool-btn'>
                ${config.play_or_pause ? '<button id="mc-tool-player-status" data-status="false"><i class="iconfont icon-bofang"></i></button>' : ''}
                ${config.next ? '<i class="iconfont icon-next"></i>': ''}
            </div>
            <div>${config.fullscreen ? '<i class="iconfont icon-dashujukeshihuaico-"></i>' : '' }</div>
        `
        wrap.id = 'mcc-tool-wrap';
        wrap.innerHTML = child;
        player.id = 'mc-tool-player-progress';
        player_bar.id = 'mc-tool-player-progress-bar';
        player_bar.style.width = 0
        player.append(player_bar)
        this.el.append(wrap, player);
        if (document.getElementById('mc-tool-player-status')) {
            const _self = this;
            document.getElementById('mc-tool-player-status').onclick = function() {
                if (!_self.video_src) return alert('播放地址为空!');
                config.status = !config.status; // 改变状态 播放 or 暂停
                _self.el.classList.add('play'); // 播放时添加黑色背景
                if (config.status) {
                    _self.video_play();
                    this.childNodes[0].classList.remove('icon-bofang')
                    this.childNodes[0].classList.add('icon-zanting')
                } else {
                    _self.video.pause();
                    _self.clearRender();
                    this.childNodes[0].classList.remove('icon-zanting')
                    this.childNodes[0].classList.add('icon-bofang')
                }

            }
        }
    }
    render() {
        config.status = true;
        this.canvas = setInterval(() => {
            this.c.drawImage(this.video, 10, 10, this.width, this.height);
            this.el.append(this.ctx);
        }, config.renderTime)
    }
    clearRender() {
        config.status = false;
        clearInterval(this.canvas)
    }
    video_play() {
        if (!this.canvas) {
            this.video.src = this.video_src;
            this.video.play();
            this.createCanvas();
            this.render();
        } else {
            this.video.play();
            this.render();
        }
    }
    startVideo() { // 视频开始播放
        const duration = Math.round(this.duration) // 视频长度
        const currentTime = Math.round(this.currentTime) // 当前播放时间
        const currentTime_100 = Math.round((currentTime / duration) * 100);
        document.getElementById('mc-tool-player-progress-bar').style.width = currentTime_100 + '%';
        const progress = document.getElementById('mc-tool-player-progress');
        progress.onclick = function() {
            console.log(this.screen)
                // console.log(this)
        }
    }
}