<template>
    <div>
        <div class="ig-widget-container">
            <div class="ig-widget">
                <div class="images-carousel">
                    <div class="image" v-for="pic in pics" :key="pic" :style="{backgroundImage: `url('${pic}')`}"></div>
                </div>
                <div class="top-widget-elements">
                    <div class="profile-picture"></div>
                    <div class="ig-name">kokornak.Idziecimamy</div>
                    <div class="ig-followers">152 followers</div>
                </div>
                <!-- <div class="bottom-widget-elements">
                    Wrzucam, żeby przetestować API dsdsdsdss
                </div> -->
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
export default {
    data () {
        return {
            pics: ['https://resources.wimpmusic.com/images/06924b58/f3df/45c9/8eb4/85d3d28ee7f5/320x320.jpg',
            'https://www.airfrance.fr/FR/common/common/img/tbaf/news/CUN/carnet-de-voyage-le-mexique-de-cancun-a-chihuahua/CUN-carnet-de-voyage-le-mexique-de-cancun-a-chihuahua-1_1-320x320.jpg',
            'http://saltanimation.pl/wp-content/uploads/2017/05/211-320x320.jpg',
            ]
        }
    },
    mounted () {
        (function(d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) return;
            js = d.createElement(s); js.id = id;
            js.src = 'https://connect.facebook.net/pl_PL/sdk.js#xfbml=1&version=v3.0';
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
    }
}
</script>
<style>
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
    transform: translateY(1px);
    background-color: white;
    -webkit-box-shadow: 2px 2px 23px 0px rgb(0, 92, 158);
    -moz-box-shadow: 2px 2px 23px 0px rgba(0, 92, 158);
    box-shadow: 2px 2px 23px 0px rgba(0, 92, 158);
    font-family: Helvetica, Arial, sans-serif;
    text-shadow: 0px 3px 6px rgba(0, 0, 0, 0.94);
    color: white;
    overflow: hidden;
}

.fb-page{
    margin-left: 20px;
    -webkit-box-shadow: 2px 2px 23px 0px rgb(0, 92, 158);
    -moz-box-shadow: 2px 2px 23px 0px rgba(0, 92, 158);
    box-shadow: 2px 2px 23px 0px rgba(0, 92, 158);
}
.top-widget-elements{
    height: 90px;
    width: 100%;
    position: absolute;
    background: -webkit-linear-gradient(to bottom, rgba(0, 0, 0, 0.75) -10%, transparent 100%);
    background: -moz-linear-gradient(to bottom, rgba(0, 0, 0, 0.75) -10%, transparent 100%);
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0.75) -10%, transparent 100%);
}
.bottom-widget-elements{
    height: 40px;
    width: 100%;
    position: absolute;
    margin-top: 90px;
    padding-left: 10px;
    line-height: 40px;
    overflow: hidden;
}
.images-carousel{
    height: 320px;
    width: 960px;
    position: absolute;
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
    transition: 300ms ease-in-out all;
}
</style>
