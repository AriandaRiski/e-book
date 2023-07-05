import nextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"

export default nextAuth({
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: { label: "Username", type: "text", placeholder: "Input Username" },
                pass: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {

                try {
                    const requestOptions = {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(credentials),
                    };

                    const request = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/auth/login`, requestOptions);
                    const response = await request.json();

                    if (request.ok && response) {
                        return response
                    }

                    return null

                } catch (error) {
                    throw new error(Error)
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user, account, profile, isNewUser }) {
            if(user){
                return{
                    ...token,
                    name: user?.data.username,
                    email: `${user.data.username}@gmail.com`,
                    row: user?.data
                }
            }

            return token
        },
        // async signIn({ user, account, profile, email, credentials }) {
        //     return true
        // },
        // async redirect({ url, baseUrl }) {
        //   return baseUrl
        // },
        async session({ session, user, token }) {
            session.name = token.name;
            session.email = token.email;
            session.tokenAccess = token.row.token;
            session.row = token.session;
            
            return session

        },
        
    },
    session: {
        strategy: 'jwt',
        maxAge: 60*300
    }
});