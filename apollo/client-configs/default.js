import { ApolloLink } from 'apollo-link'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'

export default (ctx) => {
  const httpLink = new HttpLink({ uri: 'https://api.graph.cool/simple/v1/cjda1v5gz2h3m01017z5feykr' })


  // middleware
  const middlewareLink = new ApolloLink((operation, forward) => {
    // let serverToken = null;
    // let storeToken = ctx.store.state.token;

    // if(ctx.req){
    //   if (ctx.req.headers.cookie) {
    //     let cookieToken = ctx.req.headers.cookie.split(";").find(c => c.trim().startsWith("jwt="));
    //     if (cookieToken) {
    //       serverToken = cookieToken.split("=")[1];
    //   }
    // }}else{     
    //   if(!storeToken){
    //     ctx.store.commit('setToken', localStorage.getItem('token'));
    //     storeToken = localStorage.getItem('token');
    //   }
    // };

    let storeToken = ctx.store.state.token;
    let serverToken = storeToken;
    const token = process.server ? serverToken : storeToken

    operation.setContext({
      headers: { authorization: `Bearer ${token}` }
    })
    return forward(operation)
  })
  const link = middlewareLink.concat(httpLink)
  return {
    link,
    cache: new InMemoryCache()
  }
}
