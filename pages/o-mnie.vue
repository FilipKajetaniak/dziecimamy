<template>
    <div>
        <smallmenu v-bind:smallMenu="true" />
        <searchpage v-if="searchPhrase"/>
        <div class="container grey" v-else>
            <div class="wrapper-narrow">
                <div class="about-me">
                    <h2>Kim jestem?</h2>
                    <p>W domu kobietą, bardzo dorosłą, żoną i matką - mam na koncie dwa dojrzałe osobniki, mimo trudów i upadków proces wychowawczy szczęśliwie doprowadzony do końca.</p><br>
                    <p>W pracy pedagogiem, mediatorem, zajmuję się interwencją kryzysową. Pracuję z rodzinami dotkniętymi przemocą.  Robię wszystko, żeby uchronić przed tym strasznym doświadczeniem inne, zagrożone rodziny: prowadzę kursy dobrego rodzicielstwa, warsztaty profilaktyczne dla dzieci i młodzieży i specjalistów pracujących z dzieciakami. Wspieram wszystkich, którzy chcą wychowywać swoje dzieci  w duchu miłości i  zrozumienia. Ale ze stawianiem granic, z szacunkiem i chrześcijańskimi wartościami. Wychowuję obce dzieci.</p><br>
                    <h2>Dlaczego blog?</h2>
                    <p>Dlaczego nie? patrząc na blogosferę można odnieść wrażenie, że wychowanie to taki twór, który prawie nie istnieje. Chcę wpakować swój kijek w to mrowisko.</p>
                    <p>Jeszcze jedno, nazywam się Ewa Kajetaniak</p>
                    <p>Wierzę i praktykuję, słucham głośno fajnej muzy, czytam, oglądam i bywam. Nie rzucam słów na wiatr i pereł przed wieprze oraz kamieni w człowieka, mam dystans do świata i siebie - no chyba że powiesz, że jestem gruba.</p>
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

.about-me > h2{
    color: #0097ff;
    font-size: 2.4em;
    font-weight: 700;
}

.about-me > p{
    font-size: 1.4em;
    line-height: 1.6em;
    font-weight: 300;
    color: rgb(153, 153, 153);
    letter-spacing: 0.5px;
}
</style>