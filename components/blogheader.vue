<template>
<div>
  <menubar />
  <div class="container grey">
    <div class="wrapper">
      <div class="header">
        <div class="header-image">
          <img src="../assets/small-image.png" alt="dziecimamy" />
        </div>
        <div class="header-text">
          <div class="header-title">dziecimamy</div>
          <div class="header-description"><h3>Z wychowaniem dziecka jest jak z pomidorem.</h3>
          <span class="description-bottom-part">Nie wystarczy wiedzieć, że to owoc, trzeba umieć tę wiedzę zastosować w życiu i nie dodać pomidora do sałatki owocowej.</span>

          </div>
          <div class="header-button">
            <button class="cta-button" v-scroll-to="{ el: '.container', offset: 670 }">Blog</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
import menubar from '@/components/menubar.vue'
export default {
  components: {
    menubar
  },
  props: ['description'],
  data () {
    return{
    }
  },
  methods: {

  }
}
</script>

<style>
.header{
  width: 100%;
  height: auto;
  font-family: Nunito;
  margin-bottom: 100px;
}

.header-text{
  text-align: center;
}

.header-description > h3 {
  font-size: 1.3em;
  margin: 10px;
  color: rgb(111, 193, 255);
}
.header-title{
  font-size: 4em;
  letter-spacing: 2px;
  font-weight: 700;
  color: #0097ff;
  text-align: center;
}

.header-description{
  font-size: 1.26em;
  letter-spacing: 0.5px;
  text-align: center;
  font-weight: 300;
  width: 80%;
  max-width: 600px;
  margin: 0 auto;
  margin-top: -5px;
  color: rgb(88, 183, 255);
  z-index: 7;
}

.header-image{
  height: auto;
  max-height: 400px;
  width: 100%;
  max-width: 670px;
  margin: 0 auto;
  margin-top: 75px;
  transform: translateX(7px);
}
.header-image >img{
  width: 100%;
  height: auto;
}

.description-bottom-part{
  display: block;
  width: 100% !important;
  max-width: 590px !important;
  margin: 0 auto;
}


@media screen and (max-width: 1000px) {

}
@media screen and (max-width: 770px) {
  .header-title{
    font-size: 3em;
  }
  /* .header-image{
    margin-top: 10px;
  } */
  .header-description{
    font-size: 1.1em;
    width: 100%;
  }
  .cta-button{
  font-size: 1em;
  }
}
@media screen and (max-width: 315px) {
  .header-title{
    font-size: 2em;
  }
}
</style>