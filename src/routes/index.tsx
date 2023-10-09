import { A, RouteDataArgs, useRouteData } from "solid-start";
import { For, JSX, Show, createSignal, onMount } from "solid-js";
import { createServerData$ } from "solid-start/server";
import { createSign } from "crypto";

function TechTag(props: { children: any }) {
  return (
    <div class="rounded bg-slate-200 p-1 h-6 flex justify-center">
      {props.children}
    </div>
  );
}
function ParallaxImage(props: {
  url: string;
  height?: number;
  width?: number;
}) {
  //change the css styling to be reusable
  let style =
    "transition-property: transform; transition-timing-function: ease-out; transition-duration: 150ms;";
  if (props.height) {
    style += "height: " + props.height + "px;";
  }
  if (props.width) {
    style += "width: " + props.width + "px;";
  }
  return (
    <div
      class="wrapper flex items-center justify-center mx-auto"
      style="transform-style: preserver-3d; perspective: 800px;"
    >
      <img
        src={props.url}
        style={style}
        class="rounded-xl z-10 shadow-[0_25px_50px_-12px_rgb(0_0_0_/_0.5)] max-w-min img"
        alt=""
      />
    </div>
  );
}

type productprops = {
  title: string;
  body: string;
  children: JSX.Element | Array<JSX.Element>;
};
function product(props: productprops) {
  return (
    <>
      <h2 class="font-bold w-full">{props.title}</h2>
      <br />
      <div class="w-full h-[2px] bg-slate-600 rounded-3xl mb-8 mt-1"></div>
      <div class="flex flex-col">
        <div class="max-w-2xl mr-auto">{props.body}</div>
        <br />
        {Array.isArray(props.children)
          ? props.children.map((item) => item)
          : props.children}
      </div>
      <br />
    </>
  );
}
export default function App() {
  return (
    <Home
      data={{
        validated: false,
        name: "Redacted Redacted",
        phone: "Redacted",
        email: "Redacted@Redacted.com",
        address: "Redacted",
        education: ["RedactedRedacted", "RedactedRedacted", "RedactedRedacted"],
        projects: ["RedactedRedacted", "RedactedRedacted", "RedactedRedacted"],
      }}
    ></Home>
  );
}
export function Home(props: any) {
  const data = props.data;
  let validated = false;
  if (data) {
    validated = data.validated || false;
  }

  let [showSideBar, setShowSideBar] = createSignal(false);
  let [showVfxReport, setShowVfxReport] = createSignal(false);
  let [german, setGerman] = createSignal(false);
  const rotationAmount = 12;
  //these html elements detect where the mouse cursor is
  onMount(() => {
    //get position with event listener
    window.addEventListener("mousemove", (event: MouseEvent) => {
      //get the location of the cursor
      let x = event.clientX;
      let y = event.clientY;
      //normalize and offset the position by half
      x = x / window.innerWidth;
      y = (window.innerHeight - y) / window.innerHeight;

      let rotatey = rotationAmount * x - 0.5 * rotationAmount + "deg";
      let rotatex = rotationAmount * y - 0.5 * rotationAmount + "deg";
      //change the css of the .img element to rotate to the correct thing
      let images = document.getElementsByClassName(
        "img"
      ) as HTMLCollectionOf<HTMLElement>;
      for (let i = 0; i < images.length; i++) {
        const image = images[i];
        image.style.transform =
          "rotateX(" + rotatex + ") rotateY(" + rotatey + ")";
      }
    });

    /*
        let iframes = Array.from(document.getElementsByTagName("iframe"));
        setTimeout(() => {
          iframes.forEach((iframe) => {
            iframe.style.height =
              iframe.contentWindow?.document.body.scrollHeight + "px";
          });
        }, 1000);
        */
  });

  return (
    <main
      class={
        "grid grid-flow-col text-sm dark:text-white min-h-max w-full relative"
      }
    >
      <button
        class="rounded p-2 fixed top-0 right-0 m-4 border border-blue-950 active:bg-blue-950 active:text-white z-50"
        onClick={() => {
          setGerman(!german());
        }}
      >
        <Show when={!german()} fallback={"en"}>
          de
        </Show>
      </button>
      <div class={"dark:bg-slate-900 p-16 lg:pl-52 lg:pr-52 max-w-[100%]"}>
        <div>
          <h1
            class={"text-3xl pb-4 font-semibold" + (validated ? "" : " blur")}
          >
            {data?.name}
          </h1>
          <div class={" box-border z-20 p-3 overflow-auto transition-all"}>
            <h2 class="p-4 text-xl font-semibold">Personal Info</h2>
            <hr />
            <div class={validated ? "" : " blur"}>
              Phone: {data?.phone}
              <br />
              Email: {data?.email}
              <br />
              Address: {data?.address}
              <br />
            </div>
            <h2 class="p-4 text-xl pt-6 font-semibold">Education</h2>
            <hr />
            <div class={validated ? "" : " blur"}>
              <For each={data?.education}>
                {(item) => {
                  return (
                    <>
                      {item}
                      <br />
                    </>
                  );
                }}
              </For>
            </div>
            <h2 class="p-4 text-xl pt-6 font-semibold">Projects Timeline</h2>
            <hr />
            <div class={validated ? "" : " blur"}>
              <For each={data?.projects}>
                {(item) => {
                  return (
                    <>
                      {item}
                      <br />
                    </>
                  );
                }}
              </For>
            </div>

            <Show
              when={!german()}
              fallback={
                <h2 class="p-4 text-xl pt-6 font-semibold">{"Sprachen"}</h2>
              }
            >
              <h2 class="p-4 text-xl pt-6 font-semibold">{"Languages"}</h2>
            </Show>
            <hr />
            <div>
              <Show
                when={!german()}
                fallback={"Bilingual Englisch und Deutsch"}
              >
                {"Bilingual English and German"}
              </Show>
            </div>
            <div>
              <Show
                when={!german()}
                fallback={
                  <h2 class="p-4 text-xl pt-6 font-semibold">
                    {"Fähigkeiten"}
                  </h2>
                }
              >
                <h2 class="p-4 text-xl pt-6 font-semibold">{"Skills"}</h2>
              </Show>
              <hr />
              <Show
                when={!german()}
                fallback={
                  <div>
                    {
                      "Programmier Sprachen: Javascript/Typescript, Python, Java, GDScript (Gamedev)"
                    }
                    <br />
                    <br />
                    {
                      "Programmier Sprachen (erste erfahrungen): Rust, Julia, Elm, C, C++"
                    }
                    <br />
                    <br />
                    {
                      "Programmier Bereiche: Frontend Entwicklung, Backend Entwicklung, Applied Cryptography"
                    }
                    <br />
                    {
                      "Game Entwicklung, Android Entwicklung (Beginner), Daten Analyse (Anfänger)"
                    }
                    <br />
                    <br />
                    {
                      "Frameworks/Technologien/Tools: React/Next.js, Svelte, SolidJS/SolidStart, Supabase, Django, NodeJS, Docker, Postgres, MySQL, Sqlite, Godot"
                    }
                  </div>
                }
              >
                <div>
                  {
                    "Programming Languages: Javascript/Typescript, Python, Java, GDScript (Gamedev)"
                  }
                  <br />
                  <br />
                  {
                    "Programming Languages (base experience): Rust, Julia, Elm, C, C++"
                  }
                  <br />
                  <br />
                  {
                    "Programming Domains: Frontend development, Backend development, Applied Cryptography"
                  }
                  <br />
                  {
                    "Game Development, Android Development (Beginner), Data Analytics (Beginner)"
                  }
                  <br />
                  <br />
                  {
                    "Frameworks/Technologies/Tools: React/Next.js, Svelte, SolidJS/SolidStart, Supabase, Django, NodeJS, Docker, Postgres, MySQL, Sqlite, Godot"
                  }
                </div>
              </Show>
            </div>
          </div>
        </div>

        <div>
          <Show
            when={!german()}
            fallback={<h1 class="p-6 text-3xl pt-8 font-semibold">Projekte</h1>}
          >
            <h1 class="p-6 text-3xl pt-8 font-semibold">Projects</h1>
          </Show>
          <hr />
          <div class="lg:grid lg:grid-cols-2 gap-5">
            <div class=" flex flex-col gap-2 p-4">
              <Show
                when={!german()}
                fallback={
                  <div>
                    <a href="https://xympf.net" class="text-blue-600">
                      xympf.net
                    </a>{" "}
                    ist ein Echtzeit-Organizer für mehrere Nutzer. Die Anwendung
                    wurde mit <i>MySQL</i>, <i>Redis</i>, <i>Django</i> und{" "}
                    <i>React</i> entwickelt und mit <i>tailwindcss</i> gestylt.
                    Das Deployment erfolgt mit gunicorn und daphne, und wird
                    über nginx gehostet.{" "}
                  </div>
                }
              >
                <div>
                  <a href="https://xympf.net" class="text-blue-600">
                    xympf.net
                  </a>{" "}
                  is a realtime collaborative task organizer built with MySQL,
                  Redis, Django and React, styled with tailwindcss, deployed
                  with gunicorn and daphne, served/exposed with nginx.
                </div>
              </Show>
              <div class="flex flex-row flex-wrap gap-1 ">
                <TechTag>
                  <a
                    title="Facebook, Public domain, via Wikimedia Commons"
                    href="https://commons.wikimedia.org/wiki/File:React-icon.svg"
                  >
                    <img
                      width="18"
                      alt="React-icon"
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/32px-React-icon.svg.png"
                    />
                  </a>
                </TechTag>
                <TechTag>
                  <a
                    title="Tailwind CSS, CC BY-SA 4.0 &lt;https://creativecommons.org/licenses/by-sa/4.0&gt;, via Wikimedia Commons"
                    href="https://commons.wikimedia.org/wiki/File:Tailwind_CSS_Logo.svg"
                  >
                    <img
                      width="23"
                      alt="Tailwind CSS Logo"
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Tailwind_CSS_Logo.svg/32px-Tailwind_CSS_Logo.svg.png"
                    />
                  </a>
                </TechTag>
                <a href="http://www.djangoproject.com/">
                  <img
                    class="h-6"
                    src="https://www.djangoproject.com/m/img/badges/djangomade124x25.gif"
                    alt="Made with Django."
                    title="Made with Django."
                  />
                </a>
                <TechTag>
                  <a
                    title="™/®Oracle Corporation, Public domain, via Wikimedia Commons"
                    href="https://commons.wikimedia.org/wiki/File:MySQL_textlogo.svg"
                  >
                    <img
                      class="h-4"
                      alt="MySQL textlogo"
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/MySQL_textlogo.svg/256px-MySQL_textlogo.svg.png"
                    />
                  </a>
                </TechTag>
                <TechTag>
                  <a
                    title="Liran.amir, CC BY-SA 4.0 &lt;https://creativecommons.org/licenses/by-sa/4.0&gt;, via Wikimedia Commons"
                    href="https://commons.wikimedia.org/wiki/File:Logo-redis.svg"
                  >
                    <img
                      class="h-4"
                      alt="Logo-redis"
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Logo-redis.svg/512px-Logo-redis.svg.png"
                    />
                  </a>
                </TechTag>
                <TechTag>
                  <a
                    title="Benoit Chesneau?, Xavier Grangier, CC BY 3.0 &lt;https://creativecommons.org/licenses/by/3.0&gt;, via Wikimedia Commons"
                    href="https://commons.wikimedia.org/wiki/File:Gunicorn_logo_2010.svg"
                  >
                    <img
                      class="h-4"
                      alt="Gunicorn logo 2010"
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Gunicorn_logo_2010.svg/256px-Gunicorn_logo_2010.svg.png"
                    />
                  </a>
                </TechTag>
                <TechTag>
                  <a
                    title="Same author as NginxLogo.gif, Public domain, via Wikimedia Commons"
                    href="https://commons.wikimedia.org/wiki/File:Nginx_logo.svg"
                  >
                    <img
                      class="h-4"
                      alt="Nginx logo"
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Nginx_logo.svg/256px-Nginx_logo.svg.png"
                    />
                  </a>
                </TechTag>
              </div>
              <details class="flex flex-col gap-32">
                <summary class="cursor-pointer rounded p-2 text-white bg-[#323b4c] w-fit">
                  More
                </summary>
                <div>
                  <div class=" w-full">
                    <ParallaxImage url="xympf.net.webp"></ParallaxImage>
                  </div>
                </div>
              </details>
            </div>
            <div class=" flex flex-col gap-2 p-4">
              <Show
                when={!german()}
                fallback={
                  <div>
                    <a
                      href="https://github.com/moonymax/Pong"
                      class="text-blue-600"
                    >
                      Pong
                    </a>{" "}
                    ist ein Discord-Bot, der die OpenAI-API für das Chatten und
                    die Ausführung von Befehlen mit natürlicher Sprache
                    verwendet.{" "}
                  </div>
                }
              >
                <div>
                  <a
                    href="https://github.com/moonymax/Pong"
                    class="text-blue-600"
                  >
                    Pong
                  </a>{" "}
                  is a discord bot which uses Openai's api/(function calling)
                  for chatting and command execution with natural language.{" "}
                </div>
              </Show>
              <div class="flex flex-row gap-1">
                <TechTag>
                  <a
                    title="Discord.py"
                    href="https://discordpy.readthedocs.io/en/stable/index.html"
                  >
                    <img
                      class="h-4"
                      alt="Tailwind CSS Logo"
                      src="https://discordpy.readthedocs.io/en/stable/_static/discord_py_logo.ico"
                    />
                  </a>
                </TechTag>
                <TechTag>
                  <a
                    title="Original: OpenAI Vector:  Zhing Za, Public domain, via Wikimedia Commons"
                    href="https://commons.wikimedia.org/wiki/File:ChatGPT_logo.svg"
                  >
                    <img
                      class="h-4 rounded"
                      alt="ChatGPT logo"
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/ChatGPT_logo.svg/32px-ChatGPT_logo.svg.png"
                    />
                  </a>
                </TechTag>
              </div>
              <details class="flex flex-col">
                <summary class="cursor-pointer rounded p-2 text-white bg-[#323b4c] w-fit">
                  More
                </summary>
                <iframe
                  src="https://moonymax.github.io/Pong"
                  class="min-h-screen w-full p-3"
                ></iframe>
              </details>
            </div>
            <div class="flex flex-col gap-2 p-4">
              <Show
                when={!german()}
                fallback={
                  <div>
                    <a
                      href="https://github.com/moonymax/pyhook"
                      class="text-blue-600"
                    >
                      Pyhook
                    </a>{" "}
                    ermöglicht das Schreiben von Minecraft-Server-Plugins mit
                    Python anstelle von Java basierend auf Py4J.
                  </div>
                }
              >
                <div>
                  <a
                    href="https://github.com/moonymax/pyhook"
                    class="text-blue-600"
                  >
                    Pyhook
                  </a>{" "}
                  allows minecraft server plugins to be written with python
                  instead of Java and is based on Py4J.
                </div>
              </Show>
              <details class="flex flex-col">
                <summary class="cursor-pointer rounded p-2 text-white bg-[#323b4c] w-fit">
                  More
                </summary>
                <iframe
                  src="https://moonymax.github.io/pyhook"
                  class="min-h-screen w-full p-3"
                ></iframe>
              </details>
            </div>
            <div class="flex flex-col gap-2 p-4">
              <Show
                when={!german()}
                fallback={
                  <div>
                    <a
                      href="https://github.com/moonymax/socketRPC"
                      class="text-blue-600"
                    >
                      SocketRPC
                    </a>{" "}
                    ist eine typesafe Websocket-basierte Remote Procedure Call
                    Library, die von tRPC inspiriert ist.
                  </div>
                }
              >
                <div>
                  <a
                    href="https://github.com/moonymax/socketRPC"
                    class="text-blue-600"
                  >
                    SocketRPC
                  </a>{" "}
                  is a typesafe websocket based Remote Procedure Call library
                  inspired by tRPC.
                </div>
              </Show>
              <div class="flex flex-row gap-1 mt-2">
                <a
                  title="™/®Microsoft, Public domain, via Wikimedia Commons"
                  class="rounded"
                  href="https://commons.wikimedia.org/wiki/File:Typescript_logo_2020.svg"
                >
                  <img
                    width="25"
                    alt="Typescript logo 2020"
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/512px-Typescript_logo_2020.svg.png"
                  />
                </a>
              </div>
              <details class="flex flex-col">
                <summary class="cursor-pointer rounded p-2 text-white bg-[#323b4c] w-fit">
                  More
                </summary>
                <iframe
                  class="min-h-[50vh] w-full p-3"
                  src="https://moonymax.github.io/socketRPC"
                ></iframe>
              </details>
            </div>
            <div class="flex flex-col gap-2 p-4">
              <Show
                when={!german()}
                fallback={
                  <div>
                    <a
                      href="https://github.com/moonymax/st3"
                      class="text-blue-600"
                    >
                      Mein SolidStart-Starter
                    </a>{" "}
                    ist eine Vorlage für die schnelle Erstellung einer
                    SolidStart-Anwendung. Sie verwendet einen E-Mail-basierten
                    Auth-flow, Websockets (inkompatibel mit serverless
                    providers), Prisma (Sqlite) und Tailwind.
                  </div>
                }
              >
                <div>
                  <a
                    href="https://github.com/moonymax/st3"
                    class="text-blue-600"
                  >
                    My SolidStart Starter
                  </a>{" "}
                  is a template for quickly creating a SolidStart Application.
                  It is using an email based auth flow, Websockets (Incompatible
                  with serverless platforms), Prisma (Sqlite) and Tailwind.
                </div>
              </Show>
              <div class="flex flex-row gap-1 mt-2">
                <TechTag>
                  <a
                    title="SolidJS, MIT &lt;http://opensource.org/licenses/mit-license.php&gt;, via Wikimedia Commons"
                    href="https://commons.wikimedia.org/wiki/File:Logo_SolidJS.svg"
                  >
                    <img
                      class="h-4"
                      alt="Logo SolidJS"
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/Logo_SolidJS.svg/256px-Logo_SolidJS.svg.png"
                    />
                  </a>
                </TechTag>
                <TechTag>
                  <a
                    title="Tailwind CSS, CC BY-SA 4.0 &lt;https://creativecommons.org/licenses/by-sa/4.0&gt;, via Wikimedia Commons"
                    href="https://commons.wikimedia.org/wiki/File:Tailwind_CSS_Logo.svg"
                  >
                    <img
                      width="23"
                      alt="Tailwind CSS Logo"
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Tailwind_CSS_Logo.svg/32px-Tailwind_CSS_Logo.svg.png"
                    />
                  </a>
                </TechTag>
                <TechTag>
                  <a title="Prisma ORM" href="https://www.prisma.io/">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      x="0px"
                      y="0px"
                      width="15"
                      height="15"
                      viewBox="0 0 50 50"
                    >
                      <path d="M44.674,37.568L27.405,1.49c-0.89-1.859-3.473-2.012-4.575-0.271L3.679,31.461c-0.413,0.652-0.401,1.486,0.03,2.126	l9.647,14.323c0.599,0.889,1.7,1.29,2.729,0.994l26.994-7.775C44.596,40.692,45.357,38.994,44.674,37.568z M40.86,38.865	l-22.703,6.369c-0.526,0.148-1.02-0.318-0.906-0.853L25.3,6.749c0.145-0.678,1.064-0.788,1.364-0.163l14.843,30.881	C41.766,38.033,41.459,38.697,40.86,38.865z"></path>
                    </svg>
                  </a>
                </TechTag>
              </div>
              <details class="flex flex-col">
                <summary class="cursor-pointer rounded p-2 text-white bg-[#323b4c] w-fit">
                  More
                </summary>
                <iframe
                  class="min-h-[60vh] w-full p-3"
                  src="https://moonymax.github.io/st3"
                ></iframe>
              </details>
            </div>
            <div class="flex flex-col gap-2 p-4">
              <Show
                when={!german()}
                fallback={
                  <div>
                    <a href="https://resume.xympf.net" class="text-blue-600">
                      resume.xympf.net
                    </a>{" "}
                    ist diese Website. Sie wurde mit Solidstart/SolidJS erstellt
                    und wurde so entworfen, dass meine privaten Informationen
                    nur autorisierten Besuchern über einen Link zugänglich sind.
                  </div>
                }
              >
                <div>
                  <a href="https://resume.xympf.net" class="text-blue-600">
                    resume.xympf.net
                  </a>{" "}
                  is this website. It was created with Solidstart/SolidJS and is
                  designed to keep my private information off of the open web,
                  only showing it with an authorized link.
                </div>
              </Show>
              <div class="flex flex-row gap-1 mt-2">
                <TechTag>
                  <a
                    title="SolidJS, MIT &lt;http://opensource.org/licenses/mit-license.php&gt;, via Wikimedia Commons"
                    href="https://commons.wikimedia.org/wiki/File:Logo_SolidJS.svg"
                  >
                    <img
                      class="h-4"
                      alt="Logo SolidJS"
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/Logo_SolidJS.svg/256px-Logo_SolidJS.svg.png"
                    />
                  </a>
                </TechTag>
                <a
                  title="Original: OpenAI Vector:  Zhing Za, Public domain, via Wikimedia Commons"
                  href="https://commons.wikimedia.org/wiki/File:ChatGPT_logo.svg"
                >
                  <img
                    class="h-6 rounded"
                    alt="JWT logo"
                    src="http://jwt.io/img/logo-asset.svg"
                  />
                </a>
              </div>
              <details class="flex flex-col">
                <summary class="cursor-pointer rounded p-2 text-white bg-[#323b4c] w-fit">
                  More
                </summary>
                <iframe
                  class="min-h-screen w-full p-3"
                  src="https://moonymax.github.io/resume"
                ></iframe>
              </details>
            </div>
            <div class="flex flex-col gap-2 p-4">
              <Show
                when={!german()}
                fallback={
                  <div>
                    <a href="https://vfxreport.xympf.net" class="text-blue-600">
                      vfxreport.xympf.net
                    </a>{" "}
                    ist eine Static SPA, entwickelt mit Svelte für Effektnotizen
                    am Set eines Film-Studios (VFX-Studio). Sie wurde gemäß dem
                    UI-Design und den Spezifikationen/Vorgaben des Studios
                    entwickelt.
                  </div>
                }
              >
                <div>
                  <a href="https://vfxreport.xympf.net" class="text-blue-600">
                    vfxreport.xympf.net
                  </a>{" "}
                  is a static SPA, written with Svelte, for on set effects notes
                  for a Film-Studio (Visual Effects Studio) based on the UI
                  design and specification/requirements provided by the Studio.{" "}
                </div>
              </Show>
              <div class="flex flex-row gap-1">
                <TechTag>
                  <a
                    title="[these people](https://github.com/sveltejs/svelte/graphs/contributors), MIT &lt;http://opensource.org/licenses/mit-license.php&gt;, via Wikimedia Commons"
                    href="https://commons.wikimedia.org/wiki/File:Svelte_Logo.svg"
                  >
                    <img
                      class="h-4"
                      alt="Svelte Logo"
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Svelte_Logo.svg/32px-Svelte_Logo.svg.png"
                    />
                  </a>
                </TechTag>
                <TechTag>
                  <a
                    title="Tailwind CSS, CC BY-SA 4.0 &lt;https://creativecommons.org/licenses/by-sa/4.0&gt;, via Wikimedia Commons"
                    href="https://commons.wikimedia.org/wiki/File:Tailwind_CSS_Logo.svg"
                  >
                    <img
                      width="23"
                      alt="Tailwind CSS Logo"
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Tailwind_CSS_Logo.svg/32px-Tailwind_CSS_Logo.svg.png"
                    />
                  </a>
                </TechTag>
                <TechTag>
                  <a
                    title="Same author as NginxLogo.gif, Public domain, via Wikimedia Commons"
                    href="https://commons.wikimedia.org/wiki/File:Nginx_logo.svg"
                  >
                    <img
                      class="h-4"
                      alt="Nginx logo"
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Nginx_logo.svg/256px-Nginx_logo.svg.png"
                    />
                  </a>
                </TechTag>
              </div>
              <details class="flex flex-col">
                <summary class="cursor-pointer rounded p-2 text-white bg-[#323b4c] w-fit">
                  More
                </summary>
                <div class="flex flex-col gap-3 p-3">
                  <img
                    class="rounded-xl z-10 shadow-[0_25px_50px_-12px_rgb(0_0_0_/_0.5)]"
                    src="vfxreport-main-page.png"
                    alt=""
                  />
                  <img
                    class="rounded-xl z-10 shadow-[0_25px_50px_-12px_rgb(0_0_0_/_0.5)]"
                    src="vfxreport-scene-page.png"
                    alt=""
                  />
                  <img
                    class="rounded-xl z-10 shadow-[0_25px_50px_-12px_rgb(0_0_0_/_0.5)]"
                    src="vfxreport-concept-page.png"
                    alt=""
                  />
                </div>
              </details>
            </div>
            <div class="flex flex-col gap-2 p-4">
              <Show
                when={!german()}
                fallback={
                  <div>
                    <a
                      href="https://github.com/moonymax/st3"
                      class="text-blue-600"
                    >
                      Dies sind einige alte Datenanalyseprojekte.
                    </a>{" "}
                    Sie untersuchen die zinsbereinigten Renditen des S&P500
                    sowie die Auswirkungen von Zinsänderungen, Zinsen und KGV
                    auf künftige Renditen.
                  </div>
                }
              >
                <div>
                  <a
                    href="https://github.com/moonymax/DataAnalysisNotebooks"
                    class="text-blue-600"
                  >
                    These are some old data analysis Projects.
                  </a>{" "}
                  They are investigating rate adjusted S&P500 returns as well as
                  the effects of rate changes, rates and pe on future returns.
                </div>
              </Show>
              <div class="flex flex-row gap-1 mt-2">
                <TechTag>
                  <a
                    title="Marc Garcia, BSD &lt;http://opensource.org/licenses/bsd-license.php&gt;, via Wikimedia Commons"
                    href="https://commons.wikimedia.org/wiki/File:Pandas_logo.svg"
                  >
                    <img
                      height="15"
                      width="45"
                      alt="Pandas logo"
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/Pandas_logo.svg/256px-Pandas_logo.svg.png"
                    />
                  </a>
                </TechTag>
              </div>
              <details class="flex flex-col">
                <summary class="cursor-pointer rounded p-2 text-white bg-[#323b4c] w-fit">
                  More
                </summary>
                <iframe
                  class="min-h-[60vh] w-full p-3"
                  src="https://moonymax.github.io/DataAnalysisNotebooks/"
                ></iframe>
              </details>
            </div>
          </div>
        </div>
        <Show
          when={!german()}
          fallback={
            <h2 class="p-4 text-xl pt-6 font-semibold">{"Über Mich"}</h2>
          }
        >
          <h2 class="p-4 text-xl pt-6 font-semibold">{"About Me"}</h2>
        </Show>
        <Show
          when={!german()}
          fallback={
            <div>
              Als Webenwickler schreibe ich Anwendungen in Python,
              TypeScript/JavaScript und Frameworks wie Svelte, React,
              SolidStart/SolidJS und Django. Dabei ist mir wichtig über die
              neuesten Trends und Technologien in der Webentwicklung auf dem
              Laufenden zu sein, um diese Technologien zeitnah und effizient
              einzusetzen.
            </div>
          }
        >
          <div>
            I am a Self-taught full-stack web developer. I have developed,
            deployed and am independently managing infrastructure and
            applications using Python, TypeScript/JavaScript, and frameworks
            such as Svelte, React, SolidStart/SolidJS and Django. I stay
            up-to-date with the latest web development trends and technologies
            inorder to quickly adopt better tools and technologies as they
            become available.
          </div>
        </Show>
      </div>
    </main>
  );
}
