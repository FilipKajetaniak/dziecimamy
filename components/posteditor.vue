<template>
<div class="addpost">
    <div class="preview" id="panel">
        <div class="blog-post-preview">
      <article class="blog-article">
        <div class="article-date">{{toTwoDigits(newpost.postDay)}}.{{toTwoDigits(newpost.postMonth)}}.{{newpost.postYear}}</div>
        <div class="article-title">{{newpost.title}}</div>
        <div class="article-text"></div>
      </article>
        </div>
    </div>
    <div class="text-editor-wrapper">
        <div id="handle"></div>
        <div class="text-editor">
                <form id="text-editor-form">Tytuł posta:<br>
                <input type="text" class="input" v-model="newpost.title">
                <button @click.prevent="openPopupThumbnail" class="option-button thumbnail-button">Wybierz Thumbnail</button>
                <button @click.prevent="openPopupDate" class="option-button">Zmień datę posta</button>
                <div class="thumbnail-preview" v-if="newpost.thumbnail.length" v-bind:style="{backgroundImage: 'url(' + newpost.thumbnail + ')'}"></div><div class="line"></div>Krótki opis posta: <span style="opacity: 0.7; font-size: 0.8em;"> (Max 200 znaków)</span><br>
                <textarea class="input" v-model="newpost.snippet" placeholder="Wpisz tutaj krótki opis posta albo zaznacz jakiś fragment tekstu i kliknij 'Ustaw zaznaczony'. Jeżeli zostawisz to pole puste, opisem będzie pierwsze 200 znaków treści posta." id="post-description-input" cols="30" rows="4"></textarea>
                <br><span v-bind:class="{'red-color': newpost.snippet.length > 200}" style="margin-right: 10px; opacity: 0.6;">Opis ma {{newpost.snippet.length}} znaków </span>
                <button class="option-button" @click.prevent="getSelectedSnippet">Ustaw zaznaczony tekst</button><div class="line"></div>Kategoria:<br>
                <select class="input" id="category-selection" v-model="newpost.category">
                    <option v-bind:key="Category.name" v-for="Category in allCategories" v-bind:value="Category" v-bind:style="{'color': Category.color}">{{Category.name}}</option>
                </select><div class="line"></div>Treść posta:<br>
                <button @click.prevent="openPopupImage" class="option-button">Dodaj zdjęcie</button>
                <div id="toolbar"></div>
                <div class="quill-editor"
                    :content="newpost.articleHtml"
                    v-quill:myQuillEditor="editorOption"
                    @change="onEditorChange($event)"></div>
            <button type="submit" class="option-button green-button"  v-show="!editMode" @click.prevent="submitPost">Zamieść post</button>
            <button class="option-button" style="margin-left: 10px;"  v-show="!editMode" @click.prevent="savePost">Zapisz</button>
            <button class="option-button" v-show="editMode" @click.prevent="updatePost">Zapisz Zmiany</button>
            </form>
            <router-link to='/admin'><span class="back-button-homepage">Anuluj i wróć do panelu</span></router-link>
        </div>
    </div>

    <div class="addpicture-popup" v-if="popupImage">Wklej link do obrazka:<br>
    <input type="text" class="input" placeholder="http://" v-model="imageLink">
    <button class="option-button" @click="addPicture">Dodaj</button>
    <button class="option-button cancel" @click="popupImage = false">Anuluj</button>
    </div>

    <div class="addpicture-popup" v-if="popupThumbnail">Wklej link obrazka do Thumbnaila:<br>
    <input type="text" class="input" placeholder="http://" v-model="newThumbnail">
    <button class="option-button" @click="addThumbnail(newThumbnail)">Dodaj</button>
    <button class="option-button cancel" @click="cancelThumbnail">Anuluj</button>
    </div>

    <div class="addpicture-popup" v-if="popupDate">
    <input type="text" class="input date-input" placeholder="dzień" v-model="newDay">
    <input type="text" class="input date-input" placeholder="Miesiąc" v-model="newMonth">
    <input type="text" class="input date-input" placeholder="Rok" v-model="newYear">
    <button class="option-button" @click="changingDate">Zmień datę</button>
    <button class="option-button" @click="gettingDate" v-if="dateChanged">Ustaw dzisiejszą datę</button>
    <button class="option-button cancel" @click="popupDate = false">Anuluj</button>
    </div>

</div>
</template>
<script>
import ADD_POST from '~/apollo/queries/ADD_POST.graphql';
import SAVE_POST from '~/apollo/queries/SAVE_POST.graphql';
import UPDATE_POST from '~/apollo/queries/UPDATE_POST.graphql';
import { asyncify } from 'async';



export default {
  layout: 'admin',
  props: ['newpostprop', 'editMode'],
  data () {
    return {
        newpost: this.newpostprop,
        popupImage: false,
        popupThumbnail: false,
        popupDate: false,
        imageLink: '',
        newThumbnail: '',
        newDay: 0,
        newMonth: 0,
        newYear: 0,
        dateChanged: false,
        editorOption: {
          placeholder: 'Wpisz treść posta',
          readOnly: false,
          theme: 'snow',
          modules: {
            toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote'],
            [{'header': [1, false]}],
            [{'list': 'ordered'},{'list': 'bullet'}],
            ['link'],
            [{ 'background': ['#f8b724', false] }],
            ['clean']
            ]
          }
        }
    }
    },
    computed: {
        allCategories(){
        return this.$store.state.allCategories
        }
    },
    methods: {
    toTwoDigits: num => {if(num < 10){return '0'+num}else{return num}},

    gettingDate(){
        if(!this.newpost.postDay){
            const todayDate = new Date();
            this.newpost.postDay = todayDate.getDate();
            this.newpost.postMonth = todayDate.getMonth() + 1;
            this.newpost.postYear = todayDate.getFullYear();
            this.newDay = todayDate.getDate();
            this.newMonth = todayDate.getMonth() + 1;
            this.newYear = todayDate.getFullYear();
            this.popupDate = false;
        }
    },

    changingDate(){
        const dateCorrect=()=>{
            let d = this.newDay;
            let m = this.newMonth;
            let y = this.newYear;

            if(d > 0 && d < 32 && m > 0 && m < 13 && y > 2016 && y < 2030){
                return true
            }else{return false}
        }
        if(dateCorrect()){
            this.newpost.postDay =  Number(this.newDay);
            this.newpost.postMonth =  Number(this.newMonth);
            this.newpost.postYear =  Number(this.newYear);
            this.dateChanged = true;
            this.popupDate = false;
        }else{
            alert('Podaj prawidłową datę!')
        }
    },
    getSelectedSnippet(){
        let selection = '';
        if (window.getSelection) {
           selection = window.getSelection().toString();
        } else if (document.selection && document.selection.type != "Control") {
            selection = document.selection.createRange().selection;
        }
        this.newpost.snippet = selection;
    },
    getQuillContent() {
        this.newpost.articleHtml = document.querySelector('.ql-editor').innerHTML;
        document.querySelector('.article-text').innerHTML = document.querySelector('.ql-editor').innerHTML;
    },
    openPopupImage(){
        this.popupImage = true;
        const popUpArea = document.querySelector('.addpicture-popup');
    },
    openPopupThumbnail(){
        this.popupThumbnail = true;
        const popUpArea = document.querySelector('.addpicture-popup');
    },
    openPopupDate(){
        this.popupDate = true;
        const popUpArea = document.querySelector('.addpicture-popup');
    },
    addThumbnail(thumbnail){
        this.newpost.thumbnail = thumbnail;
        this.popupThumbnail = false;
    },
    cancelThumbnail(){
        this.newThumbnail = '';
        this.popupThumbnail = false;
    },
    addPicture(){
        if(!this.imageLink){this.popupImage = false}else{
        document.querySelector('.ql-editor').innerHTML += `<img src="${this.imageLink}" class="blog-post-image"><br>`;
        this.newpost.articleHtml = document.querySelector('.ql-editor').innerHTML;
        document.querySelector('.article-text').innerHTML = document.querySelector('.ql-editor').innerHTML;
        this.imageLink = '';
        this.popupImage = false;
        }
    },
    submitPost(){
        if(!this.newpost.title || !this.newpost.category || !this.newpost.articleHtml || !this.newpost.thumbnail){
            let emptyFields = '';
            (!this.newpost.title) ? emptyFields += 'tytuł ' : emptyFields += '';
            (!this.newpost.category) ? emptyFields += 'kategorię ' : emptyFields += '';
            (!this.newpost.articleHtml) ? emptyFields += 'treść posta ' : emptyFields += '';
            (!this.newpost.thumbnail) ? emptyFields += 'thumbnail ' : emptyFields += '';

            alert(`Uzupełnij wszystkie pola! Musisz jeszcze dodać ${emptyFields}`)
        }
        else{
            this.getQuillContent();

            const urlify = (str) => {
                return str.replace(/ż/g,'z').replace(/ó/g,'o').replace(/ł/g,'l').replace(/ć/g,'c').replace(/ś/g,'s').replace(/ę/g,'e').replace(/ź/g,'z').replace(/ń/g,'n').replace(/ą/g,'a').replace(/Ć/g, 'C').replace(/Ę/g, 'E').replace(/Ł/g, 'L').replace(/Ń/g, 'N').replace(/Ó/g, 'O').replace(/Ś/g, 'S').replace(/Ż/g, 'Z').replace(/Ź/g, 'Z').replace(/Ą/g, 'A').replace(/[^a-zA-Z\d\s]/g, '').replace(/\s+/g, '-')
            };

            const categoryId = this.newpost.category.id;
            const title = this.newpost.title;
            const articleHtml = this.newpost.articleHtml;
            const createSnippet = currentSnippet =>{
                if (currentSnippet){
                    if (currentSnippet.length > 200){return currentSnippet.slice(0, 200)}
                    else{return currentSnippet}
                }
                else{return document.querySelector('.article-text').textContent.slice(0, 200);}
            }
            let snippet = createSnippet(this.newpost.snippet);
            const thumbnail = this.newpost.thumbnail;
            const postDay = this.newpost.postDay;
            const postMonth = this.newpost.postMonth;
            const postYear = this.newpost.postYear;
            const slug = urlify(this.newpost.title);


            this.$apollo.mutate({
            mutation: ADD_POST,
            variables: {
            title,
            articleHtml,
            snippet,
            postDay,
            postMonth,
            postYear,
            thumbnail,
            categoryId,
            slug
            }
            })
            .then(()=>{
                this.$emit('deletePost')
                this.newpost = {
                title: '',
                articleHtml: '',
                category: '',
                date: '',
                id: 0,
                thumbnail: '',
                postDay: 0,
                postMonth: 0,
                postYear: 0,
                snippet: ''
                };  
                this.$store.commit('showOk', 'Dodano post!')
                this.$router.push('/admin/dodaj') 
            })
            .catch(()=>{
                this.$store.commit('showError')
            });
        }
    },
    savePost(){
        if(!this.newpost.title || !this.newpost.category || !this.newpost.articleHtml || !this.newpost.thumbnail){
            let emptyFields = '';
            (!this.newpost.title) ? emptyFields += 'tytuł ' : emptyFields += '';
            (!this.newpost.category) ? emptyFields += 'kategorię ' : emptyFields += '';
            (!this.newpost.articleHtml) ? emptyFields += 'treść posta ' : emptyFields += '';
            (!this.newpost.thumbnail) ? emptyFields += 'thumbnail ' : emptyFields += '';

            alert(`Uzupełnij wszystkie pola! Musisz jeszcze dodać ${emptyFields}`)
        }
        else{
            this.getQuillContent();

            const urlify = (str) => {
                return str.replace(/ż/g,'z').replace(/ó/g,'o').replace(/ł/g,'l').replace(/ć/g,'c').replace(/ś/g,'s').replace(/ę/g,'e').replace(/ź/g,'z').replace(/ń/g,'n').replace(/ą/g,'a').replace(/Ć/g, 'C').replace(/Ę/g, 'E').replace(/Ł/g, 'L').replace(/Ń/g, 'N').replace(/Ó/g, 'O').replace(/Ś/g, 'S').replace(/Ż/g, 'Z').replace(/Ź/g, 'Z').replace(/Ą/g, 'A').replace(/[^a-zA-Z\d\s]/g, '').replace(/\s+/g, '-')
            };

            const category = this.newpost.category.id;
            const title = this.newpost.title;
            const articleHtml = this.newpost.articleHtml;
            const createSnippet = currentSnippet =>{
                if (currentSnippet){
                    if (currentSnippet.length > 200){return currentSnippet.slice(0, 200)}
                    else{return currentSnippet}
                }
                else{return document.querySelector('.article-text').textContent.slice(0, 200);}
            }
            let snippet = createSnippet(this.newpost.snippet);
            const thumbnail = this.newpost.thumbnail;
            const postDay = this.newpost.postDay;
            const postMonth = this.newpost.postMonth;
            const postYear = this.newpost.postYear;
            const slug = urlify(this.newpost.title);


            this.$apollo.mutate({
            mutation: SAVE_POST,
            variables: {
            title,
            articleHtml,
            snippet,
            postDay,
            postMonth,
            postYear,
            thumbnail,
            category,
            slug
            }
            })
            .then(()=>{
            this.newpost = {
            title: '',
            articleHtml: '',
            category: '',
            date: '',
            id: 0,
            thumbnail: '',
            postDay: 0,
            postMonth: 0,
            postYear: 0,
            snippet: ''
            };
            this.$store.commit('showOk', 'Zapisano post!')
            window.location.reload(true);
            this.$router.push('/admin/dodaj') 
            })
            .catch(()=>{this.$store.commit('showError')});
        }
    },
    updatePost(){
        if(!this.newpost.title || !this.newpost.category || !this.newpost.articleHtml || !this.newpost.thumbnail){
            let emptyFields = '';
            (!this.newpost.title) ? emptyFields += 'tytuł ' : emptyFields += '';
            (!this.newpost.category) ? emptyFields += 'kategorię ' : emptyFields += '';
            (!this.newpost.articleHtml) ? emptyFields += 'treść posta ' : emptyFields += '';
            (!this.newpost.thumbnail) ? emptyFields += 'thumbnail ' : emptyFields += '';

            alert(`Uzupełnij wszystkie pola! Musisz jeszcze dodać ${emptyFields}`)
        }
        else{
            this.getQuillContent();
            const urlify = (str) => {
                return str.replace(/ż/g,'z').replace(/ó/g,'o').replace(/ł/g,'l').replace(/ć/g,'c').replace(/ś/g,'s').replace(/ę/g,'e').replace(/ź/g,'z').replace(/ń/g,'n').replace(/ą/g,'a').replace(/Ć/g, 'C').replace(/Ę/g, 'E').replace(/Ł/g, 'L').replace(/Ń/g, 'N').replace(/Ó/g, 'O').replace(/Ś/g, 'S').replace(/Ż/g, 'Z').replace(/Ź/g, 'Z').replace(/Ą/g, 'A').replace(/[^a-zA-Z\d\s]/g, '').replace(/\s+/g, '-')
            };
            const categoryId = this.newpost.category.id;
            const title = this.newpost.title;
            const articleHtml = this.newpost.articleHtml;
            const createSnippet = currentSnippet =>{
                if (currentSnippet){
                    if (currentSnippet.length > 200){return currentSnippet.slice(0, 200)}
                    else{return currentSnippet}
                }
                else{return document.querySelector('.article-text').textContent.slice(0, 200);}
            }
            let snippet = createSnippet(this.newpost.snippet);
            const id = this.$route.params.id;
            const thumbnail = this.newpost.thumbnail;
            const postDay = this.newpost.postDay;
            const postMonth = this.newpost.postMonth;
            const postYear = this.newpost.postYear;
            const slug = urlify(this.newpost.title);


            this.$apollo.mutate({
            mutation: UPDATE_POST,
            variables: {
            id,
            title,
            articleHtml,
            snippet,
            postDay,
            postMonth,
            postYear,
            thumbnail,
            categoryId,
            slug
            }
            })
            .then(()=>{
                this.$store.commit('showOk', 'Edytowano post!')  
                window.location.reload(true);   
                this.$router.push('/admin/edytuj')      
            })
            .catch(()=>{
                this.$store.commit('showError')
            });
        }
    },
    onEditorChange({ editor, html, text }) {
        this.newpost.articleHtml = html;
        document.querySelector('.article-text').innerHTML = html;
      } 
  },

  created (){
      this.gettingDate()   
  },
  mounted () {
    this.gettingDate();
    const handle = document.querySelector('#handle');
    const panel = document.querySelector('#panel');
    const body = document.querySelector('.addpost');

    let changeWidth = function(e){
        let mouseX = e.clientX;
        let windowX = window.innerWidth;
        let mouseXPercent = mouseX / windowX * 100;
        let width = mouseXPercent.toString() + "%";
        panel.style.width = width;
    }
    let startResizing = function(){
        body.classList.add("disabledselecting");
        document.addEventListener('mousemove', changeWidth);
    }
    let stopResizing = function(){
        document.removeEventListener('mousemove', changeWidth);
        body.classList.remove("disabledselecting");
    }
    handle.addEventListener('mousedown', startResizing);
    handle.addEventListener('mouseup', stopResizing);
  }
}
</script>

<style>


#toolbar{
margin-top: 10px;
}

.quill-editor{
margin-bottom: 10px;
height: 400px;
background-color: white;
transition: all 300ms ease-in-out;
font-family: Lora !important;
}

.disabledselecting{
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}

.thumbnail-preview{
    height: 100px;
    width: 133.75px;
    border: rgb(197, 197, 197) 1px solid;
    margin-bottom: 10px;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
}


.addpost{
    position: relative;
}

.line{
    width: 220%;
    height: 10px;
    border-bottom: rgb(197, 197, 197) 1px solid;
    margin-bottom: 10px;
    margin-left: -20px;

}

#post-description-input{
    overflow: hidden;
    resize: none;
}

::-webkit-input-placeholder {
  color: rgb(136, 136, 136);
}
::-moz-placeholder {
  color: rgb(136, 136, 136);
}
:-ms-input-placeholder {
  color: rgb(136, 136, 136);
}
:-moz-placeholder {
  color: rgb(136, 136, 136);
}

#date-button{
    float: left;
    clear: both;
}

.date-input{
    width: 30% !important;
    margin-right: 2%;
}

.red-color{
    color: rgb(238, 84, 84);
}

#category-selection{
    background-color: white;
}

.preview{
    height: 100vh;
    width: 35%;
    float: left;
    overflow-y: scroll;
    overflow: -moz-scrollbars-none;
}

.preview::-webkit-scrollbar {
    display: none;
}

.preview::-webkit-scrollbar-track {
    display: none;
}

.preview::-webkit-scrollbar-thumb {
    display: none;
}

.blog-post-preview{
    padding: 10px;
}

#handle{
    height: 100%;
    background-color: #fafafa;
    width: 10px;
    margin-right: auto;
    margin-left: 0;
    float: left;
    cursor: col-resize;
    border-left: rgb(197, 197, 197) 1px solid;
}

#handle:hover{
    border-left: rgb(84, 164, 238) 1px solid;
    -webkit-box-shadow: -33px 0px 23px -32px rgba(85,164,238,0.44);
-moz-box-shadow: -33px 0px 23px -32px rgba(85,164,238,0.44);
box-shadow: -33px 0px 23px -32px rgba(85,164,238,0.44);
}

.text-editor-wrapper{
    position: relative;
    height: 100vh;
    width: auto;
    display: flex;
    justify-content: center;
    overflow: hidden;
}

.text-editor{
    margin-top: 50px;
    margin-left: auto;
    margin-right: auto;
    margin-left: -7px;
    width: 99%;
    height: auto;
    border-radius: 7px;
    font-family: Nunito;
    padding: 15px 10px;
    box-sizing: border-box;
    color: rgb(104, 104, 104);
    overflow-x: hidden;
    overflow-y: scroll;
}

/* .text-editor::-webkit-scrollbar {
    display: none;
}

.text-editor::-webkit-scrollbar-track {
    display: none;
}

.text-editor::-webkit-scrollbar-thumb {
    display: none;
} */

.thumbnail-button{
    margin-bottom: 10px;
    margin-right: 10px;
}

#article-input{
    width: 99.42%;
    height: 300px;
}

.back-button-homepage{
    display: inline-block;
    margin-top: 10px;
    color: rgb(104, 104, 104);
    margin-bottom: 50px;
}

.back-button-homepage:hover{
    color: rgb(84, 164, 238);
}

.addpicture-popup{

    width: 600px;
    background-color: #fafafa;
    position: fixed;
    z-index: 1000000;
    top: 200px;
    left: 50%;
    border-radius: 7px;
    font-family: Nunito;
    padding: 15px 10px;
    box-sizing: border-box;
    color: rgb(104, 104, 104);
    overflow: hidden;
    margin-left: -300px;
    border: rgb(197, 197, 197) 1px solid;
    /* -webkit-box-shadow: 0px 4px 17px -5px rgba(179,179,179,0.48);
    -moz-box-shadow: 0px 4px 17px -5px rgba(179,179,179,0.48);
    box-shadow: 0px 4px 17px -5px rgba(179,179,179,0.48); */
    -webkit-box-shadow: 0px 0px 0px 4000px rgba(0,0,0,0.2);
    -moz-box-shadow: 0px 0px 0px 4000px rgba(0,0,0,0.2);
    box-shadow: 0px 0px 0px 4000px rgba(0,0,0,0.2);
}
/* @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ ARTICLE STYLING @@@@@@@@@@@@@@ */
.blog-article{
max-width: 800px;
margin: 10px auto;
border-radius: 10px;
background-color: white;
padding: 50px 100px 100px;
-webkit-box-shadow: 0px 4px 17px -5px rgba(179,179,179,0.48);
  -moz-box-shadow: 0px 4px 17px -5px rgba(179,179,179,0.48);
  box-shadow: 0px 4px 17px -5px rgba(179,179,179,0.48);
  margin-top: 50px;
}

.article-title{
    width: 100%;
    height: auto;
    /* text-align: center; */
    font-family: Nunito;
    color: #0097ff;
    font-weight: 800;
    font-size: 42px;
    letter-spacing: 2px;
    word-wrap: break-word;
    clear: both;
    margin-top: 50px;
    margin-bottom: 50px;
}

.article-date{
    font-family: Nunito;
    color: rgb(219, 219, 219);
    font-size: 15px;
    font-weight: 800;
    float: left;
}

.error-popup{
    width: 600px;
    background-color: #fafafa;
    position: fixed;
    z-index: 1000000;
    top: 200px;
    left: 50%;
    border-radius: 7px;
    font-family: Nunito;
    padding: 15px 10px;
    box-sizing: border-box;
    color: rgb(238, 84, 84);
    overflow: hidden;
    margin-left: -300px;
    border: rgb(197, 197, 197) 1px solid;
    -webkit-box-shadow: 0px 0px 0px 4000px rgba(0,0,0,0.2);
    -moz-box-shadow: 0px 0px 0px 4000px rgba(0,0,0,0.2);
    box-shadow: 0px 0px 0px 4000px rgba(0,0,0,0.2);
}

.article-text{
    font-family: Lora !important;
    color: black;
    font-size: 1.2em;
    line-height: 1.6em;
}

.article-text > h1 {
    /* font-size: 1.6em;
    font-weight: 800;
    font-family: Nunito; */

    font-size: 1.4em;
    font-weight: bold;
    font-family: Lora;
    color: #333333 ;
    letter-spacing: 1px;
}

.article-text > blockquote:before, .article-text > blockquote:after {
    content: '"';
}

.image-wrapper{
    width: 100%;
    position: relative;
}
.blog-post-image{
    max-width: 100%;
    height: auto;
    display: block;
    margin: 0 auto;
}

.article-text > blockquote {
    font-style: italic;
    margin-left: 0;
    padding-left: 15px;
    border-left: 5px solid #f8b724;
    font-size: 1.1em;
}



.back-button{
    font-family: Nunito;
    color: #f26d5b;
    font-size: 1.2em;
    line-height: 1.7em;
    font-weight: 800;
    cursor: pointer;
}

.back-button:hover{
  color: #492540;
}

.fa-arrow-left{
  margin-right: 5px;
  transform: translateY(0.5px);
}

@media screen and (max-width: 1300px) {

}

@media screen and (max-width: 770px) {
    .blog-article{
        margin: 0px auto;
        border-radius: 0px;
        background-color: white;
        padding: 50px 30px 30px;
        -webkit-box-shadow: none;
          -moz-box-shadow: none;
          box-shadow: none;
        }
   }
</style>
