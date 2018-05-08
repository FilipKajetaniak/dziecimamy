<template>
  <div :class="{'small-newsletter': true, 'small-newsletter-visible': visible,}">
    <form action="" class="small-newsletter-form">
      <h2>{{message}}</h2>
      <input class="small-newsletter-input" type="text" placeholder="Jak masz na imie?">
      <input class="small-newsletter-input" type="email" placeholder="Jaki masz e-mail?">
      <button class="cta-button small-newsletter-button" type="submit">Subskrybuj</button>
    </form>
  </div>
</template>
<script>
export default {
  props: ['message', 'visible']
}
</script>
<style>
.small-newsletter{
  width: 100%;
  height: auto;
  margin-bottom: 0px;
  padding: 25px 20px;
  box-sizing: border-box;
  border: 2px solid #f8b724;
  border-radius: 15px;
  transform: scale(0.7);
  opacity: 0;
  height: 0;
  transition: 500ms all cubic-bezier(.65,1.55,.35,1);
}
.small-newsletter-visible{
  transform: scale(1);
  margin-bottom: 40px;
  opacity: 1;
  height: auto;
}
.small-newsletter-form{
  font-family: Nunito;
  color: #f8b724;
  text-align: center;
}
.small-newsletter-form > h2{
  margin: 0;
  letter-spacing: 0.5px;
  margin-bottom: 25px;
}


.small-newsletter-input{
  width: 200px;
  margin-bottom: 10px;
  margin-right: 10px;
  margin-left: 10px;
  border: none;
  border-radius: 15px;
  font-size: 1.2em;
  color: #f8b724;
  background-color: rgba(248,183,36,0.1);
  padding: 10px 10px;
  transition: all cubic-bezier(.12,1,.76,.95) 500ms;
  box-sizing: border-box;
}
.small-newsletter-input:focus{
  outline: none;
  background-color: rgba(248,183,36,0.02);
}

.small-newsletter-input::-webkit-input-placeholder {
  color: rgba(248,183,36,0.7);
  font-family: Nunito;
  text-decoration: none;
}
.small-newsletter-input::-moz-placeholder {
  color: rgba(248,183,36,0.7);
  font-family: Nunito;
  text-decoration: none;
}
.small-newsletter-input:-ms-input-placeholder {
  color: rgba(248,183,36,0.7);
  font-family: Nunito;
  text-decoration: none;
}
.small-newsletter-input:-moz-placeholder {
  color: rgba(248,183,36,0.7);
  font-family: Nunito;
  text-decoration: none;
}

.small-newsletter-button{
  background-color: #f8b724;
  background: -webkit-linear-gradient(left, #f8b724 0%, #f8b724 100%);
  background: -moz-linear-gradient(left, #f8b724 0%, #f8b724 100%);
  background: linear-gradient(left, #f8b724 0%, #f8b724 100%);
  border-radius: 15px;
  transition: all 150ms ease-in-out;
  margin-top: 10px;
  margin-right: 10px;
  margin-left: 10px;
  font-size: 1em;
  -webkit-box-shadow: none;
  -moz-box-shadow: none;
  box-shadow: none;
}

.small-newsletter-button:hover{
  transform: translateY(0px);
  -webkit-box-shadow: none;
  -moz-box-shadow: none;
  box-shadow: none;
}
@media screen and (max-width: 805px) {
  .small-newsletter-input{
    font-size: 1em;
    width: 160px;
  }
  .small-newsletter-button{
    font-size: 0.8em;
  }
}
@media screen and (max-width: 525px) {
  .small-newsletter-form > h2{
    font-size: 1.2em;
  }
  .small-newsletter-input{
    font-size: 1em;
    width: 94%;
    box-sizing: border-box;
  }
}
@media screen and (max-width: 380px) {
  .small-newsletter-input{
    font-size: 1em;
    width: 90%;
  }
}
</style>


