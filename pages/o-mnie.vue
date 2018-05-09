<template>
    <div>
        <smallmenu v-bind:smallMenu="true" />
        <searchpage v-if="searchPhrase"/>
        <div class="container grey" v-else>
            <div class="wrapper-narrow">
                <div class="about-me">
                    <div class="top-text">
                        <h2>Kim jestem?</h2>                 
                        <p>W domu kobietą, bardzo dorosłą, żoną i matką - mam na koncie dwa dojrzałe osobniki, mimo trudów i upadków proces wychowawczy szczęśliwie doprowadzony do końca.</p><br>
                        <p>W pracy pedagogiem, mediatorem, zajmuję się interwencją kryzysową. Pracuję z rodzinami dotkniętymi przemocą.  Robię wszystko, żeby uchronić przed tym strasznym doświadczeniem inne, zagrożone rodziny:
                        prowadzę kursy dobrego rodzicielstwa, warsztaty profilaktyczne dla dzieci i młodzieży i specjalistów pracujących z dzieciakami.Wspieram wszystkich, którzy chcą wychowywać swoje dzieci w duchu miłości i zrozumienia. Ale ze stawianiem granic, z szacunkiem i chrześcijańskimi wartościami. Wychowuję obce dzieci.</p>
                    </div>
                    <div class="bottom-text">
                        <h2>Dlaczego blog?</h2>
                        <p>Dlaczego nie? patrząc na blogosferę można odnieść wrażenie, że wychowanie to taki twór, który prawie nie istnieje. Chcę wpakować swój kijek w to mrowisko.</p>
                        <p>Jeszcze jedno, nazywam się Ewa Kajetaniak</p>
                        <p>Wierzę i praktykuję, słucham głośno fajnej muzy, czytam, oglądam i bywam. 
                         Nie rzucam słów na wiatr i pereł przed wieprze oraz kamieni w człowieka, mam dystans do świata i siebie - no chyba że powiesz, że jestem gruba.</p>
                    </div>
                    <div class="portrait"><img src="~/assets/Img-right.png"></div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import searchpage from '@/components/searchpage.vue'
import smallmenu from '@/components/smallmenu.vue'
import { asyncify } from 'async';

export default {
    data () {
        return {    

        }
    },
    components: {
        smallmenu,
        searchpage
    },
    computed: {
        searchPhrase(){
        return this.$store.getters.getSearchPhrase
        }
    },
    watch: {
        searchPhrase(newValue, prevValue){
            if(prevValue === '' && newValue !== ''){
                this.$scrollTo('.container', 1)
            }
        }
    },
}
</script>
<style>
.about-me{
    margin-top: 100px !important;
    font-family: Nunito;
}

.top-text > h2{
    color: #0097ff;
    font-size: 2.4em;
    font-weight: 700;
}

.bottom-text > h2{
    color: #0097ff;
    font-size: 2.4em;
    font-weight: 700;
}

.top-text > p{
    font-size: 1.4em;
    line-height: 1.6em;
    font-weight: 300;
    color: rgb(153, 153, 153);
    letter-spacing: 0.5px;
}

.bottom-text > p{
    font-size: 1.4em;
    line-height: 1.6em;
    font-weight: 300;
    color: rgb(153, 153, 153);
    letter-spacing: 0.5px;
}
.top-text{
    min-height: 400px;
    position: relative;
    vertical-align: top;
}
.portrait{
    width: 100%;
    height: 400px;
    text-align: center;
}
.portrait > img{
    height: 400px;
    width: auto;
}

@media screen and (max-width: 770px){
    .portrait{
        height: auto;
        width: 90%;
    }
    .portrait > img {
        height: auto;
        width: 90%;
        margin-bottom: -10px;
        opacity: 0.8;
    }
}
@media screen and (max-width: 438px){
    .portrait{
        height: auto;
        width: 100%;
    }
    .portrait > img {
        height: auto;
        width: 100%;
    }
}
</style>