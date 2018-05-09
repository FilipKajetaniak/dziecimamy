import { ApolloLink } from 'apollo-link'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'

export default (ctx) => {
  const httpLink = new HttpLink({ uri: 'XXXXX' })


  // middleware
  const middlewareLink = new ApolloLink((operation, forward) => {

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
