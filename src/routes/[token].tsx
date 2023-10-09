import { RouteDataArgs, useRouteData } from "solid-start";
import { createServerData$ } from "solid-start/server";
import { Home } from "~/routes/index";
// library for verifying jwt
import { KJUR, b64utoutf8 } from "jsrsasign";

export function routeData({ params }: RouteDataArgs) {
  const data = createServerData$(
    async (key) => {
      async function validate(token: string) {
        try {
          let isValid = KJUR.jws.JWS.verifyJWT(
            token,
            import.meta.env.VITE_SECRET,
            { alg: ["HS256"] }
          );
          const header = KJUR.jws.JWS.readSafeJSONString(
            b64utoutf8(token.split(".")[0])
          );
          const payload: any = KJUR.jws.JWS.readSafeJSONString(
            b64utoutf8(token.split(".")[1])
          );
          if (payload) {
            if (payload.message === "private data pls") {
              return isValid;
            }
          }
        } catch (e) {
          return false;
        }
        return false;
      }
      const token = key;
      const valid = await validate(token);
      if (valid) {
        let education = [import.meta.env.VITE_ED.split("*")];
        let projects = [import.meta.env.VITE_PROJ.split("*")];
        return {
          validated: true,
          name: import.meta.env.VITE_NAME,
          phone: import.meta.env.VITE_PHONE,
          email: import.meta.env.VITE_EMAIL,
          address: import.meta.env.VITE_ADDRESS,
          education,
          projects,
        };
      }
      return {
        validated: false,
        name: "Redacted Redacted",
        phone: "Redacted",
        email: "Redacted@Redacted.com",
        address: "Redacted",
        education: ["RedactedRedacted", "RedactedRedacted", "RedactedRedacted"],
        projects: ["RedactedRedacted", "RedactedRedacted", "RedactedRedacted"],
      };
    },
    { key: () => params.token }
  );
  return data();
}

export default function App() {
  const data = useRouteData<typeof routeData>();
  return <Home data={data}></Home>;
}
