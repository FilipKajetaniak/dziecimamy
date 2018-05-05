<template>
  <footer>
    <div class="container transparent">
      <div class="wrapper-narrow">
        <socialwidgets />
        <div class="contact">
          <div class="contact-email">
            <a href="mailto:kontakt@dziecimamy.com">kontakt@dziecimamy.com</a>
            </div>
        </div>
        <div class="copyrights">
          Design, illustrations & code - Filip Kajetaniak
        </div>
        <div class="createdby">
          <i>Copyright © {{currentYear}} DZIECIMAMY</i>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import socialwidgets from '@/components/socialwidgets.vue'
export default {
  data () {
    return {
      currentYear: 0
    }
  },
  components: {
    socialwidgets
  },
  mounted(){
    this.currentYear = new Date().getFullYear()
  }
}
</script>

<style>
footer{
  margin-top: 50px;
  width: 100%;
  background-color: #0097ff;
  background: -webkit-linear-gradient(to right, #0097ff 0%, rgb(111, 193, 255) 100%);
  background: -moz-linear-gradient(to right, #0097ff 0%, rgb(111, 193, 255) 100%);
  background: linear-gradient(to right, #0097ff 0%, rgb(111, 193, 255) 100%);
  padding-top: 10px;
}


.transparent{
  background: transparent !important;
}

.footer{
  background-color: transparent !important;
  color: white !important;
}


.contact{
  font-family: Nunito;
  color: white;
  font-size: 1.2em;
}

.contact-email{
  font-size: 1.5em;
  text-align: center;
}

.copyrights{
  color: white;
  font-family: Nunito;
  text-align: center;
  margin-top: 10px;
  opacity: 0.7;
}

.createdby{
  color: white;
  font-family: Nunito;
  text-align: center;
  margin-bottom: 20px;
  opacity: 0.5;
}
@media screen and (max-width: 770px){
  footer{
    margin-top: 0;
  }
}

@media screen and (max-width: 430px){
  .contact{
    font-size: 0.9em;
  }

  .copyrights{
    font-size: 0.8em;
  }

  .createdby{
      font-size: 0.8em;
  }
}
</style>
