<template>
    <div>
        <smallmenu v-bind:smallMenu="true" />
        <searchpage v-if="searchPhrase" />
        <div class="container grey" style="min-height: 90vh" v-else>
            <div class="wrapper-narrow">
                <div class="archive">
                    <h2>Archiwum</h2>
                    <div class="year" v-for="year in uniqueYears" :key="year.year">
                        <span @click="openYear(year); year.clicked = !year.clicked" class="year-link">{{year.year}}<span class="count">{{howManyPostsYear(year.year)}}</span></span>
                        <div v-show="year.clicked" class="months">
                            <archiveyearlist :year="uniqueYears.filter(chosenYear => chosenYear.year === year.year)[0].posts" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import smallmenu from '@/components/smallmenu.vue'
import searchpage from '@/components/searchpage.vue'
import archiveyearlist from '@/components/archiveyearlist.vue'
import ALL_POSTS_YEARS_MONTHS from '@/apollo/queries/ALL_POSTS_YEARS_MONTHS.graphql'
import ALL_POSTS_IN_YEAR from '@/apollo/queries/ALL_POSTS_IN_YEAR.graphql'
import { asyncify } from 'async';

export default {
    data () {
        return {  
            uniqueYears: [],
            allBlogposts: [],
            fetchedPosts: [],
            months: ['Styczeń','Luty','Marzec','Kwiecień','Maj','Czerwiec',
            'Lipiec','Sierpień','Wrzesień','Październik','Listopad','Grudzień'],
            postCount: 0
        }
    },
    computed: {
        yearsArray(){
            return this.postsArchive.map((post)=>{
                return post.postYear
            })
        },
        searchPhrase(){
            return this.$store.getters.getSearchPhrase
        }
    },
    methods: {
        getUniqueYears(){
            let uniqueArr = [];
            this.yearsArray.sort().reduce((prevY, thisY)=>{
                if (thisY != prevY){
                    uniqueArr.push(thisY)
                }
                return thisY
            },0)
            this.uniqueYears = uniqueArr.map(year=>{return {year,clicked: false, posts: []}}).reverse();
        },
        howManyPostsYear(year){
            let posts = this.postsArchive.filter(post=>post.postYear === year).length;
            let postsString;
            if(posts.toString().substr(-1) === '1'){
                postsString = `(${posts} post)`
            } else if (posts.toString().substr(-1) === '2' || posts.toString().substr(-1) === '3' || posts.toString().substr(-1) === '4'){
                postsString = `(${posts} posty)`
            } else {
                postsString = `(${posts} postów)`
            }
            return postsString;
        },
        howManyPostsInMonth(index, clickedYear){
            let monthIndex = this.months.indexOf(index)+1;
            this.postCount = this.uniqueYears.filter(year => year.year === clickedYear)[0].posts.filter(post => post.postMonth == index).length
        },
        addPosts(year, data){
            year.posts = data;
            this.fetchedPosts = [];
        },
        openYear(clickedYear){
                this.$apollo.query({
                    query: ALL_POSTS_IN_YEAR,
                    variables: {
                        year: clickedYear.year
                    }
                })
                .then(res=>{
                    this.fetchedPosts = res.data.allBlogposts;
                    this.addPosts(clickedYear, this.fetchedPosts);
                })
            }           
    },
    components: {
        smallmenu,
        archiveyearlist,
        searchpage
    },
    watch: {
        searchPhrase(newValue, prevValue){
            if(prevValue === '' && newValue !== ''){
            this.$scrollTo('.container', 1)
            }
        }
    },
    asyncData(context){
        return context.app.provide.$apolloProvider.defaultClient.query({
            query: ALL_POSTS_YEARS_MONTHS
        }).then((res)=>{
                return {postsArchive: res.data.allBlogposts}
        })

    },
    mounted(){
        this.getUniqueYears()
    }
}
</script>
<style>
.archive{
    font-family: Nunito;
     margin-top: 100px;
}

.archive h2{
    color: #0097ff;
    font-size: 2.4em;
    font-weight: 700;
}

.year{
    color: rgb(153, 153, 153);
    font-weight: 300;
    font-size: 1.4em;
    letter-spacing: 0.5px;
    margin-bottom: 30px;
}

.year-link{
    cursor: pointer;
}

.year-link:hover{
    color: rgb(85, 85, 85);
}

.count{
    margin-left: 10px;
    opacity: 0.6;
}

</style>