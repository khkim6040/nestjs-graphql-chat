import {gql} from '@apollo/client'

export const REGISTER_USER = gql`
    mutation RegisterUser(
        $email: String!
        $password: String!
        $confirmPassword: String!
        $fullname: String!
    ) {
        register(
            registerInput: {
                email: $email
                password: $password
                confirmPassword: $confirmPassword
                fullname: $fullname
            }
        ) {
            user {
                email
                id
                fullname
                avatarUrl
            }
        }
    }
`
