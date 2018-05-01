<template>
    <div class="categoryeditor">
    <div id="add-category"  v-if="firstStep">
        <div class="option-name outside" v-show="!editMode">Dodaj kategorię</div>
        <div class="option-name outside" v-show="editMode">Edytuj kategorię</div>
        <label class="form-label">Nazwa kategorii:</label><br>
        <input type="text" v-model="name" class="input">
        <label class="form-label">Opis kategorii:</label><br>
        <textarea class="input category-description" v-model="description"></textarea>
        <label class="form-label">Kolor:</label><br>
        <div class="color-picker">
            <div v-bind:class="{'color-square': true, 'selected-color': checkIfSelected(color),
            'opaque': selectedColor.length}"
             v-bind:style="{ backgroundColor: color }" v-for="color in colors"
             v-bind:key="color" @click="setColor(color)"></div>
        </div>
        <button class="option-button" @click="addCategory()">Dalej</button>
    </div>
    <div id="chose-posts" v-else>
        <div class="option-name outside">Wybierz posty dla utworzonej kategorii</div>
        <div class="post-list-form" v-show="editMode"> 
            <div v-bind:class="{'post-list-item': true, 'selected-item': post.selected}"
            v-for="post in postlist" v-bind:key="post.id" @click="toggleSelect(post.id, post.selected)">{{post.title}}</div><br>
        </div>
                <div class="post-list-form" v-show="!editMode"> 
            <div v-bind:class="{'post-list-item': true, 'selected-item': post.selected}"
            v-for="post in postlist" v-bind:key="post.id" @click="post.selected = !post.selected">{{post.title}}</div><br>
        </div>
        <button class="option-button" @click="firstStep = true">Wstecz</button>
        <button class="option-button green-button" style="margin-left: 10px" @click="updateSelectedPosts()" v-show="editMode">Zmień razem z wybranymi postami</button>
        <button class="option-button green-button" style="margin-left: 10px" @click="addSelectedPosts()" v-show="!editMode">Dodaj razem z wybranymi postami</button>
    </div>
    </div>       
</template>
<script>
import ADD_CATEGORY from '~/apollo/queries/ADD_CATEGORY.graphql'
import UPDATE_CATEGORY from '~/apollo/queries/UPDATE_CATEGORY.graphql'

export default {
  props: ['postlist', 'editMode', 'categoryProperties'],
  data () {
    return {
        colors: ['#f8b724','#50aba8','#e44337','#0098ff','#D8D174','#0E34A0','#2F3061',
        '#D77A61','#223843','#D44D5C','#0B0014','#FCFC62','#FF8E72','#ED6A5E','#FFAF87',
        '#58A4B0','#A9BCD0','#63458A','#EC9A29','#F0B67F','#C7EFCF','#FE5F55','#0F8B8D','#E4B7E5',
        '#A8201A','#143642','#EF27A6','#EE6352','#59CD90','#3FA7D6','#FAC05E','#F79D84','#548687',
        '#B0413E','#FCAA67','#7E5A9B','#FF299C','#473335','#A7E8BD','#137547','#2A9134','#9A48D0',
        '#3FA34D','#F7D002','#454E9E','#97FFCF','#2FE1D6','#38C6BD','#6C567B','#C06C84','#F67280',
        '#F8B195','#F27370','#FA9856','#22559C','#3D0240','#137083','#0081C6','#46CDCF','#48466D'],
        selectedColor: this.categoryProperties.color,
        name: this.categoryProperties.name,
        description: this.categoryProperties.description,
        firstStep: true,
        existingPosts: []
    }
  },
  created(){
    this.existingPosts = this.postlist.filter((post)=>{return post.selected === true});
  },
  methods: {
      setColor(color){
          this.selectedColor = color;
      },
      checkIfSelected(color){
          if (this.selectedColor === color){
              return true
          }
          return false
      },
      addCategory(){
          this.firstStep = false;
      },
      toggleSelect(id, selected){
          if(this.existingPosts.find((post)=>{return post.id === id})){
              alert('Nie możesz odznaczyć tego posta! Zostałby wtedy bez kategorii. Jeżeli chcesz zmienić kategorię tego posta przejdź do edycji postów!')
          }else{             
              this.postlist.filter((post)=>{
                  return post.id === id
              })[0].selected = !selected
          }
      },
      addSelectedPosts(){
        let selectedPosts = this.postlist.filter((post)=>{
              return post.selected === true
        }).map((post)=>{
              return post.id
        });
        const urlify = (str) => {
                return str.replace(/ż/g,'z').replace(/ó/g,'o').replace(/ł/g,'l').replace(/ć/g,'c').replace(/ś/g,'s').replace(/ę/g,'e').replace(/ź/g,'z').replace(/ń/g,'n').replace(/ą/g,'a').replace(/Ć/g, 'C').replace(/Ę/g, 'E').replace(/Ł/g, 'L').replace(/Ń/g, 'N').replace(/Ó/g, 'O').replace(/Ś/g, 'S').replace(/Ż/g, 'Z').replace(/Ź/g, 'Z').replace(/Ą/g, 'A').replace(/[^a-zA-Z\d\s]/g, '').replace(/\s+/g, '-')
        };
        let slug = urlify(this.name);
        let name = this.name;
        let color = this.selectedColor;
        let description = this.description;
        if(name && color && slug){
        this.$apollo.mutate({
            mutation: ADD_CATEGORY,
            variables: {
                name: name,
                slug: slug,
                color: color,
                description: description,
                postsIds: selectedPosts
            }
        })
        .then(()=>{
            this.$store.commit('showOk', 'Dodano kategorię!')
            this.$router.push('/admin')
            window.location.reload(true);
        })
        .catch(()=>{
            this.$store.commit('showError')
        })}else{
            this.$store.commit('showError')
        }
      },
    updateSelectedPosts(){
        let selectedPosts = this.postlist.filter((post)=>{
              return post.selected === true
        }).map((post)=>{
              return post.id
        });
        const urlify = (str) => {
                return str.replace(/ż/g,'z').replace(/ó/g,'o').replace(/ł/g,'l').replace(/ć/g,'c').replace(/ś/g,'s').replace(/ę/g,'e').replace(/ź/g,'z').replace(/ń/g,'n').replace(/ą/g,'a').replace(/Ć/g, 'C').replace(/Ę/g, 'E').replace(/Ł/g, 'L').replace(/Ń/g, 'N').replace(/Ó/g, 'O').replace(/Ś/g, 'S').replace(/Ż/g, 'Z').replace(/Ź/g, 'Z').replace(/Ą/g, 'A').replace(/[^a-zA-Z\d\s]/g, '').replace(/\s+/g, '-')
        };
        let id = this.categoryProperties.id;
        let slug = urlify(this.name);
        let name = this.name;
        let color = this.selectedColor;
        let description = this.description;
        if(name && color && slug){
        this.$apollo.mutate({
            mutation: UPDATE_CATEGORY,
            variables: {
                id: id,
                name: name,
                slug: slug,
                color: color,
                description: description,
                postsIds: selectedPosts
            }
        })
        .then(()=>{
            this.$store.commit('showOk', 'Dodano kategorię!')
            this.$router.push('/admin')
            window.location.reload(true);
        })
        .catch(()=>{
            this.$store.commit('showError')
        })}else{
            this.$store.commit('showError')
        }
      }
  }
}
</script>
<style>
.categoryeditor{
    margin-bottom: 50px;
}

.form-label{
    color: rgb(104, 104, 104);
    font-size: 1.1em;
}
.color-picker{
    width: 100%;
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
}

.category-description{
    height: 70px;
}

.post-list-form{
    height: 400px;
    overflow-y: scroll;
    margin-bottom: 20px;
}

.post-list-item{
    min-height: 40px;
    line-height: 40px;
    color: rgb(104, 104, 104);
    font-size: 1.2em;
    border-bottom: 1px solid rgb(218, 218, 218);
    cursor: pointer;
    padding-left: 10px;
}

.post-list-item:hover{
    background-color: rgba(218, 218, 218, 0.616);
}

.selected-item{
    background-color: rgb(104, 182, 255);
    color: white;
}

.selected-item:hover{
    background-color: rgb(104, 182, 255) !important;
    color: white !important;
    opacity: 0.7;
}

.color-square{
    background-color: rgb(184, 184, 184);
    margin-top: 10px;
    display: block;
    height: 30px;
    width: 30px;
    margin: 5px;
    cursor: pointer;
}

.color-square:hover{
    opacity: 1;
}

.opaque{
    opacity: 0.3;
}

.selected-color{
    transform: scale(1.4);
    opacity: 1 !important;
}
</style>