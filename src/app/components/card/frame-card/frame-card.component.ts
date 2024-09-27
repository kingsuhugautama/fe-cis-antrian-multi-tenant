import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
    selector: 'app-frame-card',
    templateUrl: './frame-card.component.html',
    styleUrls: ['./frame-card.component.css']
})
export class FrameCardComponent implements OnInit, OnDestroy {

    public YT: any;

    public Player: any;

    public PauseVideo = new BehaviorSubject<boolean>(false);

    constructor() { }

    ngOnInit(): void {
        this.onYoutubeIframeAPIReady();
    }

    onYoutubeIframeAPIReady(): void {
        let tag: any;

        const youtubeIframeApiScript = document.getElementById('youtubeIframeApiScript');
        if (youtubeIframeApiScript == null) {
            tag = document.createElement('script');
            tag.src = "//www.youtube.com/iframe_api";
            tag.id = 'youtubeIframeApiScript';
        }

        const www_widgetapi_script = document.getElementById('www-widgetapi-script');
        let firstScriptTag: any;

        if (www_widgetapi_script == null) {
            firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        } else {
            window.location.reload();
            console.clear();
        }

        window['onYouTubeIframeAPIReady'] = () => {
            this.Player = new YT.Player('player', {
                height: '100%',
                width: '100%',
                videoId: 'p4weIpk99mc',
                playerVars: {
                    'playsinline': 1,
                    'origin': '*'
                },
                events: {
                    'onReady': this.onPlayerReady.bind(this),
                    'onStateChange': this.onPlayerStateChanged.bind(this)
                }
            });
//
            console.log("YT Player =>", this.Player);
        }
    }

    onPlayerReady(event: any): void {
        event.target.playVideo();
    }

    onPlayerStateChanged(event: any): void {
        if (event.data == YT.PlayerState.ENDED) {
            this.Player.playVideo();
        }
    }

    onPauseVideo(): void {
        this.Player.pauseVideo();
    }

    onPlayVideo(): void {
        this.Player.playVideo();
    }

    ngOnDestroy(): void {
        window['onYouTubeIframeAPIReady'] = undefined;
    }
}
