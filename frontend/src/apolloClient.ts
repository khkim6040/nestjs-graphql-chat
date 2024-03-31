import {
    ApolloClient,
    InMemoryCache,
    NormalizedCacheObject,
    gql,
    Observable,
    ApolloLink,
    split,
} from '@apollo/client'
import {createUploadLink} from 'apollo-upload-client'
import {getMainDefinition} from '@apollo/client/utilities'
import {loadErrorMessages, loadDevMessages} from '@apollo/client/dev'
import {useUserStore} from '../stores/userStore'

async function refreshToken(client: ApolloClient<NormalizedCacheObject>) {
    try {
        const {data} = await client.mutate({
            mutation: gql`
                mutation RefreshToken {
                    refreshToken
                }
            `,
        })
        const newAccessToken = data?.refreshToken
        if (!newAccessToken) {
            throw new Error('New access token not found')
        }
    } catch (error) {
        throw new Error('Error getting new access token')
    }
}