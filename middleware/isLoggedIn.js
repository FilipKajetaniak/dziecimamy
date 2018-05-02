export default function(context){
    if(process.server){
        if (context.req.headers.cookie) {
            let cookieToken = context.req.headers.cookie.split(";").find(c => c.trim().startsWith("jwt="));
            if (cookieToken) {
              let serverToken = cookieToken.split("=")[1];
              context.store.commit('setToken', serverToken)
          }
        }
    } else {
        if(!context.store.getters.getToken){
            context.store.commit('setToken', localStorage.getItem('token'))
        }
      }      
    if(!context.store.getters.getToken){
        context.redirect('/admin/zaloguj')
    }
}