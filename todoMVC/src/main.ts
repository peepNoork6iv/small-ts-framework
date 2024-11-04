import {AppComponent} from "./components/app";

const appEl = document.getElementById("app")!;
const appComponent = new AppComponent();
appComponent.mount(appEl)