<template>
    <div>
        <smallmenu v-bind:smallMenu="true" />
        <searchpage v-if="searchPhrase"/>
        <div class="container grey" v-else>
            <div class="wrapper-narrow">
                <div class="start-here">
                    <h2>Co tu znajdziesz?</h2>
                    <p>W zakładce <b>maluczki</b> - rozkminiam zachowanie dzieci, dociekam, dlaczego sprawiają dorosłym tyle kłopotów i jak się domyślasz często dochodzę do wniosku, że to nie dziecko jest problemem. Nie znajdziesz tu tonu wyższości, pouczania i udawadniania ci, że wszystko źle robisz. Chcę stawiać pytania, nawet jeśli sątrudne i niewygodne.</p>
                    <p><b>duży człowiek</b> - tutaj walę prawdą po oczach, nie ukrywam jacy jesteśmy, za czym gonimy, dlaczego nasze dzieci są takie jakie są i przypominam, że my też jesteśmy dziećmi, dorosłymi, którzy wciąż rozpakowują swoje tobołki doświadczeń z domów rodzinnych, którzy ciągle pamiętają jak nie lubili, kiedy ciocia Hela szczypała w policzek.</p>
                    <p><b>nieporadnik</b> - w roli głównej sprawa, trudna sprawa, jak poradzić sobie z... i nie zwariować. Nie chcę, żeby to były porady w stylu: jeśli dziecko tobie szach, to ty mat królowej. Chcę podpowiadać, ale wiem, że ekspertem od twojego dziecka jesteś ty rodzicu, nawet jeśli w to nie wierzysz. </p>
                    <p><b>życie przyniosło</b> - moje obserwacje sytuacji wychowawczych, albo niewychowawczych, z pointą, albo bez. </p>
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
    watch: {
        searchPhrase(newValue, prevValue){
            if(prevValue === '' && newValue !== ''){
            this.$scrollTo('.container', 1)
            }
        }
    },
    computed: {
        searchPhrase(){
        return this.$store.getters.getSearchPhrase
        }
    }
}
</script>
<style>
.start-here{
    margin-top: 100px !important;
    font-family: Nunito;
}

.start-here > h2{
    color: #0097ff;
    font-size: 2.4em;
    font-weight: 700;
}

.start-here > p{
    font-size: 1.4em;
    line-height: 1.6em;
    font-weight: 300;
    color: rgb(153, 153, 153);
    letter-spacing: 0.5px;
    margin: 50px 0;
}

.start-here b{
    color: #0097ff;
}
</style>