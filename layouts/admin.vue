<template>
  <div>
    <optionsbar />
    <nuxt/>
  </div>
</template>

<script>

import optionsbar from '@/components/optionsbar.vue'
export default {
  middleware: 'isLoggedIn',
  data () {
    return {
    }
  },
  components: {
    optionsbar
  }
}
</script>
<style>
*{
  box-sizing: border-box;
  font-family: Nunito;
}

.admin-options{
position: absolute;
margin-top: 100px;
width: 600px;
left: 50%;
margin-left: -300px;
}

.admin-option{
  margin-bottom: 60px;
  border: rgb(197, 197, 197) 1px solid; 
  cursor: pointer;
  background-color: white;
}

.admin-option:hover{
  border: rgb(84, 164, 238) 1px solid; 
-webkit-box-shadow: 0px 0px 12px 2px rgba(85,164,238,0.24);
-moz-box-shadow: 0px 0px 12px 2px rgba(85,164,238,0.24);
box-shadow: 0px 0px 12px 2px rgba(85,164,238,0.24);
}

.option-name{
 height: 60px;
 line-height: 60px;
 font-size: 30px;
 padding-left: 10px;
 color: rgb(84, 164, 238);
}

.option-description{
 height: 60px;
 line-height: 60px;
 padding-left: 10px;
 color: rgb(104, 104, 104);
}

.back-to-admin{
  text-align: center;
  background-color: rgb(104, 182, 255);
  border: rgb(84, 164, 238) 1px solid;
  color: white;
  padding: 10px;
  border-radius: 4px;
}

.blue-border{
  border: none;
}

.blue-border:hover{
border: none; 
-webkit-box-shadow: 0px 0px 12px 2px rgba(85,164,238,0.24);
-moz-box-shadow: 0px 0px 12px 2px rgba(85,164,238,0.24);
box-shadow: 0px 0px 12px 2px rgba(85,164,238,0.24);
opacity: 0.9;
}
.log-out{
  text-align: center;
  background-color: rgb(255, 104, 104);
  border: rgb(238, 84, 84) 1px solid;
  border-radius: 4px;
  color: white;
  padding: 10px;
}

.red-border{
  border: none;
}

.red-border:hover{
  border: none; 
-webkit-box-shadow: 0px 0px 12px 2px rgba(238, 84, 84, 0.39);
-moz-box-shadow: 0px 0px 12px 2px rgba(238, 84, 84, 0.39);
box-shadow: 0px 0px 12px 2px rgba(238, 84, 84, 0.39);
opacity: 0.9;
}

.outside{
  padding-left: 0px !important;
  margin-bottom: 20px;
  margin-top: -30px;
}

.count{
  color: rgb(197, 197, 197);
}

.green-button{
    background-color: rgb(0, 201, 43) !important;
    border: rgb(0, 168, 36) 1px solid !important;

}

.option-button{
    background-color: rgb(104, 182, 255);
    border: rgb(84, 164, 238) 1px solid;
    border-radius: 4px;
    color: white;
    height: auto;
    width: auto;
    cursor: pointer;
    font-family: Nunito;
    font-size: 1em;
    line-height: 1em;
    padding: 5px 10px;
    opacity: 1;
    outline: none;
}

.option-button:hover{
    opacity: 0.8;
}

.cancel{
    background-color: rgb(255, 104, 104);
    border: rgb(238, 84, 84) 1px solid;
}

.input{
    width: 100%;
    resize: none;
    margin-bottom: 10px;
    border: rgb(197, 197, 197) 1px solid;
    transition: all 50ms ease-in-out;
}

.input:focus{
    outline: none;
    border: rgb(84, 164, 238) 1px solid;
    -webkit-box-shadow: 0px 0px 2px 1px rgba(85,164,238,0.44);
    -moz-box-shadow: 0px 0px 2px 1px rgba(85,164,238,0.44);
    box-shadow: 0px 0px 2px 1px rgba(85,164,238,0.44);
}
.saved-post{
  width: 100%;
  border: rgb(197, 197, 197) 1px solid;
  margin-bottom: 20px;
  background-color: white;
 color: rgb(104, 104, 104);
}

.saved-post-title{
  width: 100%;
  height: 50px;
  line-height: 50px;
  background-color: white;
  padding-left: 10px;
  color: black;
}

.saved-post:last-of-type{
  margin-bottom: 50px;
}

.additional-info{
  background-color: white;
  padding: 10px;
}

.saved-post-snippet{
  margin-bottom: 20px;
}
.content-editor{
    height: 200px;
    margin-bottom: 10px;
}
</style>