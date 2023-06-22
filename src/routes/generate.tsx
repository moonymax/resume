import { createSignal } from "solid-js";
import { SignJWT } from "jose";
import { KJUR } from "jsrsasign";

async function create(secret: string) {
  // Header
  var oHeader = { alg: "HS256", typ: "JWT" };
  // Payload
  var tNow = KJUR.jws.IntDate.get("now");
  var tEnd = KJUR.jws.IntDate.get("now + 1month");
  var oPayload = {
    ngf: tNow,
    iat: tNow,
    exp: tEnd,
    message: "private data pls",
  };
  var sHeader = JSON.stringify(oHeader);
  var sPayload = JSON.stringify(oPayload);
  var sJWT = KJUR.jws.JWS.sign("HS256", sHeader, sPayload, secret);
  return sJWT;
}

export default function Generate() {
  let secretref: any;
  let [token, setToken] = createSignal("");

  return (
    <div class="bg-[#323b4c] text-white h-screen flex flex-col gap-2 justify-center items-center">
      <input ref={secretref} type="text" class="rounded p-2 text-black" />
      <button
        class="rounded bg-slate-900 p-2 max-w-min"
        onclick={async () => {
          let secret = secretref.value;

          //also save the secret in localstorage maybe
          setToken(await create(secret));
        }}
      >
        Generate
      </button>
      <div
        class="rounded-md p-3 bg-slate-950 break-all max-w-sm cursor-pointer"
        onclick={(e) => {
          //get the text from this element
          const value = e.target.textContent || "";
          //write the text into the clipborad
          navigator.clipboard
            .writeText(value)
            .then(() => {
              console.log("Text copied to clipboard");
            })
            .catch((err) => {
              console.error("Could not copy text: ", err);
            });
        }}
      >
        {import.meta.env.VITE_DOMAIN + "/" + token()}
      </div>
    </div>
  );
}
