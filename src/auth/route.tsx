import ServerCookie from "next-cookies";
import React, { Component } from "react";
import { AuthToken } from "./token";
import { COOKIES } from "./cookies";

export type AuthProps = {
    auth: AuthToken;
};

export function privateRoute(WrappedComponent: any) {
    return class PrivateRoute extends Component<AuthProps> {
        static async getInitialProps(ctx: any) {
            const token = ServerCookie(ctx)[COOKIES.authToken];
            const auth = new AuthToken(token);
            const initialProps = { auth };
            if (auth.isExpired) {
                ctx.res.writeHead(302, {
                    Location: "/login?redirected=true",
                });
                ctx.res.end();
            }
            if (WrappedComponent.getInitialProps)
                return WrappedComponent.getInitialProps(initialProps);
            return initialProps;
        }

        get auth() {
            return new AuthToken(this.props.auth.token);
        }

        render() {
            return <WrappedComponent {...this.props} auth={this.auth} />;
        }
    };
}
