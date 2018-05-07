<template>
<div class="newsletter-div">
    <div class="container transparent">
        <div class="wrapper-narrow">
            <div class="newsletter">
              <div class="newsletter-form">
                <span class="newsletter-description">Zapisz się na bezpłatny newsletter i pobierz listę 12 błędów rodzicielskich. Sprawdź ile z nich popełniasz!</span>
                <form action="https://landing.mailerlite.com/webforms/submit/k6d4f5" data-id="861094" data-code="k6d4f5" method="POST" target="_blank">
                    <input type="text" name="fields[name]" value="" autocomplete="name" x-autocompletetype="name" spellcheck="false" autocapitalize="off" autocorrect="off" class="newsletter-input" placeholder="Jak masz na imie?">
                    <input type="email" name="fields[email]" value="" autocomplete="email" x-autocompletetype="email" spellcheck="false" autocapitalize="off" autocorrect="off" class="newsletter-input" placeholder="Jaki masz e-mail?">
                    <button type="submit" class="cta-button newsletter-button">Subskrybuj</button>
                </form>
              </div>
             </div>
        </div>
    </div>
</div>  
</template>

<script>
export default {
  data () {
    return {

    }
  },
  mounted(){

  }
}
</script>

<style>
.transparent{
  background: transparent !important;
}

.newsletter-grid{
    width: 100%;
    padding-top: 30px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 20px; 
    /* background-image: url('../assets/koala.png'); */
    background-size: 500px;
    background-position: left bottom;
    background-repeat: no-repeat;
}

.newsletter-form{
  width: 100%;
  max-width: 700px;
  margin: 50px auto;
  padding-right: 13.5px;
  box-sizing: border-box;
}

.newsletter-div{
  width: 100%;
  background-color: #0097ff;
  background: -webkit-linear-gradient(to left, #0097ff 0%, rgb(111, 193, 255) 100%);
  background: -moz-linear-gradient(to left, #0097ff 0%, rgb(111, 193, 255) 100%);
  background: linear-gradient(to left, #0097ff 0%, rgb(111, 193, 255) 100%);
}
.newsletter{
  width: 100%;
}
.newsletter-input{
  width: 47%;
  margin-bottom: 30px;
  /* margin-left: 3%; */
  border: none;
  border-radius: 7px;
  font-size: 1.5em;
  color: white;
  background-color: rgba(255,255,255,0.2);
  padding: 10px 10px;
  transition: all cubic-bezier(.12,1,.76,.95) 500ms;
  box-sizing: border-box;
}
.newsletter-input:last-of-type{
  margin-left: 6%;
}
.newsletter-form > form{
  text-align: right;
}

.newsletter-header{ 
  font-size: 3em;
  margin-bottom: 20px;
  display: inline-block;
  letter-spacing: 1.5px;
  color: white;
  font-family: Nunito;
  font-weight: 800;
}

.newsletter-description{
  font-size: 2em;
  letter-spacing: 0.5px;
  color: white;
  font-family: Nunito;
  /* font-weight: 800; */
  font-weight: 300;
  margin-bottom: 30px;
  display: inline-block;
}

.newsletter-input:focus{
  outline: none;
  background-color: rgba(255,255,255,0.4);
}

.newsletter-input::-webkit-input-placeholder {
  color: rgba(255,255,255,0.6);
  font-family: Nunito;
  text-decoration: none;
}
.newsletter-input::-moz-placeholder {
  color: rgba(255,255,255,0.6);
  font-family: Nunito;
  text-decoration: none;
}
.newsletter-input:-ms-input-placeholder {
  color: rgba(255,255,255,0.6);
  font-family: Nunito;
  text-decoration: none;
}
.newsletter-input:-moz-placeholder {
  color: rgba(255,255,255,0.6);
  font-family: Nunito;
  text-decoration: none;
}

.newsletter-button{
  background-color: #f8b724;
  background: -webkit-linear-gradient(left, #f8b724 0%, #f8b724 100%);
  background: -moz-linear-gradient(left, #f8b724 0%, #f8b724 100%);
  background: linear-gradient(left, #f8b724 0%, #f8b724 100%);
  border-radius: 50px;
  transition: all 150ms ease-in-out;
  margin-top: 10px;
  -webkit-box-shadow: 3px 3px 4px -1px #005fdb77;
  -moz-box-shadow: 3px 3px 4px -1px #005fdb77;
  box-shadow: 3px 3px 4px -1px #005fdb77;
}

.newsletter-button:hover{
  transform: translateY(-3px);
  -webkit-box-shadow: 5px 6px 9px -1px #005fdb77;
  -moz-box-shadow: 5px 6px 9px -1px #005fdb77;
  box-shadow: 5px 6px 9px -1px #005fdb77;
}


@media screen and (max-width: 770px) {
.newsletter-input{
  width: 100%;
  margin-bottom: 30px;
  margin-left: 1%;
  border: none;
  border-radius: 7px;
  font-size: 1.5em;
  color: white;
  background-color: rgba(255,255,255,0.2);
  padding: 10px 10px;
  transition: all cubic-bezier(.12,1,.76,.95) 500ms;
  box-sizing: border-box;
}
.newsletter-input:last-of-type{
  margin-left: 1%;
}
.newsletter-form > form{
  text-align: center;
}

}

</style>