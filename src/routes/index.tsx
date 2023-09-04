import { A, RouteDataArgs, useRouteData } from "solid-start";
import { For, JSX, Show, createSignal, onMount } from "solid-js";
import { createServerData$ } from "solid-start/server";
import { createSign } from "crypto";

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
function SizableImage(props: { url: string; width?: string; height?: string }) {
  //change the css styling to be reusable
  let style = "";
  if (props.height) {
    style += "max-height: " + props.height + ";";
  }
  if (props.width) {
    style += "max-width: " + props.width + ";";
  }
  return (
    <div class="wrapper flex items-center justify-center mx-auto max-w-full">
      <img
        src={props.url}
        style={style}
        class="rounded-xl z-10 shadow-[0_25px_50px_-12px_rgb(0_0_0_/_0.5)]"
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
        education: ["Redacted", "Redacted", "Redacted"],
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
    <main class={"grid grid-flow-col min-h-max w-full relative"}>
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
      <div
        class={
          "z-20 fixed cursor-pointer border rounded-sm" +
          (showSideBar() ? "border-white" : " border-[#323b4c] ") +
          "transition-all sm:invisible mt-2" +
          (showSideBar() ? " ml-[calc(288px+0.5rem)]" : " ml-2")
        }
        onClick={() => setShowSideBar(!showSideBar())}
      >
        <Show
          when={showSideBar()}
          fallback={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                class="fill-[#323b4c]"
                d="M3 6h18v2H3V6m0 5h18v2H3v-2m0 5h18v2H3v-2Z"
              />
            </svg>
          }
        >
          <div class="fixed h-screen top-0 bottom-0 left-0 right-0 bg-[hsla(0,0%,5%,0.5)]"></div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            class="fixed border rounded-sm border-white"
          >
            <path
              class="fill-white"
              /*fill="currentColor"*/
              d="M6.4 19L5 17.6l5.6-5.6L5 6.4L6.4 5l5.6 5.6L17.6 5L19 6.4L13.4 12l5.6 5.6l-1.4 1.4l-5.6-5.6L6.4 19Z"
            />
          </svg>
        </Show>
      </div>
      <div
        class={
          "bg-[#323b4c] box-border z-20 text-white w-[288px] p-5 h-screen overflow-auto fixed sm:relative sm:h-auto sm:ml-0 transition-all" +
          (showSideBar() ? " ml-0" : " ml-[-288px]")
        }
      >
        <h2 class="pt-8 underline underline-offset-4">Contact</h2>
        <div class={"pt-4 pb-4" + (validated ? "" : " blur")}>
          Phone: {data?.phone}
        </div>
        <div class={"pt-4 pb-4" + (validated ? "" : " blur")}>
          Email: {data?.email}
        </div>
        <div class={"pt-4 pb-4" + (validated ? "" : " blur")}>
          Address: {data?.address}
        </div>
        <h2 class="pt-8 underline underline-offset-4">Education</h2>
        <div class={"pt-4 pb-4" + (validated ? "" : " blur")}>
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

        <h2 class="pt-8 underline underline-offset-4 hidden">Expertise</h2>
        <div class="pt-4 pb-4 hidden"></div>
        <h2 class="pt-8 underline underline-offset-4">Languages</h2>
        <div class="pt-4 pb-4">
          Native English
          <br />
          German
        </div>
      </div>
      <div class={"bg-[#fdfdfd] p-10 max-w-[100%]"}>
        <div class="m-3">
          <h1
            class={"text-3xl pb-5 font-semibold" + (validated ? "" : " blur")}
          >
            {data?.name}
          </h1>
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

        <div class="m-3">
          <Show
            when={!german()}
            fallback={<h1 class="text-xl pt-5 pb-5">Erfahrung</h1>}
          >
            <h1 class="text-xl pt-5 pb-5">Experience</h1>
          </Show>
          <h2 class="font-bold w-full">xympf.net</h2>
          <br />
          <div class="h-[2px] bg-slate-600 rounded-3xl mb-8 mt-1 box-border"></div>
          <div class="flex flex-col">
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
                  Das Deployment erfolgt mit gunicorn und daphne, und wird über
                  nginx gehostet. <br />
                  Die Anwendung ermöglicht es mehreren Benutzern, gemeinsam
                  Aufgaben in Echtzeit zu erstellen und zu organisieren. Sie
                  unterstützt den Offline-Betrieb und kann als Progressive Web
                  App installiert werden. <br />
                  Dieses Projekt hat mehrere Migrationen durchlaufen: Anfangs in
                  reinem JavaScript geschrieben, wurde die Front-End-Entwicklung
                  auf React umgestellt. Die Anwendung wird derzeit auf{" "}
                  <i>SolidJS</i> und SolidStart migriert. Das Styling wurde von
                  reinem CSS auf Tailwindcss umgestellt.
                </div>
              }
            >
              <div>
                <a href="https://xympf.net" class="text-blue-600">
                  xympf.net
                </a>{" "}
                is a realtime collaborative structured organizer built with
                MySQL, Redis, Django and React, styled with tailwindcss,
                deployed with gunicorn and daphne, served/exposed with nginx.
                <br />
                The application allows multiple users to collaboratively create
                and organize tasks in realtime. It has offline support and is
                installable as a Progressive Web App.
                <br />
                This project has undergone serveral migrations. Initially the
                front-end was written in pure JavaScript and was then migrated
                to React. The application is currently in the process of being
                migrated to SolidJS with the backend moving to SolidStart. The
                styling changed from pure css to Tailwindcss.
              </div>
            </Show>
            <br />
            <ParallaxImage url="xympf.net.webp"></ParallaxImage>
          </div>

          <br />
          <h2 class="font-bold">vfxreport.xympf.net</h2>
          <div class="w-full h-[2px] bg-slate-600 rounded-3xl mb-8 mt-1"></div>
          <br />
          <div class="flex flex-col items-center">
            <Show
              when={!german()}
              fallback={
                <div>
                  <a href="https://vfxreport.xympf.net" class="text-blue-600">
                    vfxreport.xympf.net
                  </a>{" "}
                  ist eine Static Webapp für Effektnotizen am Set eines
                  Film-Studios (VFX-Studio). Sie wurde gemäß dem UI-Design und
                  den Spezifikationen/Vorgaben des Studios entwickelt. Die
                  Informationen werden vor Ort vom VFX-Supervisor eingegeben und
                  können anschließend vom VFX-Artist eingesehen und exportiert
                  werden. Diese Anwendung wurde als Single Page Application mit
                  Svelte entwickelt. Alle Daten werden clientside in Echtzeit
                  mit IndexedDB gespeichert. Die Daten, einschließlich Bildern,
                  können als JSON-Datei exportiert und importiert werden.
                </div>
              }
            >
              <div>
                <a href="https://vfxreport.xympf.net" class="text-blue-600">
                  vfxreport.xympf.net
                </a>{" "}
                is a static webapp for on set effects notes for a Film-Studio
                (Visual Effects Studio) based on the UI design and
                specification/requirements provided by the Studio. <br />
                Information is filled in on set by the VFX superviser which can
                then be exported and viewed by the VFX Artist. This application
                is a static Single Page Application (SPA) written with Svelte.
                All data is saved clientside in realtime with IndexedDB and is
                updated granularly. The data, including images, can be imported
                and exported as one Json file.
              </div>
            </Show>
            <br />
            <div class="flex flex-wrap gap-5 sm:max-w-[calc(100vw-18rem-0.75rem)] max-w-[calc(100vw-0.75rem)] justify-center">
              <SizableImage
                url="vfxreport-main-page.png"
                width="inherit"
              ></SizableImage>
              <Show when={showVfxReport()} fallback="">
                <SizableImage
                  url="vfxreport-scene-page.png"
                  width="inherit"
                ></SizableImage>
                <SizableImage
                  url="vfxreport-concept-page.png"
                  width="inherit"
                ></SizableImage>
              </Show>
              <button
                class="rounded bg-[#323b4c] p-2 text-white active:bg-white active:text-[#323b4c]"
                onClick={() => {
                  setShowVfxReport(!showVfxReport());
                }}
              >
                {showVfxReport() ? "Show Less" : "Show More"}
              </button>
            </div>
            <br />
            <br />
            <br />
          </div>
          <br />
          <h2 class="font-bold">Pong</h2>
          <div class="w-full h-[2px] bg-slate-600 rounded-3xl mb-8 mt-1"></div>
          <br />
          <div class="flex flex-col">
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
                  die Ausführung von Befehlen mit natürlicher Sprache verwendet.
                  Es kann als Soundboard verwendet werden oder um Musik
                  abzuspielen. Während Pong zuvor ein spezielles Systemprompt
                  verwendet hat, um die Ausführung von Befehlen zu ermöglichen,
                  nutzt es nun die integrierte Funktion/API-Aufrufe von OpenAI,
                  die kürzlich veröffentlicht wurden.
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
                is a discord bot which uses Openai's api for chatting and
                command execution with natural language. It can be used as a
                soundboard, or to play music. While Pong was previously using a
                special system prompt to enable it to execute commands it now
                uses Openai's built in function/api calling which was recently
                released.
              </div>
            </Show>
            <br />
            <iframe
              src="https://moonymax.github.io/Pong"
              class="flex-grow w-full min-h-screen"
            ></iframe>
          </div>
          <br />
          <h2 class="font-bold">Pyhook</h2>
          <div class="w-full h-[2px] bg-slate-600 rounded-3xl mb-8 mt-1"></div>
          <br />
          <div class="flex flex-col">
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
                  Python anstelle von Java basierend auf Py4J. Dies beschleunigt
                  die Entwicklungszeit und verbessert die Lesbarkeit des Codes
                  mit ähnlicher Performance. Events werden automatisch mithilfe
                  von Java-Reflections weitergeleitet, um größtmögliche
                  Kompatibilität über verschiedene Minecraft-Versionen hinweg zu
                  ermöglichen. Das Pyhook-Plugin vereinfacht den
                  Entwicklungsprozess, indem der Bedarf an Boilerplate-Code
                  minimiert wird. Das Plugin ist so designed, dass Befehle
                  dynamisch registriert werden. Der Python-Prozess wird
                  automatisch mit dem Starten und Stoppen des Servers verwaltet.
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
                instead of Java and is based on Py4J. This speeds up development
                time and code readablilty while maintaining similar performance
                to Java. Events are automatically forwarded at runtime using
                Java reflections to allow for greater compatibility across
                minecraft versions. The Pyhook plugin simplifies the code
                writing process by minimizing the need for boilerplate. The
                plugin is designed to register commands dynamically. The python
                process is automatically handled with the starting and stopping
                of the server.
              </div>
            </Show>
            <br />
            <iframe
              src="https://moonymax.github.io/pyhook"
              class="flex-grow w-full min-h-screen"
            ></iframe>
          </div>
          <br />
          <h2 class="font-bold">resume.xympf.net</h2>
          <div class="w-full h-[2px] bg-slate-600 rounded-3xl mb-8 mt-1"></div>
          <br />
          <div class="flex flex-col">
            <Show
              when={!german()}
              fallback={
                <div>
                  <a href="https://resume.xympf.net" class="text-blue-600">
                    resume.xympf.net
                  </a>{" "}
                  ist diese Website. Sie wurde mit Solidstart/SolidJS erstellt
                  und wurde so entworfen, dass meine privaten Informationen nur
                  autorisierten Besuchern über einen Link zugänglich sind.
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
            <br />
            <iframe
              class="flex-grow w-full min-h-screen"
              src="https://moonymax.github.io/resume"
            ></iframe>
          </div>
        </div>
      </div>
    </main>
  );
}
