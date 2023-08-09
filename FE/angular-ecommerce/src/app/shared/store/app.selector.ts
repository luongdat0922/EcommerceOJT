import { createFeatureSelector } from "@ngrx/store";
import { Appstate } from "./appstate";

const selectAppState = createFeatureSelector<Appstate>('appState');