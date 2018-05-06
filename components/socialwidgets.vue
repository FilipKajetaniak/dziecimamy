<template>
    <div class="social-media-widgets">
        <div class="ig-widget-container">
            <div class="ig-widget">
                <div class="images-carousel" :style="{paddingLeft: `${padding}px`}">
                    <div class="image" v-for="pic in pics" :key="pic" :style="{backgroundImage: `url('${pic}')`, transform: `translateX(-${shift}px)`}"></div>
                </div>
                <div class="top-widget-elements">
                    <div class="profile-picture" :style="{backgroundImage: `url('${igProfilePic}')`}"></div>
                    <a :href="igLink" target="_blank"><div class="ig-name">{{igUser}}</div></a>
                    <div class="ig-followers">{{igFollowers}} followers</div>
                </div>
                <transition name="shift">
                    <div class="bottom-widget-elements" v-show="description">{{currentTitle}}</div>
                </transition>
            </div>
        </div>
        <div class="fb-widget-container">
            <div id="fb-root"></div>
            <div class="fb-page"
            data-href="https://www.facebook.com/idziecimamy"
            data-tabs="timeline"
            data-height="320"
            data-small-header="false"
            data-adapt-container-width="true"
            data-hide-cover="false"
            data-show-facepile="true">
                <blockquote cite="https://www.facebook.com/idziecimamy" class="fb-xfbml-parse-ignore">
                <a href="https://www.facebook.com/idziecimamy">idziecimamy</a>
                </blockquote>
            </div>
        </div>
    </div>
</template>
<script>
import GET_INSTA_PICS from '@/apollo/queries/GET_INSTA_PICS.graphql'
import GET_INSTA_USER from '@/apollo/queries/GET_INSTA_USER.graphql'
export default {
    data () {
        return {
            pics: ['https://resources.wimpmusic.com/images/06924b58/f3df/45c9/8eb4/85d3d28ee7f5/320x320.jpg'],
            shift: 0,
            padding: 0,
            description: false,
            igUser: '',
            igTitles: [],
            currentTitle: '',
            igFollowers: 0,
            titleIndex: 0,
            igProfilePic: ''
        }
    },
    computed: {
        igLink(){
            return `https://www.instagram.com/${this.igUser}/`
        }
    },
    methods: {
        getInstaPics(){
            this.$apollo.query({
                query: GET_INSTA_PICS
            }).then(res => {
               this.igTitles = res.data.getInstaPics.pics.map(post => post.caption.text);
               this.pics = res.data.getInstaPics.pics.map(post => post.images.low_resolution.url);
               this.currentTitle = this.igTitles[0];  
            })
        },
        getInstaUser(){
            this.$apollo.query({
                query: GET_INSTA_USER
            }).then(res => {
                this.igUser = res.data.getInstaUser.info.username;
                this.igFollowers = res.data.getInstaUser.info.counts.followed_by;
                this.igProfilePic = res.data.getInstaUser.info.profile_picture;
            })
        },
        shiftPic(){
            this.shift += 320;
            this.description = true;
            setTimeout(()=>{
                this.padding += 320;
                this.pics.push(this.pics[0]);
                this.pics.shift();
            }, 700)
            setTimeout(()=>{
                this.description = false
            }, 2800)
        },
        imageCarousel(){
            setInterval(() => {
                this.shiftPic();
                if(this.titleIndex < this.igTitles.length-1){
                    this.titleIndex++;
                    this.currentTitle = this.igTitles[this.titleIndex];
                }else{
                    this.titleIndex = 0;
                    this.currentTitle = this.igTitles[this.titleIndex];
                }
            },3500);
        },
    },
    mounted () {
        (function(d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) return;
            js = d.createElement(s); js.id = id;
            js.src = 'https://connect.facebook.net/pl_PL/sdk.js#xfbml=1&version=v3.0';
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
        this.imageCarousel();
    },
    created(){
        this.getInstaUser();
        this.getInstaPics();
    }
}
</script>
<style>
.shift-enter{
    opacity: 0;
    transform: translateX(50px);
}
.shift-enter-to{
    opacity: 1;
    transform: translateX(0px);
    transition: 700ms all cubic-bezier(.13,.8,.29,.89);
    transition-delay: 500ms;
}

.shift-leave{
    opacity: 1;
    transform: translateX(0px);
}
.shift-leave-to{
    opacity: 0;
    transform: translateX(-50px);
    transition: 700ms all cubic-bezier(.75,.1,.9,.34);
}

.ig-widget-container, .fb-widget-container {
    width: 50%;
    height: auto;
    margin: 30px auto;
    float: left;
}

.ig-widget{
    position: relative;
    height: 320px;
    width: 320px;
    margin-right: 20px;
    margin-left: auto;
    background-color: white;
    -webkit-box-shadow: 2px 2px 23px 0px rgb(0, 92, 158);
    -moz-box-shadow: 2px 2px 23px 0px rgba(0, 92, 158);
    box-shadow: 2px 2px 23px 0px rgba(0, 92, 158);
    font-family: Helvetica, Arial, sans-serif;
    text-shadow: 0px 3px 6px rgba(0, 0, 0, 0.94);
    color: white;
    overflow: hidden;
    border-radius: 10px;
}

.fb-page{
    margin-left: 20px;
}
.top-widget-elements{
    height: 90px;
    width: 100%;
    position: absolute;
    background: -webkit-linear-gradient(to bottom, rgba(0, 0, 0, 0.75) -10%, transparent 100%);
    background: -moz-linear-gradient(to bottom, rgba(0, 0, 0, 0.75) -10%, transparent 100%);
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0.75) -10%, transparent 100%);
    border-radius: 10px;
}

.ig-name:hover{
    text-decoration: underline !important;
}

.bottom-widget-elements{
    height: 60px;
    width: 100%;
    position: absolute;
    margin-top: 260px;
    padding-left: 10px;
    line-height: 60px;
    overflow: hidden;
}
.images-carousel{
    height: 320px;
    width: 960px;
    position: absolute;
    transition: none;
}
.profile-picture{
    height: 50px;
    width: 50px;
    border: 2px solid white;
    margin: 10px;
    -webkit-box-shadow: 2px 2px 8px -1px rgba(0,0,0,0.8);
    -moz-box-shadow: 2px 2px 8px -1px rgba(0,0,0,0.8);
    box-shadow: 2px 2px 8px -1px rgba(0,0,0,0.8);
    background-color: white;
    background-position: center;
    background-size: cover;
}
.ig-name{
    position: absolute;
    height: 25px;
    line-height: 25px;
    width: 100%;
    top: 10px;
    left: 76px;
    font-size: 1.15em;
    font-weight: 300;
}
.ig-followers{
    position: absolute;
    height: 25px;
    line-height: 12px;
    width: 100%;
    top: 35px;
    left: 76px;
    font-size: 0.8em;
    font-weight: 300;
}
.image{
    width: 320px;
    height: 320px;
    float: left;
    transform: translateX(0px);
    transition-duration: 700ms;
    transition-timing-function: cubic-bezier(.73,.01,.24,.99);
    transition-property: transform;
}
.fb_iframe_widget iframe{
    border-radius: 10px !important;
    -webkit-box-shadow: 2px 2px 23px 0px rgb(0, 92, 158);
    -moz-box-shadow: 2px 2px 23px 0px rgba(0, 92, 158);
    box-shadow: 2px 2px 23px 0px rgba(0, 92, 158);
}
@media screen and (max-width: 770px){
    .social-media-widgets{
        display: none;
    }
}
</style>
